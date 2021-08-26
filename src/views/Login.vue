<template>
  <div>
    <Navbar />
    <Login />
  </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import Login from '@/components/Login.vue';

export default {
  components: {
    Navbar,
    Login
  }
};
</script>
