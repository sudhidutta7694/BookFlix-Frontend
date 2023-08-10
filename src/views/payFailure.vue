<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="body relative h-screen flex">
        <div class="bg-slate-800 absolute z-0 inset-0 justify-center pl-[40vw] items-center">
            <div class="mt-[40vh] bg-slate-700 rounded-xl text-slate-100 card p-5 flex flex-col justify-center items-center transition-all ease-in duration-200 gap-8 border-2 border-red-600
            text-center">
                <div>
                    <i class="fas fa-exclamation-triangle text-yellow-400 text-4xl hover:scale-105"></i>
                    <h1 class="mt-2 text-xl text-red-300 font-bold">Payment Failed!</h1>
                </div>
                <p class="text-center text-lg w-96">The payment of ₹{{ payment }} has either failed or was canceled for the movie
                    {{ movie.slice(1, -1) }}</p>
                <router-link to="/bookings">
                    <button
                        class="bg-green-500 px-3 py-2 hover:bg-green-400 click:bg-green-400 text-black rounded-lg font-bold">Go
                        to Bookings Page</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
const payment = localStorage.getItem('payment');
const movie = localStorage.getItem('movie');
</script>

<style lang="scss" scoped>
.body {
    z-index: 1000;
}

.card {
    width: fit-content;
}</style>