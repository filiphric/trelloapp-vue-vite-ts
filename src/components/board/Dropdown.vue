<template>
  <button
    data-cy="board-options"
    class="inline-grid relative self-center ml-2 w-8 h-8 text-white bg-white rounded-sm cursor-pointer bg-opacity-20 hover:bg-opacity-30"
    @click="showDropdown()"
  >
    <Dots class="place-self-center m-2" />
  </button>
  <div
    v-if="dropdown"
    v-click-away="onClickAway"
    class="absolute top-20 z-10 py-2 mt-3 ml-3 w-dropdown bg-white rounded-sm shadow-xl"
    data-cy="board-dropdown"
  >
    <div class="mt-0.5 h-7 text-sm text-center text-gray-600">
      Board actions
    </div>
    <Cross
      class="absolute top-1 right-1 px-2 w-8 h-8 text-gray-600 cursor-pointer"
      @click="dropdown = false"
    />
    <hr>
    <div
      class="block py-1 px-2 pt-2 text-sm text-red-600 hover:bg-gray1 active:bg-gray2 cursor-pointer"
      data-cy="delete-board"
      @click="
        state.deleteBoard(board.id);
        showDropdown();
      "
    >
      Delete this board
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { store } from '@/stores/store';
import Board from '@/typings/board';
import Cross from '@/assets/icons/cross.svg';
import Dots from '@/assets/icons/dots.svg';
export default defineComponent({
  components: {
    Cross,
    Dots,
  },
  props: {
    board: {
      default: null,
      type: Object as PropType<Board>,
    },
  },
  emits: ['toggleInput'],
  setup() {
    const state = store();
    return { state };
  },
  data() {
    return {
      dropdown: false,
      id: this.board.id,
    };
  },
  methods: {
    onClickAway() {
      this.dropdown = false;
    },
    showDropdown() {
      this.dropdown = !this.dropdown;
    },
  },
});
</script>

<style></style>
