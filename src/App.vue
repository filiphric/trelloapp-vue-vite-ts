<template>
  <div
    tabindex="-1"
    @keydown.meta.k="toggleSearch(!state.showSearch)"
    @keyup.f2="toggleTools(!state.showTools)"
    @keyup.esc="
      toggleTools(false);
      toggleSearch(false);
    "
  >
    <Search v-if="state.showSearch" />
    <Navbar />
    <Notification />
    <Tools v-show="state.showTools" />
    <router-view />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';
import Navbar from '@/components/Navbar.vue';
import Notification from '@/components/Notification.vue';
import Tools from '@/components/Tools.vue';
import Search from '@/components/Search.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';

const state = useStore();
const toggleTools = state.toggleTools;
const toggleSearch = state.toggleSearch;
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
</script>
