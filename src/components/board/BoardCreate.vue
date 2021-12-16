<template>
  <div
    v-click-away="onClickAway"
    data-cy="create-board"
    class="create-board"
    :class="{ 'hover:bg-gray7': !newBoardInputActive }"
    @click.prevent="focusNewBoardInput"
  >
    <h1 v-show="!newBoardInputActive">
      Create new board
    </h1>
    <input
      v-show="newBoardInputActive"
      ref="boardCreateInput"
      v-model="newBoardTitle"
      class="new-board-input"
      data-cy="new-board-input"
      placeholder="Add board title"
      @keyup.enter.prevent="createBoard(newBoardTitle)"
    >
    <div
      v-if="newBoardInputActive"
      class="active"
    >
      <Cross
        class="icon"
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
<style lang="postcss" scoped>
h1 {
  @apply text-white
}

.active {
  @apply
    flex
    flex-row-reverse
    items-end
    justify-items-end
}

.new-board-input {
  @apply 
    border-2 border-transparent
    focus:border-blue6
    h-9
    outline-none
    px-2
    rounded-sm
    w-full
}

.create-board {
  @apply 
    bg-gray6 
    cursor-pointer 
    grid 
    h-36 
    px-4 
    py-3 
    rounded-sm
    w-72 
}

.icon {
  @apply
    fill-current
    h-9
    mx-1
    order-last
    px-2
    text-gray-600
    w-9
}
</style>