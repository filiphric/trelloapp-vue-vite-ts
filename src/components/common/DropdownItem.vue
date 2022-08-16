<template>
  <div
    class="block py-1 px-2 pt-2 text-sm text-gray-700 hover:bg-gray1 active:bg-gray2 cursor-pointer"
    :class="warning && 'warning'"
    data-cy="dropdown-item"
  >
    {{ itemText }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  itemText: {
    default: 'Item text',
    type: String,
  },
  warning: {
    default: false,
    type: Boolean,
  },
});
</script>
<style lang="postcss" scoped>
.warning {
  @apply text-red-600
}
</style>