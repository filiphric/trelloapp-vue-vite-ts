<template>
  <div
    tabindex="-1"
    @keyup.f2="toggleTools"
  >
    <Navbar />
    <Notification />
    <Tools v-show="state.showTools" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from './stores/store';
import Navbar from '@/components/Navbar.vue';
import Notification from '@/components/Notification.vue';
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

    return { state, toggleTools };
  }
});
</script>

<style></style>
