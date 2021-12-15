<template>
  <div class="h-screen bg-blue6">
    <CardDetail v-if="state.cardModule" />
    <BoardDetail />
  </div>
</template>

<script lang="ts">
import { store } from '@/stores/store';
import BoardDetail from '@/components/board/BoardDetail.vue';
import CardDetail from '@/components/card/CardDetail.vue';

export default {
  name: 'Board',
  components: {
    CardDetail,
    BoardDetail
  },
  setup() {
    const state = store();
    return { state };
  }
};
</script>
