<template>
  <div class="bg-gray2 relative w-list p-1.5 rounded ml-3 shadow-md mb-32" data-cy="list">
    <div class="flex mb-1">
      <input
        class="text-gray-900 text-sm px-1 py-0.5 flex-grow inline-block font-semibold border-2 border-transparent outline-none focus:border-blue6 rounded-sm cursor-pointer h-8 bg-gray2 focus:bg-gray1"
        data-cy="list-name"
        @mouseup="
          $event.target.select();
          inputActive = true;
        "
        @change="state.patchList(list, { name: list.name })"
        @keyup.enter="
          $event.target.blur();
          inputActive = false;
        "
        @keyup.esc="
          $event.target.blur();
          inputActive = false;
        "
        @blur="inputActive = false"
        v-model="list.name"
        v-click-away="onClickAway"
      />
      <Dropdown @toggleInput="showCardCreate" :list="list" />
    </div>
    <div>
      <draggable :list="list.cards" animation="150" group="cards" @change="sortCards">
        <template #item="{element}">
          <CardItem :card="element" />
        </template>
      </draggable>
      <div
        v-if="!cardCreate"
        @click="showCardCreate(true)"
        class="text-gray-500 hover:text-gray-600 hover:bg-gray4 px-2 py-1.5 cursor-pointer font-normal text-sm rounded-md"
        data-cy="new-card"
      >
        <Plus class="w-3 h-3 inline-block" />Add another card
      </div>
      <CardCreateInput v-else :list="list" @toggleInput="showCardCreate" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores/store';
import Plus from '@/assets/icons/plus.svg';
import CardItem from '@/components/card/CardItem.vue';
import CardCreateInput from '@/components/card/CardCreateInput.vue';
import Dropdown from '@/components/list/Dropdown.vue';
import draggable from 'vuedraggable';
import Card from '@/typings/card';
import List from '@/typings/list';
export default defineComponent({
  components: {
    CardItem,
    CardCreateInput,
    Dropdown,
    Plus,
    draggable
  },
  setup() {
    const state = store();
    return { state };
  },
  data() {
    return {
      inputActive: false,
      cardCreate: false,
      drag: false
    };
  },
  methods: {
    onClickAway() {
      this.inputActive = false;
    },
    showCardCreate(flag: boolean) {
      this.cardCreate = flag;
    },
    sortCards() {
      const listIndex = this.state.lists.findIndex((l: List) => l.id === this.list.id);
      this.state.lists[listIndex].cards.forEach((card: Card, order: number) => {
        this.state.patchCard(card, { order, listId: this.list.id });
      });
    }
  },
  props: ['list']
});
</script>

<style lang="postcss" scoped></style>
