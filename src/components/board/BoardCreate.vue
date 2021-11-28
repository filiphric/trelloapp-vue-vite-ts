<template>
  <div
    v-click-away="onClickAway"
    class="bg-gray6 w-72 h-36 px-4 py-3 cursor-pointer grid rounded-sm"
    data-cy="create-board"
    :class="{ 'hover:bg-gray7': !newBoardInputActive }"
    @click.prevent="focusNewBoardInput"
  >
    <h1
      v-show="!newBoardInputActive"
      class="text-white"
    >
      Create new board
    </h1>
    <input
      v-show="newBoardInputActive"
      ref="boardCreateInput"
      v-model="newBoardTitle"
      class="
        w-full
        h-9
        px-2
        border-2 border-transparent
        outline-none
        focus:border-blue6
        rounded-sm
      "
      data-cy="new-board-input"
      placeholder="Add board title"
      @keyup.enter.prevent="createBoard(newBoardTitle)"
    >
    <div
      v-if="newBoardInputActive"
      class="flex flex-row-reverse items-end justify-items-end"
    >
      <Cross
        class="w-9 h-9 px-2 mx-1 fill-current text-gray-600 order-last"
        @click.stop="newBoardInputActive = false"
      />
      <SaveButton
        data-cy="new-board-create"
        buttontext="Create board"
        @click.stop="createBoard(newBoardTitle)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';
import { store } from '@/stores/store';
import Cross from '@/assets/icons/cross.svg';
import SaveButton from '../SaveButton.vue';
export default defineComponent({
  name: 'BoardCreate',
  components: {
    Cross,
    SaveButton
  },
  setup() {
    let newBoardTitle = ref();
    let newBoardInputActive = ref(false);
    const boardCreateInput = ref();
    const createBoard = store().createBoard;
    const onClickAway = () => {
      newBoardInputActive.value = false;
      newBoardTitle.value = '';
    };
    const focusNewBoardInput = () => {
      newBoardInputActive.value = true;
      nextTick(() => {
        boardCreateInput.value.focus();
      });
    };
    return {
      createBoard,
      newBoardInputActive,
      newBoardTitle,
      boardCreateInput,
      onClickAway,
      focusNewBoardInput
    };
  },
  methods: {}
});
</script>
