import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../src/assets/main.css';
import { createPinia } from 'pinia';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Add your Firebase project configuration here
  apiKey: "AIzaSyBMngDjuBc3wVzXpVvBXWS8oG1G_nw7SJM",
  authDomain: "book-my-show-clone-80092.firebaseapp.com",
  projectId: "book-my-show-clone-80092",
  storageBucket: "book-my-show-clone-80092.appspot.com",
  messagingSenderId: "495438649584",
  appId: "1:495438649584:web:846e1474aefa818b69ca35",
  measurementId: "G-SZNETQVS2J"
};

const createMyApp = async () => {
  const app = createApp(App);
  const pinia = createPinia();

  const firebaseApp = await initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);

  app.use(router).use(pinia);
  app.config.productionTip = false;
  app.config.globalProperties.$db = db;

  return app;
};

createMyApp().then(app => {
  app.mount('#app');
});
