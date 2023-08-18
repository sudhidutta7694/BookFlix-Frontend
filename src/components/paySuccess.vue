<template>
    <div v-if="this.status !== 'succeeded'"
        class="bg-slate-800 p-6 md:p-12 h-screen flex justify-center items-center text-red-200 text-center">Please pay for
        booking the seats</div>
    <div v-else class="mt-[-55vh] bg-slate-800 p-6 md:p-12">
        <div>
            <router-link to="/bookings" class="relative flex justify-center item-center">
                <button id="bookingButton" :class="{ 'disabled-button': isButtonDisabled }" @click="deleteBookingData"
                    :disabled="isButtonDisabled"
                    class="bg-red-600 absolute  z-10000 h-16 w-64 mt-[70vh] text-lg font-sans shadow-xl rounded-lg font-semibold text-white p-4 hover:bg-red-700">
                    Continue to Bookings
                </button>
            </router-link>
        </div>
        <div class="container h-screen">
            <div class="m-4 md:m-96 printer-top"></div>

            <div class="paper-container">
                <div class="printer-bottom"></div>

                <div class="paper">
                    <div class="main-contents flex flex-col justify-center items-center">
                        <div class="success-icon">&#10004;</div>
                        <div class="success-title">
                            Payment of ₹{{ bookingData.payment }} Complete
                        </div>
                        <div class="success-description">
                            Hurray! You have successfully booked {{ bookingData.seatLength }} seat<span
                                v-if="bookingData.seatLength !== 1">s</span> of {{ bookingData.movie }} (language:
                            {{ bookingData.language }}) in {{ bookingData.theater.name }}, {{ bookingData.city }}
                            <br />Be ready to enjoy the movie at {{ bookingData.theater.timing }} on
                            {{ bookingData.theater.day }}, {{ bookingData.date }}
                        </div>
                        <div class="order-details">
                            <div class="order-number-label">Token no.</div>
                            <div class="order-number">{{ bookingData.token }}</div>
                        </div>
                        <div class="order-footer">Thank you!</div>
                    </div>
                    <div class="jagged-edge"></div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import swal from 'sweetalert2';
// import { onMounted } from 'vue';
// import { db } from '@/firebase'
// import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';

