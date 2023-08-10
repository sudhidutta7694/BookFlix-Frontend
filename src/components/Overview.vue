<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="bg-slate-800 flex flex-col justify-center items-center flex-center">
    <div class="mt-[-50px] sm:mt-0 w-[80vw] sm:w-[60vw] relative"> {{ playTrailer(movieId) }}
      <div
        class="trailer-player w-[80vw] sm:w-[60vw] rounded-2xl shadow-red-200 shadow-md hover:shadow-red-300 transition-colors hover:shadow-xl duration-300">

        <div class="player-wrapper rounded-2xl flex justify-center items-center w-[80vw] sm:w-[60vw]">
          <iframe class="w-[80vw] sm:w-[60vw]" v-if="videoUrl != ''" :src="videoUrl" frameborder="0"
            ref="videoPlayer"></iframe>
          <img class="w-[80vw] sm:w-[60vw]" v-else
            src="https://media.tenor.com/V9Z08mOcTJwAAAAC/this-content-is-not-available.gif" />
          <!-- <img v-else class="sm:w-[60vw]" src="https://media.tenor.com/V9Z08mOcTJwAAAAC/this-content-is-not-available.gif" /> -->
        </div>
      </div>
    </div>

    <div class="mt-5 container mx-auto flex border-b border-gray-500 pb-4 mx-30 items-center justify-center">
      <div class="ml-5 flex flex-col items-center justify-center gap-10">
        <div class="flex justify-between mt-6 w-[79vw] sm:w-[59vw]">
          <div class="flex flex-col">
            <p class="text-4xl font-bold font-serif text-red-300">{{ getMovieTitle(movieId) }}</p>
            <span class="text-slate-300 text-md font-mono">{{ getMovieDetails(movieId).votePercentage }}% | {{
              getMovieDetails(movieId).releaseDate }} | {{ getMovieDetails(movieId).genre }}</span>
          </div>
          <div v-if="!isFirebase" class="favorite-icon" @click="favoriteMovie(movieId)"
            :class="{ clicked: favorites.includes(movieId) }">
            <i class="fa"
              :class="['fa-heart', { 'fas': favorites.includes(movieId), 'far': !favorites.includes(movieId) }]"></i>
          </div>
          <div v-else class="favorite-icon" @click="favoriteMovie2(movieId)"
            :class="{ clicked: favorites.includes(movieId) }">
            <i class="fa"
              :class="['fa-heart', { 'fas': favorites.includes(movieId), 'far': !favorites.includes(movieId) }]"></i>
          </div>
        </div>

        <p class="mt-5 text-red-200 font-sans text-xl text-center w-[80vw] sm:w-[70vw]">
          {{ getMovieOverview(movieId) }}
        </p>
        <div class="mt-5 flex gap-3">
        </div>
      </div>
    </div>
    <div class="mt-12 mb-11 px-5 py-4 w-[80vw] text-center">
      <h1 v-if="castImages.length > 0" class="text-4xl font-bold font-serif text-red-300">Cast</h1>
      <h1 v-else class="text-4xl font-serif font-semibold text-red-400">Cast Information is unavailable</h1>
    </div>
    <div
      class="w-[80vw] border-b border-gray-500 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      <div v-for="(image, index) in castImages" :key="index" class="flex flex-col text-center">
        <img :src="getImageUrl(image.image)" alt="Actor"
          class="rounded-full mb-4 shadow:lg hover:opacity-75 hover:scale-105 transition-all ease-in" />
        <p v-if="image && image.name" class="text-gray-300 font-semibold"> {{ image.name }}</p>
        <p v-else class="text-gray-300 font-semibold">Unknown</p>
        <p v-if="image && image.role" class="text-gray-300 font-bold">as {{ image.role }} </p>
      </div>
    </div>
    <div class="px-5 py-4 ">
      <h1 v-if="movieImages.length > 0" class="mt-12 mb-11 text-4xl font-bold font-serif text-red-300">Images</h1>
      <h1 v-else class="text-4xl font-serif font-semibold text-red-400">Images are not available</h1>
    </div>
    <div class="w-[80vw] border-b border-gray-500 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="(image, index) in movieImages" :key="index">
        <img :src="getImageUrl(image)" alt="Image"
          class="rounded-xl shadow:lg hover:opacity-75 hover:scale-105  transition ease-in" />
      </div>
    </div>
  </div>
