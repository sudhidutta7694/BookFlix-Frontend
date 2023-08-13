<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <teleport to="#movieStats">
        <div class="stats fixed top-[40vh] right-[10vw] z-1000">
            <div class="bg-slate-700 w-20 py-3 h-fit rounded-xl flex flex-col gap-4 justify-center items-center p-2">
                <div class="seat-ruby rounded-lg w-16 h-16 flex flex-col items-center justify-center">
                    <p class="font-mono text-white font-bold">RUBY</p>
                    <p class="font-mono text-indigo-300 font-bold">₹150</p>
                </div>
                <div class="seat-gold rounded-lg w-16 h-16 flex flex-col items-center justify-center">
                    <p class="font-mono text-white font-bold">GOLD</p>
                    <p class="font-mono text-indigo-800 font-bold">₹200</p>
                </div>
                <div class="seat-panna rounded-lg w-16 h-16 flex flex-col items-center justify-center">
                    <p class="font-mono text-white font-bold">PANNA</p>
                    <p class="font-mono text-indigo-800 font-bold">₹250</p>
                </div>
                <div class="booked rounded-lg w-16 h-16 flex items-center justify-center">
                    <p class="font-mono text-indigo-900 font-bold">N/A</p>
                </div>
                <div class="selected rounded-lg w-16 h-16 flex items-center justify-center">
                    <p class="font-serif text-sm text-gray-200 font-bold">Selected</p>
                </div>
            </div>
        </div>
    </teleport>

    <div class="h-screen bg-slate-800 flex gap-20 flex-col">
        <div class="mt-40 relative">
            <div class="flex items-center justify-center gap-6">
                <label for="select" class="text-gray-200 text-xl font-serif font-semibold">
                    Select the number of seats:
                </label>
                <div>
                    <select id="select"
                        class="flex justify-center items-center font-mono font-bold text-md appearance-none py-2 px-4 pr-8 leading-tight text-red-50 bg-black border border-red-300 shadow-sm focus:outline-dashed rounded-full focus:border-red-400 transition-transform ease-in-out duration-1000 hover:text-red-100"
                        v-model="selectedOption" @change="updateSelectedSeats">
                        <option v-for="option in seatOptions" :value="option.value" :key="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-[40.7vw] flex items-center px-2 text-red-300">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 12l-6-6h12l-6 6z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <div class="relatve flex justify-center">
            <div
                class="mt-12 absolute z-1000 bg-red-200 h-[20vh] w-[40vw] rounded-xl border border-black hover:shadow shadow-xl shadow-red-100 flex justify-center items-center">
                <p class="font-sans text-2xl font-bold">All eyes here, please!</p>
            </div>
        </div>

        <div class="mt-12 theatre scale-105 bg-slate-900">
            <div class="cinema-seats left" :class="{ 'selected': isSelectedSeat('left') }">
                <div v-for="row in numberOfRows" :key="row" class="cinema-row" :class="'row-' + row">
                    <div v-for="seat in seatsPerRow" :key="seat" class="seat" :class="getSeatClass('left', row, seat)"
                        @click="toggleSeat(getSeatId('left', row, seat))"
                        :disabled="isSeatDisabled(getSeatId('left', row, seat))"
                        :data-seat-id="getSeatId('left', row, seat)">
                    </div>
                </div>
            </div>

            <div class="cinema-seats right" :class="{ 'selected': isSelectedSeat('right') }">
                <div v-for="row in numberOfRows" :key="row" class="cinema-row" :class="'row-' + row">
                    <div v-for="seat in seatsPerRow" :key="seat" class="seat" :class="getSeatClass('right', row, seat)"
                        @click="toggleSeat(getSeatId('right', row, seat))"
                        :disabled="isSeatDisabled(getSeatId('right', row, seat))"
                        :data-seat-id="getSeatId('right', row, seat)">
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-[50vh] ml-[40vw] flex flex-col justify-center">
            <!-- <router-link :to="paymentRoute">
                <button
                    class="px-4 py-2 w-[20vw] font-semibold font-mono bg-gray-500 rounded-full disabled:opacity-50 disabled:pointer-events-none"
                    :class="{ 'bg-green-500': selectedSeats.length >= numSeats }" @click="saveSelectedSeats"
                    :disabled="selectedSeats.length < numSeats">
                    {{ selectedSeats.length >= numSeats ? `Proceed to Pay - ₹${payment}` : 'Select Seats' }}
                </button>
            </router-link> -->
            <button
                class="px-4 py-2 w-[20vw] font-semibold font-mono bg-gray-500 rounded-full disabled:opacity-50 disabled:pointer-events-none"
                :class="{ 'bg-green-500': selectedSeats.length >= numSeats }" @click="handlePayment"
                :disabled="selectedSeats.length < numSeats">
                {{ selectedSeats.length >= numSeats ? `Proceed to Pay - ₹${payment}` : 'Select Seats' }}
            </button>
        </div>
    </div>
