<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <LoginComponent />
    <Router-view />
  </div>
</template>

<script>


import LoginComponent from '../components/Login.vue';

export default {
  name: 'App',
  components: {
    LoginComponent,
  },
};
</script>
