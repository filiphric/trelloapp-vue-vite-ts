<template>
  <button @click="showDropdown()" data-cy="board-options" class="relative bg-white bg-opacity-20 hover:bg-opacity-30 self-center rounded-sm ml-2 w-8 h-8 cursor-pointer inline-grid text-white">
    <Dots class="place-self-center m-2" />
  </button>
  <div
    v-if="dropdown"
    class="bg-white absolute rounded-sm top-20 ml-3 mt-3 shadow-xl z-10 w-dropdown py-2"
    data-cy="board.dropdown"
    v-click-away="onClickAway"
  >
    <div class="text-gray-600 text-sm h-7 mt-0.5 text-center">Board actions</div>
    <Cross class="w-8 h-8 px-2 text-gray-600 absolute top-1 right-1 cursor-pointer" @click="dropdown = false" />
    <hr />
    <div class="pt-2">
      <!-- <div
        class="text-gray-700 text-sm py-1 block cursor-pointer hover:bg-gray1 px-2 active:bg-gray2"
        data-cy="card-list"
        @click="
          this.$emit('toggleInput', true);
          dropdown = false;
        "
      >
        Add list...
      </div> -->
      <div
        class="text-red-600 text-sm py-1 block cursor-pointer hover:bg-gray1 px-2 active:bg-gray2"
        @click="
          state.deleteBoard(board.id);
          showDropdown();
        "
        data-cy="delete-board"
      >
        Delete this board
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores/store';
import Cross from '@/assets/icons/cross.svg';
import Dots from '@/assets/icons/dots.svg';
export default defineComponent({
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
  components: {
    Dots,
    Cross
  },
  emits: ['toggleInput'],
  props: ['board'],
  methods: {
    showDropdown() {
      this.dropdown = !this.dropdown;
    },
    onClickAway() {
      this.dropdown = false;
    }
  }
});
</script>

<style></style>
