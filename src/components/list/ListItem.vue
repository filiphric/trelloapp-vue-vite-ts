<template>
  <div
    class="bg-gray2 relative w-list p-1.5 rounded ml-3 shadow-md"
    data-cy="list"
  >
    <div class="flex mb-1">
      <input
        class="text-gray-900 text-sm px-1 py-0.5 flex-grow inline-block font-semibold border-2 border-transparent outline-none focus:border-blue6 rounded-sm cursor-pointer h-8"
        :class="[inputActive ? 'bg-gray1' : 'bg-gray2']"
        data-cy="list-name"
        @focus="
          $event.target.select();
          inputActive = true;
        "
        @change="renameList(list)"
        @keyup.enter="
          $event.target.blur();
          inputActive = false;
        "
        @keyup.esc="
          $event.target.blur();
          inputActive = false;
        "
        v-model="list.name"
        v-click-away="onClickAway"
      />
      <Dropdown @toggleInput="showCardCreate" :list="list" />
    </div>
    <div>
      <CardItem
        v-for="card in state.cards.filter(
          item => item.listId === list.id
        )"
        :key="card.id"
        :card="card"
      />
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
export default defineComponent({
  components: {
    CardItem,
    CardCreateInput,
    Dropdown,
    Plus
  },
  setup() {
    const state = store();
    const renameList = state.renameList;
    return { state, renameList };
  },
  data() {
    return {
      inputActive: false,
      cardCreate: false
    };
  },
  methods: {
    onClickAway() {
      this.inputActive = false;
    },
    showCardCreate(flag: boolean) {
      this.cardCreate = flag;
    }
  },
  props: ['list']
});
</script>

<style lang="postcss" scoped></style>
