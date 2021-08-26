<template>
  <nav class="h-10 bg-blue7 grid grid-cols-3">
    <button
      data-cy="home"
      @click="router.push('/')"
      :class="[$route.path !== '/' ? 'visible' : 'invisible']"
      class="bg-white bg-opacity-30 hover:bg-opacity-20 self-center text-white rounded-sm ml-3 w-8 h-8 cursor-pointer grid"
    >
      <Home class="place-self-center" />
    </button>
    <img class="h-10 py-3 place-self-center opacity-60 hover:opacity-100 cursor-pointer" :src="trelloLogo" @click="router.push('/')" />
    <Login />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import trelloLogo from '@/assets/trello-logo.gif';
import Home from '@/assets/icons/home.svg';
import Login from '@/components/LoginButton.vue';
import { useRouter } from 'vue-router';
import { store } from '@/stores/store';
import axios from 'axios';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const router = useRouter();
    const state = store();
    let parsedCookies = document.cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');
      prev[name] = value;
      return prev;
    }, {});

    if (parsedCookies['trello_token']) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${parsedCookies['trello_token']}`;
      state.user();
    }
    return { router, trelloLogo };
  },
  components: {
    Home,
    Login
  }
});
</script>

<style lang="postcss" scoped></style>
