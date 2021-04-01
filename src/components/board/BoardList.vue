<template>
  <div class="background bg-white h-screen grid">
    <div class="loading place-self-center" v-if="boards.loading">
      <Loading />
      &nbsp;&nbsp;Loading data ...
    </div>

    <div v-cloak class="container mx-auto" v-else>
      <!-- STARRED BOARDS -->
      <h1
        class="text-3xl py-5 font-semibold inline-block"
        v-show="boards.starred.length"
      >
        Starred
      </h1>
      <div class="flex flex-cols-3 gap-8 flex-wrap">
        <BoardItem
          v-for="board in boards.starred"
          :key="board.id"
          :board="board"
        />
      </div>

      <!-- ALL BOARDS -->
      <h1 class="text-3xl py-5 font-semibold inline-block">My Boards</h1>
      <div class="flex flex-cols-3 gap-8 flex-wrap">
        <BoardItem v-for="board in boards.all" :key="board.id" :board="board" />
        <BoardCreate></BoardCreate>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { boardList } from "@/stores/boardList";
import { defineComponent } from "vue";
import BoardItem from "@/components/board/BoardItem.vue";
import BoardCreate from "@/components/board/BoardCreate.vue";
import Loading from "@/assets/icons/loading.svg";
export default defineComponent({
  setup() {
    const boards = boardList();

    // load board list from API
    boards.fetch();

    return { boards };
  },
  name: "BoardList",
  components: {
    BoardItem,
    BoardCreate,
    Loading
  }
});
</script>

<style lang="postcss" scoped></style>
