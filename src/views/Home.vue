<template>
  <div>
    <Navbar />
    <BoardList />
  </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import BoardList from '@/components/board/BoardList.vue';
import { defineComponent } from 'vue';
import { store } from '@/stores/store';

export default defineComponent({
  setup() {
    const state = store()
    return { state }
  },
  name: 'Home',
  components: {
    Navbar,
    BoardList
  },
  // sockets: {
  //   boardCreated(message) {
  //     this.state.boardList.all.push(message);
  //   },
  // },
});
</script>
