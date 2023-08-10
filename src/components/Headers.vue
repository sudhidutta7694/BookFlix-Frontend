<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="bg-gray-950">
    <div class="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div class="flex items-center justify-between">
          <router-link to="/home" class=" md:ml-[-100px] flex items-center mr-6">
            <img class="h-8 sm:h-12 md:h-20" src="../../public/favicon.ico" alt="Logo" />
          </router-link>
          <div class="hidden md:block">
            <router-link to="/home"
              class="text-red-100 hover:text-red-200 px-3 py-2 rounded-md text-md md:text-lg font-sans transition-colors duration-300"
              active-class="text-white bg-gray-800">
              Home
            </router-link>
            <router-link to="/favorites"
              class="text-red-100 hover:text-red-200 px-2 py-2 rounded-md text-md md:text-lg font-sans transition-colors duration-300"
              active-class="text-white bg-gray-800">
              Favorites
            </router-link>
            <router-link to="/bookings"
              class="text-red-100 hover:text-red-200 px-2 py-2 rounded-md text-md md:text-lg font-sans transition-colors duration-300"
              active-class="text-white bg-gray-800">
              Bookings
            </router-link>
          </div>
        </div>
        <div>
          <form class="relative mr-6" @submit.prevent="routeTo">
            <input type="text" placeholder="Search here" v-model="searchQuery" @input="searchMovies" @click="routeToHome"
              class="border w-32 md:w-64 lg:w-96 border-red-300 text-sm md:text-lg bg-slate-700 text-red-200 hover:bg-slate-800 rounded-full py-2 px-2 md:py-2 md:px-4 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors duration-300" />
            <button type="submit"
              class="absolute right-0 top-0 bottom-0 px-4 py-2 text-red-400 hover:text-red-600 transition-colors duration-300">
              <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17l-5-5m0 0l5-5m-5 5h12" />
              </svg> -->
              <i class="fas fa-search" />
            </button>
          </form>

          <div v-if="searchQuery.length > 0"
            class="cursor-pointer absolute mt-2 ml-[-10px] rounded-2xl bg-slate-700 overflow-y-auto max-h-96">
            <ul>
              <li v-for="movie in searchResultsWithPoster" :key="movie.id"
                class="flex opacity-90 hover:bg-slate-800 gap-3 hover:opacity-100 items-center p-2 pb-3 w-32 md:w-64 lg:w-96"
                @click="logMovieId(movie.id)">
                <router-link :to="{ name: 'overview', params: { id: movie.id } }" @click="clear">
                  <div class="flex justify-center items-center gap-3">
                    <img class="rounded-xl border border-red-300 hover:border-red-400 w-10"
                      :src="getMoviePosterURL(movie.poster_path)" />
                    <span class="text-red-100 font-serif font-semibold text-lg hover:text-red-200">{{ movie.title
                    }}</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="isMenuOpen" class="flex flex-col">
          <div @click="isLogout = !isLogout"
            :class="{ 'rounded-xl': !isLogout, 'rounded-t-xl': isLogout && windowWidth <= 1400 }"
            class="flex shadow-xl justify-center items-center cursor-pointer p-1 sm:p-2 md:p-3 gap1 sm:gap-2 md:gap-3font-bold text-red-200 lg:scale-110">
            <div
              class="rounded-full w-6 sm:w-8 md:w-16 md:h-16 hover:shadow-lg flex items-center justify-center transition-all duration-300">
              <img v-if="photoURL !== ''" :src="photoURL" alt="ProfilePicture"
                class="w-8 h-8 relative sm:w-9 sm:h-9 md:w-16 md:h-16 border-2 border-red-300 rounded-full hover:scale-105 ease-in"
                @click="toggleAppearance = !toggleAppearance" />
              <i v-else @click="toggleAppearance = !toggleAppearance"
                class="hover:scale-105 ease-in fas fa-user-circle text-red-300 text-5xl text-center" />
              <div v-if="toggleAppearance"
                class="mt-2 absolute top-20 bg-slate-900 p-3 rounded-xl flex flex-col opacity-90 border border-red-500 transition-transform duration-200 w-60 items-center justify-center">
                <p class="text-sm sm:text-md md:text-lg text-center font-mono mb-2">{{ storedUsername }}</p>
                <hr class="border-1 w-full border-gray-300" />
                <router-link to="/login" @click="logout"
                  class="text-center rounded-md pt-1 text-sm sm:text-md md:text-lg font-mono transition-colors text-red-200 hover:text-red-300 duration-300">
                  Logout
                  <i class="fas fa-sign-out" />
                </router-link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </nav>
