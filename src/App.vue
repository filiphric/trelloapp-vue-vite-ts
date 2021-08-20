<template>
  <Notification />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notification from '@/components/Notification.vue';

export default defineComponent({
  name: 'App',
  components: {
    Notification
  }
});
</script>

<style></style>
