<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <Overview />
    <Router-view />
  </div>
</template>

<script>


import Overview from '../components/Overview.vue';


export default {
  name: 'App',
  components: {
    Overview,
  },
};
</script>
