<template>
  <CardDetail v-if="store.cardModule" />
  <Navbar />
  <BoardDetail />
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import BoardDetail from '@/components/board/BoardDetail.vue';
import CardDetail from '@/components/card/CardDetail.vue';
import { boardDetail } from '@/stores/boardDetail';

export default {
  setup() {
    const store = boardDetail();
    return { store };
  },
  
  name: 'Board',
  components: {
    CardDetail,
    Navbar,
    BoardDetail
  }
};
</script>
