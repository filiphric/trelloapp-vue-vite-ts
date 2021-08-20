<template>
  <div class="container w-5 h-5 relative inline-block">
    <input type="checkbox" v-model="card.completed" @click.stop="state.patchCard(card)" class="checked:bg-blue5 checkmark">
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { store } from '@/stores/store';
export default defineComponent({
  props: ['card'],
  setup() {
    const state = store()
    return { state }
  },
})
</script>

<style lang="postcss" scoped>

/* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    -webkit-appearance: none;
	  appearance: none;
    cursor: pointer;
    height: 16px;
    width: 16px;
    margin-top: 5px;
    margin-bottom: 0px;
    top: 0;
    left: 0;
    background-color: #eee;
    @apply border-solid border-gray5 border;
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
    @apply bg-blue7 border-none border-0;
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