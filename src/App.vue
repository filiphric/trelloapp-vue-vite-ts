<template>
  <div
    tabindex="-1"
    @keyup.f2="toggleTools(!state.showTools)"
    @keyup.esc="toggleTools(false)"
  >
    <Navbar />
    <Notification />
    <Tools v-show="state.showTools" />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from './stores/store';
import Navbar from '@/components/Navbar.vue';
import Notification from '@/components/Notification.vue';
import Tools from './components/Tools.vue';
import Footer from '@/components/footer.vue';
import axios from 'axios';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Notification,
    Tools,
    Footer,
  },
  setup() {
    const state = store();
    const toggleTools = state.toggleTools;
    const getCookieValue = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop();

    const trelloToken = getCookieValue('trello_token');
    const trelloTokenValid = trelloToken?.split('.')[1];

    if (trelloToken && !trelloTokenValid) {
      state.showNotification('Invalid authorization', true);
      document.cookie = 'trello_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    if (trelloToken && trelloTokenValid) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${trelloToken}`;
      const userData = window.atob(trelloTokenValid);
      const userId = JSON.parse(userData).sub;
      state.user(userId);
    }

    return { state, toggleTools };
  },
});
</script>

<style></style>
