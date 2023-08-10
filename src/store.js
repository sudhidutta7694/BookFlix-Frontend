import { defineStore } from 'pinia';
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

export const useStore = defineStore('store', {
  state: () => ({
    username: '',
    uid: '',
    userImage: '',
    favorites: [],
  }),
  actions: {
    // ... existing code
    setUserImage(image) {
      this.userImage = image;
      localStorage.setItem("userImage", this.userImage);

    },
    getUserImage() {
      return this.userImage;
    },
    async setUsername(username, uid) {
      this.username = username;
      this.uid = uid;
      const sessionData = { username, uid };

      // Update the username in Firestore
      const db = getFirestore();
      const userDoc = doc(db, 'users', uid);
      await setDoc(userDoc, { username });

      // Set the session data in Firestore
      const sessionDoc = doc(db, 'sessions', uid);
      await setDoc(sessionDoc, sessionData);

      // Store the username in local storage
      localStorage.setItem('username', username);
    },
    async clearUsername() {
      this.username = '';
      this.uid = '';

      // Remove the session data from Firestore
      const db = getFirestore();
      const sessionDoc = doc(db, 'sessions', this.uid);
      await deleteDoc(sessionDoc);
    },
    async initializeSession() {
      const db = getFirestore();
      const sessionDoc = doc(db, 'sessions', this.uid);
      const sessionSnapshot = await getDoc(sessionDoc);

      if (sessionSnapshot.exists()) {
        const sessionData = sessionSnapshot.data();
        this.username = sessionData.username;
        this.uid = sessionData.uid;

        const userDoc = doc(db, 'users', this.uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          this.favorites = userData.favorites || [];

          // Update the favorites in the Firestore database
          await setDoc(userDoc, { favorites: this.favorites }, { merge: true });
        }
      }
    },
    updateFavorites(favorites) {
      this.favorites = favorites;

      // Update the favorites in the Firestore database
      const db = getFirestore();
      const userDoc = doc(db, 'users', this.uid);
      setDoc(userDoc, { favorites }, { merge: true });
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
  },
  // Initialize the session when the store is created
  // This will ensure the username and favorites are set on page reload
  async onInit() {
    const storedUsername = localStorage.getItem('username');
    const storedFavorites = localStorage.getItem('favorites');

    if (storedUsername) {
      this.username = storedUsername;
    } else {
      await this.initializeSession();
    }

    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    } else {
      const db = getFirestore();
      const userDoc = doc(db, 'users', this.uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        this.favorites = userData.favorites || [];

        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      }
    }
  },
  // Save session data and favorites to localStorage on state change
  onStateChanged() {
    const sessionData = JSON.stringify({ username: this.username, uid: this.uid });
    localStorage.setItem('session', sessionData);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  },
});