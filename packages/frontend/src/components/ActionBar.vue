<template>
  <div class="action-bar">
    <v-btn color="primary" small class="p-0" @click="$router.go(-1)"><v-icon small>fa-times</v-icon></v-btn>
    <v-btn :disabled="true" small color="primary" class="p-0"><v-icon small>fa-arrow-right</v-icon></v-btn>
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
  margin-top: 30px;
}
</style>
