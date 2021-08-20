<template>
  <div
    v-if="state.errorMessage.show"
    class="h-10 errorMessage text-base shadow-md py-1.5 text-white absolute right-0 left-0 text-center z-50"
    style="background: #f85252;"
    data-cy="error-message"
  >
    {{ state.errorMessage.message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores/store';

export default defineComponent({
  setup() {
    const state = store();
    return { state };
  }
});
</script>

<style></style>
