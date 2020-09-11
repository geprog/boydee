<template>
  <v-app>
    <div class="app gray_fifth">
      <AppBar v-if="isAuthenticated" />
      <router-view class="app-content" />
    </div>
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
export default class App extends Vue {
  get isAuthenticated(): boolean {
    return this.$store.getters['auth/isAuthenticated'];
  }
}
</script>

<style>
.app {
  display: flex;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: var(--v-grey_fifth-base);
  /* max-width: 410px; */
  margin: 0 auto;
}

.app-content {
  display: flex;
  margin-top: 54px;
  width: 100%;
}
</style>
