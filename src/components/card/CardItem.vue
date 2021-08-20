<template>
  <div
    data-cy="card"
    class="card grid bg-white relative px-2 py-1.5 rounded border-b border-gray7 cursor-pointer hover:bg-gray1 my-1.5"
    @click="showCardModule(card.id, true)"
  >
  <div class="flex">
    <div class="container w-5 h-5 relative flex-shrink">
      <input type="checkbox" class="checked:bg-blue5 checkmark " @click.stop="console.log('hello')">
    </div>
    <div
      class="select-none text-sm text-gray-800 flex-grow pl-2"
      style="white-space: break-spaces"
    >
      {{ card.name }}
    </div>
    <Pen
      class="pen absolute right-2 top-2 hidden p-1 w-5 h-5 text-gray-700 bg-gray1 bg-opacity-60"
    />
  </div>
  <div class="date max-w-min text-gray9 text-xs hover:bg-gray3 py-1 px-1 rounded-sm mt-1 flex-shrink">
    <Clock class="clock fill-current inline-block" />
    <span class="ml-2">{{ card.deadline }}</span>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Pen from '@/assets/icons/pen.svg';
import Clock from '@/assets/icons/clock.svg';
import { store } from '@/stores/store';
import route from '@/router'

export default defineComponent({
  setup() {
    const state = store();
    const showCardModule = state.showCardModule;
    const cardId = route.currentRoute.value.query.card
    const cardFlag = cardId ? true : false
    if (cardFlag) {
      state.showCardModule(cardId, true)
    }
    return { state, showCardModule };
  },
  components: {
    Pen,
    Clock
  },
  props: ['card']
});
</script>

<style lang="postcss" scoped>
.card:hover .pen {
  display: inline-block;
}
/* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    -webkit-appearance: none;
	  appearance: none;
    cursor: pointer;
    height: 16px;
    width: 16px;
    margin-top: 2px;
    margin-bottom: 2px;
    top: 0;
    left: 0;
    background-color: #eee;
  }
  
  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    background-color: #eee;
  }
  
  /* On mouse-over, add a grey background color */
  .container:hover input.checkmark {
    background-color: #ccc;
  }
  
  /* When the checkbox is checked, add a blue background */
  .container input:checked.checkmark {
    @apply bg-blue7;
  }
  
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  /* Show the checkmark when checked */
  .container input:checked.checkmark:after {
    display: block;
  }
  
  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  :focus {
    outline: 0;
  }
</style>
