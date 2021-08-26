<template>
  <div>
    <Navbar />
    <Signup />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Signup from '@/components/Signup.vue'

export default defineComponent({
  components: {
    Navbar,
    Signup
  }
});
</script>
