<template>
  <div class="h-screen bg-blue6">
    <CardDetail v-if="cardModule" />
    <BoardDetail />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores/store';
import BoardDetail from '@/components/board/BoardDetail.vue';
import CardDetail from '@/components/card/CardDetail.vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
  components: {
    CardDetail,
    BoardDetail,
  },
  setup() {
    const { cardModule } = storeToRefs(store());
    return { cardModule };
  },
});
</script>
