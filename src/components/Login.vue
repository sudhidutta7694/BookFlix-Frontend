<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-1 bg-white flex items-center relative h-screen">
    <div class="overlay absolute inset-0 z-0 bg-slate-800 opacity-50"></div>
    <div class="container px-4 mx-auto relative z-10 transition-all ease-in duration-300">
      <div class="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto transition-all ease-in duration-300">
        <div
          class="box backdrop-blur backdrop-brightness-50 opacity-90 hover:opacity-100 p-6 md:px-12 md:pt-12 border-t-10 border-solid border-red-700 transition-all ease-in duration-300">
          <h2 v-if="!showForgotPasswordSection" class="text-3xl color text-center">Login</h2>

          <h2 v-else class="text-3xl color text-center">Reset Password</h2>

          <form @submit.prevent="handleLogin" class="login-form mt-6 md:mt-12">
            <div v-if="!showForgotPasswordSection" class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="far fa-envelope color"></span>
              </div>
              <div class="flex-1">
                <input type="text" v-model="userInfo" placeholder="Enter your Email / Username"
                  class="p-4 h-10 colour text-red-700 font-mono font-semibold py-1 pr-3 w-full" required />
              </div>
            </div>

            <div v-if="!showForgotPasswordSection" class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas fa-asterisk color"></span>
              </div>
              <div class="flex-1">
                <input v-model="password" placeholder="Enter your Password" :type="showPassword ? 'text' : 'password'"
                  class="p-4 h-10 colour text-red-700 font-mono font-semibold py-1 pr-3 w-full"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" required />
              </div>
              <button type="button" class="eye-button color" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>

            <div v-if="showForgotPasswordSection && !(showOTP)"
              class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas fa-question-circle color"></span>
              </div>
              <div class="flex-1">
                <input v-model="forgotEmail" placeholder="Enter your E-mail"
                  class="p-4 h-10 colour text-red-700 font-mono font-semibold py-1 pr-3 w-full" />
              </div>
            </div>

            <div v-if="showForgotPasswordSection && showOTP && !verifiedOTP"
              class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas fa-question-circle color"></span>
              </div>
              <div class="flex-1">
                <input v-model="OTP" placeholder="Enter your OTP"
                  class="p-4 h-10 colour text-red-700 font-mono font-semibold py-1 pr-3 w-full" />
              </div>
            </div>

            <div v-if="verifiedOTP" class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas fa-asterisk color"></span>
              </div>
              <div class="flex-1">
                <input v-model="newPassword" placeholder="Enter your Password" :type="showPassword ? 'text' : 'password'"
                  class="p-4 h-10 colour text-red-700 font-mono font-semibold py-1 pr-3 w-full"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" required />
              </div>
              <button type="button" class="eye-button color" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>

            <div v-if="verifiedOTP" class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas fa-asterisk color"></span>
              </div>
              <div class="flex-1">
                <input v-model="confirmNewPassword" placeholder="Enter your Password"
                  :type="showPassword ? 'text' : 'password'"
                  class="p-4 h-10 colour text-red-700 font-mono font-semibold py-1 pr-3 w-full"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" required />
              </div>
              <button type="button" class="eye-button color" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>

            <p v-if="!showForgotPasswordSection" class="text-sm text-center color mt-6">
              <a href="#" class="text-red-600 hover:underline" @click="toggleForgotPasswordSection">Forgot Password?</a>
            </p>

            <div v-if="showForgotPasswordSection && !(showOTP)" class="text-center mt-6">
              <button type="button"
                class="bg-red-700 hover:bg-red-800 color text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300"
                @click="sendResetLink">
                Send OTP<span class="fas fa-key ml-2 color"></span>
              </button>
            </div>

            <div v-if="showForgotPasswordSection && showOTP && !(verifiedOTP)" class="text-center mt-6">
              <button type="button"
                class="bg-red-700 hover:bg-red-800 color text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300"
                @click="verifyOTP">
                Verify OTP<span class="fas fa-key ml-2 color"></span>
              </button>
            </div>

            <div v-if="showForgotPasswordSection && (showOTP) && verifiedOTP" class="text-center mt-6">
              <button type="button"
                class="bg-red-700 hover:bg-red-800 color text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300"
                @click="resetPassword">
                Reset Password<span class="fas fa-key ml-2 color"></span>
              </button>
            </div>

            <div class="text-center mt-6 md:mt-12">
              <button type="submit" v-if="!showForgotPasswordSection"
                class="bg-red-700 hover:bg-red-800 color text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300">
                Log In<span class="far fa-paper-plane color ml-2"></span>
              </button>
            </div>

          </form>
          <!-- Sign in with Google button -->
          <div class="text-center mt-6">
            <button v-if="!showForgotPasswordSection"
              class="bg-red-700 hover:bg-red-800 color text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300"
              @click="handleSigninWithGoogle">
              Sign In with Google <span class="fab fa-google color ml-2"></span>
            </button>
          </div>

          <div class="border-t border-solid mt-6 md:mt-12 color pt-4">
            <p class="color text-center">
              Don't have an account? <router-link to="/" class="text-red-600 hover:underline">Sign Up</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, setDoc, getDoc, doc, getFirestore } from 'firebase/firestore';
