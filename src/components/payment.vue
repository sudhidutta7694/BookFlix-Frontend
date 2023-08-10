<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="bg-slate-800 h-screen">
        <div class="m-96 screen flex-center p-36">
            <form class="popup scale-110 rounded-xl bg-slate-700 flex p-lg" @submit.prevent="payNow">
                <div class="close-btn pointer flex-center p-sm">
                    <i class="ai-cross"></i>
                </div>

                <!-- CARD FORM -->
                <div class="flex-fill flex-vertical">
                    <div class="header flex-between flex-vertical-center">
                        <div class="flex-vertical-center">
                            <!-- <i class="ai-bitcoin-fill size-xl pr-sm f-main-color"></i> -->
                            <span class=" font-bold text-red-500 text-xl">
                                <strong>BookFlix</strong><span>Pay</span>
                            </span>
                        </div>
                        <div class="text-white font-mono timer" data-id="timer">
                            <span class="bg-red-700">0</span><span class="bg-red-700">0</span>
                            <em>:</em>
                            <span class="bg-red-700">0</span><span class="bg-red-700">0</span>
                        </div>
                    </div>
                    <div class="card-data flex-fill flex-vertical">

                        <!-- Card Number -->
                        <div class="flex-between text-white flex-vertical-center">
                            <div class="card-property-title">
                                <strong>Card Number</strong>
                                <span>Enter 16-digit card number on the card</span>
                            </div>
                            <!-- <div class="f-main-color pointer"><i class="ai-pencil"></i> Edit</div> -->
                        </div>

                        <!-- Card Field -->
                        <div class="flex-between">
                            <div class="card-number bg-red-100 flex-vertical-center flex-fill">
                                <div class="card-number-field flex-vertical-center flex-fill">


                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                                        <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
                                        <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
                                        <path fill="#ff3d00"
                                            d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" />
                                    </svg>




                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                                        <path fill="#F44336" d="M33 11A13 13 0 1 0 33 37A13 13 0 1 0 33 11Z" />
                                        <path fill="#2196F3"
                                            d="M28,24h-8c0-0.682,0.068-1.347,0.169-2h7.661c-0.105-0.685-0.255-1.354-0.464-2h-6.732c0.225-0.694,0.508-1.362,0.84-2h5.051c-0.369-0.709-0.804-1.376-1.293-2h-2.465c0.379-0.484,0.79-0.941,1.233-1.367c-0.226-0.218-0.455-0.432-0.696-0.633c-2.252-1.872-5.146-3-8.304-3C7.82,11,2,16.82,2,24s5.82,13,13,13c3.496,0,6.664-1.388,9-3.633c0.443-0.426,0.854-0.883,1.232-1.367h-2.465c-0.489-0.624-0.923-1.291-1.293-2h5.051c0.333-0.638,0.616-1.306,0.841-2h-6.732c-0.209-0.646-0.358-1.315-0.464-2h7.661C27.932,25.347,28,24.682,28,24z" />
                                    </svg>



                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                                        <path fill="#1565C0"
                                            d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z" />
                                        <path fill="#FFF"
                                            d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z" />
                                        <path fill="#FFC107"
                                            d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z" />
                                    </svg>


                                    <input v-model="cardNumber1" class="bg-red-50 border rounded-lg border-black"
                                        type="number" min="1000" max="9999" placeholder="0000" required>-
                                    <input v-model="cardNumber2" class="bg-red-50 border rounded-lg border-black"
                                        type="number" min="1000" max="9999" placeholder="0000" required>-
                                    <input v-model="cardNumber3" class="bg-red-50 border rounded-lg border-black"
                                        type="number" min="1000" max="9999" placeholder="0000" required>-
                                    <input v-model="cardNumber4" class="bg-red-50 border rounded-lg border-black"
                                        type="number" min="1000" max="9999" placeholder="0000" data-bound="carddigits_mock"
                                        data-def="0000" required>
                                </div>
                                <i class="ai-circle-check-fill size-lg f-main-color"></i>
                            </div>
                        </div>

                        <!-- Expiry Date -->
                        <div class="flex-between">
                            <div class="card-property-title text-white">
                                <strong>Expiry Date</strong>
                                <span>Enter the expiration date of the card</span>
                            </div>
                            <div class="card-property-value flex-vertical-center">
                                <div class="input-container half-width">
                                    <input v-model="expiryMonth" pattern="^(0?[1-9]|1[0-2])$" maxlength="2"
                                        class=" bg-red-50 numbers" data-bound="mm_mock" data-def="00" type="number" min="1"
                                        max="12" step="1" placeholder="MM" required>
                                </div>
                                <span class="m-md text-gray-200">/</span>
                                <div class="input-container half-width">
                                    <input v-model="expiryYear" class="bg-red-50 numbers" data-bound="yy_mock" maxlength="2"
                                        data-def="01" type="number" min="23" max="99" step="1" placeholder="YY" required>
                                </div>
                            </div>
                        </div>

                        <!-- CVV Number -->
                        <div class="flex-between">
                            <div class="card-property-title text-white">
                                <strong>CVV Number</strong>
                                <span>Enter card verification code from the back of the card</span>
                            </div>
                            <div class="card-property-value">
                                <div class="input-container">
                                    <input id="cvv" class="font-mono bg-red-50" pattern="\d{3}"
                                        :type="showPassword ? 'text' : 'password'" required>
                                    <button type="button" class="flex items-center eye-button"
                                        @click="showPassword = !showPassword">
                                        <i id="cvc_toggler" data-target="cvv"
                                            :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Name -->
                        <div class="flex-between">
                            <div class="card-property-title text-white">
                                <strong>Cardholder Name</strong>
                                <span>Enter cardholder's name</span>
                            </div>
                            <div class="card-property-value">
                                <div class="input-container">
                                    <input v-model="cardholderName" id="name" data-bound="name_mock"
                                        data-def="Mr. Cardholder" type="text" class="bg-red-50 uppercase"
                                        placeholder="CARDHOLDER NAME" required>
                                    <i class="ai-person"></i>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="flex-center">
                        <button type="submit" @click="handlePayNowClick && payNow"
                            class="w-[25vw] bg-red-600 hover:bg-red-700 text-slate-50 p-2 text-lg rounded-lg font-semibold pointer">Pay
                            Now</button>
                        <!-- <router-link @click="payNow" :to="{
                            name: 'paySuccess', query: {
                                token: token,
                                cardNumber: cardNumber,
                                payment: (1.18 * payment),
                                seatLength: seatLength,
                                seats: seats,
                                theater: JSON.stringify(theater),
                                movie: movie,
                                language: language,
                                city: city,
                                state: state
                            }
                        }">

                        </router-link> -->
                    </div>
                </div>

                <!-- SIDEBAR -->
                <div class="sidebar mt-[-6vh] flex-vertical">

                    <div class="purchase-section flex-fill flex-vertical gap-8 bg-red-100">

                        <div class="card-mockup flex-vertical mt-[-3vh]">

                            <div>
                                <div id="name_mock" class="size-md pb-sm uppercase ellipsis text-center">
                                    <strong>Cardholder Name</strong>
                                </div>
                                <div class="size-md pb-md text-center">
                                    <strong>
                                        <span class="pr-sm">
                                            &#x2022;&#x2022;&#x2022;&#x2022;
                                        </span><span class="pr-sm">
                                            &#x2022;&#x2022;&#x2022;&#x2022;
                                        </span><span class="pr-sm">
                                            &#x2022;&#x2022;&#x2022;&#x2022;
                                        </span>
                                        <span id="carddigits_mock">0000</span>
                                    </strong>
                                </div>
                                <div class="flex-between flex-vertical-center">
                                    <strong class="size-md">
                                        <span id="mm_mock">00</span>/<span id="yy_mock">01</span>
                                    </strong>

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                                        <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
                                        <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
                                        <path fill="#ff3d00"
                                            d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" />
                                    </svg>


                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                                        <path fill="#F44336" d="M33 11A13 13 0 1 0 33 37A13 13 0 1 0 33 11Z" />
                                        <path fill="#2196F3"
                                            d="M28,24h-8c0-0.682,0.068-1.347,0.169-2h7.661c-0.105-0.685-0.255-1.354-0.464-2h-6.732c0.225-0.694,0.508-1.362,0.84-2h5.051c-0.369-0.709-0.804-1.376-1.293-2h-2.465c0.379-0.484,0.79-0.941,1.233-1.367c-0.226-0.218-0.455-0.432-0.696-0.633c-2.252-1.872-5.146-3-8.304-3C7.82,11,2,16.82,2,24s5.82,13,13,13c3.496,0,6.664-1.388,9-3.633c0.443-0.426,0.854-0.883,1.232-1.367h-2.465c-0.489-0.624-0.923-1.291-1.293-2h5.051c0.333-0.638,0.616-1.306,0.841-2h-6.732c-0.209-0.646-0.358-1.315-0.464-2h7.661C27.932,25.347,28,24.682,28,24z" />
                                    </svg>


                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                                        <path fill="#1565C0"
                                            d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z" />
                                        <path fill="#FFF"
                                            d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z" />
                                        <path fill="#FFC107"
                                            d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z" />
                                    </svg>


                                </div>
                            </div>
                        </div>

                        <ul class="purchase-props">
                            <li class="flex-between">
                                <span>Company: </span>
                                <strong>BookFlix</strong>
                            </li>
                            <li class="flex-between">
                                <span>Token: </span>
                                <strong>{{ generateToken() }}</strong>
                            </li>
                            <li class="flex-between space-x-8">
                                <span>Product: </span>
                                <strong>{{ seatLength }} ticket<strong v-if="seatLength !== 1">s</strong> of {{ movie
                                }}</strong>
                            </li>
                            <li class="flex-between">
                                <span>GST(18%): </span>
                                <strong>₹{{ 0.18 * payment }}</strong>
                            </li>
                        </ul>
                    </div>
                    <div class="separation-line"></div>
                    <div class="total-section flex-between flex-vertical-center bg-red-100">
                        <div class="flex-fill flex-vertical">
                            <div class="total-label f-secondary-color">You have to Pay</div>
                            <div>
                                <strong>{{ 1.18 * payment }}</strong>
                                <small> <span class="f-secondary-color"> Rupees Only/-</span></small>
                            </div>
                        </div>
                        <i class="ai-coin size-lg"></i>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>




