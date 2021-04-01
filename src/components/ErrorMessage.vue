<template>
  <div
    v-if="error.show"
    class="h-10 errorMessage text-base shadow-md py-1.5 text-white absolute right-0 left-0 text-center z-50"
    style="background: #f85252;"
  >
    {{ error.message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { errorMessage } from '@/stores/errorMessage';

export default defineComponent({
  setup() {
    const error = errorMessage();
    return { error };
  }
});
</script>

<style></style>
