<template>
  <div
    data-cy="card"
    class="card grid bg-white relative px-2 py-1.5 rounded border-b border-gray7 cursor-pointer hover:bg-gray1 my-1.5"
    @click="showCardModule(card.id, true)"
  >
  <div class="flex pl-0.5">
    <Checkbox :card="card" />
    <div
      class="select-none text-sm text-gray-800 flex-grow pl-2 pt-1"
      style="white-space: break-spaces"
    >
      {{ card.name }}
    </div>
    <Pen
      class="pen absolute right-2 top-2 hidden p-1 w-5 h-5 text-gray-700 bg-gray1 bg-opacity-60"
    />
  </div>
  <div class="date max-w-min text-xs py-1 px-1 rounded-sm mt-1" :class="card.completed ? 'bg-green5 text-white' : 'text-gray9'">
    <Clock class="clock fill-current inline-block" />
    <span class="ml-2">{{ new Date(card.deadline).toDateString().substring(4) }}</span>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Pen from '@/assets/icons/pen.svg';
import Clock from '@/assets/icons/clock.svg';
import { store } from '@/stores/store';
import route from '@/router'
import Checkbox from '@/components/Checkbox.vue'

export default defineComponent({
  props: ['card'],
  setup() {
    const state = store();
    const showCardModule = state.showCardModule;
    const cardId = route.currentRoute.value.query.card as string
    const cardFlag = cardId ? true : false
    if (cardFlag) {
      state.showCardModule(cardId, true)
    }
    return { state, showCardModule };
  },
  components: {
    Pen,
    Clock,
    Checkbox
  },
});
</script>

<style lang="postcss" scoped>
.card:hover .pen {
  display: inline-block;
}

</style>
