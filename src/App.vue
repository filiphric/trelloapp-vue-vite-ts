<template>
  <Search v-if="state.showSearch" />
  <Navbar />
  <Notification />
  <Tools v-if="state.showTools" />
  <router-view />
  <Footer />
</template>

<script setup lang="ts">
import { useKeypress } from 'vue3-keypress'
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

useKeypress({
  keyEvent: 'keydown',
  keyBinds: [
    {
      keyCode: 113, // f2
      success() {
        toggleTools(!state.showTools)
        },
    },
    {
      keyCode: 75, // k
      success() { 
        toggleSearch(!state.showSearch)
        },
      modifiers: ['metaKey'],
    },
    {
      keyCode: 27, // esc 
      success() {
        toggleSearch(false);
        toggleTools(false)
      },
    },
  ],
})

</script>
