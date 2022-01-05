<template>
  <BoardList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores/store';
import BoardList from '@/components/boardList/BoardList.vue';

export default defineComponent({
  name: 'Home',
  components: {
    BoardList,
  },
  setup() {
    const state = store();
    return { state };
  },
  // sockets: {
  //   boardCreated(message) {
  //     this.state.boardList.all.push(message);
  //   },
  // },
});
</script>
