<template>
  <nav class="h-10 bg-blue7 grid grid-cols-3">
    <button
      data-cy="home"
      @click="navigate()"
      :class="[$route.path !== '/' ? 'visible' : 'invisible']"
      class="bg-white bg-opacity-30 hover:bg-opacity-20 self-center text-white rounded-sm ml-3 w-8 h-8 cursor-pointer grid"
    >
      <Home class="place-self-center" />
    </button>
    <img class="h-10 py-3 place-self-center opacity-60 hover:opacity-100 cursor-pointer" :src="trelloLogo" @click="navigate()"/>
    <Login />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import trelloLogo from '@/assets/trello-logo.gif';
import Home from '@/assets/icons/home.svg';
import Login from '@/components/Login.vue';

export default defineComponent({
  components: {
    Home,
    Login
  },
  methods: {
    navigate() {
      this.$router.push('/');
    }
  },
  name: 'Navbar',
  data: function() {
    return {
      trelloLogo
    };
  }
});
</script>

<style lang="postcss" scoped></style>
