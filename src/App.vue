<template>
  <Notification />
  <Tools v-if="state.showTools" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notification from '@/components/Notification.vue';
import { useKeypress } from 'vue3-keypress';
import { store } from './stores/store';
import Tools from './components/tools.vue';

export default defineComponent({
  name: 'App',
  components: {
    Notification,
    Tools
  },
  setup() {
    const state = store();
    const toggleTools = () => {
      state.showTools = !state.showTools;
    };
    useKeypress({
      keyEvent: 'keydown',
      keyBinds: [
        {
          keyCode: 113,
          success: toggleTools
        }
      ]
    });
    return { state };
  }
});
</script>

<style></style>
