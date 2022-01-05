<template>
  <div
    class="place-self-center"
    data-cy="board-list-error-message"
  >
    <span class="block mb-4 text-8xl font-bold text-center text-gray-200">{{ loadingError.status }}</span>
    <p class="block mb-4 text-center text-gray-400">
      {{ loadingError.message || 'There was an error loading your boards' }}
    </p>
    <a
      href="/"
      class="block font-semibold text-center text-blue7"
    > Try again </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores/store';
import { storeToRefs } from 'pinia';
export default defineComponent({
  setup() {
    const { loadingError } = storeToRefs(store());
    return { loadingError };
  },
});
</script>

<style></style>