<script>
// import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
// import { useRouter } from 'vue-router';
export default {
    props: {
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
    },
    data() {
        return {
            cardNumber1: '',
            cardNumber2: '',
            cardNumber3: '',
            cardNumber4: '',
            expiryMonth: '',
            expiryYear: '',
            payment: null,
            showPassword: false,
            cardholderName: '',
            token: '',
            timerExpired: false,
        };
    },
    beforeMount() {
        // Introduce a one-second delay before fetching payment from localStorage
        setTimeout(() => {
            this.payment = JSON.parse(localStorage.getItem('payment'));
            // Now the payment value is updated from localStorage after a one-second delay
        }, 100);
    },
    onUnmounted() {
        localStorage.setItem("cardNumber", JSON.stringify(this.cardNumber1 + this.cardNumber2 + this.cardNumber3 + this.cardNumber4));
    },
    mounted() {
        this.copyInputValuesToCardMockup();
        this.toggleCvcDisplayMode();
        this.startTimerCountdown();
    },
    // watch: {
    //     seats: {
    //         immediate: true,
    //         handler(newSeats) {
    //             console.log(newSeats);
    //         },
    //     },
    // },

    methods: {
        handlePayNowClick() {

        },
        copyInputValuesToCardMockup() {
            const bounds = document.querySelectorAll('[data-bound]');

            for (let i = 0; i < bounds.length; i++) {
                const targetId = bounds[i].getAttribute('data-bound');
                const defValue = bounds[i].getAttribute('data-def');
                const targetEl = document.getElementById(targetId);
                bounds[i].addEventListener('keyup', () => (targetEl.innerText = bounds[i].value || defValue));
            }
        },
        toggleCvcDisplayMode() {
            const cvc_toggler = document.getElementById('cvc_toggler');

            cvc_toggler.addEventListener('click', () => {
                const target = cvc_toggler.getAttribute('data-target');
                const el = document.getElementById(target);
                el.setAttribute('type', el.type === 'text' ? 'password' : 'text');
            });
        },
        startTimerCountdown() {
            const timer = document.querySelector('[data-id=timer]');
            let timeLeft = (60 * 5); // Set the initial time to 5 minutes
            this.timerExpired = false; // Variable to keep track of whether the timer has expired
            let count = 0;
            const tick = () => {
                if (timeLeft > 0) {
                    timeLeft--;
                    const date = new Date('2000-01-01 00:00:00');
                    date.setSeconds(timeLeft);
                    const str = date.toISOString();
                    // timer.children[0].innerText = str[14];
                    timer.children[1].innerText = str[15];
                    timer.children[3].innerText = str[17];
                    timer.children[4].innerText = str[18];
                } else {
                    this.timerExpired = true;
                    count++;
                    // 5 minutes have passed, close the payment gateway or perform any necessary actions
                    if (count === 1) this.closePaymentGateway();
                    return;

                }
            };

            setInterval(() => {
                tick();
            }, 1000);

        },

        closePaymentGateway() {

            // if (this.timerExpired) {
            //     return;
            // }
            // const router = useRouter();
            this.$router.push('/bookings');
            Swal.fire({
                title: "Payment Gateway Closed",
                html: "<p>Please try again!</p>",
                icon: "info"
            })
        },

        payNow() {

            // Handle payment submission using the form data
            console.log('Form Data:', {
                cardNumber: this.cardNumber,
                expiryMonth: this.expiryMonth,
                expiryYear: this.expiryYear,
                cardholderName: this.cardholderName
            });

            const { token, date, seatLength, theater, movie, language, city, state } = this;
            const query = {
                token,
                // cardNumber: (cardNumber1 + cardNumber2 + cardNumber3 + cardNumber4),
                date,
                seatLength,
                theater: JSON.stringify(theater),
                movie,
                language,
                city,
                state
            };

            this.$router.push({ name: 'paySuccess', query });

            // Additional payment logic here
        },
        generateToken() {
            const {
                theater,
                movie,
            } = this.$props;

            // Get the first letter of the movie
            const movieInitial = movie.charAt(0);
            const payment = JSON.parse(localStorage.getItem('payment'));
            const seats = JSON.parse(localStorage.getItem('selectedSeats'));
            // Get the initials of the theater
            const theaterInitials = theater.name ? theater.name
                .split(' ')
                .map(word => word.charAt(0))
                .join('') : "";

            // Generate a random number
            const randomNumber = Math.floor(Math.random() * 100000000);

            // Combine the bits from the props and the random number to create the order number
            this.token += `${movieInitial}${payment}${seats.length}${theaterInitials}${randomNumber}`;

            // Trim or pad the order number to make it 10 characters long
            if (this.token.length < 15) {
                this.token = this.token.padEnd(15, '0');
            } else if (this.token.length > 15) {
                this.token = this.token.slice(0, 15);
            }

            return this.token;
        }

    },
    computed: {
        seatLength() {
            // Access the seat query parameter from $route.query
            const seatParam = JSON.parse(localStorage.getItem("selectedSeats"));

            if (seatParam) {
                // Split the seatParam string into an array using comma as the delimiter
                console.log(seatParam)
                const seats = seatParam;
                // Return the length of the seats array
                return seats.length;
            }

            // Return 0 if the seat query parameter is not present
            return 0;
        },
        localStoragePayment: {
            get() {
                return JSON.parse(localStorage.getItem('payment')) || 0;
            },
        },
    },
    watch: {
        // Watch the computed property and update the payment value when it changes
        localStoragePayment(newValue) {
            this.payment = newValue;
        },
    },
};
</script>



