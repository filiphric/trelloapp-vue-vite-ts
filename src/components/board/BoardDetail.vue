<template>
  <div
    class="grid"
    :class="state.loadingError.show ? 'bg-white' : 'bg-blue6'"
  >
    <!-- LOADING -->
    <div
      v-if="state.loading"
      class="loading h-screen grid content-center justify-center"
    >
      <div><Loading class="inline-block mb-1" />&nbsp;&nbsp;Loading data ...</div>
    </div>
    <!-- ERROR STATE -->
    <div
      v-if="state.loadingError.show"
      class="h-screen grid content-center justify-center"
      data-cy="board-list-error-message"
    >
      <span class="font-bold text-8xl text-gray-200 text-center block mb-4">{{ state.loadingError.status }}</span>
      <p class="text-gray-400 text-center block mb-4">
        {{ state.loadingError.message || 'There was an error loading board' }}
      </p>
      <router-link
        to="/"
        class="text-blue7 font-semibold text-center block"
      >
        Go back home
      </router-link>
    </div>
    <!-- BOARD DETAIL -->
    <div
      v-if="!state.loading && !state.loadingError.show"
      class="overflow-x-auto overflow-y-hidden h-full whitespace-nowrap"
      data-cy="board-detail"
    >
      <div class="py-2.5">
        <div class="relative inline-block ml-3 mr-0 py-1.5 h-8">
          <div class="invisible font-bold px-3 inline-block">
            {{ state.board.name }}
          </div>
          <input
            v-model="state.board.name"
            v-click-away="onClickAway"
            class="board-title bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
            data-cy="board-title"
            autocomplete="off"
            name="board-title"
            @focus="selectInput($event)"
            @change="state.patchBoard(state.board, { name: state.board.name })"
            @keyup.enter="blurInput($event)"
            @keyup.esc="blurInput($event)"
          >
        </div>
        <div
          class="relative bg-white bg-opacity-20 hover:bg-opacity-30 self-center rounded-sm ml-2 w-8 h-8 cursor-pointer inline-grid"
          :class="[state.board.starred ? 'fill-current text-yellow-300' : 'stroke-current text-white']"
          @click="
            state.patchBoard(state.board, {
              starred: !state.board.starred
            })
          "
        >
          <Star class="place-self-center m-2" />
        </div>
        <Dropdown :board="state.board" />
      </div>
      <draggable
        v-model="state.lists"
        animation="150"
        group="lists"
        item-key="order"
        class="inline-block"
        @end="state.sortLists"
      >
        <template #item="{element}">
          <div class="inline-block h-full align-top">
            <ListItem :list="element" />
          </div>
        </template>
      </draggable>
      <div class="inline-block h-full align-top">
        <ListCreate :board="state.board.id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { blurInput } from '@/utils/blurInput';
import { defineComponent, ref } from 'vue';
import { selectInput } from '@/utils/selectInput';
import { store } from '@/stores/store';
import { useRoute } from 'vue-router';
import Dropdown from '@/components/board/Dropdown.vue';
import ListCreate from '@/components/list/ListCreate.vue';
import ListItem from '@/components/list/ListItem.vue';
import Loading from '@/assets/icons/loading.svg';
import Star from '@/assets/icons/star.svg';
import draggable from 'vuedraggable';

export default defineComponent({
  components: {
    Dropdown,
    ListCreate,
    ListItem,
    Loading,
    Star,
    draggable
  },
  setup() {
    const route = useRoute();
    const state = store();
    const inputActive = ref(false);
    const boardId = Number(route.params.board);
    state.getBoardDetail(boardId);
    const onClickAway = () => {
      inputActive.value = false;
    };
    return { state, blurInput, selectInput, onClickAway };
  }
});
</script>

<style lang="postcss" scoped>
.board-title:focus {
  @apply bg-gray1 bg-opacity-100 hover:bg-opacity-100 text-black;
}

.board-title {
  @apply absolute outline-none font-bold top-0 bottom-0 right-0 left-0 w-full pl-3 rounded-sm cursor-pointer;
}
</style>
