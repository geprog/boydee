<template>
  <div class="appBar white">
    <div class="appBarInner">
      <v-icon>fa-bars</v-icon>
      <router-link :to="{ name: 'home' }">
        <img src="../assets/logo.png" class="logo" />
      </router-link>
       <v-icon>fa-sign-out-alt</v-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class AppBar extends Vue {}
</script>

<style scoped>
.appBar {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 54px;
  z-index: 1000;
  display: flex;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}
.appBarInner {
  display: flex;
  width: 100%;
  max-width: 410px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-around;
}
.logo {
  height: 44px;
  cursor: pointer;
  margin-left: 16px;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
