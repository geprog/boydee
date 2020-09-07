<template>
  <div class="home">
    <b-loading is-full-page v-model="loading" can-cancel />
    <template v-if="!loading">
      <div v-if="hasRooms">Hey</div>
      <div v-else class="no-room-available">
        <p class="no-rooms-text">You currently have no rooms!</p>
        <v-btn color="primary" @click="$router.push({ name: 'new-room' })">Create a new room</v-btn>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import { useFind } from 'feathers-vuex';

export default defineComponent({
  name: 'Home',

  setup(props, context) {
    const { Room } = context.root.$FeathersVuex.api;

    const roomsParams = computed(() => ({
      query: {},
    }));

    const { paginationData, items: rooms, isPending: loading } = useFind({ model: Room, params: roomsParams });

    const hasRooms = computed(() => rooms.value.length >= 1);

    return {
      loading,
      hasRooms,
    };
  },
});
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
