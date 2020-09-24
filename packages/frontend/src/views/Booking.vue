<template>
  <div class="booking">
    <div>
      <span class="mr-3">{{ $t('booking_desk') }}</span>
      <v-btn small color="primary" :to="{ path: '/booking/edit' }">{{ $t('modify') }}</v-btn>
    </div>
    <div class="search_option mt-5">
      <span class="mr-3">{{ $t('show_free_desk') }}</span
      ><v-select :items="items" solo class="select-item mr-3" :value="items[0]" hide-details />
      <span class="mr-3">{{ $t('hours') }}</span>
      <v-btn small color="primary" class="p-0"><v-icon small>fa-search</v-icon></v-btn>
    </div>
    <div>
      <v-expansion-panels v-model="panel" tile flat>
        <v-expansion-panel class="text-left">
          <v-expansion-panel-header disable-icon-rotate>{{ $t('details') }}</v-expansion-panel-header>
          <v-expansion-panel-content v-for="(item, index) in details" :key="index" left
            >{{ item }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <Calendar />
    <ActionBar />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ActionBar from '@/components/ActionBar.vue';
import Calendar from '@/components/Calendar.vue';

@Component({
  components: { Calendar, ActionBar },
})
export default class Booking extends Vue {
  get items(): number[] {
    var values = [];
    for (var i = 1; i < 25; i++) {
      values.push(i);
    }
    return values;
  }
  details = {
    1: '- 1 table static(75 x 155 x 55)',
    2: '- 1 chair , adjustable',
    3: '- 2 monitors (24 inch, 24 inch)',
    4: '- 1 docking station USB C',
    5: '- 1 keyboard (German)',
    6: '- 1 mouse ',
  };
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
  margin-bottom: 20px;
}
.booking {
  display: flex;
  flex-direction: column;
  max-width: 1050px;
  margin: 74px auto;
}
</style>
