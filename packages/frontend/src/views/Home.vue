<template>
  <div class="home">
    <v-btn color="primary" class="book-btn mb-5" min-width="300" :to="{ path: 'book-desk' }">{{
      $t('book_any_desk')
    }}</v-btn>
    <b-loading v-model="loading" is-full-page can-cancel />
    <template v-if="!loading">
      <div v-if="hasRooms" class="rooms">
        <div v-for="room in rooms" :key="room.__id" class="room-svg" v-html="room.svg" />
      </div>
      <div v-else class="no-room-available">
        <p class="no-rooms-text">{{ $t('new_room.no_rooms') }}</p>
        <v-btn color="primary" @click="$router.push({ name: 'new-room' })">{{ $t('new_room.create_new_room') }}</v-btn>
      </div>
    </template>
    <v-btn color="primary" class="book-btn mt-5" min-width="300">{{ $t('your_bookings') }}</v-btn>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { useFind } from 'feathers-vuex';

export default defineComponent({
  name: 'Home',

  setup(props, context) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Room } = context.root.$FeathersVuex.api;

    const roomsParams = computed(() => ({
      query: {},
    }));

    const { items: rooms, isPending: loading } = useFind({ model: Room, params: roomsParams });

    const hasRooms = computed(() => rooms.value.length >= 1);

    return {
      loading,
      hasRooms,
      rooms,
    };
  },
});
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.no-room-available {
  display: flex;
  flex-flow: column;
  margin: auto;
}

.no-rooms-text {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.book-btn {
}
</style>
