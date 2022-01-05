<template>
  <div
    v-if="state.createListInput"
    v-click-away="onClickAway"
    class="grid py-1 px-1.5 ml-3 w-list bg-gray2 rounded-sm shadow-md cursor-pointer"
  >
    <input
      ref="listCreate"
      v-model="listTitle"
      class="py-2 px-2 w-full h-9 text-sm rounded-sm border-2 border-transparent focus:border-blue6 outline-none"
      data-cy="add-list-input"
      placeholder="Enter list title..."
      @keyup.enter.prevent="addList()"
      @keyup.esc.prevent="
        state.createListInput = false;
        listTitle = '';
      "
    >
    <div>
      <SaveButton
        buttontext="Add list"
        @click="addList()"
      />
      <Cross
        class="inline-block order-last p-1 mx-0.5 w-8 h-8 text-gray-600 fill-current"
        data-cy="cancel"
        @click.stop="
          state.createListInput = false;
          listTitle = '';
        "
      />
    </div>
  </div>
  <div
    v-else
    class="p-2.5 ml-3 w-list text-sm text-gray-50 bg-white rounded cursor-pointer bg-opacity-20 hover:bg-opacity-30 flex-no-shrink"
    data-cy="create-list"
    @click="enableInput()"
  >
    <Plus class="inline-block w-3 h-3" /> {{ !state.lists.length ? 'Add a list' : 'Add another list' }}
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, nextTick } from 'vue';
import { store } from '@/stores/store';
import Board from '@/typings/board';
import Cross from '@/assets/icons/cross.svg';
import Plus from '@/assets/icons/plus.svg';
import SaveButton from '@/components/SaveButton.vue';
export default defineComponent({
  $refs: {
    listCreate: HTMLElement,
  },
  components: {
    Cross,
    Plus,
    SaveButton,
  },
  props: {
    board: {
      default: null,
      type: Number as PropType<Board['id']>,
    },
  },
  setup() {
    const state = store();
    const createList = state.createList;
    return { createList, state };
  },
  data() {
    return {
      listTitle: '',
    };
  },
  methods: {
    addList() {
      if (!this.listTitle) {
        return;
      }

      const boardId = this.state.board.id;
      const name = this.listTitle;

      this.createList(boardId, name);

      this.listTitle = '';
    },
    enableInput: function () {
      this.state.createListInput = true;
      nextTick(() => {
        const listInput = this.$refs.listCreate as HTMLElement;
        listInput.focus();
      });
    },
    onClickAway() {
      this.state.createListInput = false;
      this.listTitle = '';
    },
  },
});
</script>

<style></style>
