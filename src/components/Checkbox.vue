<template>
  <label class="inline-flex items-center">
    <input
      type="checkbox"
      data-cy="card-checkbox"
      :checked="card.completed"
      @click.stop="patchCard(card, { completed: !card.completed })"
    >
  </label>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { store } from '@/stores/store';
import Card from '@/typings/card';
export default defineComponent({
  props: {
    card: {
      default: null,
      type: Object as PropType<Card>,
    },
  },
  setup() {
    const patchCard = store().patchCard;
    return { patchCard };
  },
});
</script>

<style lang="postcss" scoped>
input {
  @apply text-blue5 w-4 h-4 outline-none;
}
label {
  @apply inline-flex items-center;
}
</style>
