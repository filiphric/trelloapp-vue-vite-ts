<template>
  <div class="grid grid-cols-2 items-stretch h-screen px-20 gap-x-8 z-10">
    <div class="grid content-center">
      <h1 class="font-bold text-3xl mb-8">Get started!</h1>
      <p>Go ahead and create your first board!</p>
      <input
        type="text"
        data-cy="first-board"
        class="h-8 mt-4 w-full rounded-sm px-2 bg-white border-2"
        placeholder="Name of your first board"
        name="newBoard"
        v-model="newBoardTitle"
        v-on:keyup.enter.prevent="createNewBoard()"
      />
    </div>
    <img class="place-self-center self-center gap-x-5" :src="Start" />
  </div>
</template>

<script>
import Start from '@/assets/start.png';
import { store } from '@/stores/store';
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  setup() {
    const state = store();
    return { Start, state };
  },
  data: function() {
    return {
      newBoardTitle: ''
    };
  },
  methods: {
    createNewBoard() {
      if (!this.newBoardTitle) {
        return;
      }
      axios
        .post('/api/boards', { name: this.newBoardTitle })
        .then(({ data }) => {
          this.$router.push(`/board/${data.id}`);
        })
        .catch(() => {
          this.state.showNotification('There was an error creating board', true);
        });
      this.newBoardTitle = '';
    }
  }
});
</script>

<style></style>
