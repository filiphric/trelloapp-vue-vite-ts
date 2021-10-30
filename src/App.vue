<template>
  <Navbar />
  <Notification />
  <Tools v-show="state.showTools" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notification from '@/components/Notification.vue';
import Navbar from '@/components/Navbar.vue';
import { useKeypress } from 'vue3-keypress';
import { store } from './stores/store';
import Tools from './components/Tools.vue';
import axios from 'axios';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Notification,
    Tools
  },
  setup() {
    const state = store();
    const toggleTools = state.toggleTools;
    const getCookieValue = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';

    const token = getCookieValue('trello_token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      state.user();
    }

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
