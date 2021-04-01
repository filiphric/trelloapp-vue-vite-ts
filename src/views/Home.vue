<template>
  <Navbar />
  <BoardList />
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import BoardList from '@/components/board/BoardList.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    BoardList
  }
};
</script>
