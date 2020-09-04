<template>
  <div class="bookdesk">
    <div>
      <span class="mr-3">{{ $t('booking_desk') }}</span>
      <v-btn color="primary">{{ $t('modify') }}</v-btn>
    </div>
    <div class="search_option mt-5">
      <span class="mr-3">{{ $t('show_free_desk') }}</span
      ><v-select :items="items" solo class="select-item mr-3" :value="items[0]" />
      <span class="mr-3">{{ $t('hours') }}</span>
      <v-btn color="primary" class="p-0"><v-icon>fa-search</v-icon></v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class BookDesk extends Vue {
  get items(): number[] {
    var values = [];
    for (var i = 1; i < 25; i++) {
      values.push(i);
    }
    return values;
  }
}
</script>
<style scoped>
.select-item {
  width: min-content;
  display: block;
  flex: 0;
}
.search_option {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
