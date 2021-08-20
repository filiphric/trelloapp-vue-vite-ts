<template>
  <div class="bg-backdrop flex justify-center items-center fixed top-0 left-0 h-full w-full z-40" @click="showCardModule(card.id, false)">
    <div class="bg-gray2 w-cardDetail h-5/6 p-4">
      <h1 class="text-lg font-semibold text-black">Name: {{ card.name }}</h1>
      <h1 class="text-lg font-semibold text-black">boardId: {{ card.boardId }}</h1>
      <h1 class="text-lg font-semibold text-black">completed: {{ card.completed }}</h1>
      <h1 class="text-lg font-semibold text-black">created: {{ card.created }}</h1>
      <h1 class="text-lg font-semibold text-black">deadline: {{ card.deadline }}</h1>
      <h1 class="text-lg font-semibold text-black">description: {{ card.description }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores/store';

export default defineComponent({
  setup() {
    const state = store();
    const showCardModule = state.showCardModule;
    const card = state.activeCard
    
    return { state, showCardModule, card };
  },
  components: {
  },
  methods: {}
});
</script>

<style>
</style>
