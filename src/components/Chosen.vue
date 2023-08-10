<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-slate-900">
    <div class="mt-32 p-6 movies-container">
      <!-- <h2 class="text-3xl text-gray-100 font-bold mb-4">Movies</h2> -->

      <div v-if="loading" class="bg-slate-900 min-h-screen flex justify-center items-center">
        <img src="https://cdn.dribbble.com/users/121337/screenshots/916951/small-load.gif" alt="Loading ...">
      </div>

      <div v-else>
        <div v-if="error" class="text-red-500 text-lg">{{ error }}</div>

        <div v-else-if="Object.keys(movies).length > 0">
          <div class=" flex flex-col gap-12">
            <div class="language-row" v-for="(languageMovies, language) in movies" :key="language">
              <h3 v-if="languageMovies.length > 0" class="ml-4 text-2xl text-gray-200 font-semibold mb-2">{{
                getLanguageName(language) }} Movies:</h3>
              <div v-if="languageMovies.length > 0"
                class="content p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                <div
                  class="flex flex-col justify-stretch gap-3 pb-1 items-center "
                  v-for="movie in languageMovies" :key="movie.id" @click="showDetails(movie.id)">
                  <router-link
                    :to="{ name: 'moviebook', query: { id: movie.id, language: getLanguageName(language), city: city, state: state } }">
                    <div class="movie-poster bg-slate-700 rounded-xl hover:opacity-75 hover:scale-105 transition-all ease-in duration-300">
                      <img v-if="getMoviePosterURL(movie.poster_path) !== ''" :src="getMoviePosterURL(movie.poster_path)"
                        alt="Movie Poster" class="rounded-lg shadow-lg w-96 h-auto" />
                      <img v-else src="https://cdn.download.it/ms/static/images/poster-placeholder.png"
                        class="rounded-lg shadow-lg w-96 h-auto " />
                    </div>
                  </router-link>
                  <div class="text-center">
                    <h3 class="mt-4 text-red-200 text-xl font-serif font-semibold">{{ movie.title }}</h3>
                    <p class="text-gray-200 font-mono text-lg">IMDB Rating: {{ movie.vote_average }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <p class="text-lg">No movies found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    languages: {
      type: Array,
      required: true
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
      movies: {},
      loading: true,
      error: null,
      apiKey: '1dc8f67cb5ee2d801ef91ff145b4c3a9',
      languageList: {
        en: "English",
        te: "Telugu",
        hi: "Hindi",
        as: "Assamese",
        bn: "Bengali",
        mai: "Maithili",
        bho: "Bhojpuri",
        mag: "Magahi",
        hne: "Chhattisgarhi",
        ggo: "Gondi",
        kok: "Konkani",
        mr: "Marathi",
        gu: "Gujarati",
        bgc: "Haryanvi",
        pah: "Pahari",
        mjt: "Pahari",
        xnr: "Kangri",
        sat: "Santhali",
        kn: "Kannada",
        ml: "Malayalam",
        bns: "Bundeli",
        mni: "Meitei",
        kha: "Khasi",
        lus: "Mizo",
        njo: "Ao",
        knn: "Konyak",
        njh: "Lotha",
        or: "Odia",
        pa: "Punjabi",
        raj: "Rajasthani",
        ne: "Nepali",
        dzo: "Bhutia",
        ta: "Tamil",
        ur: "Urdu",
        trp: "Kokborok",
        gbm: "Garhwali",
        kfy: "Kumaoni"
      }
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        const languageMoviesList = {};

        for (const language of this.languages) {
          const currentDate = new Date();
          const curent = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
          const formattedDate = curent.toISOString().split('T')[0];

          const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
              api_key: this.apiKey,
              language: 'en-US',
              sort_by: 'popularity.desc',
              include_adult: true,
              include_video: true,
              page: 1,
              with_original_language: language,
              'primary_release_date.gte': formattedDate
            }
          });

          const languageMovies = response.data.results.slice(0, 5);
          languageMoviesList[language] = languageMovies;
        }

        this.movies = languageMoviesList;
        this.loading = false;
      } catch (error) {
        this.error = 'Failed to fetch movies.';
        console.error('Error:', error);
        this.loading = false;
      }
    },
    getMoviePosterURL(posterPath) {
      if (posterPath) {
        return `https://image.tmdb.org/t/p/w780${posterPath}`;
      } else {
        return 'https://cdn.download.it/ms/static/images/poster-placeholder.png';
      }
    },
    showDetails(movieId) {
      // Implement your logic to show movie details based on the movie ID
      console.log(`Showing details for movie with ID: ${movieId}`);
    },
    getLanguageName(languageCode) {
      return this.languageList[languageCode] || 'Unknown';
    }
  }
};
</script>