</template>
  

<script setup>
import { app } from '@/firebase';
import { getAuth } from 'firebase/auth';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { onMounted, watch, ref, computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';


const props = defineProps({
    date: {
        type: String,
        required: true,
    },
    theater: {
        type: Object,
        required: true,
    },
    movie: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
});
const isFirebase = ref(localStorage.getItem("user").startsWith("{"));
const bookedSeats = ref([])
const selectedOption = ref('1');
const selectedSeats = ref([]);
const numSeats = ref(1);
const seatOptions = [
    { value: '1', label: '1 Seat' },
    { value: '2', label: '2 Seats' },
    { value: '3', label: '3 Seats' },
    { value: '4', label: '4 Seats' },
    { value: '5', label: '5 Seats' },
    { value: '6', label: '6 Seats' },
    { value: '7', label: '7 Seats' },
    { value: '8', label: '8 Seats' },
    { value: '9', label: '9 Seats' },
    { value: '10', label: '10 Seats' },
];
const numberOfRows = 7;
const seatsPerRow = 7;
const prices = {
    gold: 200,
    panna: 250,
    ruby: 150,
};
const payment = ref(0);
const bookingData = ref(null);
// const token = generateToken();

const generateToken = (() => {
    const theater = props.theater;
    const movie = props.movie;

    // Get the first letter of the movie
    const movieInitial = movie.slice(0, 2).toLocaleUpperCase();
    // const payment = localStorage.getItem('payment');
    // const seats = JSON.parse(localStorage.getItem('selectedSeats'));

    // Get the initials of the theater
    const theaterInitials = theater.name
        ? theater.name.split(' ').map(word => word.charAt(0)).join('')
        : '';

    // Generate a random number
    const randomNumber = 290821019;

    // Combine the bits from the props and the random number to create the order number
    const movieToken = `${movieInitial}${theaterInitials}${randomNumber}`;

    // Trim or pad the order number to make it 15 characters long
    if (movieToken.length < 15) {
        // token.value = movieToken.padEnd(15, '0');
        return movieToken.padEnd(15, '0');
    } else if (movieToken.length > 15) {
        // token.value = movieToken.slice(0, 15);
        return movieToken.slice(0, 15);
    } else {
        // token.value = movieToken;
        return movieToken;
    }
})

// onUpdated(() => {
//     generateToken();
// })

onUnmounted(() => {
    // alert(`Token: ${generateToken()}`)
    localStorage.setItem("payment", JSON.stringify(payment.value));
    Cookies.set('payment', payment.value);
})

const totalSeats = computed(() => {
    return selectedSeats.value.length;
})

let emailID = "";
if (!isFirebase.value) emailID = ref((localStorage.getItem('email')));
else emailID = ref(JSON.parse(localStorage.getItem('user')).email);
onMounted(() => {
    console.log("Email", emailID.value);
})

const handlePayment = () => {
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [
                {
                    id: 1,
                    movieName: props.movie,
                    numTickets: totalSeats.value,
                    imageUrl: localStorage.getItem('posterUrl'),
                    totalPayment: payment.value,
                    email: emailID.value,
                    movieToken: generateToken(),
                },
            ],
        })
    }).then(res => {
        if (res.ok) return res.json();
        return res.json().then(json => Promise.reject(json));
    }).then(({ url, id, session }) => {
        // window.open(url, '_blank');
        // console.log(selectedSeats.value)
        const stripedUrl = url.replace('http://localhost:3000.app', '');

        // Navigate to the modified Stripe Checkout URL
        localStorage.setItem('date', JSON.stringify(props.date));
        localStorage.setItem('theater', props.theater);
        localStorage.setItem('movie', JSON.stringify(props.movie));
        localStorage.setItem('language', JSON.stringify(props.language));
        localStorage.setItem('city', JSON.stringify(props.city));
        localStorage.setItem('state', JSON.stringify(props.state));
        localStorage.setItem('totalSeats', JSON.stringify(totalSeats.value));
        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats.value));
        localStorage.setItem('payment', JSON.stringify(payment.value));
        localStorage.setItem('token', JSON.stringify(generateToken()));
        setTimeout(() => {
            window.location.href = stripedUrl;
        }, 1000);
        // setTimeout(() => {
        //     // window.location.href = stripedUrl;
        //     // alert("The payment ID is: " + id);
        // }, 5000);
        console.log("The payment ID is: " + id + "\n\n" + session);


    }).catch(err => {
        console.log(payment.value)
        console.error(err.error);
    });
}


