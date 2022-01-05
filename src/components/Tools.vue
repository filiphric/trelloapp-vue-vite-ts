<template>
  <div
    class="fixed right-0 bottom-0 p-5 m-3 rounded-sm"
    style="background: rgb(0 0 0 / 0.1)"
    data-cy="api-tools"
  >
    Reset application:
    <button
      class="px-1 m-1 bg-white border border-black"
      @click="state.reset()"
    >
      All
    </button>
    <button
      class="px-1 m-1 bg-white border border-black"
      @click="state.resetBoards()"
    >
      Boards
    </button>
    <button
      class="px-1 m-1 bg-white border border-black"
      @click="state.resetLists()"
    >
      Lists
    </button>
    <button
      class="px-1 m-1 bg-white border border-black"
      @click="state.resetCards()"
    >
      Cards
    </button>
    <button
      class="px-1 m-1 bg-white border border-black"
      @click="state.resetUsers()"
    >
      Users
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { store } from '@/stores/store';

export default defineComponent({
  setup() {
    const state = store();
    return { state };
  },
});
</script>

<style></style>
