<template>
  <div
    class="bg-gray6 w-80 h-36 px-4 py-3 cursor-pointer grid rounded-sm"
    data-cy="create-board"
    :class="{ 'hover:bg-gray7': !newBoardInputActive }"
    @click.prevent="toggleNewBoardInput(true)"
    v-click-away="onClickAway"
  >
    <h1 class="text-white" v-show="!newBoardInputActive">Create new board</h1>
    <input
      class="w-full h-9 px-2 border-2 border-transparent outline-none focus:border-blue6 rounded-sm"
      data-cy="new-board-input"
      v-model="newBoardTitle"
      v-on:keyup.enter.prevent="createNewBoard()"
      placeholder="Add board title"
      v-if="newBoardInputActive"
      ref="boardCreate"
    />
    <div
      class="flex flex-row-reverse items-end justify-items-end"
      v-if="newBoardInputActive"
    >
      <Cross
        class="w-9 h-9 px-2 mx-1 fill-current text-gray-600 order-last"
        @click.stop="newBoardInputActive = false"
      />
      <SaveButton
        data-cy="new-board-create"
        @click.stop="createNewBoard()"
        buttonText="Create board"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import Cross from '@/assets/icons/cross.svg';
import SaveButton from '../SaveButton.vue';
import { store } from '@/stores/store';
export default defineComponent({
  setup() {
    const state = store();
    return { state };
  },
  data: function() {
    return {
      newBoardTitle: '',
      newBoardInputActive: false
    };
  },
  components: {
    Cross,
    SaveButton
  },
  $refs: {
    boardCreate: HTMLFormElement
  },
  methods: {
    onClickAway() {
      this.newBoardInputActive = false;
      this.newBoardTitle = '';
    },
    createNewBoard() {
      if (!this.newBoardTitle) {
        return;
      }
      // send api request to create a board
      axios
        .post('/api/boards', { name: this.newBoardTitle })
        .then(({ data }) => {
          this.$router.push(`/board/${data.id}`);
        })
        .catch(() => {
          this.state.showNotification('There was an error creating board', true);
        });
      this.newBoardTitle = '';
    },
    toggleNewBoardInput: function(flag: boolean) {
      this.newBoardInputActive = flag;
      this.$nextTick(() => {
        const boardInput = this.$refs.boardCreate as HTMLElement;
        boardInput.focus();
      });
    }
  },
  name: 'BoardCreate'
});
</script>

<style lang="postcss" scoped></style>