// const router = useRouter();
const route = useRoute();

onMounted(() => {
    loadBookedSeats();
});

watch(bookingData, () => {
    applySeatStyles();
});

function loadBookedSeats() {
    const seats = document.querySelectorAll('.seat');

    seats.forEach((seat) => {
        const seatId = seat.getAttribute('data-seat-id');
        if (bookingData.value?.seats.includes(seatId)) {
            seat.classList.add('booked');
            seat.disabled = true;
        }
    });
}

function applySeatStyles() {
    console.log("ApplySeatStyles")
    console.log(route.query)
    if (!route.query) {
        return;
    }

    if (!bookingData.value) {
        return;
    }

    bookingData.value.forEach((booking) => {
        const { theater, movie, language, city, state, date, seats } = booking;

        const isMatch =
            theater.id === JSON.parse(route.query.theater).id &&
            theater.name === JSON.parse(route.query.theater).name &&
            theater.timing === JSON.parse(route.query.theater).timing &&
            theater.day === JSON.parse(route.query.theater).day &&
            movie === route.query.movie &&
            language === route.query.language &&
            city === route.query.city &&
            state === route.query.state &&
            date === route.query.date;

        console.log(isMatch);
        if (isMatch) {
            seats.forEach((seat) => {
                bookedSeats.value.push(seat);
            });
            console.log(bookedSeats.value);
        }
    });

}

const auth = getAuth(app); // Get the Auth instance
const db = getFirestore(); // Get the Firestore instance


