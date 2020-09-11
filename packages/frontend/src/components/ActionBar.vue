<template>
  <div class="action-bar">
    <v-btn color="primary" class="p-0" @click="$router.go(-1)"><v-icon>fa-times</v-icon></v-btn>
    <v-btn color="primary" class="p-0"><v-icon>fa-arrow-right</v-icon></v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ActinBar extends Vue {}
</script>

<style>
.action-bar {
  display: flex;
  justify-content: space-between;
}
</style>
