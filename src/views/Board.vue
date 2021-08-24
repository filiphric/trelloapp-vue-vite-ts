<template>
  <div class="h-screen bg-blue6">
    <CardDetail v-if="state.cardModule" />
    <Navbar />
    <BoardDetail />
  </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import BoardDetail from '@/components/board/BoardDetail.vue';
import CardDetail from '@/components/card/CardDetail.vue';
import { store } from '@/stores/store';

export default {
  setup() {
    const state = store();
    return { state };
  },
  name: 'Board',
  components: {
    CardDetail,
    Navbar,
    BoardDetail
  }
};
</script>
