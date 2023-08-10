<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-slate-700 text-gray-300 min-h-screen font-serif">
    <div class="theater-list pl-12 py-40">
      <div class="flex justify-center items-center">
        <h1 class="text-4xl font-bold inline mb-16">Theaters Streaming <span class="font-extrabold mb-16">'{{ movie
        }}'</span></h1>
      </div>
      <div class="flex justify-between item-center">
        <div class="mt-20 ml-48 justify-center items-center">
          <div class="filter mt-16 mb-12 flex">
            <VueDatePicker class="dp__theme_dark w-80 border-2 border-red-600 hover:border-green-600 rounded-2xl" v-model="selectedDay"
              :dark="true" :min-date="new Date().getDate() + 1" :max-date="maxDate" :enable-time-picker="false"
              :week-start="tomorrowDate.getDay()" placeholder="Select a Date" :calendar="calendarFn"
              disable-month-year-select />
          </div>
          <ul v-if="selectedDay" class="fade-enter-active flex flex-col gap-10">
            <li v-for="(theater, index) in filteredTheaters" :key="theater.id" :class="getTheaterAnimation(index)">
              <div
                class="theater-item flex justify-between bg-slate-800 p-6 rounded-xl w-[30vw] transition-all ease-linear hover:scale-105">
                <div class="">
                  <h3 class="text-xl font-semibold">{{ theater.name }}</h3>

                </div>
                <div class="flex flex-col items-center gap-4">
                  <p class="text-green-200">Book Seats: </p>
                  <routerLink class="" :to="{
                    name: 'hall', query: {
                      date: findSelectedDate(),
                      theater: JSON.stringify(theater),
                      movie: movie,
                      language: language,
                      city: city,
                      state: state
                    }
                  }">

                    <!-- <p class="text-green-200">Timing: {{ theater.timing[1] }}</p> -->
                    <div class="flex gap-6">
                      <button @click="updateTiming(theater, theater.timing[0])"
                        class="border-2 border-green-700 hover:bg-green-800 text-gray-100 font-bold py-2 px-3 text-center rounded">
                        {{ theater.timing[0] }}
                      </button>
                      <button @click="updateTiming(theater, theater.timing[1])"
                        class="border-2 border-green-700 hover:bg-green-800 text-gray-100 font-bold py-2 px-3 text-center rounded">
                        {{ theater.timing[1] }}
                      </button>
                    </div>
                  </routerLink>
                </div>
              </div>
            </li>
          </ul>
          <div v-else>
            <p class="text-center font-mono text-red-300 font-semibold">No Date has been selected!</p>
          </div>
        </div>
        <img class="mr-48"
          src="https://media1.giphy.com/media/g6UKQJ1y9Bh0RH2pOY/giphy.gif?cid=6c09b952c22b1418a908ebcad9c45e35003baa8909b7f776&ep=v1_internal_gifs_gifId&rid=giphy.gif&ct=s"
          alt="ticket_gif" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// Calculate tomorrow's date
const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);

const maxDate = computed(() => {
  return (
    // new Date(),
    new Date(new Date().setDate(new Date().getDate() + 4))
  );
});

const calendarFn = (weeks) => {
  const date = new Date().getDate() + 1;
  return weeks.filter((week) => week.days.some((day) => day.text === date)).map((week) => ({
    ...week,
    days: week.days.map((day) => {
      day.classData['custom-class'] = true;
      return day;
    }),
  }));
}


</script>

<script>
// import { db } from '@/firebase';

