<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white" class="calender-header">
          <v-btn small class="mr-3" @click="$refs.calendar.prev()">
            <v-icon small>fa-chevron-left</v-icon>
          </v-btn>
          <v-menu bottom right>
            <template #activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right x-small>fa-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn small class="mx-3" @click="$refs.calendar.next()">
            <v-icon small>fa-chevron-right</v-icon>
          </v-btn>
          <v-spacer />
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="value"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="60"
          :event-color="getEventColor"
          :event-ripple="false"
          @change="getEvents"
          @mousedown:event="startDrag"
          @mousedown:time="startTime"
          @mousemove:time="mouseMove"
          @mouseup:time="endDrag"
        >
          <template #event="{ event, timed }">
            <div class="pl-1" v-html="getEventHTML(event, timed)" />
            <div v-if="timed" class="v-event-drag-bottom" @mousedown.stop="extendBottom(event)" />
          </template>
          <template #day-body="{ date, week }">
            <div class="v-current-time" :class="{ first: date === week[0].date }" :style="{ top: nowY }">
              <div class="v-current-time-time">
                {{ nowTime }}
              </div>
            </div>
          </template>
          &nbsp;
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import Vuetify from 'vuetify/lib';

export default {
  data: () => ({
    focus: '',
    type: '4day',
    types: ['month', 'week', 'day', '4day'],
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    mode: 'stack',
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
      { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
      { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
      { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
    ],
    value: '',
    events: [],
    colors: ['red'],
    names: ['Meeting'],

    dragEvent: null,
    dragStart: null,
    lastEvent: '',
    createEvent: null,
    createStart: null,
    extendOriginal: null,

    isMounted: false,
  }),
  computed: {
    nowY() {
      const cal = this.$refs.calendar;
      if (!cal && !this.isMounted) {
        return -1;
      }

      return cal.timeToY(cal.times.now) + 'px';
    },
    nowTime() {
      const cal = this.$refs.calendar;
      if (!cal && !this.isMounted) {
        return -1;
      }

      return cal.formatTime(cal.times.now);
    },
  },
  mounted() {
    const cal = this.$refs.calendar;

    window.Vuetify = Vuetify;
    window.app = this;
    window.cal = cal;

    this.isMounted = true;

    // scroll to the current time
    const minutes = cal.times.now.hour * 60 + cal.times.now.minute;
    const firstTime = Math.max(0, minutes - (minutes % 30) - 30);
    cal.scrollToTime(firstTime);

    // every minute update the current time bar
    setInterval(() => cal.updateTimes(), 60 * 1000);
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)],
        });
      }

      this.events = events;
    },
    getEventColor(event) {
      const rgb = parseInt(event.color.substring(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      return event === this.dragEvent
        ? `rgba(${r}, ${g}, ${b}, 0.5)`
        : event === this.createEvent
        ? `rgba(${r}, ${g}, ${b}, 0.5)`
        : event.color;
    },
    getEventHTML(event, timed) {
      const cal = this.$refs.calendar;
      let name = event.name;
      if (event.start.hasTime) {
        if (timed) {
          const showStart = event.start.hour < 12 && event.end.hour >= 12;
          const start = cal.formatTime(event.start, showStart);
          const end = cal.formatTime(event.end, true);
          const singline = diffMinutes(event.start, event.end) <= this.parsedEventOverlapThreshold;
          const separator = singline ? ', ' : '<br>';
          return `<strong>${name}</strong>${separator}${start} - ${end}`;
        } else {
          const time = this.formatTime(event.start, true);
          return `<strong>${time}</strong> ${name}`;
        }
      }
      return name;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    },
    eventMove(e) {
      console.log('eventMove', e);
    },
    startDrag(e) {
      if (e.event && e.timed) {
        this.dragEvent = e.event;
        this.dragTime = null;
        this.extendOriginal = null;
      }

      this.lastEvent = 'startDrag';
    },
    startTime(e) {
      const mouse = this.toDate(e);

      if (this.dragEvent && this.dragTime === null) {
        const start = this.toDate(this.dragEvent.start);

        this.dragTime = mouse.getTime() - start.getTime();
      } else {
        this.createStart = this.roundTime(mouse.getTime());
        this.createEvent = {
          name: '(no title)',
          start: this.toTimestamp(new Date(this.createStart)),
          end: this.toTimestamp(new Date(this.createStart)),
          color: this.colors[this.rnd(0, this.colors.length - 1)],
        };
        this.events.push(this.createEvent);
      }
      this.lastEvent = 'startTime';
    },
    extendBottom(event) {
      this.createEvent = event;
      this.createStart = this.toDate(event.start).getTime();
      this.extendOriginal = event.end;
    },
    mouseMoveEvent(e) {
      console.log('mouseMoveEvent', e);
    },
    mouseMove(e) {
      if (this.dragEvent && this.dragTime !== null) {
        const start = this.toDate(this.dragEvent.start);
        const end = this.toDate(this.dragEvent.end);
        const duration = end.getTime() - start.getTime();
        const mouse = this.toDate(e);

        const newStartTime = mouse.getTime() - this.dragTime;
        const newStart = new Date(this.roundTime(newStartTime));
        const newEnd = new Date(newStart.getTime() + duration);

        this.dragEvent.start = this.toTimestamp(newStart);
        this.dragEvent.end = this.toTimestamp(newEnd);
      } else if (this.createEvent && this.createStart !== null) {
        const mouse = this.toDate(e).getTime();
        const mouseRounded = this.roundTime(mouse, false);
        const min = Math.min(mouseRounded, this.createStart);
        const max = Math.max(mouseRounded, this.createStart);

        this.createEvent.start = this.toTimestamp(new Date(min));
        this.createEvent.end = this.toTimestamp(new Date(max));
      }
    },
    endDrag(e) {
      this.dragTime = null;
      this.dragEvent = null;
      this.createEvent = null;
      this.createStart = null;
      this.extendOriginal = null;

      this.lastEvent = 'endDrag';
    },
    cancelDrag(e) {
      if (this.createEvent) {
        if (this.extendOriginal) {
          this.createEvent.end = this.extendOriginal;
        } else {
          const i = this.events.indexOf(this.createEvent);
          if (i !== -1) {
            this.events.splice(i, 1);
          }
        }
      }

      this.createEvent = null;
      this.createStart = null;
      this.dragTime = null;
      this.dragEvent = null;

      this.lastEvent = 'cancelDrag';
    },
    roundTime(time, down = true) {
      const roundDownTime = 30 * 60 * 1000; // 30 minutes

      return down ? time - (time % roundDownTime) : time + (roundDownTime - (time % roundDownTime));
    },
    toDate(tms) {
      return typeof tms === 'string' ? new Date(tms) : new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute);
    },
    toTimestamp(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    },
  },
};
</script>

<style scoped>
.calender-header {
  display: flex;
  justify-content: center;
}
</style>
