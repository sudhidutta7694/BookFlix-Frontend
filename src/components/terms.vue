<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container mx-auto px-4 py-8">
      <div class="overlay">
      <div class="content flex justify-center items-center flex-col h-screen p-5 bg-slate-900 gap-4">
      <div class="bg-slate-800 p-4 rounded-xl w-[70vw] flex flex-col text-center">
      <h1 class="text-3xl text-red-500 mb-4">Terms and Conditions</h1>
      <p class="mb-4">
        By accessing and using the BookFlix website, you accept and agree to be bound by the following terms and conditions:
      </p>
      <p class="mb-4">
        1. You must be at least 18 years old to use this website.
      </p>
      <p class="mb-4">
        2. The content on this website is for informational purposes only and should not be considered professional advice.
      </p>
      <p class="mb-4">
        3. We reserve the right to modify or terminate the services provided on this website without prior notice.
      </p>
      <p class="mb-4">
        4. Your use of this website is at your own risk. We are not responsible for any loss or damage resulting from your use of this website.
      </p>
    </div>
    <div class="bg-slate-800 p-4 rounded-xl w-[70vw] flex flex-col text-center">
      <h1 class="text-3xl text-red-500 mb-4">Privacy Policy</h1>
      <p class="mb-4">
        At BookFlix, we are committed to protecting your privacy:
      </p>
      <p class="mb-4">
        1. We collect personal information, such as your name and email address, only with your consent.
      </p>
      <p class="mb-4">
        2. We use cookies to improve your browsing experience on our website.
      </p>
      <p class="mb-4">
        3. We may share your personal information with trusted third-party service providers for the purpose of delivering our services.
      </p>
      <p class="mb-16">
        4. We implement reasonable security measures to protect your personal information from unauthorized access or disclosure.
      </p></div>

      <RouterLink to="/"><button class=" bg-red-500 rounded-lg hover:bg-red-600 font-semibold text-lg text-white px-4 py-3">Accept and Continue</button></RouterLink>
      </div>
    </div>
    </div>
  </template>
  
  <style scoped>
  .container {
  
  }
  
  .overlay {
    background-color: rgba(0, 0, 0, 0.398);
    color: red;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1099;
  }
  </style>
  