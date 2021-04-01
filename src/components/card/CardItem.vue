<template>
  <div>
    <div
      class="flex bg-white relative px-2 py-1.5 rounded border-b border-gray7 cursor-pointer hover:bg-gray1 my-1.5"
      @mouseover="showEdit = true"
      @mouseout="showEdit = false"
    >
      <div
        class="inline-block flex-grow select-none text-sm text-gray-800"
        style="white-space: break-spaces"
      >
        {{ card.name }}
      </div>
      <Pen
        class="absolute right-2 top-2 inline-block p-1 w-5 h-5 text-gray-700 bg-gray1 bg-opacity-60"
        v-if="showEdit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Pen from '@/assets/icons/pen.svg';
export default defineComponent({
  components: {
    Pen
  },
  data: function() {
    return {
      showEdit: false
    };
  },
  props: ['card']
});
</script>

<style></style>