import { app } from '@/firebase'; // Assuming you have already set up Firebase in your project
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';
// import { forgotPassword } from '@/services/api';
// import { useStore } from '@/store';

export default {
  data() {
    return {
      showPassword: false,
    };
  },
  setup() {
    const userInfo = ref('');
    const password = ref('');
    const router = useRouter();
    // const store = useStore();
    const showOTP = ref(false);
    const OTP = ref(null);
    const showForgotPasswordSection = ref(false);
    const forgotEmail = ref('');
    const auth = getAuth(app)
    const newPassword = ref('');
    const confirmNewPassword = ref('');
    const verifiedOTP = ref(false);

    const verifyOTP = async () => {
      try {
        const response = await fetch('https://bookmyshow-database.onrender.com/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: OTP.value,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data.message);
          verifiedOTP.value = true;
           Swal.fire({
            title: 'OTP Verification Successful',
            text: data.message,
            icon: 'success',
          });
          // Set a variable or state indicating that OTP is verified
          // Redirect to the reset password page or show a new form
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          title: 'An error occurred',
          html: 'Invalid OTP',
          icon: 'error',
        })
      }
    }


    const resetPassword = async () => {
      try {
        if (newPassword.value == confirmNewPassword.value) {
          const response = await fetch('https://bookmyshow-database.onrender.com/reset-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // token: OTP.value,
              newPassword: newPassword.value,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }

          const data = await response.json();
          // alert(data.message);
          Swal.fire({
            title: data.message,
            // text: ,
            icon: 'success',
          });
          showForgotPasswordSection.value = false;
          verifiedOTP.value = false;
          showOTP.value = false;
        } else {
          Swal.fire({
            title: 'An error occurred',
            html: 'Password and confirm password must be same',
            icon: 'error',
          })
        }
        // Redirect to login or another page
      } catch (error) {
        alert(error.message);
      }
    }
    const toggleForgotPasswordSection = () => {
      showForgotPasswordSection.value = !showForgotPasswordSection.value;
    };
    const sendResetLink = async () => {
      try {
        const response = await fetch('https://bookmyshow-database.onrender.com/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: forgotEmail.value }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        console.log(data.message);
        showOTP.value = true;
        Swal.fire({
            title: 'Password Reset Email Sent',
            text: data.message,
            icon: 'success',
          });
      } catch (error) {
        console.log(error.message);
        Swal.fire({
          title: 'An error occurred',
          html: 'The user is not registered',
          icon: 'error',
        })
      }
    };

    // const handleForgotPassword = () => {
    //   try {
    //     // const auth = getAuth(app);
    //     const email = forgotEmail.value;

    //     // Send the password reset email
    //     // await sendResetLink(email)
    //     // await sendPasswordResetEmail(auth, email);

    //     // Password reset email sent successfully
    //     const resetLink = 'https://mail.google.com'; // Replace with your actual password reset link

    //     // Display SweetAlert with a clickable link
    //     Swal.fire({
    //       title: 'Password Reset Email Sent',
    //       html: `Password reset email sent. Please check your inbox. Click <a href="${resetLink}" target="_blank" style="color: blue; text-decoration: underline;">here</a> to reset your password.`,
    //       icon: 'success',
    //     });

    //     // Clear the input field
    //     forgotEmail.value = '';

    //     // Hide the forgot password section
    //     showForgotPasswordSection.value = false;
    //   } catch (error) {
    //     console.error('Error sending password reset email:', error);
    //     // alert('Failed to send password reset email. Please try again.');
    //     Swal.fire({
    //       title: 'Failed to send password reset email.',
    //       html: 'Please crosscheck the email',
    //       icon: 'error',
    //     })

    //     forgotEmail.value = '';
    //   }
    // };


    // On component mount, check if the username is stored in local storage
    onMounted(() => {
      if (localStorage.getItem('user')) {
        router.push('/home');
      }
    });

    const handleLogin = () => {
      fetch("https://bookmyshow-database.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          userInfo: userInfo.value,
          password: password.value,
        }),
      })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            // console.log("Response:", data); 
            localStorage.setItem('user', data.userInfo);
            localStorage.setItem('email', data.email);
            localStorage.setItem('access_token', JSON.stringify(data.idToken));
            return data;
          } else {
            const errorData = await res.json();
            console.log("Error Response:", errorData.error);
            if (errorData.error == "No user registered") {
              Swal.fire({
                title: "User Not Found",
                html: `The user is not registered<br> Please Sign Up`,
                icon: "error"
              })
            } else if (errorData.error == "Invalid Password") {
              Swal.fire({
                title: "Invalid Password",
                html: "The entered password is invalid",
                icon: "error"
              })
            }
            // let errorMessage = "Authentication failed!";
            // throw new Error(errorMessage);
          }
        })
        .then((data) => {
          if (data) {
            console.log(data);
            router.push('/home')
          }

          // Handle successful login or error
        })
        .catch((err) => {
          console.log(err);
          // alert("Authentication failed!");
        });
    };

    //       }else 
    //           });

    //       } catch (error) {
    //   console.log('Error logging in:', error);
    //   alert('Failed to log in. Please try again.');
    // }
    //     };

    // const handleLogin = async () => {
    //   try {
    //     // Check if the user credentials exist in Firestore
    //     const usersCollection = collection(db, 'Users');
    //     const q = query(usersCollection, where('email', '==', email.value));
    //     const querySnapshot = await getDocs(q);

    //     let foundUser = null;
    //     // let access_token = null

    //     querySnapshot.forEach((doc) => {
    //       const user = doc.data();
    //       if (user.password === password.value) {
    //         foundUser = user;
    //         user['uid'] = doc.id;
    //       }
    //     });

    //     if (!foundUser) {
    //       // User credentials not found or password is incorrect
    //       if (querySnapshot.size > 0) {
    //         Swal.fire({
    //           title: 'Incorrect Password',
    //           html: 'Please crosscheck the password',
    //           icon: 'error',
    //         })
    //       } else {
    //         Swal.fire({
    //           title: 'No User registered with this Email',
    //           html: 'Please crosscheck the Email',
    //           icon: 'error',
    //         })
    //       }
    //     } else if (!foundUser.email || foundUser.email.length === 0) {
    //       alert("The Email ID cannot be empty!");
    //     } else {
    //       // User credentials matched, route to movies page
    //       // store.setUsername(foundUser.username, foundUser.uid);

    //       // Store the username in local storage
    //       localStorage.setItem('user', JSON.stringify(foundUser));
    //       // localStorage.setItem('access_token', access_token);

    //       router.push('/home');
    //     }
    //   } catch (error) {
    //     console.log('Error logging in:', error);
    //     alert('Failed to log in. Please try again.');
    //   }
    // };


    const handleSigninWithGoogle = async () => {
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

    return {
      sendResetLink,
      userInfo,
      password,
      handleLogin,
      handleSigninWithGoogle,
      showForgotPasswordSection,
      forgotEmail,
      toggleForgotPasswordSection,
      showOTP,
      OTP,
      resetPassword,
      newPassword,
      confirmNewPassword,
      verifyOTP,
      verifiedOTP
    };
  },
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

.login-1 {
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

.eye-button {
  width: 40px;
}

.eye-button i {
  font-size: 1rem;
  color: #999;
}
</style>
