<template>
  <button
    class="inline-block text-center rounded-sm text-white font-normal text-sm mt-1 px-3 py-1 h-8 focus:outline-none bg-green7 hover:bg-green6"
    style="width: fit-content"
  >
    {{ buttontext }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    buttontext: {
      default: 'Save',
      type: String
    }
  },
});
</script>

<style lang="postcss" scoped></style>