export default {
  props: {
    movie: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showButton: false,
      theaters: [
        { id: 1, name: 'Bio-Scope', timing: ['5:00 PM', '3:00 PM'], day: 'Sunday' },
        { id: 2, name: 'Carnival Cinemas', timing: ['1:00 PM', '10:00 PM'], day: 'Sunday' },
        { id: 3, name: 'Bio-Scope', timing: ['12:00 PM', '6:00 PM'], day: 'Monday' },
        { id: 4, name: 'Carnival Cinemas', timing: ['4:00 PM', '9:00 PM'], day: 'Monday' },
        { id: 5, name: 'Bio-Scope', timing: ['3:00 PM', '7:00 PM'], day: 'Tuesday' },
        { id: 6, name: 'Carnival Cinemas', timing: ['4:00 PM', '9:00 PM'], day: 'Tuesday' },
        { id: 7, name: 'Bio-Scope', timing: ['6:00 PM', '10:00 PM'], day: 'Wednesday' },
        { id: 8, name: 'Carnival Cinemas', timing: ['1:00 PM', '7:00 PM'], day: 'Wednesday' },
        { id: 9, name: 'Bio-Scope', timing: ['4:00 PM', '8:00 PM'], day: 'Thursday' },
        { id: 10, name: 'Carnival Cinemas', timing: ['2:00 PM', '9:00 PM'], day: 'Thursday' },
        { id: 11, name: 'Bio-Scope', timing: ['1:00 PM', '10:00 PM'], day: 'Friday' },
        { id: 12, name: 'Carnival Cinemas', timing: ['4:00 PM', "8:00 PM"], day: 'Friday' },
        { id: 13, name: 'Bio-Scope', timing: ['2:00 PM', '9:00 PM'], day: 'Saturday' },
        { id: 14, name: 'Carnival Cinemas', timing: ['3:00 PM', '9:00 PM'], day: 'Saturday' },
      ],
      timings: ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'],
      selectedTiming: '',
      selectedDay: '',
      selectedTheaters: [],
      userTheaters: [],
      currentTime: null,
    };
  },
  onBeforeUnmount() {
    console.log(this.userTheaters)
  },
  computed: {
    filteredDays() {
      console.log(this.days.filter(day => day.value !== ''))
      return this.days.filter(day => day.value !== '');
    },
    days() {
      const currentDate = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const DayIndex = (currentDate.getDay());
      const currentDayIndex = (DayIndex + 1) % 7;
      const nextDayIndex = (DayIndex + 2) % 7;
      const dayAfterNextIndex = (DayIndex + 3) % 7;

      return [
        { label: 'Today', value: days[currentDayIndex] + ' ' + this.getFormattedDate(currentDate, 1) },
        { label: 'Tomorrow', value: days[nextDayIndex] + ' ' + this.getFormattedDate(currentDate, 2) },
        { label: 'Day After Tomorrow', value: days[dayAfterNextIndex] + ' ' + this.getFormattedDate(currentDate, 3) },
        { label: 'Day After Tomorrow', value: days[dayAfterNextIndex + 1] + ' ' + this.getFormattedDate(currentDate, 4) }
      ];
    },
    filteredTheaters() {
      if (this.selectedDay !== '') {
        const dateObj = new Date(this.selectedDay);
        // Get the day name
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        console.log(dayName)
        return this.theaters.filter(theater => theater.day == dayName.trim());
      } else {
        console.log("false")
        return null
      }
    }
  },
  watch: {
    selectedDay() {
      this.selectedTiming = '';
    }
  },
  updated() {
    console.log(this.userTheaters)
  },
  methods: {
    findSelectedDate() {
      if (this.selectedDay) {
        const dateObj = new Date(this.selectedDay);
        // Get the day name
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        let selected = this.days.filter(day => day.value.split(' ')[0] == dayName.trim())
        return (selected[0].value.split(' ').slice(1).join(' '));
      }
    },
    updateTiming(theater, selectedTiming) {
      // Update the theater.timing with the selectedTiming
      // Assuming theater is a reactive object, it will automatically update in the UI
      theater.timing = selectedTiming;
    },
    getTheaterAnimation(index) {
      const delay = index * 1000; // Delay each theater by 100 milliseconds
      return `transition-delay: ${delay}ms`;
    },
    addToUserTheaters(theater) {
      this.userTheaters.push(theater)
      console.log(theater)
    },
    getFormattedDate(date, daysToAdd) {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + daysToAdd);

      const options = { month: 'short', day: 'numeric' };
      return newDate.toLocaleDateString('en-US', options);
    }
  }
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 1s, transform 1s;
}

.theater-item {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active .theater-item {
  opacity: 1;
  transform: translateY(0);
}
</style>

<style>
:root {
  /*General*/
  --dp-font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  --dp-width: 400px;
  --dp-border-radius: 15px;
  /*Configurable border-radius*/
  --dp-cell-border-radius: 10px;
  /*Specific border radius for the calendar cell*/
  --dp-common-transition: all 0.2s ease-in;
  /*Generic transition applied on buttons and calendar cells*/

  /*Sizing*/
  --dp-button-height: 40px;
  /*Size for buttons in overlays*/
  --dp-month-year-row-height: 35px;
  /*Height of the month-year select row*/
  --dp-month-year-row-button-size: 35px;
  /*Specific height for the next/previous buttons*/
  --dp-button-icon-height: 20px;
  /*Icon sizing in buttons*/
  --dp-cell-size: 35px;
  /*Width and height of calendar cell*/
  --dp-cell-padding: 5px;
  /*Padding in the cell*/
  --dp-common-padding: 10px;
  /*Common padding used*/
  --dp-input-icon-padding: 35px;
  /*Padding on the left side of the input if icon is present*/
  --dp-input-padding: 6px 30px 6px 12px;
  /*Padding in the input*/
  --dp-menu-min-width: 260px;
  /*Adjust the min width of the menu*/
  --dp-action-buttons-padding: 1px 5px;
  /*Adjust padding for the action buttons in action row*/
  --dp-row-maring: 5px 0;
  /*Adjust the spacing between rows in the calendar*/
  --dp-calendar-header-cell-padding: 0.5rem;
  /*Adjust padding in calendar header cells*/
  --dp-two-calendars-spacing: 10px;
  /*Space between multiple calendars*/
  --dp-overlay-col-padding: 3px;
  /*Padding in the overlay column*/
  --dp-time-inc-dec-button-size: 32px;
  /*Sizing for arrow buttons in the time picker*/
  --dp-menu-padding: 6px 8px;
  /*Menu padding*/

  /*Font sizes*/
  --dp-font-size: 1rem;
  /*Default font-size*/
  --dp-preview-font-size: 0.8rem;
  /*Font size of the date preview in the action row*/
  --dp-time-font-size: 0.8rem;
  /*Font size in the time picker*/

  /*Transitions*/
  --dp-animation-duration: 0.2s;
  /*Transition duration*/
  --dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1);
  /*Timing on menu appear animation*/
  --dp-transition-timing: ease-out;
  /*Timing on slide animations*/
}

.dp__theme_dark {
  --dp-background-color: #212121;
  --dp-text-color: #ffffff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #ffffff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #a81a17;
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-highlight-color: rgba(0, 92, 178, 0.2);
}
</style>