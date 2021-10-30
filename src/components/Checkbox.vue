<template>
  <label class="inline-flex items-center">
    <input
      class="text-blue5 w-4 h-4 outline-none"
      type="checkbox"
      data-cy="card-checkbox"
      :checked="card.completed"
      v-bind="card"
      @click.stop="patchCard(card, { completed: !card.completed })"
    />
  </label>
</template>

<script>
import { defineComponent } from 'vue';
import { store } from '@/stores/store';
export default defineComponent({
  props: ['card'],
  setup() {
    const patchCard = store().patchCard;
    return { patchCard };
  }
});
</script>
