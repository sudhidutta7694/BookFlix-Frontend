<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-slate-800 mt-20 md:mt-28 py-24 flex gap-10 flex-col-reverse justify-around items-center">
    <div>
      <p class="text-2xl mb-6 font-bold text-red-400">Recent Bookings:-</p>
      <TableComponent v-if="bookingData.length > 0" class="rounded-xl" :bookingData="bookingData" />
      <h1 v-else class="text-xl font-serif text-slate-200 font-semibold">No bookings as of right now</h1>
    </div>
    <div v-if="!choose"
      class="bg-slate-700 location-container pt-12 p-6 w-72 md:w-96 rounded-xl flex justify-center font-serif hover:shadow-xl  transition-all ease-in duration-200 flex-col text-white">
      <h1 class="text-2xl font-bold mb-4 text-center">Location Information</h1>
      <div class="flex gap-3 justify-between items-center">
        <label for="cityInput" class="font-semibold text-red-200">Enter City:</label>
        <input id="cityInput" v-model="cityInput" @input="searchCity"
          class="border rounded-xl w-40 max-w-40 md:max-w-48 md:w-48 border-red-500 px-4 h-8 bg-black py-2"
          placeholder="Enter a city name" />
      </div>
      <div class="flex justify-between mt-4">
        <h2 class="text-xl font-semibold text-red-200">State: </h2>
        <div class="text-gray-100 text-xl" v-if="selectedCity">
          <p>{{ selectedCity.state }}</p>
        </div>
        <p v-else class="text-red-600 font-extralight italic text-xl">State Not Found</p>

      </div>
      <div class="mt-5 flex justify-between items-center">
        <p class="text-blue-200 text-lg font-bold cursor-pointer hover:text-blue-400" @click="chooseLocation">Auto Detect
        </p>
        <router-link v-if="selectedCity" :to="goToRouterLink"
          class="text-lg text-green-200 hover:text-green-400 font-bold ">
          Go to Movies
        </router-link>
        <p v-else class="text-lg text-gray-200 hover:text-gray-400 font-bold cursor-not-allowed">
          Go to Movies
        </p>
      </div>

    </div>
    <div v-if="choose"
      class="bg-slate-700 location-container pt-12 p-6 w-72 md:w-96 rounded-xl flex justify-center font-serif hover:shadow-xl  transition-all ease-in duration-200 flex-col">
      <h2 class="text-white font-semibold mb-6 text-center text-2xl">Location Information</h2>

      <div v-if="loading" class="text-green-200 loading-message">Loading...</div>

      <div v-else>
        <div v-if="error" class="error-message">{{ error }}</div>

        <div v-else-if="location" class="flex flex-col gap-3">
          <div class="location-details text-xl">
            <div class="location-item mb-2">
              <span class="text-red-200 item-label">City: </span>
              <span class="text-gray-200 item-value ">{{ location.city }}</span>
            </div>

            <div class="location-item text-xl">
              <span class="text-red-200 item-label">State: </span>
              <span class="text-gray-200 item-value">{{ location.region }}</span>
            </div>
          </div>
          <div class="flex justify-between transition-all ease-in duration-200">
            <p class="text-blue-200 text-lg cursor-pointer hover:text-blue-400" @click="chooseLocation">Choose Location
            </p>
            <router-link class="text-green-200 text-lg cursor-pointer hover:text-green-400" :to="getRouterLink">Go to
              Movies</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableComponent from '@/components/TableComponent.vue';
import { auth } from '@/firebase.js';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import languagesData from '../components/languages.json';
import citiesData from '../components/cities.json';


export default {
  components: {
    TableComponent
  },
  data() {
    return {
      isFirebase: localStorage.getItem("user").startsWith("{"),
      username: localStorage.getItem("user"),
      bookingData: [],
      location: null,
      choose: false,
      loading: true,
      error: null,
      cities: citiesData.states,
      cityInput: '',
      selectedCity: null,
      apiKey: 'f242c2d97d84a0f2c3f287db26198b93',
      languages: [],
      // languages2: languagesData.states,
    };
  },
  created() {

  },
  mounted() {
    this.fetchLocation();
    this.fetchBookings();
  },
  methods: {
    async fetchBookings() {
      try {
        if (!this.isFirebase) {
          const username = localStorage.getItem("user");
          const response = await fetch(`https://bookmyshow-database.onrender.com/bookings/${username}`);
          const data = await response.json();
          if (data.success) {
            this.bookingData = data.bookings;
            console.log('Bookings data:', this.bookingData);
          } else {
            console.log('Failed to fetch bookings');
          }
        } else {
          const db = getFirestore(); // Access the Firestore instance

          onAuthStateChanged(auth, () => {
            const userId = JSON.parse(localStorage.getItem('user'))?.uid;
            const bookingCollectionRef = collection(db, `Bookings/${userId}/userBookingData`);
            onSnapshot(bookingCollectionRef, (querySnapshot) => {
              const bookings = [];
              querySnapshot.forEach((doc) => {
                if (doc.exists()) {
                  const bookingData = doc.data();
                  bookings.push(bookingData);
                }
              });
              this.bookingData = bookings; // Assign the retrieved booking data to the data property
              console.log('Booking data:', this.bookingData);
            });
          });
        }
      } catch (error) {
        console.log('Error fetching bookings:', error);
      }

    },
    searchCity() {
      const city = this.cityInput.trim();
      if (city) {
        for (const state of this.cities) {
          const foundCity = state.cities.find(c => c.toLowerCase() === city.toLowerCase());
          if (foundCity) {
            this.selectedCity = { name: foundCity, state: state.name };
            console.log(state.name);
            const s = languagesData.states.find(s => s.name === state.name);
            if (s) {
              console.log("true")
              this.languages = s.languages.map(language => language.code);
              console.log('Languages:', this.languages);
            } else {
              console.log('State not found.');
            }
            return;
          }
        }
      }
      this.selectedCity = null;

    },
    chooseLocation() {
      this.choose = !this.choose;
    },
    async fetchLocation() {
      try {
        const response = await axios.get('https://ipinfo.io/json?token=11314cc12c8406');
        this.location = response.data;
        this.loading = false;

        console.log('City:', this.location.city);
        console.log('State:', this.location.region);

        // Access the languages for the state
        const stateName = this.location.region;
        console.log("This is the " + stateName);
        const state = languagesData.states.find(state => state.name === stateName);
        console.log(state)

        if (state) {
          this.languages = state.languages.map(language => language.code);
          console.log('Languages:', this.languages);
        } else {
          console.log('State not found.');
        }
      } catch (error) {
        this.error = 'Failed to fetch location.';
        console.error('Error:', error);
        this.loading = false;
      }
    }
  },
  computed: {
    goToRouterLink() {
      if (this.selectedCity) {
        return {
          name: 'chosen',
          query: {
            languages: this.languages.join(','),
            city: this.selectedCity.name,
            state: this.selectedCity.state
          }
        };
      }
      return null;
    },
    getRouterLink() {
      if (this.location) {
        return {
          name: 'chosen',
          query: {
            languages: this.languages.join(','),
            city: this.location.city,
            state: this.location.region
          }
        };
      }
      return null;
    }
  }
};
</script>

<style scoped>
/* Styles go here */
</style>