export default {
    data() {
        return {
            status: null,
            isButtonDisabled: true,
            isFirebase: localStorage.getItem("user").startsWith("{"),
            bookingData: {
                token: localStorage.getItem('token'),
                payment: JSON.parse(localStorage.getItem('payment')),
                seatLength: JSON.parse(localStorage.getItem('totalSeats')),
                theater: JSON.parse(localStorage.getItem('theater')),
                movie: localStorage.getItem('movie').slice(1, -1),
                language: localStorage.getItem('language').slice(1, -1),
                city: localStorage.getItem('city').slice(1, -1),
                state: localStorage.getItem('state').slice(1, -1),
                date: localStorage.getItem('date').slice(1, -1),
            },
        };
    },
    methods: {
        async fetchPaymentInfo() {
            try {
                const response = await fetch('https://bookflix-stripe-server.onrender.com/payment'); // Replace with your backend API endpoint
                const data = await response.json();
                console.log("The PaymentData is: " + JSON.stringify(data));
                this.status = data.id === localStorage.getItem('id') ? 'succeeded' : 'failed';
                setTimeout(()=> {
                    if (this.status == 'succeeded') {
                    this.sendEmailWithPDF(data.receipt_email);
                }
                else {
                    console.log("The payment has not been received");
                }
                }, 2000)
                // localStorage.setItem('paymentID', data.id);
                // this.paymentInfo = data;
                // this.error = null;
            } catch (error) {
                this.error = 'Error fetching payment information: ' + error.message;
                this.paymentInfo = null;
            }
        },
        async sendEmailWithPDF(email) {
            try {
                const response = await fetch('https://bookmyshow-database.onrender.com/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Email sent:', responseData);
                } else {
                    console.error('Error sending email:', response.statusText);
                }
            } catch (error) {
                console.error('Error sending email:', error);
            }
        },
        deleteBookingData() {
            localStorage.removeItem("paymentID");
            localStorage.removeItem('payment');
            localStorage.removeItem('seatLength');
            localStorage.removeItem('movie');
            localStorage.removeItem('theater');
            localStorage.removeItem('language');
            localStorage.removeItem('city');
            localStorage.removeItem('date');
            localStorage.removeItem('selectedSeats');
            localStorage.removeItem('state');
            localStorage.removeItem('token');
        },
        // generateToken() {
        //     const theater = JSON.parse(localStorage.getItem('theater'));
        //     const movie = this.bookingData.movie;

        //     // Get the first letter of the movie
        //     const movieInitial = movie.charAt(0);
        //     const payment = JSON.parse(localStorage.getItem('payment'));
        //     const seats = JSON.parse(localStorage.getItem('selectedSeats'));

        //     // Get the initials of the theater
        //     const theaterInitials = theater.name
        //         ? theater.name.split(' ').map(word => word.charAt(0)).join('')
        //         : '';

        //     // Generate a random number
        //     const randomNumber = Math.floor(Math.random() * 100000000);

        //     // Combine the bits from the props and the random number to create the order number
        //     const token = `${movieInitial}${payment}${seats.length}${theaterInitials}${randomNumber}`;

        //     // Trim or pad the order number to make it 15 characters long
        //     if (token.length < 15) {
        //         this.bookingData.token = token.padEnd(15, '0');
        //         return token.padEnd(15, '0');
        //     } else if (token.length > 15) {
        //         this.bookingData.token = token.slice(0, 15);
        //         return token.slice(0, 15);
        //     } else {
        //         this.bookingData.token = token;
        //         return token;
        //     }
        // },
        // async storeBookingData() {
        //     const user = JSON.parse(localStorage.getItem('user'))?.uid || localStorage.getItem('access_token');
        //     // const payment = JSON.parse(localStorage.getItem('payment'));
        //     const db = getFirestore(); // Access the Firestore instance

        //     if (user) {
        //         console.log(this.bookingData.theater.type);
        //         // Construct the booking data object
        //         const bookingData = {
        //             token: localStorage.getItem('token'),
        //             // date: this.bookingData.date,
        //             payment: this.bookingData.payment,
        //             date: this.bookingData.date,
        //             seatLength: this.bookingData.seatLength,
        //             theater: this.bookingData.theater,
        //             movie: this.bookingData.movie,
        //             language: this.bookingData.language,
        //             city: this.bookingData.city,
        //             state: this.bookingData.state,
        //             seats: JSON.parse(localStorage.getItem('selectedSeats'))
        //         };



        //         try {
        //             // Create a userBookingData document within a collection named after the user's ID
        //             const userBookingCollectionRef = collection(db, `Bookings/${user}/userBookingData`);
        //             const userBookingDocRef = doc(userBookingCollectionRef);

        //             const userBookingDocSnapshot = await getDoc(userBookingDocRef);
        //             if (!userBookingDocSnapshot.exists()) {
        //                 await setDoc(userBookingDocRef, bookingData);
        //                 // ...
        //             }

        //             console.log('Booking data saved successfully!');
        //             // localStorage.removeItem('token');

        //         } catch (error) {
        //             swal.fire({
        //                 title: 'Error saving booking data',
        //                 html: `<p>${error}</p>`,
        //                 icon: 'error',
        //             });
        //         }
        //     } else {
        //         // User is not logged in, prompt them to log in
        //         swal.fire({
        //             title: 'User is not logged in',
        //             html: 'Please log in to store the booking data.',
        //             icon: 'warning'
        //         });
        //     }


        // }

        async storeBookingData() {
            let username = ""
            if (!this.isFirebase) username = localStorage.getItem('user');
            else username = JSON.parse(localStorage.getItem("user")).uid;

            const bookingData = {
                username: username,
                token: localStorage.getItem('token'),
                payment: this.bookingData.payment,
                date: this.bookingData.date,
                seatLength: this.bookingData.seatLength,
                theater: this.bookingData.theater,
                movie: this.bookingData.movie,
                language: this.bookingData.language,
                city: this.bookingData.city,
                state: this.bookingData.state,
                seats: JSON.parse(localStorage.getItem('selectedSeats')),
            };
            try {
                setTimeout(async () => {
                    if (!this.isFirebase && (this.status === 'succeeded')) {
                        const response = await fetch('https://bookmyshow-database.onrender.com/bookings', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(bookingData),
                        });

                        const data = await response.json();
                        if (data.success) {
                            swal.fire({
                                title: 'Booking Data Saved Successfully',
                                text: data.message,
                                icon: 'success',
                            });
                        } else {
                            swal.fire({
                                title: 'Error saving booking data',
                                text: data.message,
                                icon: 'error',
                            });
                        }
                    } else if (this.isFirebase && (this.status === 'succeeded')) {
                        const db = getFirestore(); // Access the Firestore instance

                        if (username) {
                            console.log(this.bookingData.theater.type);
                            // Construct the booking data object
                            const bookingData = {
                                token: localStorage.getItem('token'),
                                // date: this.bookingData.date,
                                payment: this.bookingData.payment,
                                date: this.bookingData.date,
                                seatLength: this.bookingData.seatLength,
                                theater: this.bookingData.theater,
                                movie: this.bookingData.movie,
                                language: this.bookingData.language,
                                city: this.bookingData.city,
                                state: this.bookingData.state,
                                seats: JSON.parse(localStorage.getItem('selectedSeats'))
                            };



                            try {
                                // Create a userBookingData document within a collection named after the user's ID
                                const userBookingCollectionRef = collection(db, `Bookings/${username}/userBookingData`);
                                const userBookingDocRef = doc(userBookingCollectionRef);

                                const userBookingDocSnapshot = await getDoc(userBookingDocRef);
                                if (!userBookingDocSnapshot.exists()) {
                                    await setDoc(userBookingDocRef, bookingData);
                                    // ...
                                }

                                console.log('Booking data saved successfully!');
                                swal.fire({
                                    title: 'Booking Data Saved Successfully',
                                    icon: 'success',
                                });

                            } catch (error) {
                                swal.fire({
                                    title: 'Error saving booking data',
                                    html: `<p>${error}</p>`,
                                    icon: 'error',
                                });
                            }
                        } else {
                            // User is not logged in, prompt them to log in
                            swal.fire({
                                title: 'User is not logged in',
                                html: 'Please log in to store the booking data.',
                                icon: 'warning'
                            });
                        }
                    }
                }, 1000);
            } catch (error) {
                console.log("Error: ", error);
                swal.fire({
                    title: 'Error saving booking data',
                    html: `<p>${error}</p>`,
                    icon: 'error',
                });
            }
        }


    },
    mounted() {
        console.log("Component mounted")
        this.storeBookingData()
        this.fetchPaymentInfo()
        setTimeout(() => {
            this.isButtonDisabled = false;
        }, 3000);
    },
    unmounted() {
        console.log("SuccessPage unmounted");
        this.deleteBookingData();
    }
};
</script>
  
