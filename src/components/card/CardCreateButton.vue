<template>
  <div
    class="py-1.5 px-2 text-sm font-normal text-gray-500 hover:text-gray-600 hover:bg-gray4 rounded-md cursor-pointer"
    @click="$emit('toggleInput', true)"
  >
    <Plus class="inline-block w-3 h-3" />
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
    Plus,
  },
  emits: ['toggleInput'],
});
</script>

<style></style>
