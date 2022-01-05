<template>
  <div
    v-click-away="onClickAway"
    class="grid w-full cursor-pointer"
  >
    <textarea
      ref="cardCreate"
      v-model="cardTitle"
      class="py-1 px-2 w-full h-16 text-sm rounded border-b border-gray7 outline-none resize-none"
      data-cy="new-card-input"
      placeholder="Enter a title for this card..."
      @keydown.enter.prevent="addCard"
      @keyup.esc.prevent="
        $emit('toggleInput', false);
        cardTitle = '';
      "
    />
    <div>
      <SaveButton
        buttontext="Add card"
        @click="addCard"
      />
      <Cross
        data-cy="cancel"
        class="inline-block order-last p-1 mx-0.5 w-8 h-8 text-gray-600 fill-current"
        @click.stop="
          $emit('toggleInput', false);
          cardTitle = '';
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { store } from '@/stores/store';
import Cross from '@/assets/icons/cross.svg';
import List from '@/typings/list';
import SaveButton from '@/components/SaveButton.vue';

export default defineComponent({
  components: {
    Cross,
    SaveButton,
  },
  props: {
    list: {
      default: null,
      type: Object as PropType<List>,
    },
  },
  emits: ['toggleInput'],
  setup() {
    const state = store();
    const createCard = state.createCard;
    return { createCard, state };
  },
  data() {
    return {
      cardTitle: '',
    };
  },
  mounted() {
    const cardInput = this.$refs.cardCreate as HTMLElement;
    cardInput.focus();
  },
  methods: {
    addCard() {
      if (!this.cardTitle) {
        return;
      }

      this.createCard({
        boardId: this.state.board.id,
        listId: this.list.id,
        name: this.cardTitle,
      });
      this.cardTitle = '';
    },
    onClickAway() {
      this.$emit('toggleInput', false);
      this.cardTitle = '';
    },
  },
});
</script>

<style></style>
