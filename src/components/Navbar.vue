<template>
  <nav>
    <button
      data-cy="home"
      :class="[route.path !== '/' ? 'visible' : 'invisible']"
      @click="router.push('/')"
    >
      <Home class="place-self-center" />
    </button>
    <img
      data-cy="trello-logo"
      src="@/assets/trello-logo.gif"
      @click="router.push('/')"
    >
    <Login />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Home from '@/assets/icons/homeicon.svg';
import Login from '@/components/LoginButton.vue';

export default defineComponent({
  components: {
    Home,
    Login,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    return { route, router };
  },
});
</script>

<style lang="postcss" scoped>
nav {
  @apply h-10 bg-blue7 grid grid-cols-3 z-10 fixed top-0 w-full;
}
button {
  @apply bg-white bg-opacity-30 hover:bg-opacity-20 self-center text-white rounded-sm ml-3 w-8 h-8 cursor-pointer grid;
}
img {
  @apply h-10 py-3 place-self-center opacity-60 hover:opacity-100 cursor-pointer;
}
</style>
