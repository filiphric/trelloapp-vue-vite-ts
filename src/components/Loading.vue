<template>
  <div
    v-if="loading"
    class="loading"
  >
    <LoadingIcon class="mb-1 inline-block" />&nbsp;&nbsp;Loading data ...
    <div
      v-if="loadingError.tooLong"
      class="block mt-4"
    >
      This is taking too long.
      <a
        href="/"
      >
        Reload?
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import LoadingIcon from '@/assets/icons/loadingIcon.svg';
import { store } from '@/stores/store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  components: {
    LoadingIcon
  },
  setup() {
    const { loading, loadingError } = storeToRefs(store());
    return { loading, loadingError };
  }
});
</script>

<style lang="postcss" scoped>
.loading {
  @apply place-self-center text-center block
}

a {
  @apply text-blue7 font-semibold text-center
}
</style>
