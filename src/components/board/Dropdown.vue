<template>
  <button
    data-cy="board-options"
    class="relative bg-white bg-opacity-20 hover:bg-opacity-30 self-center rounded-sm ml-2 w-8 h-8 cursor-pointer inline-grid text-white"
    @click="showDropdown()"
  >
    <Dots class="place-self-center m-2" />
  </button>
  <div
    v-if="dropdown"
    v-click-away="onClickAway"
    class="bg-white absolute rounded-sm top-20 ml-3 mt-3 shadow-xl z-10 w-dropdown py-2"
    data-cy="board-dropdown"
  >
    <div class="text-gray-600 text-sm h-7 mt-0.5 text-center">
      Board actions
    </div>
    <Cross
      class="w-8 h-8 px-2 text-gray-600 absolute top-1 right-1 cursor-pointer"
      @click="dropdown = false"
    />
    <hr>
    <div
      class="text-red-600 text-sm py-1 pt-2 block cursor-pointer hover:bg-gray1 px-2 active:bg-gray2"
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
    Dots
  },
  props: {
    board: {
      default: null,
      type: Object as PropType<Board>
    }
  },
  emits: ['toggleInput'],
  setup() {
    const state = store();
    return { state };
  },
  data() {
    return {
      dropdown: false,
      id: this.board.id
    };
  },
  methods: {
    onClickAway() {
      this.dropdown = false;
    },
    showDropdown() {
      this.dropdown = !this.dropdown;
    }
  }
});
</script>

<style></style>
