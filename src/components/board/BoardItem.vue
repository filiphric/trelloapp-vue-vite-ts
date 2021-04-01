<template>
  <router-link
    custom
    v-slot="{ navigate }"
    :to="{ path: '/board/' + board.id }"
  >
    <div
      class="board bg-blue7 w-80 h-36 px-4 py-3 cursor-pointer grid grid-cols-6 justify-between rounded-sm hover:bg-blue8"
      data-cy="board-item"
      @click="navigate"
      @mouseover="showStar = true"
      @mouseout="showStar = false"
    >
      <h1 class="text-white font-bold col-span-5">{{ board.name }}</h1>
      <div
        data-cy="star"
        v-show="showStar"
        @click.stop="updateBoardStarred(board)"
        class="justify-self-end self-start"
      >
        <Star
          class="w-5 h-5 col-span-1"
          :class="[
            board.starred
              ? 'fill-current text-yellow-300'
              : 'stroke-current text-white'
          ]"
        />
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Star from "@/assets/icons/star.svg";
import Board from "@/typings/board";
export default defineComponent({
  components: {
    Star
  },
  data: function() {
    return {
      showStar: false
    };
  },
  methods: {
    updateBoardStarred: function(board: Board) {
      let flag = !board.starred;
      axios.patch(`/api/boards/${board.id}`, {
        starred: flag
      });
      board.starred = flag;
    }
  },
  name: "Board",
  props: ["board"]
});
</script>

<style lang="postcss" scoped></style>
