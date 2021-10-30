<template>
  <div
    class="bg-gray6 w-72 h-36 px-4 py-3 cursor-pointer grid rounded-sm"
    data-cy="create-board"
    :class="{ 'hover:bg-gray7': !newBoardInputActive }"
    @click.prevent="toggleNewBoardInput(true)"
    v-click-away="onClickAway"
  >
    <h1 class="text-white" v-show="!newBoardInputActive">Create new board</h1>
    <input
      class="w-full h-9 px-2 border-2 border-transparent outline-none focus:border-blue6 rounded-sm"
      data-cy="new-board-input"
      placeholder="Add board title"
      v-model="newBoardTitle"
      v-on:keyup.enter.prevent="createBoard(newBoardTitle)"
      v-show="newBoardInputActive"
      ref="boardCreateInput"
    />
    <div class="flex flex-row-reverse items-end justify-items-end" v-if="newBoardInputActive">
      <Cross class="w-9 h-9 px-2 mx-1 fill-current text-gray-600 order-last" @click.stop="newBoardInputActive = false" />
      <SaveButton data-cy="new-board-create" @click.stop="createBoard(newBoardTitle)" buttonText="Create board" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';
import Cross from '@/assets/icons/cross.svg';
import SaveButton from '../SaveButton.vue';
import { createBoard } from '@/stores/actions/createBoard';
export default defineComponent({

  setup() {
    const newBoardTitle = ref('')
    const newBoardInputActive = ref(false)
    const boardCreateInput = ref()
    return { createBoard, newBoardTitle, newBoardInputActive, boardCreateInput };
  },
  components: {
    Cross,
    SaveButton
  },
  methods: {
    onClickAway() {
      this.newBoardInputActive = false;
      this.newBoardTitle = '';
    },
    toggleNewBoardInput: function(flag: boolean) {
      this.newBoardInputActive = flag;
      nextTick(() => {
        const boardInput = this.$refs.boardCreateInput as HTMLElement;
        boardInput.focus();
      });
    }
  },
  name: 'BoardCreate'
});
</script>

<style lang="postcss" scoped></style>
