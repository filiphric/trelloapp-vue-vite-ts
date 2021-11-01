<template>
  <div
    class="fixed bottom-0 right-0 p-5 rounded-sm m-3"
    style="background: rgb(0 0 0 / 0.1);"
    data-cy="api-tools"
  >
    Reset application:
    <button
      class="m-1 px-1 bg-white border border-black"
      @click="state.reset()"
    >
      All
    </button>
    <button
      class="m-1 px-1 bg-white border border-black"
      @click="state.resetBoards()"
    >
      Boards
    </button>
    <button
      class="m-1 px-1 bg-white border border-black"
      @click="state.resetLists()"
    >
      Lists
    </button>
    <button
      class="m-1 px-1 bg-white border border-black"
      @click="state.resetCards()"
    >
      Cards
    </button>
    <button
      class="m-1 px-1 bg-white border border-black"
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
  }
});
</script>

<style></style>
