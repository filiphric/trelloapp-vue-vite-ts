<template>
  <Navbar />
  <BoardDetail />
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import BoardDetail from '@/components/board/BoardDetail.vue';

export default {
  name: 'Board',
  components: {
    Navbar,
    BoardDetail
  }
};
</script>
