<template>
  <div class="home">
    <b-loading is-full-page v-model="loading" can-cancel />
    <template v-if="!loading">
      <HelloWorld v-if="hasRooms" :msg="$t('welcome_vue')" />
      <div v-else class="no-room-available">
        <p class="no-rooms-text">You currently have no rooms!</p>
        <v-btn color="primary" @click="$router.push({ name: 'new-room' })">Create a new room</v-btn>
      </div>
    </template>
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
  private hasRooms = false;
  private loading = true;

  mounted(): Promise<void> {
    this.loading = true;
    // TODO: load proper data
    // const rooms = await this.$store.dispatch('room/find', { query: {} });
    // this.hasRooms = rooms.total >= 1;
    this.loading = false;
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
