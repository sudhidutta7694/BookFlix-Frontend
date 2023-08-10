import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
// import * as firebaseui from 'firebaseui';
// import 'firebaseui/dist/firebaseui.css';

// Initialize Firebase app
const firebaseConfig = {
    apiKey: "AIzaSyBMngDjuBc3wVzXpVvBXWS8oG1G_nw7SJM",
    authDomain: "book-my-show-clone-80092.firebaseapp.com",
    projectId: "book-my-show-clone-80092",
    storageBucket: "book-my-show-clone-80092.appspot.com",
    messagingSenderId: "495438649584",
    appId: "1:495438649584:web:846e1474aefa818b69ca35",
    measurementId: "G-SZNETQVS2J"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// const ui = new firebaseui.auth.AuthUI(auth);

export { app, analytics, db, auth };
export default firebase;

