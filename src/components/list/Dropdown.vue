<template>
  <button
    data-cy="list-options"
    @click="showDropdown()"
  >
    <Dots
      class="inline-block place-self-end p-1.5 w-8 h-8 text-gray10 bg-transparent hover:bg-gray4 active:bg-gray7 rounded-sm border-2 border-transparent cursor-pointer flex-grow-0"
    />
  </button>
  <div
    v-if="dropdown"
    v-click-away="onClickAway"
    class="absolute top-11 right-8 left-dropdown z-10 py-2 w-dropdown bg-white rounded-sm shadow-xl"
    data-cy="dropdown"
  >
    <div class="mt-0.5 h-7 text-sm text-center text-gray-600">
      List actions
    </div>
    <Cross
      class="absolute top-1 right-1 px-2 w-8 h-8 text-gray-600 cursor-pointer"
      @click="dropdown = false"
    />
    <hr>
    <div class="pt-2">
      <div
        class="block py-1 px-2 text-sm text-gray-700 hover:bg-gray1 active:bg-gray2 cursor-pointer"
        data-cy="card-add"
        @click="
          $emit('toggle-input', true);
          dropdown = false;
        "
      >
        Add card...
      </div>
      <div
        class="block py-1 px-2 text-sm text-red-600 hover:bg-gray1 active:bg-gray2 cursor-pointer"
        data-cy="delete-list"
        @click="
          deleteList(list.id);
          showDropdown();
        "
      >
        Delete this list
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useStore } from '@/store/store';
import Cross from '@/assets/icons/cross.svg';
import Dots from '@/assets/icons/dots.svg';
import List from '@/typings/list';

defineProps({
  list: {
    default: null,
    type: Object as PropType<List>,
  },
});

defineEmits(['toggle-input']);
const { deleteList } = useStore();
const dropdown = ref(false);
const onClickAway = () => {
  dropdown.value = false;
};
const showDropdown = () => {
  dropdown.value = !dropdown.value;
};
</script>

<style></style>
