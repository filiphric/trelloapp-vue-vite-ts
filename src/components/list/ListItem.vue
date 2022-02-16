<template>
  <div
    class="relative p-1.5 mb-32 ml-3 w-list bg-gray2 rounded shadow-md"
    data-cy="list"
    @dragenter="isDragging = true"
    @dragleave="isDragging = false"
  >
    <div class="flex mb-1">
      <input
        v-click-away="onClickAway"
        class="inline-block py-0.5 px-1 h-8 text-sm font-semibold text-gray-900 bg-gray2 focus:bg-gray1 rounded-sm border-2 border-transparent focus:border-blue6 outline-none cursor-pointer flex-grow"
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
        @blur="inputActive = false"
      >
      <Dropdown
        :list="list"
        @toggle-input="showCardCreate"
      />
    </div>
    <div
      data-cy="card-list"
      :class="isDragging ?? 'min-h-[100px]'"
    >
      <div
        v-if="state.loadingListCards[list.id]"
        class="block place-self-center text-xs text-center"
      >
        <LoadingIcon class="inline-block mb-1" />&nbsp;&nbsp;Loading cards ...
      </div>
      <draggable
        :list="list.cards"
        animation="150"
        group="cards"
        ghost-class="bg-gray2"
        @change="sortCards"
      >
        <template #item="{ element }">
          <CardItem :card="element" />
        </template>
      </draggable>
      <div
        v-if="!cardCreate"
        class="py-1.5 px-2 text-sm font-normal text-gray-500 hover:text-gray-600 hover:bg-gray4 rounded-md cursor-pointer"
        data-cy="new-card"
        @click="showCardCreate(true)"
      >
        <Plus class="inline-block w-3 h-3" />Add another card
      </div>
      <CardCreateInput
        v-else
        :list="list"
        @toggle-input="showCardCreate"
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
import LoadingIcon from '@/assets/icons/loadingIcon.svg';

export default defineComponent({
  components: {
    CardCreateInput,
    CardItem,
    Dropdown,
    Plus,
    draggable,
    LoadingIcon,
  },
  props: {
    list: {
      default: null,
      type: Object as PropType<List>,
    },
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
      isDragging: false,
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
    },
  },
});
</script>

<style lang="postcss" scoped></style>
