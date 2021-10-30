<template>
  <div class="grid" :class="state.loadingError.show ? 'bg-white' : 'bg-blue6'">
    <!-- LOADING -->
    <div class="loading h-screen grid content-center justify-center" v-if="state.loading">
      <div><Loading class="inline-block mb-1" />&nbsp;&nbsp;Loading data ...</div>
    </div>
    <!-- ERROR STATE -->
    <div class="h-screen grid content-center justify-center" v-if="state.loadingError.show" data-cy="board-list-error-message">
      <span class="font-bold text-8xl text-gray-200 text-center block mb-4">{{ state.loadingError.status }}</span>
      <p class="text-gray-400 text-center block mb-4">
        {{ state.loadingError.message || 'There was an error loading board' }}
      </p>
      <router-link to="/" class="text-blue7 font-semibold text-center block">Go back home</router-link>
    </div>
    <!-- BOARD DETAIL -->
    <div v-if="!state.loading && !state.loadingError.show" class="overflow-x-auto overflow-y-hidden h-full whitespace-nowrap" data-cy="board-detail">
      <div class="py-2.5">
        <div class="relative inline-block ml-3 mr-0 py-1.5 h-8">
          <div class="invisible font-bold px-3 inline-block">
            {{ state.board.name }}
          </div>
          <input
            class="absolute outline-none font-bold top-0 bottom-0 right-0 left-0 w-full pl-3 rounded-sm cursor-pointer"
            :class="[inputActive ? 'bg-gray1 bg-opacity-100 hover:bg-opacity-100 text-black' : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white']"
            @focus="
              $event.target.select();
              inputActive = true;
            "
            @change="
              state.patchBoard(state.board, {
                name: state.board.name
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
            v-model="state.board.name"
            v-click-away="onClickAway"
            data-cy="board-title"
          />
        </div>
        <div
          @click="
            state.patchBoard(state.board, {
              starred: !state.board.starred
            })
          "
          class="relative bg-white bg-opacity-20 hover:bg-opacity-30 self-center rounded-sm ml-2 w-8 h-8 cursor-pointer inline-grid"
          :class="[state.board.starred ? 'fill-current text-yellow-300' : 'stroke-current text-white']"
        >
          <Star class="place-self-center m-2" />
        </div>
        <Dropdown :board="state.board" />
      </div>
      <draggable animation="150" group="lists" v-model="state.lists" item-key="order" class="inline-block" @end="sortList">
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
import { defineComponent } from 'vue';
import { store } from '@/stores/store';
import { useRoute } from 'vue-router';
import ListItem from '@/components/list/ListItem.vue';
import ListCreate from '@/components/list/ListCreate.vue';
import Dropdown from '@/components/board/Dropdown.vue';
import Loading from '@/assets/icons/loading.svg';
import Star from '@/assets/icons/star.svg';
import draggable from 'vuedraggable';
import List from '@/typings/list';

export default defineComponent({
  setup() {
    const route = useRoute();
    const state = store();
    const boardId = Number(route.params.board)
    state.getBoardDetail(boardId);
    return { state, useRoute };
  },
  components: {
    ListItem,
    ListCreate,
    Loading,
    Star,
    Dropdown,
    draggable
  },
  data() {
    return {
      inputActive: false,
      drag: false
    };
  },
  methods: {
    onClickAway() {
      this.inputActive = false;
    },
    sortList() {
      this.state.lists.forEach((list: List, index) => {
        this.state.patchList(list, { order: index });
      });
    }
  }
});
</script>

<style lang="postcss" scoped></style>
