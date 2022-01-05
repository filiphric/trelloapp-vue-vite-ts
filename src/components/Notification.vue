<template>
  <div
    v-if="state.notification.show"
    class="absolute bottom-5 left-5 z-50 min-w-min h-14 text-base bg-white rounded-sm shadow-xl"
    data-cy="notification-message"
  >
    <Error
      v-if="state.notification.error"
      class="inline-block ml-4 w-6 h-6 text-red-500 fill-current"
    />
    <Info
      v-else
      class="inline-block ml-4 w-4 h-4 text-blue-500 fill-current"
    />
    <div class="inline-block m-4 text-black">
      {{ state.notification.message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores/store';
import Error from '@/assets/icons/error.svg';
import Info from '@/assets/icons/info.svg';

export default defineComponent({
  components: {
    Error,
    Info,
  },
  setup() {
    const state = store();
    return { state };
  },
});
</script>

<style></style>
