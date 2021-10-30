<template>
  <div v-if="state.createListInput" class="bg-gray2 w-list px-1.5 py-1 cursor-pointer grid rounded-sm ml-3 shadow-md" v-click-away="onClickAway">
    <input
      class="w-full h-9 px-2 py-2 text-sm border-2 border-transparent outline-none focus:border-blue6 rounded-sm"
      data-cy="add-list-input"
      v-model="listTitle"
      v-on:keyup.enter.prevent="addList()"
      v-on:keyup.esc.prevent="
        state.createListInput = false;
        listTitle = '';
      "
      placeholder="Enter list title..."
      ref="listCreate"
    />
    <div data-cy="add-list-options">
      <SaveButton buttonText="Add list" data-cy="save" @click="addList()" />
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
    class="bg-white w-list text-sm bg-opacity-20 hover:bg-opacity-30 cursor-pointer p-2.5 rounded ml-3 flex-no-shrink text-gray-50"
    data-cy="create-list"
    v-else
    @click="enableInput()"
  >
    <Plus class="w-3 h-3 inline-block" /> {{ !this.state.lists.length ? 'Add a list' : 'Add another list' }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores/store';
import Plus from '@/assets/icons/plus.svg';
import Cross from '@/assets/icons/cross.svg';
import SaveButton from '@/components/SaveButton.vue';
export default defineComponent({
  components: {
    Plus,
    SaveButton,
    Cross
  },
  setup() {
    const state = store();
    const createList = state.createList;
    return { state, createList };
  },

  data() {
    return {
      listTitle: ''
    };
  },
  $refs: {
    listCreate: HTMLFormElement
  },
  props: ['board'],
  methods: {
    onClickAway() {
      this.state.createListInput = false;
      this.listTitle = '';
    },
    enableInput: function() {
      this.state.createListInput = true;
      this.$nextTick(() => {
        const listInput = this.$refs.listCreate as HTMLElement;
        listInput.focus();
      });
    },
    addList() {
      if (!this.listTitle) {
        return;
      }

      const boardId = this.state.board.id;
      const name = this.listTitle;

      this.createList(boardId, name);

      this.listTitle = '';
    }
  }
});
</script>

<style></style>
