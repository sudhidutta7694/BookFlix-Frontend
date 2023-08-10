<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <MovieComponent />
    <Router-view />
  </div>
</template>

<script>


import MovieComponent from '../components/Home.vue';

export default {
  name: 'App',
  components: {
    MovieComponent,
  },
};
</script>
