<template>
  <div>
    <BoardList />
  </div>
</template>

<script lang="ts">
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
    BoardList
  },
  // sockets: {
  //   boardCreated(message) {
  //     this.state.boardList.all.push(message);
  //   },
  // },
});
</script>
