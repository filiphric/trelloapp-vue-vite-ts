<template>
  <div
    v-if="state.createListInput"
    v-click-away="onClickAway"
    class="bg-gray2 w-list px-1.5 py-1 cursor-pointer grid rounded-sm ml-3 shadow-md"
  >
    <input
      ref="listCreate"
      v-model="listTitle"
      class="w-full h-9 px-2 py-2 text-sm border-2 border-transparent outline-none focus:border-blue6 rounded-sm"
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
        class="w-8 h-8 p-1 mx-0.5 fill-current text-gray-600 order-last inline-block"
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
    class="bg-white w-list text-sm bg-opacity-20 hover:bg-opacity-30 cursor-pointer p-2.5 rounded ml-3 flex-no-shrink text-gray-50"
    data-cy="create-list"
    @click="enableInput()"
  >
    <Plus class="w-3 h-3 inline-block" /> {{ !state.lists.length ? 'Add a list' : 'Add another list' }}
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
    listCreate: HTMLElement
  },
  components: {
    Cross,
    Plus,
    SaveButton
  },
  props: {
    board: {
      default: null,
      type: Number as PropType<Board['id']>
    }
  },
  setup() {
    const state = store();
    const createList = state.createList;
    return { createList, state };
  },
  data() {
    return {
      listTitle: ''
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
    enableInput: function() {
      this.state.createListInput = true;
      nextTick(() => {
        const listInput = this.$refs.listCreate as HTMLElement;
        listInput.focus();
      });
    },
    onClickAway() {
      this.state.createListInput = false;
      this.listTitle = '';
    }
  }
});
</script>

<style></style>
