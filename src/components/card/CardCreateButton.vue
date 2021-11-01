<template>
  <div
    class="text-gray-500 hover:text-gray-600 hover:bg-gray4 px-2 py-1.5 cursor-pointer font-normal text-sm rounded-md"
    @click="$emit('toggleInput', true)"
  >
    <Plus class="w-3 h-3 inline-block" />
    <div data-cy="new-card">
      Add another card
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Plus from '@/assets/icons/Plus.svg';
export default defineComponent({
  components: {
    Plus
  },
  emits: ['toggleInput']
});
</script>

<style></style>
