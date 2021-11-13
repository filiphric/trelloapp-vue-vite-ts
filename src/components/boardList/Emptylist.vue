<template>
  <div class="grid grid-cols-2 items-stretch h-screen px-20 gap-x-8 z-10">
    <div class="grid content-center">
      <h1 class="font-bold text-3xl mb-8">
        Get started!
      </h1>
      <p>Go ahead and create your first board!</p>
      <input
        v-model="newBoardTitle"
        type="text"
        data-cy="first-board"
        class="h-8 mt-4 w-full rounded-sm px-2 bg-white border-2"
        placeholder="Name of your first board"
        name="newBoard"
        @keyup.enter.prevent="createBoard(newBoardTitle)"
      >
    </div>
    <img
      class="place-self-center self-center gap-x-5"
      src="@/assets/start.png"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { store } from '@/stores/store';

export default defineComponent({
  setup() {
    const newBoardTitle = ref('');
    const createBoard = store().createBoard;
    return {
      createBoard,
      newBoardTitle
    };
  }
});
</script>