</template>


<script>
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue';
import {
  getFirestore,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
// import { app } from '@/firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useStore } from '@/store';
// import { useStore } from '@/store';

export default {
  props: ['id'],

  setup() {
    const isFirebase = ref(localStorage.getItem("user").startsWith("{"))
    const favorites = ref([]);
    let username = "";
    if (!isFirebase.value) username = localStorage.getItem("user");
    else {
      username = JSON.parse(localStorage.getItem("user")).uid
    }
    const db = getFirestore();

    async function favoriteMovie2(movieId) {
      // const { uid } = useStore(); // Get the Pinia store instance
      const user = JSON.parse(localStorage.getItem('user'))?.uid;

      console.log("User token is: ", user);
      if (user) {
        try {
          const favoritesData = {
            movieId: movieId
          };

          const favoritesCollectionRef = collection(db, 'Users', user, 'Favorites');
          console.log(favoritesCollectionRef);
          const favoriteDocRef = doc(favoritesCollectionRef, movieId.toString());
          console.log(favoriteDocRef);

          // Check if the movie is already favorited
          const favoriteDocSnapshot = await getDoc(favoriteDocRef);
          if (favoriteDocSnapshot.exists() && favoriteDocSnapshot.data().movieId === movieId) {
            // Movie is already favorited, remove it from favorites
            await deleteDoc(favoriteDocRef);
            favorites.value = favorites.value.filter(id => id !== movieId);
          } else {
            // Movie is not favorited, add it to favorites
            await setDoc(favoriteDocRef, favoritesData);
            favorites.value.push(movieId);
          }

          // Update the favorites in the Pinia store
          const store = useStore();
          store.updateFavorites(favorites.value);
        } catch (error) {
          console.log('Error updating favorite movie:', error);
        }
      } else {
        // User is not logged in, prompt them to log in
        Swal.fire({
          text: 'An Error Occured. Please try again!',
          icon: 'error'
        });
      }
    }
    // Fetch favorite movies for the authenticated user
    const fetchFavoriteMovies2 = (userId) => {
      const favoritesCollectionRef = collection(db, `Users/${userId}/Favorites`);
      onSnapshot(favoritesCollectionRef, (querySnapshot) => {
        const favoritesData = [];
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            const favoriteData = doc.data();
            favoritesData.push(favoriteData.movieId);
          }
        });
        favorites.value = favoritesData; // Update the favorites ref with the retrieved data
        localStorage.setItem('favorites', favorites.value.toString());
        console.log('Favorites retrieved successfully!\nFavorites:', favorites.value);
      });
    };

    // Handle authentication state changes
    onMounted(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, () => {

        const userId = JSON.parse(localStorage.getItem('user'))?.uid
        fetchFavoriteMovies2(userId);

      });
    });

    // Initialize the Firestore database

    async function favoriteMovie(movieId) {

      if (!username) {
        Swal.fire({
          text: 'Please log in to toggle favorites.',
          icon: 'error',
        });
        return;
      }

      try {
        const response = await fetch('http://localhost:5173/toggle-favorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            movieId: movieId,
          }),
        });

        const data = await response.json();

        if (data.success) {
          console.log("Favorites toggled")
          fetchFavoriteMovies()
        } else {
          Swal.fire({
            text: 'An error occurred. Please try again!',
            icon: 'error',
          });
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
        Swal.fire({
          text: 'An error occurred. Please try again!',
          icon: 'error',
        });
      }
    }

    // Handle authentication state changes
    async function fetchFavoriteMovies() {
      try {
        const response = await fetch(`http://localhost:5173/get-favorite-movies/${username}`);
        const data = await response.json();
        if (data.success) {
          console.log(data.favoriteMovies);
          favorites.value = data.favoriteMovies;
          // favorites.value.push(data.favoriteMovies)
          console.log('Favorites: ', favorites.value);
        } else {
          console.error('Failed to fetch favorite movies');
        }
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    }

    if (!isFirebase.value) fetchFavoriteMovies();



    return {
      isFirebase,
      favorites,
      favoriteMovie,
      favoriteMovie2
    };
  },

  data() {
    return {
      movieId: null,
      movies: [],
      castImages: [],
      movieImages: [],
      showPlayer: false,
      Player: true,
      videoUrl: '',
    };
  },

  mounted() {
    this.movieId = this.id;
    fetch(
      `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        this.movies = data;
        console.log(data); // Display the response in the console
        const movieDetails = this.getMovieDetails(this.movieId);
        console.log(movieDetails);
        this.getMovieImages(this.movieId); // Fetch cast images
        this.getWriter(this.movieId); // Fetch cast images
        this.getExecutiveProducer(this.movieId); // Fetch cast images
        this.getCastImages(this.movieId); // Fetch cast images
        this.playTrailer(this.movieId);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  },

  created() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },

  methods: {
    getMovieDetails() {
      const movie = this.movies;
      if (movie && movie.genres) { // Add a check for the existence of genres property
        const votePercentage = (movie.vote_average * 10).toFixed(2);
        const releaseDate = movie.release_date;
        const genre = movie.genres.map((genre) => genre.name).join(', ');
        return {
          votePercentage,
          releaseDate,
          genre
        };
      }
      return {
        votePercentage: '',
        releaseDate: '',
        genre: ''
      };
    },

    getMovieTitle() {
      const movie = this.movies;
      return movie ? movie.original_title : '';
    },

    getMovieOverview() {
      const movie = this.movies;
      return movie ? movie.overview : '';
    },

    getWriter() {
      const movie = this.movies;
      if (movie && movie.credits && movie.credits.crew) {
        const writer = movie.credits.crew.find((member) => member.job === 'Writer');
        return writer ? writer.name : '';
      }
      return '';
    },

    getExecutiveProducer() {
      const movie = this.movies;
      if (movie && movie.credits && movie.credits.crew) {
        const executiveProducer = movie.credits.crew.find(
          (member) => member.job === 'Executive Producer'
        );
        return executiveProducer ? executiveProducer.name : '';
      }
      return '';
    },

    getCastImages(movieId) {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9`
      )
        .then((response) => response.json())
        .then((data) => {
          const cast = data.cast;
          this.castImages = cast
            .filter((member) => member.profile_path !== null)
            .map((member) => ({
              name: member.name,
              role: member.character,
              image: `https://image.tmdb.org/t/p/w200/${member.profile_path}`
            })).slice(0, 6);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },

    getMovieImages(movieId) {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9`
      )
        .then((response) => response.json())
        .then((data) => {
          const images = data.backdrops.map((image) => image.file_path);
          // Store the images in the movieImages array
          this.movieImages = images.slice(0, 6);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },

    getImageUrl(imagePath) {
      if (imagePath) {
        return `https://image.tmdb.org/t/p/w780${imagePath}`;
      }
      return 'https://via.placeholder.com/500x750.png?text=No+Image+Available';
    },

    playTrailer(id) {
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9`)
        .then((response) => response.json())
        .then((data) => {
          const trailer = data.results.find((video) => video.type === 'Trailer');
          const videoPlayer = this.$refs.videoPlayer;
          if (trailer) {
            const videoKey = trailer.key;
            this.videoUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1&controls=1&modestbranding=1`;
            this.showPlayer = true;

            videoPlayer.onload = () => {
              const playerWindow = videoPlayer.contentWindow;
              if (playerWindow && playerWindow.postMessage) {
                playerWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                playerWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
              }
            };
          } else {
            console.log('No trailer available for this movie.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  },
};
</script>


<style scoped>
.trailer-player {
  margin-top: 160px;
  position: relative;
  padding-top: 56.25%;
  border: 2px solid rgb(244, 115, 115);
  border-radius: 40px;
  /* 16:9 aspect ratio */
  overflow: hidden;
}

.player-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.player-wrapper iframe {
  width: 100%;
  height: 100%;
}

.favorite-icon {
  border-radius: 100px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.favorite-icon .fa {
  font-size: 30px;
  color: red;
  transition: all 0.3s ease-out;
}

.favorite-icon .fa.fas {
  font-size: 33px;
  color: red;
}

.favorite-icon .fa.far {
  color: rgba(255, 255, 255, 0.8);
}

.favorite-icon:hover .fa.far {
  color: red;
}
</style>
