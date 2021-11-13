<template>
  <div
    class="place-self-center"
    data-cy="board-list-error-message"
  >
    <span class="font-bold text-8xl text-gray-200 text-center block mb-4">{{ loadingError.status }}</span>
    <p class="text-gray-400 text-center block mb-4">
      {{ loadingError.message || 'There was an error loading your boards' }}
    </p>
    <a
      href="/"
      class="text-blue7 font-semibold text-center block"
    >
      Try again
    </a>
  </div>
</template>

<script lang="ts">
import { store } from '@/stores/store';
import { storeToRefs } from 'pinia';
export default {
  setup() {
    const { loadingError } = storeToRefs(store());
    return { loadingError };
  }
};
</script>

<style></style>
