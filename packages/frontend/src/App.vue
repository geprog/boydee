<template>
  <v-app>
    <div class="app gray_fifth">
      <AppBar />
      <router-view class="app-content" />
    </div>
  </v-app>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';

import AppBar from '@/components/AppBar.vue';

@Component({
  components: {
    AppBar,
  },
})
export default class App extends Vue {}
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
}

.app-content {
  display: flex;
  margin-top: 54px;
  width: 100%;
}
</style>
