<template>
  <div
    class="list bg-gray2 relative w-list p-1.5 rounded ml-3 shadow-md mb-32"
    data-cy="list"
    @dragenter="isDragging = true"
    @dragleave="isDragging = false"
  >
    <div class="flex mb-1">
      <input
        v-click-away="onClickAway"
        class="text-gray-900 text-sm px-1 py-0.5 flex-grow inline-block font-semibold border-2 border-transparent outline-none focus:border-blue6 rounded-sm cursor-pointer h-8 bg-gray2 focus:bg-gray1"
        data-cy="list-name"
        :value="list.name"
        @mouseup="
          selectInput($event);
          inputActive = true;
        "
        @change="state.patchList(list, { name: inputValue($event) })"
        @keyup.enter="
          blurInput($event);
          inputActive = false;
        "
        @keyup.esc="
          blurInput($event);
          inputActive = false;
        "
        @blur="inputActive = false"
      >
      <Dropdown
        :list="list"
        @toggleInput="showCardCreate"
      />
    </div>
    <div
      data-cy="card-list"
      :class="isDragging ?? 'min-h-[100px]'"
    >
      <draggable
        :list="list.cards"
        animation="150"
        group="cards"
        ghost-class="bg-gray2"
        @change="sortCards"
      >
        <template #item="{element}">
          <CardItem :card="element" />
        </template>
      </draggable>
      <div
        v-if="!cardCreate"
        class="text-gray-500 hover:text-gray-600 hover:bg-gray4 px-2 py-1.5 cursor-pointer font-normal text-sm rounded-md"
        data-cy="new-card"
        @click="showCardCreate(true)"
      >
        <Plus class="w-3 h-3 inline-block" />Add another card
      </div>
      <CardCreateInput
        v-else
        :list="list"
        @toggleInput="showCardCreate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { blurInput } from '@/utils/blurInput';
import { inputValue } from '@/utils/inputValue';
import { selectInput } from '@/utils/selectInput';
import { store } from '@/stores/store';
import Card from '@/typings/card';
import CardCreateInput from '@/components/card/CardCreateInput.vue';
import CardItem from '@/components/card/CardItem.vue';
import Dropdown from '@/components/list/Dropdown.vue';
import List from '@/typings/list';
import Plus from '@/assets/icons/plus.svg';
import draggable from 'vuedraggable';

export default defineComponent({
  components: {
    CardCreateInput,
    CardItem,
    Dropdown,
    Plus,
    draggable
  },
  props: {
    list: {
      default: null,
      type: Object as PropType<List>
    }
  },
  setup() {
    const state = store();
    return { blurInput, inputValue, selectInput, state };
  },
  data() {
    return {
      cardCreate: false,
      drag: false,
      inputActive: false,
      isDragging: false
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
        this.state.patchCard(card, { listId: this.list.id, order });
      });
    }
  }
});
</script>

<style lang="postcss" scoped></style>
