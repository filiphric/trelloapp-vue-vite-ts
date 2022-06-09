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
        deleteBoard(board.id);
        router.push('/');
        showDropdown();
      "
    >
      Delete this board
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useStore } from '@/store/store';
import { useRouter } from 'vue-router';
import Board from '@/typings/board';
import Cross from '@/assets/icons/cross.svg';
import Dots from '@/assets/icons/dots.svg';

defineProps({
  board: {
    default: null,
    type: Object as PropType<Board>,
  },
});

const router = useRouter();
const dropdown = ref(false);
const { deleteBoard } = useStore();
const onClickAway = () => {
  dropdown.value = false;
};
const showDropdown = () => {
  dropdown.value = !dropdown.value;
};
</script>

<style></style>
