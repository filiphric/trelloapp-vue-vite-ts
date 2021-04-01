<template>
  <ErrorMessage />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default defineComponent({
  name: 'App',
  components: {
    ErrorMessage
  }
});
</script>

<style></style>
