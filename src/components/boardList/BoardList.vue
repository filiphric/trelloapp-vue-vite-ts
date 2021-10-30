<template>
  <div class="background bg-white h-screen grid" data-cy="board-list">
    <!-- LOADING -->
    <div class="loading place-self-center" v-if="state.loading"><Loading class="mb-1 inline-block" />&nbsp;&nbsp;Loading data ...</div>
    <!-- BOARDS NOT LOADED -->
    <LoadingError v-if="state.loadingError.show" />
    <!-- BOARDS LOADED -->
    <div class="container mx-auto" v-if="!state.loading && !state.loadingError.show">
      <!-- STARRED BOARDS -->
      <div v-if="state.starred.length">
        <h1 class="mx-4 text-3xl py-5 font-semibold inline-block" data-cy="starred-boards">
          Starred
        </h1>
        <div class="flex flex-cols-3 gap-8 flex-wrap flex-grow content-start mx-4">
          <BoardItem v-for="board in state.starred" :key="board.id" :board="board" />
          <BoardCreate v-if="!state.allBoards.length"></BoardCreate>
        </div>
      </div>

      <!-- ALL BOARDS -->
      <div v-if="state.allBoards.length">
        <h1 class="mx-4 text-3xl py-5 font-semibold inline-block" data-cy="all-boards">
          My Boards
        </h1>
        <div class="flex flex-cols-3 gap-8 flex-wrap flex-grow content-start mx-4">
          <BoardItem v-for="board in state.allBoards" :key="board.id" :board="board" />
          <BoardCreate></BoardCreate>
        </div>
      </div>
    </div>
    <Emptylist v-if="!state.loading && !state.boardList.all.length && !state.loadingError.show" />
  </div>
</template>

<script lang="ts">
import { store } from '@/stores/store';
import { defineComponent } from 'vue';
import BoardItem from '@/components/board/BoardItem.vue';
import BoardCreate from '@/components/board/BoardCreate.vue';
import Emptylist from '@/components/boardList/Emptylist.vue';
import LoadingError from '@/components/boardList/LoadingError.vue';
import Loading from '@/assets/icons/loading.svg';

export default defineComponent({
  setup() {
    const state = store();
    state.getBoardList();
    return { state };
  },
  name: 'BoardList',
  components: {
    Emptylist,
    BoardItem,
    BoardCreate,
    LoadingError,
    Loading
  }
});
</script>

<style lang="postcss" scoped></style>
