<template>
  <div>
    <Navbar />
    <div class="background bg-white h-screen grid">
      <div class="loading place-self-center" data-cy="404">
        <span class="font-bold text-8xl text-gray-200 text-center block mb-4"
          >404</span
        >
        <p class="text-gray-400 text-center block mb-4">
          Sorry, this board does not exist
        </p>
        <router-link to="/" class="text-blue7 font-semibold text-center block"
          >Go back home</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Board',
  components: {
    Navbar
  }
};
</script>
