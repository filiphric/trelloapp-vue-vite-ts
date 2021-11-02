<template>
  <div
    v-click-away="onClickAway"
    class="w-full cursor-pointer grid"
  >
    <textarea
      ref="cardCreate"
      v-model="cardTitle"
      class="resize-none w-full h-16 px-2 py-1 text-sm outline-none rounded border-b border-gray7"
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
        class="w-8 h-8 p-1 mx-0.5 fill-current text-gray-600 order-last inline-block"
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
    SaveButton
  },
  props: {
    list: {
      default: null,
      type: Object as PropType<List>
    }
  },
  emits: ['toggleInput'],
  setup() {
    const state = store();
    const createCard = state.createCard;
    return { createCard, state };
  },
  data() {
    return {
      cardTitle: ''
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
        name: this.cardTitle
      });
      this.cardTitle = '';
    },
    onClickAway() {
      this.$emit('toggleInput', false);
      this.cardTitle = '';
    }
  }
});
</script>

<style></style>