</template>

<script>
import { ref, computed, onBeforeUnmount, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from "@/firebase"

const API_KEY = '1dc8f67cb5ee2d801ef91ff145b4c3a9';

export default {

  setup() {
    const windowWidth = ref(window.innerWidth);
    const handleResize = () => {
      windowWidth.value = window.innerWidth;
    };
    const isFirebase = ref(false);
    const isLogout = ref(false);
    const searchQuery = ref('');
    const searchResults = ref([]);
    const router = useRouter();
    const showProfile = ref(false);
    const isMenuOpen = ref('false')
    const store = useStore();
    const auth = getAuth(app);
    const toggleAppearance = ref(false);
    const storedUsername = ref('');
    // const gender = Math.random() < 0.5 ? "men" : "women";
    // const randomIndex = Math.floor(Math.random() * 100) + 1;
    const photoURL = ref(``);

    onAuthStateChanged(auth, (user) => {
      if (user && user.photoURL) {
        photoURL.value = user.photoURL;
      } else {
        // Set a placeholder image URL for the dummy face
        photoURL.value = ``;
      }
    });
    onMounted(() => {
      if (!localStorage.getItem("user").startsWith("{")) {
        storedUsername.value = localStorage.getItem('user');
      }
      if (localStorage.getItem("user").startsWith("{")) {
        storedUsername.value = JSON.parse(localStorage.getItem('user')).displayName;
      }
      toggleAppearance.value = false;
      console.log(storedUsername.value)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    const clear = () => {
      searchQuery.value = '';
    }

    const searchMovies = async () => {
      if (searchQuery.value.trim() === '') {
        searchResults.value = [];
        return;
      }

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery.value}`
        );
        searchResults.value = response.data.results;
      } catch (error) {
        console.error(error);
      }
    };

    const routeToHome = () => {
      // const router = useRouter();
      searchQuery.value = "";
      router.push('/home');
    };

    const getMoviePosterURL = (posterPath) => {
      if (!posterPath) {
        return '';
      }
      return `https://image.tmdb.org/t/p/w200${posterPath}`;
    };

    const searchResultsWithPoster = computed(() => {
      return searchResults.value.filter((movie) => movie.poster_path);
    });

    const logMovieId = (movieId) => {
      console.log(movieId);
      router.push(`/overview/${movieId}`);
    };

    const logout = async () => {
      try {
        await auth.signOut();
        // store.clearUsername(storedUsername.value)
        localStorage.clear();
        router.push('/login');
      } catch (error) {
        console.error(error);
      }
    };

    const routeTo = async () => {
      const movieName = searchQuery.value; // Get the movie name from the search query
      if (!movieName) return;

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            movieName
          )}`
        );
        const movies = response.data.results;
        if (movies.length > 0) {
          const movieId = movies[0].id; // Get the ID of the first movie in the search results
          router.push({ name: 'overview', params: { id: movieId } });
          searchQuery.value = "";
        } else {
          console.log('Movie not found');
        }
        searchQuery.value = "";
        searchResults.value = [];
      } catch (error) {
        console.error(error);
      }
    };

    return {
      isFirebase,
      clear,
      showProfile,
      routeToHome,
      windowWidth,
      searchQuery,
      searchResults,
      searchMovies,
      toggleAppearance,
      getMoviePosterURL,
      isMenuOpen,
      searchResultsWithPoster,
      logMovieId,
      router,
      store,
      photoURL,
      storedUsername,
      logout,
      isLogout,
      routeTo, // Include the routeTo function in the return object
    };
  },
};


</script>
  
<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.navbar {
  background-color: #141414;
}

.navbar a:hover {
  text-decoration: underline;
}

.nav-link-active {
  font-weight: bold;
}
</style>
  