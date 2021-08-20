<template>
  <div class="bg-backdrop flex justify-center items-center fixed top-0 left-0 h-full w-full z-40" @click.self="showCardModule(activeCard.id, false)">
    <div class="bg-gray2 w-cardDetail h-5/6 p-8 grid grid-cols-8">
      <div class="col-span-6 text-gray-800">
        <div class="ml-9 mb-4">
          <Board class="stroke-current fill-current text-gray-800 -ml-8 mt-1 w-5 h-5 absolute" />
          <h2 class="text-xl font-semibold text-gray-800">{{ activeCard.name }}</h2>
          <h2 class="text-sm text-gray10">in list <span class="underline">{{ cardListName }}</span></h2>
        </div>
        <div class="ml-9 mb-4">
          <h2 class="text-sm block text-gray10 cursor-default">DUE DATE</h2>
          <div class="inline-block mt-2">
            <Checkbox :card="activeCard" />
            <h2 class="inline-block px-4 py-1 rounded-sm  font-light text-gray-800 bg-gray3 hover:bg-gray5 cursor-pointer">{{ new Date(activeCard.deadline).toDateString() }}
              <Downarrow class="stroke-current fill-current text-gray-800 w-2.5 pb-0.5 ml-2 inline-block" />
            </h2>
            
          </div>
        </div>
        <div class="ml-9 mb-4">
          <Description class="stroke-current fill-current text-gray-800 -ml-8 mt-1 w-5 h-5 absolute" />
          <h1 class="text-lg font-semibold mb-4 text-black">Description</h1>
          <textarea class="w-full h-36 p-3" v-model="activeCard.description"></textarea>
        </div>
      </div>
      <div class="col-span-2">
        <Cross class="w-6 h-6 fill-current text-gray-600 relative right-0 top-0"/>
        <div>delete</div>
        <div>copy</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores/store';
import Board from '@/assets/icons/board.svg';
import Cross from '@/assets/icons/cross.svg';
import Downarrow from '@/assets/icons/downarrow.svg';
import Description from '@/assets/icons/description.svg';
import Checkbox from '@/components/Checkbox.vue'
import Card from '@/typings/card';

export default defineComponent({
  setup() {
    const state = store();
    const showCardModule = state.showCardModule;
    const activeCard = state.activeCard
    const cardListName = state.lists.find((c: Card) => c.id === activeCard.listId)!['name'];
    return { state, showCardModule, activeCard, cardListName };
  },
  components: {
    Board,
    Cross,
    Downarrow,
    Checkbox,
    Description
  },
});
</script>

<style>
</style>
