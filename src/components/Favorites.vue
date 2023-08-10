<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="bg-slate-900 min-h-screen">
        <div class="flex flex-col mt-32 p-2 pt-6 justify-center items-center">
            <!-- <p class="text-red-300 pl-3 text-3xl font-serif font-bold">Favorited Movies:</p> -->
            <div v-if="loading" class="flex justify-center items-center">
                <img class="mt-32 w-64" src="https://cdn.dribbble.com/users/121337/screenshots/916951/small-load.gif"
                    alt="Loading ..." />
            </div>

            <div v-else class="bg-slate-900 px-3 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                <div class="flex flex-col justify-stretch gap-3 items-center" v-for="(favorite, index) in favorites"
                    :key="favorite">
                    <div class="relative">
                        <router-link :to="{ name: 'overview', params: { id: favorite } }"
                            class="bg-slate-700 rounded-xl hover:opacity-75 hover:scale-105 transition-all ease-in duration-300">
                            <img v-if="getMoviePosterUrl(favorite) !== ''" :src="getMoviePosterUrl(favorite)"
                                alt="Movie Poster" class="rounded-lg shadow-lg w-96 h-auto" />
                            <img v-else src="https://cdn.download.it/ms/static/images/poster-placeholder.png"
                                class="rounded-lg shadow-lg w-96 h-auto " />
                        </router-link>
                    </div>
                    <div class="text-center">
                        <h3 class="mt-4 text-red-200 text-xl font-serif font-semibold mb-1">{{ movieTitles[index] }}</h3>
                        <p class="text-gray-200 font-mono text-lg">IMDB Rating: {{ movieRatings[index] }}</p>
                    </div>
                </div>
            </div>

            <p v-if="!loading && favorites.length === 0"
                class="text-center mt-[49vh] text-red-200 text-3xl font-serif italic shadow-lg">
                There are no favorited movies yet!
            </p>
        </div>
    </div>
</template>
  
<script>
import { ref, onMounted, watch } from 'vue';
// import { app } from '@/firebase';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

export default {
    setup() {
        const isFirebase = ref(localStorage.getItem("user").startsWith("{"));
        const favorites = ref([]);
        const loading = ref(true);
        const API_KEY = '1dc8f67cb5ee2d801ef91ff145b4c3a9';
        const movieDetails = ref(null);
        const moviePosterUrls = ref({});

        async function fetchFavoriteMovies(username) {
            try {
                if (!isFirebase.value) {
                    const response = await fetch(`http://localhost:5173/get-favorite-movies/${username}`);
                    const data = await response.json();
                    if (data.success) {
                        console.log(data.favoriteMovies);
                        data.favoriteMovies.map((movieId) => fetchMoviePoster(movieId));
                        favorites.value = data.favoriteMovies;
                        // favorites.value.push(data.favoriteMovies)
                        console.log('Favorites: ', favorites.value);
                    } else {
                        console.error('Failed to fetch favorite movies');
                    }
                }
                else {
                    const db = getFirestore();
                    const favoritesCollectionRef = collection(db, `Users/${username}/Favorites`);
                    onSnapshot(favoritesCollectionRef, (querySnapshot) => {
                        const favoritesData = [];
                        querySnapshot.forEach((doc) => {
                            if (doc.exists()) {
                                const favoriteData = doc.data();
                                favoritesData.push(favoriteData.movieId);
                                fetchMoviePoster(favoriteData.movieId);
                            }
                        });
                        favorites.value = favoritesData; // Update the favorites ref with the retrieved data
                        console.log('Favorites retrieved successfully!\nFavorites:', favorites.value);
                    })
                }
            } catch (error) {
                    console.error('Error fetching favorite movies:', error);
                }
            }

        const fetchMovieDetails = async (movieId) => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
                    if (response.ok) {
                        const data = await response.json();
                        movieDetails.value = data;
                        return data;
                    } else {
                        throw new Error('Failed to fetch movie details');
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    loading.value = false;
                }
            };


            const fetchMoviePoster = async (movieId) => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
                    if (response.ok) {
                        const data = await response.json();
                        const posterPath = data.poster_path;
                        const posterUrl = `https://image.tmdb.org/t/p/w780${posterPath}`;
                        moviePosterUrls.value = { ...moviePosterUrls.value, [movieId]: posterUrl }; // Update the reactive object with the fetched poster URL
                    } else {
                        throw new Error('Failed to fetch movie poster');
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            const getMoviePosterUrl = (movieId) => {
                return moviePosterUrls.value[movieId] || '';
            };

            const movieTitles = ref([]);
            const movieRatings = ref([]);

            // Watch for changes in favorites and update movieTitles and movieRatings accordingly
            watch(favorites, async () => {
                loading.value = true;
                const titles = [];
                const ratings = [];
                for (const favorite of favorites.value) {
                    const title = await fetchMovieTitle(favorite);
                    const rating = await fetchMovieRating(favorite);
                    titles.push(title);
                    ratings.push(rating);
                }
                movieTitles.value = titles;
                movieRatings.value = ratings;
                loading.value = false;
            });

            //   console.log(movieTitles)

            const fetchMovieTitle = async (movieId) => {
                let movieDetails = null; // Local variable to store movie details for each movie
                if (!movieDetails) {
                    movieDetails = await fetchMovieDetails(movieId);
                }
                return movieDetails?.title || '';
            };

            const fetchMovieRating = async (movieId) => {
                let movieDetails = null; // Local variable to store movie details for each movie
                if (!movieDetails) {
                    movieDetails = await fetchMovieDetails(movieId);
                }
                return movieDetails?.vote_average || '';
            };

            // Handle authentication state changes
            onMounted(() => {
                const auth = getAuth();
                onAuthStateChanged(auth, () => {
                    // const userId = JSON.parse(localStorage.getItem('user'))?.uid || localStorage.getItem('access_token');
                    let username = "";
                    if (!isFirebase.value) username = localStorage.getItem('user');
                    else username = JSON.parse(localStorage.getItem('user'))?.uid
                    fetchFavoriteMovies(username);
                });
            });

            const allMoviePostersFetched = ref(false);

            watch(moviePosterUrls, () => {
                allMoviePostersFetched.value = favorites.value.every((favorite) => {
                    return Object.prototype.hasOwnProperty.call(moviePosterUrls.value, favorite);
                });
            });

            return {
                // fetchMoviePoster,
                isFirebase,
                favorites,
                loading,
                movieDetails,
                getMoviePosterUrl,
                movieTitles,
                movieRatings,
                allMoviePostersFetched,
            };
        },
    };
</script>
  
<style lang="scss" scoped></style>
  