<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <RegisterComponent />
    <Router-view />
  </div>
</template>

<script>


import RegisterComponent from '../components/Register.vue';

export default {
  name: 'App',
  components: {
    RegisterComponent,
  },
};
</script>
