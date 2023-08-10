<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="sm:mt-[133px] bg-slate-800 min-h-screen flex flex-col gap-4 justify-center items-center">

    <div class="bg-slate-800 fixed top-32 w-full z-10 flex justify-between py-10 px-10 items-center">
      <h1 class="text-red-100 font-bold z-10 text-3xl font-serif">Explore Popular Movies:</h1>
      <div
        class=" filters flex justify-end items-center gap-4 ">
        <label for="language" class="text-red-200 font-semi-bold text-2xl self-center">Language:</label>
        <select id="language" v-model="selectedLanguage"
          class="w-32 border p-2 rounded-lg bg-slate-900 text-center text-xl font-mono text-red-200 border-red-200">
          <option value="">All</option>
          <option v-for="(language, index) in languages" :key="index" :value="language.code">{{ language.name }}</option>
        </select>

        <!-- Genre Filter -->
        <label for="genre" class="text-red-200 font-semi-bold text-2xl self-center">Genre:</label>
        <select id="genre" v-model="selectedGenre"
          class="w-32 border p-2 rounded-lg bg-slate-900 text-center text-xl font-mono text-red-200 border-red-200">
          <option value="">All</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
        </select>

        <!-- Year Filter -->
        <label for="year" class="text-red-200 font-semi-bold text-2xl self-center">Year:</label>
        <input type="text" id="year" v-model="selectedYear"
          class="w-32 border p-2 rounded-lg bg-slate-900 text-center text-xl font-mono text-red-200 border-red-200" /><!-- ... (rest of the filters section remains unchanged) ... -->

        <button @click="applyFilters" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Apply Changes
        </button>
      </div>
    </div>

    <div class="mt-28 movies bg-slate-800 content p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
      <div
        class="flex flex-col justify-stretch gap-3 pb-1 items-center"
        v-for="movie in filteredMovies" :key="movie.id">
        <router-link :to="{ name: 'overview', params: { id: movie.id } }" class="bg-slate-700 rounded-xl hover:opacity-75 hover:scale-105 transition-all ease-in duration-300">
          <img v-if="getMoviePosterURL(movie.poster_path)!==''" :src="getMoviePosterURL(movie.poster_path)" alt="Movie Poster" class="rounded-lg shadow-lg w-96 h-auto" />
          <img v-else src="https://cdn.download.it/ms/static/images/poster-placeholder.png" class="rounded-lg shadow-lg w-96 h-auto "/>
        </router-link>
        <div class="text-center">
          <h3 class="mt-4 text-red-200 text-xl font-serif font-semibold">{{ movie.title }}</h3>
          <p class="text-gray-200 font-mono text-lg">IMDB Rating: {{ movie.vote_average }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_KEY = '1dc8f67cb5ee2d801ef91ff145b4c3a9';

export default {
  data() {
    return {
      selectedLanguage: '',
      selectedGenre: '',
      selectedYear: '',
      movies: [],
      languages: [
        { name: 'English', code: 'en' },
        { name: 'Bengali', code: 'bn' },
        { name: 'Hindi', code: 'hi' },
        { name: 'Espanol', code: 'es' },
        { name: 'French', code: 'fr' },
        { name: 'Japanese', code: 'ja' },
        { name: 'Arabic', code: 'ar' },
        { name: 'Russian', code: 'ru' },
        { name: 'Korean', code: 'ko' },
      ],
      genres: [],
      showButton: true,
      loading: false,
      page: 1,
    };
  },
  computed: {
    filteredMovies() {
      let filtered = this.movies;

      if (this.selectedLanguage) {
        filtered = filtered.filter((movie) => movie.original_language === this.selectedLanguage);
      }

      if (this.selectedGenre) {
        filtered = filtered.filter((movie) => movie.genre_ids.includes(Number(this.selectedGenre)));
      }

      if (this.selectedYear) {
        filtered = filtered.filter((movie) => movie.release_date && movie.release_date.includes(this.selectedYear));
      }

      return filtered.slice(0, this.page * 20); // Show results up to current page * 20
    },
  },
  methods: {
    async handleScroll() {
      const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.fetchMoreMovies();
      }
    },

    async applyFilters() {
      try {
        this.loading = true;

        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: API_KEY,
            language: this.selectedLanguage || 'en-US',
            with_original_language: this.selectedLanguage || '',
            with_genres: this.selectedGenre || '',
            primary_release_year: this.selectedYear || '',
            sort_by: 'popularity.desc',
            include_adult: false,
            include_video: true,
            page: 1,
          },
        });

        this.movies = response.data.results.slice(0, 20);
        this.showButton = false;
        this.page = 1;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchMoreMovies() {
      if (this.loading) {
        return;
      }

      try {
        this.loading = true;

        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: API_KEY,
            language: this.selectedLanguage || 'en-US',
            with_original_language: this.selectedLanguage || '',
            with_genres: this.selectedGenre || '',
            primary_release_year: this.selectedYear || '',
            sort_by: 'popularity.desc',
            include_adult: false,
            include_video: true,
            page: this.page + 1,
          },
        });

        this.movies = [...this.movies, ...response.data.results.slice(0, 20)];
        this.page++;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    getMoviePosterURL(posterPath) {
      if (!posterPath) {
        return '';
      }
      return `https://image.tmdb.org/t/p/w780${posterPath}`;
    },

    async fetchGenres() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        this.genres = response.data.genres;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchLatestMovies() {
      try {
        this.loading = true;

        const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
          params: {
            api_key: API_KEY,
            language: this.selectedLanguage || 'en-US',
            page: 1,
          },
        });

        this.movies = response.data.results.slice(0, 20);
        this.showButton = false;
        this.page = 1;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },

  created() {
    this.fetchLatestMovies();
    this.fetchGenres();
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
.filters {
  width: fit-content;
}

/* ... (existing styles remain unchanged) ... */
</style>
