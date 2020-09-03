<template>
  <div class="appBar white">
    <div class="appBarInner">
      <v-menu tile offset-y content-class="menu-content"> </v-menu>

      <router-link :to="{ name: 'home' }">
        <Icon pack="logo" name="elog" class="logo" color="gray_first" />
      </router-link>
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
  max-width: var(--max-width);
  margin: 0 auto;
  align-items: center;
}
.menu-item-list {
  padding: 0;
}
.logo {
  height: 44px;
  cursor: pointer;
  margin-left: 16px;
  display: flex;
  align-items: center;
  display: flex;
}
</style>