<style scoped>
.container {
    width: fit-content;
    margin: 30px auto;
}

.printer-top {
    z-index: 1;
    border: 12px solid #666666;
    height: 12px;
    border-bottom: 0;
    border-radius: 6px 6px 0 0;
    background: #333333;
}

.printer-bottom {
    width: 100%;
    z-index: 0;
    border: 12px solid #666666;
    height: 12px;
    border-top: 0;
    border-radius: 0 0 6px 6px;
    background: #333333;
}

.paper-container {
    position: relative;
    overflow: hidden;
    height: 467px;
}

.paper {
    background: #ffffff;
    height: 447px;
    position: absolute;
    z-index: 2;
    margin: 0 12px;
    margin-top: -12px;
    animation: print 3000ms cubic-bezier(0.68, -0.55, 0.265, 0.9) 1;
}

.main-contents {
    margin: 0 12px;
    padding: 24px;
}

.jagged-edge {
    position: absolute;
    background: rgb(30, 41, 59);
    height: 20px;
    width: 100%;
    bottom: 0;
}

.jagged-edge:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%),
        linear-gradient(-45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%);
    background-size: 16px 40px;
    background-position: 0 -20px;
}

.success-icon {
    text-align: center;
    font-size: 48px;
    height: 72px;
    background: #359d00;
    border-radius: 50%;
    width: 72px;
    height: 72px;
    margin: 16px auto;
    color: #fff;
}

.success-title {
    font-size: 24px;
    text-align: center;
    color: #666;
    font-weight: bold;
    margin-bottom: 16px;
}

.success-description {
    font-size: 16px;
    line-height: 21px;
    color: #848383;
    text-align: center;
    margin-bottom: 24px;
}

.order-details {
    text-align: center;
    color: #333;
    font-weight: bold;
}

.order-number-label {
    font-size: 18px;
    margin-bottom: 8px;
}

.order-number {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    line-height: 48px;
    font-size: 48px;
    padding: 8px 0;
    margin-bottom: 24px;
}

.order-footer {
    text-align: center;
    line-height: 18px;
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: bold;
    color: #999;
}

.disabled-button {
    color: black;
    background-color: #999999;
    cursor: not-allowed;
}

@keyframes print {
    0% {
        transform: translateY(-90%);
    }

    100% {
        transform: translateY(0%);
    }
}
</style>
  