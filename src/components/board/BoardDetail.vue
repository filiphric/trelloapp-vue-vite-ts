<template>
  <div class="bg-blue6 h-screen grid">
    <div class="loading place-self-center" v-if="currentBoard.loading">
      <Loading />
      &nbsp;&nbsp;Loading data ...
    </div>
    <div
      v-else
      class="overflow-x-auto overflow-y-hidden h-full whitespace-nowrap"
    >
      <div class="py-2.5">
        <div class="relative inline-block ml-3 mr-0 py-1.5 h-8">
          <div class="invisible font-bold px-3 inline-block">
            {{ currentBoard.board.name }}
          </div>
          <input
            class="absolute outline-none font-bold top-0 bottom-0 right-0 left-0 w-full pl-3 rounded-sm cursor-pointer"
            :class="[
              inputActive
                ? 'bg-gray1 bg-opacity-100 hover:bg-opacity-100 text-black'
                : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
            ]"
            @focus="
              $event.target.select();
              inputActive = true;
            "
            @change="
              currentBoard.patchBoard(currentBoard.board, {
                name: currentBoard.board.name
              })
            "
            @keyup.enter="
              $event.target.blur();
              inputActive = false;
            "
            @keyup.esc="
              $event.target.blur();
              inputActive = false;
            "
            v-model="currentBoard.board.name"
            v-click-away="onClickAway"
            data-cy="board-title"
          />
        </div>
        <div
          @click="
            currentBoard.patchBoard(currentBoard.board, {
              starred: !currentBoard.board.starred
            })
          "
          class="relative bg-white bg-opacity-20 hover:bg-opacity-30 self-center rounded-sm ml-2 w-8 h-8 cursor-pointer inline-grid"
          :class="[
            currentBoard.board.starred
              ? 'fill-current text-yellow-300'
              : 'stroke-current text-white'
          ]"
        >
          <Star class="place-self-center m-2" />
        </div>
      </div>
      <div
        class="inline-block h-full align-top"
        v-for="list in currentBoard.lists"
        :key="list.id"
      >
        <ListItem :list="list" />
      </div>
      <div class="inline-block h-full">
        <ListCreate :board="currentBoard.board.id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { boardDetail } from "@/stores/boardDetail";
import { useRoute } from "vue-router";
import ListItem from "@/components/list/ListItem.vue";
import ListCreate from "@/components/list/ListCreate.vue";
import Loading from "@/assets/icons/loading.svg";
import Star from "@/assets/icons/star.svg";

export default defineComponent({
  setup() {
    const route = useRoute();
    const currentBoard = boardDetail();
    currentBoard.fetch(route.params.board as string);
    return { currentBoard, useRoute };
  },
  components: {
    ListItem,
    ListCreate,
    Loading,
    Star
  },
  data() {
    return {
      inputActive: false
    };
  },
  methods: {
    onClickAway() {
      this.inputActive = false;
    }
  }
});
</script>

<style lang="postcss" scoped></style>
