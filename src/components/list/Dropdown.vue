<template>
  <button @click="showDropdown()" data-cy="list-options">
    <Dots
      class="text-gray10 flex-grow-0 border-2 border-transparent inline-block place-self-end hover:bg-gray4 bg-transparent active:bg-gray7 rounded-sm h-8 w-8 p-1.5 cursor-pointer"
    />
  </button>
  <div
    v-if="dropdown"
    class="bg-white absolute rounded-sm top-11 shadow-xl z-10 w-dropdown left-dropdown right-8 py-2"
    data-cy="dropdown"
    v-click-away="onClickAway"
  >
    <div class="text-gray-600 text-sm h-7 mt-0.5 text-center">List actions</div>
    <Cross class="w-8 h-8 px-2 text-gray-600 absolute top-1 right-1 cursor-pointer" @click="dropdown = false" />
    <hr />
    <div class="pt-2">
      <div
        class="text-gray-700 text-sm py-1 block cursor-pointer hover:bg-gray1 px-2 active:bg-gray2"
        data-cy="card-add"
        @click="
          this.$emit('toggleInput', true);
          dropdown = false;
        "
      >
        Add card...
      </div>
      <div
        class="text-red-600 text-sm py-1 block cursor-pointer hover:bg-gray1 px-2 active:bg-gray2"
        @click="
          deleteList(list.id);
          showDropdown();
        "
        data-cy="delete-list"
      >
        Delete this list
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores/store';
import Cross from '@/assets/icons/cross.svg';
import Dots from '@/assets/icons/dots.svg';
export default defineComponent({
  setup() {
    const { deleteList } = store();
    return { deleteList };
  },
  data() {
    return {
      dropdown: false,
      id: this.list.id
    };
  },
  components: {
    Dots,
    Cross
  },
  emits: ['toggleInput'],
  props: ['list'],
  methods: {
    showDropdown() {
      this.dropdown = !this.dropdown;
    },
    onClickAway() {
      this.dropdown = false;
    }
  }
});
</script>

<style></style>