async function fetchData() {
    try {
        const response = await fetch(`http://localhost:5173/bookings/`);
        const data = await response.json();
        if (data.success) {
            // this.bookingData = data.bookings;
            const routeQuery = {
                theater: JSON.parse(route.query.theater),
                movie: route.query.movie,
                language: route.query.language,
                city: route.query.city,
                state: route.query.state,
                date: route.query.date,
            };
            const l = data.bookings.map((data) =>
                data.theater.id === routeQuery.theater.id &&
                data.theater.name === routeQuery.theater.name &&
                data.theater.timing === routeQuery.theater.timing &&
                data.theater.day === routeQuery.theater.day &&
                data.movie === routeQuery.movie &&
                data.language === routeQuery.language &&
                data.city === routeQuery.city &&
                data.state === routeQuery.state &&
                data.date === routeQuery.date
            );
            // const index = 0;
            for (let i = 0; i < l.length; i++) {
                if (l[i] === true) {
                    const seats = data.bookings[i].seats;
                    bookedSeats.value.push(...seats);
                };
            }
            console.log(bookedSeats.value);
        } else {
            console.log('Failed to fetch bookings');
        }
        try {
            // Fetch the 'Users' collection
            const usersQuerySnapshot = await getDocs(collection(db, 'Users'));
            console.log('Users Collection:', usersQuerySnapshot.docs.map(doc => doc.data()));

            // For each user document, access the 'userBookingData' subcollection under 'Bookings'
            await Promise.all(usersQuerySnapshot.docs.map(async (userDoc) => {
                const userId = userDoc.id;
                const userBookingCollectionRef = collection(db, `Bookings/${userId}/userBookingData`);
                const userBookingQuerySnapshot = await getDocs(userBookingCollectionRef);
                console.log(`User Id: ${userId}, Bookings Collection:`, userBookingQuerySnapshot.docs.map(doc => doc.data()));

                const routeQuery = {
                    theater: JSON.parse(route.query.theater),
                    movie: route.query.movie,
                    language: route.query.language,
                    city: route.query.city,
                    state: route.query.state,
                    date: route.query.date,
                };

                userBookingQuerySnapshot.forEach((bookingDoc) => {
                    const bookingData = bookingDoc.data();
                    const { theater, movie, language, city, state, date, seats } = bookingData;

                    const isMatch =
                        theater.id === routeQuery.theater.id &&
                        theater.name === routeQuery.theater.name &&
                        theater.timing === routeQuery.theater.timing &&
                        theater.day === routeQuery.theater.day &&
                        movie === routeQuery.movie &&
                        language === routeQuery.language &&
                        city === routeQuery.city &&
                        state === routeQuery.state &&
                        date === routeQuery.date;

                    console.log(isMatch);
                    if (isMatch) {
                        seats.forEach((seat) => {
                            bookedSeats.value.push(seat);
                        });
                        console.log(bookedSeats.value);
                    }
                });
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } catch (error) {
        console.log('Error fetching bookings:', error);
    }
}

// async function fetchData2() {




// // Call the fetchData function whenever needed
fetchData();

watch(selectedOption, (newOption) => {
    numSeats.value = parseInt(newOption);
});

watch(selectedSeats, () => {
    calculatePayment();
}, { deep: true });

// function saveSelectedSeats() {

// }

function calculatePayment() {
    payment.value = selectedSeats.value.reduce((total, seat) => {
        const seatClass = getSeatClassFromSeatId(seat);
        const seatPrice = getSeatPrice(seatClass);
        return total + seatPrice;
    }, 0);
}

function getSeatPrice(seatClass) {
    const seatType = seatClass.split('-')[1];
    return prices[seatType];
}

function getSeatClassFromSeatId(seatId) {
    const [side, row, seat] = seatId.split('-');
    return getSeatClass(side, row, seat);
}

function updateSelectedSeats() {
    selectedSeats.value = [];

    const numSeatsValue = parseInt(selectedOption.value);

    for (let row = 1; row <= numberOfRows; row++) {
        for (let seat = 1; seat <= seatsPerRow; seat++) {
            const seatId = getSeatId('left', row, seat);
            if (selectedSeats.value.length < numSeatsValue && isSelectedSeat(seatId)) {
                selectedSeats.value.push(seatId);
            }
        }
    }

    console.log(selectedSeats.value);
}

function isSelectedSeat(seatId) {
    return selectedSeats.value.includes(seatId);
}

function toggleSeat(seatId) {
    const numSeatsValue = parseInt(selectedOption.value);

    if (isSelectedSeat(seatId)) {
        selectedSeats.value = selectedSeats.value.filter((seat) => seat !== seatId);
    } else {
        if (selectedSeats.value.length < numSeatsValue) {
            selectedSeats.value.push(seatId);
        }
    }

    // Apply the style to the selected seat
    const seatElement = document.querySelector(`.seat[data-seat-id="${seatId}"]`);
    if (seatElement) {
        const isSelected = isSelectedSeat(seatId);
        seatElement.classList.toggle('selected', isSelected);
    }

    console.log(selectedSeats.value);
}

function getSeatId(side, row, seat) {
    return `${side}-${row}-${seat}`;
}

function isSeatDisabled(seatId) {
    const numSeatsValue = parseInt(selectedOption.value);
    return selectedSeats.value.length >= numSeatsValue && !isSelectedSeat(seatId);
}

function getSeatClass(side, row, seat) {
    const seatId = getSeatId(side, row, seat);
    if (bookedSeats.value.some(seat => seat === seatId)) {
        console.log(bookedSeats.value[1]);
        return 'booked';
    }
    if (
        seatId === 'left-1-1' ||
        seatId === 'left-2-1' ||
        seatId === 'left-3-1' ||
        seatId === 'left-4-1' ||
        seatId === 'left-5-1' ||
        seatId === 'left-6-1' ||
        seatId === 'left-7-1' ||
        seatId === 'right-1-1' ||
        seatId === 'right-2-1' ||
        seatId === 'right-3-1' ||
        seatId === 'right-4-1' ||
        seatId === 'right-5-1' ||
        seatId === 'right-6-1' ||
        seatId === 'right-7-1'
    ) {
        return 'seat-gold';
    } else if (
        seatId === 'left-1-7' ||
        seatId === 'left-2-7' ||
        seatId === 'left-3-7' ||
        seatId === 'left-4-7' ||
        seatId === 'left-5-7' ||
        seatId === 'left-6-7' ||
        seatId === 'left-7-7' ||
        seatId === 'right-1-7' ||
        seatId === 'right-2-7' ||
        seatId === 'right-3-7' ||
        seatId === 'right-4-7' ||
        seatId === 'right-5-7' ||
        seatId === 'right-6-7' ||
        seatId === 'right-7-7'
    ) {
        return 'seat-panna';
    } else {
        return 'seat-ruby';
    }


}
</script>


  
<style scoped>
.theatre {
    display: flex;
    position: absolute;
    z-index: 1000;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.cinema-seats {
    display: flex;
}

.seat {
    cursor: pointer;
    width: 35px;
    height: 50px;
    border-radius: 7px;
    background: linear-gradient(to top, #761818, #B54041, #F3686A);
    margin-bottom: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.selected {
    background-color: green;
}

.booked {
    background: linear-gradient(to top, #727272, #7c7c7c, #8a8a8a, #a8a8a8, #b0b0b0, #cecece);
    cursor: not-allowed;
    pointer-events: none;
}

.seat:hover:before {
    content: "";
    position: absolute;
    z-index: 1000;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 7px;
}

.left .cinema-row {
    transform: skewX(-15deg);
    margin: 0 6px;
}

.left .seat {
    transform: skewX(20deg);
    margin-top: -32px;
}

.left .row-2 .seat {
    transform: skewX(18deg);
}

.left .row-3 .seat {
    transform: skewX(16deg);
}

.left .row-4 .seat {
    transform: skewX(15deg);
}

.left .row-5 .seat {
    transform: skewX(12deg);
}

.left .row-6 .seat {
    transform: skewX(10deg);
}

.left .row-7 .seat {
    transform: skewX(8deg);
}

.right {
    margin-left: 70px;
}

.right .cinema-row {
    transform: skewX(7deg);
    margin: 0 6px;
}

.right .seat {
    transform: skewX(-8deg);
    margin-top: -32px;
}

.right .row-2 .seat {
    transform: skewX(-10deg);
}

.right .row-3 .seat {
    transform: skewX(-12deg);
}

.right .row-4 .seat {
    transform: skewX(-15deg);
}

.right .row-5 .seat {
    transform: skewX(-16deg);
}

.right .row-6 .seat {
    transform: skewX(-18deg);
}

.right .row-7 .seat {
    transform: skewX(-20deg);
}

.disable-hover .seat:hover:before {
    background: none;
}

.disabled\:opacity-50[disabled] {
    opacity: 0.5;
}

.disabled\:pointer-events-none[disabled] {
    pointer-events: none;
}

.bg-green-500 {
    background-color: #25ce90;
}

.seat-gold {
    background: linear-gradient(to top, #FFD700, #B8860B);
}

.seat-panna {
    background: linear-gradient(to top, #00FF00, #008000);
}

.seat-ruby {
    background: linear-gradient(to top, #761818, #B54041, #F3686A);
}

.selected {
    background: linear-gradient(to top, #121067, #2b29a8, #4644cb);
}

.seat:not(.selected) {
    opacity: 1;
}
</style>