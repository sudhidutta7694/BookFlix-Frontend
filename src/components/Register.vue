<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="signup-1 colour flex items-center h-screen md:h-screen relative transition-all ease-in duration-300">
    <div class="overlay absolute inset-0 z-0 bg-slate-800 opacity-50"></div>
    <div class="container px-4 mx-auto relative z-10">
      <div class="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
        <div
          class="box backdrop-blur backdrop-brightness-50 opacity-90 hover:opacity-100 p-6 md:px-12 md:pt-12 border-t-10 border-solid border-red-700">
          <h2 class="text-3xl color text-center">Create Your Account</h2>

          <form @submit.prevent="handleSubmit" class="signup-form mt-6 md:mt-12">
            <!-- <div v-if="isUserAlreadyRegistered" class="text-center mt-6 md:mt-12">
              <p class="text-red-600">User is already registered. Please <router-link to="/login"
                  class="text-red-600 hover:underline">Log In</router-link>.</p>
            </div> -->

            <div v-if="!isUserAlreadyRegistered" class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="far fa-user color"></span>
              </div>
              <div class="flex-1">
                <input type="text" v-model="username" placeholder="Username" pattern="^[A-Za-z0-9]{3,}$"
                  class="pl-3 h-10 colour text-red-700 font-mono font-semibold font-lg py-1 pr-3 w-full" required>
              </div>
            </div>
            <div v-else class="border-4 border-red-700 border-solid rounded-lg flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas fa-exclamation-triangle text-red-500"></span>
              </div>
              <div class="flex-1">
                <input type="text" v-model="username" placeholder="Username" pattern="^[A-Za-z0-9]{3,}$"
                  class="pl-3 h-10 colour text-red-700 font-mono font-semibold font-lg py-1 pr-3 w-full" required>
              </div>
            </div>
            <p v-if="isUserAlreadyRegistered" class="text-red-300 mt-[-10px] mb-3 text-sm font-mono">Username is already
              registered. Please <router-link to="/login" class="hover:underline hover:text-red-400">Log In</router-link>.
            </p>

            <div v-if="!isEmailAlreadyRegistered" class="border-2 border-solid rounded-lg flex items-center mb-4">

              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="far fa-envelope color "></span>
              </div>
              <div class="flex-1">
                <input type="text" v-model="email" placeholder="E-mail" pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  class="pl-3 h-10 colour text-red-700 font-mono font-semibold font-lg py-1 pr-3 w-full" required>
              </div>
            </div>

            <div v-else class="border-4 border-red-700 border-solid rounded flex items-center mb-4">

              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas fa-exclamation-triangle text-red-500"></span>
              </div>
              <div class="flex-1">
                <input type="text" v-model="email" placeholder="E-mail" pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  class="pl-3 h-10 colour text-red-700 font-mono font-semibold font-lg py-1 pr-3 w-full" required>
              </div>
            </div>
            <p v-if="isEmailAlreadyRegistered" class="text-red-300 mt-[-10px] mb-3 text-sm font-mono">Email is
              already registered. Please <router-link to="/login" class="hover:underline hover:text-red-400">Log
                In</router-link>.</p>

            <div class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas fa-asterisk color"></span>
              </div>
              <div class="flex-1">
                <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                  class="pl-3 h-10 colour text-red-700 font-mono font-semibold font-lg py-1 pr-3 w-full" required>
              </div>
              <button type="button" class="eye-button color" @click="showPassword = !showPassword">
                <i class="color" :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>

            <div class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas color fa-asterisk"></span>
              </div>
              <div class="flex-1">
                <input :type="showPassword ? 'text' : 'password'" placeholder="Confirm Password" v-model="confirmPassword"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                  class="pl-3 h-10 colour text-red-700 font-mono font-semibold font-lg py-1 pr-3 w-full" required>
              </div>
              <button type="button" class="eye-button color" @click="showPassword = !showPassword">
                <i class="color" :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>

            <p class="text-sm text-center color mt-6">By signing up, you agree to our <RouterLink to="/terms" href="#"
                class="text-red-600 hover:underline">Terms</RouterLink> and <RouterLink to="/terms" href="#"
                class="text-red-600 hover:underline">Privacy Policy</RouterLink>
            </p>

            <div class="text-center mt-6 md:mt-12">
              <button
                class="bg-red-700 hover:bg-red-800 color text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300">Sign
                Up <span class="far color fa-paper-plane ml-2"></span></button>
            </div>

          </form>
          <div class="text-center mt-6">
            <button
              class="bg-red-700 hover:bg-red-800 color text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300"
              @click="googleSignUp">
              Sign Up with Google <span class="fab color fa-google ml-2"></span>
            </button>
          </div>

          <div class="border-t border-solid color border-orange-200 mt-6 md:mt-12 pt-4">
            <p class="color text-center">Already have an account, <a href="#"
                class="text-red-600 hover:underline"><router-link to="/login">Log In</router-link></a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import swal from 'sweetalert2'
