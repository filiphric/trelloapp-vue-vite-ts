<template>
  <div
    data-cy="card"
    class="card grid w-full bg-white relative p-2 rounded border-gray1 border border-solid cursor-pointer hover:bg-gray1 drop-shadow-sm my-1.5"
    @click="state.showCardModule(card.id, true)"
  >
    <div class="flex pl-0.5 px-1.5">
      <Checkbox :card="card" />
      <div class="select-none text-sm text-gray-800 flex-grow pl-2" style="white-space: break-spaces" data-cy="card-title">
        {{ card.name }}
      </div>
      <Pen class="pen absolute right-2 top-2 hidden p-1 w-5 h-5 text-gray-700 bg-gray1 bg-opacity-60" />
    </div>
    <div
      class="date text-xs py-1 px-1.5 rounded-sm mt-1 w-[fit-content]"
      :class="card.completed ? 'completed' : overdue(card) ? 'overdue' : 'text-gray9'"
      data-cy="card-date"
    >
      <Clock class="clock w-3 h-3 fill-current inline-block" />
      <span class="ml-2">{{ new Date(card.deadline).toDateString().substring(4) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Pen from '@/assets/icons/pen.svg';
import Clock from '@/assets/icons/clock.svg';
import { store } from '@/stores/store';
import Checkbox from '@/components/Checkbox.vue';
import moment from 'moment';
import Card from '@/typings/card';

export default defineComponent({
  props: ['card'],
  setup() {
    const state = store();
    return { state };
  },
  components: {
    Pen,
    Clock,
    Checkbox
  },
  methods: {
    overdue: (card: Card) => {
      return card.deadline && moment(card.deadline).diff(moment().startOf('day'), 'days') < 1;
    }
  }
});
</script>

<style lang="postcss" scoped>
.card:hover .pen {
  display: inline-block;
}

.overdue {
  @apply bg-red-500 text-white;
}

.completed {
  @apply bg-green5 text-white;
}
</style>
