<template>
  <div class="bookdesk">
    <div>
      <span class="mr-3">{{ $t('booking_desk') }}</span>
      <v-btn color="primary" :to="{ path: '/book-desk/modify' }">{{ $t('modify') }}</v-btn>
    </div>
    <div class="search_option mt-5">
      <span class="mr-3">{{ $t('show_free_desk') }}</span
      ><v-select :items="items" solo class="select-item mr-3" :value="items[0]" hide-details />
      <span class="mr-3">{{ $t('hours') }}</span>
      <v-btn color="primary" class="p-0"><v-icon>fa-search</v-icon></v-btn>
    </div>
    <div>
      <v-expansion-panels v-model="panel" tile :disabled="disabled" flat>
        <v-expansion-panel class="text-left">
          <v-expansion-panel-header disable-icon-rotate>Details</v-expansion-panel-header>
          <v-expansion-panel-content left> - 1 table static(75 x 155 x 55) </v-expansion-panel-content>
          <v-expansion-panel-content> - 1 chair , adjustable </v-expansion-panel-content>
          <v-expansion-panel-content> - 2 monitors (24 inch, 24 inch) </v-expansion-panel-content>
          <v-expansion-panel-content> - 1 docking station USB C </v-expansion-panel-content>
          <v-expansion-panel-content> - 1 keyboard (German) </v-expansion-panel-content>
          <v-expansion-panel-content> - 1 mouse </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <Calender />
    <ActionBar />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import ActionBar from '@/components/ActionBar.vue';
import Calender from '@/components/Calender.vue';

@Component({
  components: { Calender, ActionBar },
})
export default class BookDesk extends Vue {
  @Prop({ type: [], default: [0, 1] }) panel?: [];

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
  margin-bottom: 20px;
}
.bookdesk {
  display: flex;
  flex-direction: column;
  max-width: 1050px;
  margin: 74px auto;
}
</style>
