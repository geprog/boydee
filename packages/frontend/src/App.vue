<template>
  <v-app id="app">
    <AppBar />
    <BookDesk />
    <router-view />
  </v-app>
</template>

<script lang="ts">
import '@/css/common.css';

import { Component, Vue } from 'vue-property-decorator';

import AppBar from '@/components/AppBar.vue';
import BookDesk from '@/components/BookDesk.vue';

@Component({
  components: { AppBar, BookDesk },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: var(--v-grey_fifth-base);
  max-width: 410px;
  margin: 0 auto;
}

#nav {
  padding: 60px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
