<template>
  <div class="background bg-white h-screen grid" data-cy="board-list">
    <div class="loading place-self-center" v-if="state.loading"><Loading class="inline-block" />&nbsp;&nbsp;Loading data ...</div>

    <div v-cloak class="container mx-auto" v-else>
      <!-- STARRED BOARDS -->
      <h1 class="text-3xl py-5 font-semibold inline-block" data-cy="starred-boards" v-if="state.starred.length">
        Starred
      </h1>
      <div class="flex flex-cols-3 gap-8 flex-wrap">
        <BoardItem v-for="board in state.starred" :key="board.id" :board="board" />
      </div>

      <!-- ALL BOARDS -->
      <h1 class="text-3xl py-5 font-semibold inline-block" data-cy="all-boards">My Boards</h1>
      <div class="flex flex-cols-3 gap-8 flex-wrap">
        <BoardItem v-for="board in state.boardList.all" :key="board.id" :board="board" />
        <BoardCreate></BoardCreate>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { store } from '@/stores/store';
import { defineComponent } from 'vue';
import BoardItem from '@/components/board/BoardItem.vue';
import BoardCreate from '@/components/board/BoardCreate.vue';
import Loading from '@/assets/icons/loading.svg';
export default defineComponent({
  setup() {
    const state = store();
    state.getBoardList();
    return { state };
  },
  name: 'BoardList',
  components: {
    BoardItem,
    BoardCreate,
    Loading
  }
});
</script>

<style lang="postcss" scoped></style>
