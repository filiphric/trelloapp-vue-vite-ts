<template>
  <div
    v-if="state.notification.show"
    class="h-14 min-w-min text-base shadow-xl absolute bottom-5 left-5 rounded-sm z-50 bg-white"
    data-cy="notification-message"
  >
    <Error
      v-if="state.notification.error"
      class="text-red-500 fill-current inline-block ml-4 w-6 h-6"
    />
    <Info
      v-else
      class="text-blue-500 fill-current inline-block ml-4 w-4 h-4"
    />
    <div class="m-4 text-black inline-block">
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
    Info
  },
  setup() {
    const state = store();
    return { state };
  }
});
</script>

<style></style>