import { ref, onMounted } from 'vue';
import { app } from '@/firebase';
import { useRouter } from 'vue-router';
import { collection, doc, setDoc, getFirestore, getDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
// import { storeToRefs } from 'pinia';
// import { useStore } from '@/store';

const showPassword = ref(false);
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();
const isUserAlreadyRegistered = ref(false);
const isEmailAlreadyRegistered = ref(false);
const auth = getAuth(app)
// const store = useStore();
onMounted(() => {
  if (localStorage.getItem('user')) {
    router.push('/home');
  }
});

const handleSubmit = () => {
  if (username.value !== '' && email.value !== '' && password.value !== '' && confirmPassword.value !== '' && password.value === confirmPassword.value) {
    fetch("http://localhost:5173/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "userRegister");
        if (data.status == "ok") {
          console.log("Registration Successful");
          swal.fire({
            title: "Register Successful",
            html: "The user has been  successfully registered",
            icon: "success"
          })
          router.push("/login");
          // const newUser = {
          //   displayName: username.value,
          //   email: email.value,
          // };
          // localStorage.setItem('user', JSON.stringify(newUser))
          // console.log('User data stored successfully. Document ID:', data._id)
          // localStorage.setItem("access_token", JSON.stringify(data._id))
          // router.push('/home')
        } else if (data.error2 == "Username Exists") {
          isUserAlreadyRegistered.value = true
        } if (data.error1 == "Email Exists") {
          isEmailAlreadyRegistered.value = true
        } else if (data.error2 != "Username Exists") {
          console.log(data.error)
          // swal.fire({
          //   title: "Something went wrong!",
          //   icon: "error"
          // })
        }
      });
  } else if (password.value !== confirmPassword.value) {
    swal.fire({
      title: "Confirm Password",
      html: "Password and confirm Password must be the same",
      icon: "info"
    })
  } else if (username.value === '') {
    swal.fire({
      title: "Empty Username Field",
      html: "Username must not be empty",
      icon: "info"
    })
  }
}


const googleSignUp = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    localStorage.setItem("access_token", JSON.stringify(token));
    const user = result.user;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userImage", JSON.parse(localStorage.getItem("user")).photoURL);
    // Redirect or perform other actions
    router.push("/home");

    const firestore = getFirestore();
    const usersCollectionRef = collection(firestore, "Users");
    const userDocRef = doc(usersCollectionRef, user.uid);

    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      // Create the user document in Firestore if it doesn't exist
      await setDoc(userDocRef, {
        name: user.displayName,
        email: user.email,
        // Add more fields as needed
      });
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, ": ", errorMessage);
    const email = error.customData.email;
    console.log("Email: ", email);
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log("AuthCredential: ", credential);
    // Handle error
  }
};



</script>

<style scoped>
input ::placeholder {
  color: #FF0000
}

.colour {
  background-color: #ffcd96;
}

.color {
  color: #ffcd96;
}

.signup-1 {
  z-index: 1000;
  background-image: url("../assets/true-story-movies-2019-1550256450.gif");
  background-size: cover;
  background-position: center;
}

.box {
  border-radius: 2rem;
}

.border-t-10 {
  border-top-width: 10px;
}

.slide-in-out-enter-active,
.slide-in-out-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-in-out-enter {
  transform: translateX(100%);
}

.slide-in-out-leave-to {
  transform: translateX(100%);
}

.eye-button {
  width: 40px;
}

.eye-button i {
  font-size: 1rem;
  color: #999;
}
</style>
