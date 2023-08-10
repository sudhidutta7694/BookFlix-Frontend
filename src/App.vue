<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router'
import Headers from './components/Headers.vue';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, collection, getDocs } from 'firebase/firestore';

const isLoading = ref(true);

onMounted(async () => {
  // Simulate loading delay
  setTimeout(async () => {
    isLoading.value = false; // Set isLoading to false after the delay to hide the loading GIF
    
    // Check if the user is signed in or logged in
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      // User is signed in or logged in, fetch data from Firestore
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      // const userSnapshot = await getDoc(userRef);
      // const userData = userSnapshot.data();
      
      // Store user data in localStorage as separate key-value pairs
      // for (const [key, value] of Object.entries(userData)) {
      //   localStorage.setItem(key, value);
      // }
      
      // Fetch favorites and bookings documents
      const favoritesRef = collection(userRef, 'favorites');
      const bookingsRef = collection(userRef, 'bookings');
      
      const favoritesSnapshot = await getDocs(favoritesRef);
      const favoritesData = favoritesSnapshot.docs.map(doc => doc.data());
      
      const bookingsSnapshot = await getDocs(bookingsRef);
      const bookingsData = bookingsSnapshot.docs.map(doc => doc.data());
      
      // Store favorites and bookings data in localStorage
      localStorage.setItem('favorites', JSON.stringify(favoritesData));
      localStorage.setItem('bookings', JSON.stringify(bookingsData));
    }
  }, 2000); // Adjust the delay time as needed
});
</script>

<!-- Rest of the code remains the same -->


<!-- Rest of the code remains the same -->


<template>
  <div>
    <div v-if="isLoading" class="bg-slate-900 flex justify-center items-center min-h-screen">
      <img src="https://cdn.dribbble.com/users/121337/screenshots/916951/small-load.gif" alt="Loading" />
    </div>
    <Headers v-else />
    <Router-view v-if="!isLoading" />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    RouterView,
    Headers,
  },
};
</script>
