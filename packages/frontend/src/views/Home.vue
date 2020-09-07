<template>
  <div class="home">
    <HelloWorld v-if="roomAvailable" :msg="$t('welcome_vue')" />
    <div v-else class="no-room-available">
      <p class="no-rooms-text">You currently have no rooms!</p>
      <v-btn color="primary" @click="$router.push({ name: 'new-room' })">Create a new room</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import HelloWorld from '@/components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  get roomAvailable(): boolean {
    return false;
  }
}
</script>

<style scoped>
.no-room-available {
  display: flex;
  flex-flow: column;
  margin: auto;
}

.no-rooms-text {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
</style>
