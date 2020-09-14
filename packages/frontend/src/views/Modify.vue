<template>
  <div class="modify">
    <div>
      <span class="mr-2">{{ $t('choose_a_desk_or') }}</span>
      <v-btn color="primary" :to="{ path: '/book-desk/modify' }">{{ $t('any_desk') }}</v-btn>
      <v-btn color="primary" class="p-0" @click="$router.go(-1)"><v-icon>fa-times</v-icon></v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ActionBar from '@/components/ActionBar.vue';

@Component
export default class BookDesk extends Vue {
  name: 'BookDesk';
}
</script>

<style scoped>
.modify {
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
