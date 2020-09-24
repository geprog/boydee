<template>
  <div class="modify">
    <div>
      <div>
        <span class="mr-2">{{ $t('choose_a_desk_or') }}</span>
        <v-btn small color="primary" @click="click">{{ $t('any_desk') }}</v-btn>
      </div>

      <v-btn small color="primary" class="p-0 mt-5" @click="$router.go(-1)"><v-icon small>fa-times</v-icon></v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ActionBar from '@/components/ActionBar.vue';

@Component
export default class BookingEdit extends Vue {
  click() {
    this.$router.push({ name: 'booking' });
  }
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