<style>
/* Your converted CSS code here */
:root {
    --field-border: 1px solid #EEEEEE;
    --accent-color: #2962FF;
    --sidebar-color: #F1F1F1;
    --secondary-text: #aaaaaa;
    --radius-sm: 0.25em;
    --radius-md: 0.50em;
}

* {
    box-sizing: border-box;
}

.flex {
    display: flex;
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flex-fill {
    display: flex;
    flex: 1 1;
}

.flex-vertical {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.flex-vertical-center {
    display: flex;
    align-items: center;
}

.flex-between {
    display: flex;
    justify-content: space-between;
}

.p-sm {
    padding: 0.5em;
}

.pl-sm {
    padding-left: 0.5em;
}

.pr-sm {
    padding-right: 0.5em;
}

.pb-sm {
    padding-bottom: 0.5em;
}

.p-md {
    padding: 1em;
}

.pb-md {
    padding-bottom: 1em;
}

.p-lg {
    padding: 2em;
}

.m-md {
    margin: 1em;
}

.size-md {
    font-size: 0.85em;
}

.size-lg {
    font-size: 1.5em;
}

.size-xl {
    font-size: 2em;
}

.half-width {
    width: 50%;
}

.pointer {
    cursor: pointer;
}

.uppercase {
    text-transform: uppercase;
}

.ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
}

.f-main-color {
    color: #2962FF;
}

.f-secondary-color {
    color: var(--secondary-text);
}

.b-main-color {
    background: var(--accent-color);
}

.numbers::-webkit-outer-spin-button,
.numbers::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

body {
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.screen {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
}

.popup {
    position: relative;
    width: 50em;
    height: 35em;
    overflow-x: hidden;
    overflow-y: auto;
}


.popup .close-btn:hover {
    background: #EF5350;
}

.header {
    padding-bottom: 1em;
}

.sidebar {

    padding-left: 2em;
    padding-top: 5em;
}

.header .title {
    font-size: 1.2em;
}

.header .title span {
    font-weight: 300;
}

.card-data>div {
    padding-bottom: 1.5em;
}

.card-data>div:first-child {
    padding-top: 1.5em;
}

.card-property-title {
    display: flex;
    flex-direction: column;
    flex: 1 1;
    margin-right: 0.5em;
}

.card-property-title strong {
    padding-bottom: 0.5em;
    font-size: 0.85em;
}

.card-property-title span {
    color: var(--secondary-text);
    font-size: 0.75em;
}

.card-property-value {
    flex: 1 1;
}

.card-number {
    border: var(--field-border);
    border-radius: var(--radius-md);
    padding: 0.5em 1em;
}

.card-number-field * {
    line-height: 1;
    margin: 0;
    padding: 0;
}

.card-number-field input {
    width: 4em;
    height: 100%;
    padding: 0.5em 0;
    margin: 0.1em 0.75em;
    color: black;
    text-align: center;
    font-family: inherit;
    font-weight: 500;
}

.timer span {
    width: 1.2em;
    padding: 4px 0;
    display: inline-block;
    text-align: center;
    border-radius: var(--radius-sm);
}

.timer span+span {
    margin-left: 2px;
}

.timer em {
    font-style: normal;
}

.action button {
    padding: 1.1em;
    width: 100%;
    height: 100%;
    font-weight: 600;
    font-size: 1em;
    color: #FFFFFF;
    border: none;
    border-radius: var(--radius-md);
    transition: background-color 0.2s ease-in-out;
}

.action button:hover {
    background: #2979FF;
}

.input-container {
    position: relative;
    display: flex;
    align-items: center;
    height: 3em;
    overflow: hidden;
    border: var(--field-border);
    border-radius: var(--radius-md);
}

.input-container input,
.input-container i {
    line-height: 1;
}

.input-container input {
    flex: 1 1;
    height: 100%;
    width: 100%;
    text-align: center;
    border: none;
    border-radius: var(--radius-md);
    font-family: inherit;
    font-weight: 800;
    font-size: 0.85em;
}

.input-container input:focus {
    background: #E3F2FD;
    color: #283593;
}

.input-container input::placeholder {
    color: #ddd;
}

.input-container input::-webkit-outer-spin-button,
.input-container input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.input-container i {
    position: absolute;
    right: 0.5em;
}

.purchase-section {
    position: relative;
    overflow: visible;
    padding: 1em 1em 1em 1em;
    border-top-left-radius: 0.8em;
    border-top-right-radius: 0.8em;
}

.purchase-section:before {
    content: '';
    position: absolute;
    width: 1.6em;
    height: 1.6em;
    border-radius: 50%;
    left: -0.8em;
    bottom: -0.8em;
    background-color: rgb(51 65 85);
}

.purchase-section:after {
    content: '';
    position: absolute;
    width: 1.6em;
    height: 1.6em;
    border-radius: 50%;
    right: -0.8em;
    bottom: -0.8em;
    background-color: rgb(51 65 85);
}


.purchase-props {
    margin: 0;
    padding: 0;
    font-size: 0.8em;
    width: 100%;
}

.purchase-props li {
    width: 100%;
    line-height: 2.5;
}

.purchase-props li span {
    color: var(--secondary-text);
    font-weight: 600;
}

.separation-line {
    border-top: 1.5px dashed #818080;
    margin: 0 0.8em;
}

.total-section {
    position: relative;
    padding: 1em;
    border-bottom-left-radius: 0.8em;
    border-bottom-right-radius: 0.8em;
}

.total-section:before {
    content: '';
    position: absolute;
    width: 1.6em;
    height: 1.6em;
    border-radius: 50%;
    left: -0.8em;
    top: -0.8em;
    background-color: rgb(51 65 85);
}

.total-section:after {
    content: '';
    position: absolute;
    width: 1.6em;
    height: 1.6em;
    border-radius: 50%;
    right: -0.8em;
    top: -0.8em;
    background-color: rgb(51 65 85);
}

.total-label {
    font-size: 0.8em;
    padding-bottom: 0.5em;
}

.total-section strong {
    font-size: 1.5em;
    font-weight: 800;
}

.total-section small {
    font-weight: 600;
}
</style>