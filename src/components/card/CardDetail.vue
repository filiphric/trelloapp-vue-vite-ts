<template>
  <div
    class="bg-backdrop flex justify-center items-center fixed top-0 left-0 h-full w-full z-40"
    data-cy="card-detail-backdrop"
    @click.self="state.showCardModule(state.activeCard.id, false)"
  >
    <div
      class="bg-gray2 w-cardDetail h-5/6 p-8 grid grid-cols-8 gap-x-2 overflow-scroll"
      data-cy="card-detail"
    >
      <div class="col-span-6 text-gray-800">
        <div class="ml-9 mb-4">
          <div class="inline-block">
            <Board class="stroke-current fill-current text-gray-800 -ml-8 -mb-1 w-5 h-5" />
          </div>
          <input
            v-model="state.activeCard.name"
            v-click-away="clickAwayCardName"
            class="font-bold rounded-sm cursor-pointer bg-gray2 py-1 focus:px-1.5 focus:bg-white w-full"
            data-cy="card-detail-title"
            @focus="
              selectInput($event);
              inputActive = true;
            "
            @change="state.patchCard(state.activeCard, { name: state.activeCard.name })"
            @keyup.enter="
              blurInput($event);
              inputActive = false;
            "
            @keyup.esc="
              blurInput($event);
              inputActive = false;
            "
          >
          <h2 class="text-sm text-gray10">
            in list <span class="underline">{{ cardListName }}</span>
          </h2>
        </div>
        <div class="ml-9 mb-4">
          <h2 class="text-sm block text-gray10 cursor-default">
            DUE DATE
          </h2>
          <div class="inline-block mt-2">
            <Checkbox :card="state.activeCard" />
            <h2 class="inline-block px-4 py-1 rounded-sm font-light text-gray-800 bg-gray3 hover:bg-gray5 cursor-default">
              {{ new Date(state.activeCard.deadline).toDateString() }}
              <div
                v-show="state.activeCard.completed"
                class="text-sm bg-green5 inline-block text-white px-2 mx-1 rounded-sm"
              >
                COMPLETED
              </div>
              <div
                v-show="overdue(state.activeCard) && !state.activeCard.completed"
                class="text-sm bg-red-500 inline-block text-white px-2 mx-1 rounded-sm"
              >
                OVERDUE
              </div>
              <button
                data-cy="calendar-dropdown"
                @click="showDate = true"
              >
                <Downarrow class="stroke-current fill-current text-gray-800 w-5 py-2 pl-2 inline-block cursor-pointer" />
              </button>
            </h2>
            <div
              v-if="showDate"
              class="w-full absolute"
            >
              <DatePicker
                v-model="state.activeCard.deadline"
                v-click-away="clickAwayDate"
                :model-config="modelConfig"
                class="shadow-lg"
                data-cy="card-detail-deadline"
                @dayclick="
                  state.patchCard(state.activeCard, { deadline: state.activeCard.deadline });
                  showDate = false;
                "
              />
            </div>
          </div>
        </div>
        <div class="ml-9 mb-4">
          <div class="inline-block">
            <Description class="stroke-current fill-current text-gray-800 -ml-8 -mb-1 w-5 h-5" />
          </div>
          <h1 class="text-lg font-semibold mb-4 text-black inline-block">
            Description
          </h1>
          <textarea
            v-model="state.activeCard.description"
            class="w-full h-36 p-3 resize-none"
          />
        </div>
        <div class="ml-9 mb-4">
          <div class="inline-block">
            <Attachment class="stroke-current fill-current text-gray-800 -ml-8 -mb-1 w-5 h-5" />
          </div>
          <h1 class="text-lg font-semibold mb-4 text-black inline-block">
            Attachment
          </h1>
          <div
            v-if="state.activeCard.image"
            class="grid grid-cols-6 gap-x-4"
            data-cy="image-attachment"
          >
            <div class="col-span-2 row-span-2">
              <img :src="'/backend' + state.activeCard.image">
            </div>
            <div class="font-bold col-span-4">
              {{ state.activeCard.image.replace(`/data/uploaded/${state.activeCard.id}_`, '') }}
              <div
                class="block underline cursor-pointer font-normal"
                data-cy="image-delete"
                @click="state.patchCard(state.activeCard, { image: null })"
              >
                <Cross class="inline-block w-4 mb-1" />Delete
              </div>
            </div>
          </div>
          <Dropzone
            v-else
            :card="state.activeCard"
          />
        </div>
      </div>
      <div class="col-span-2 grid content-start gap-y-2">
        <div class="self-end cursor-pointer place-self-end hover:bg-gray5 w-8 h-8 grid place-content-center">
          <Cross
            class="w-6 h-6 fill-current text-gray-600"
            @click="state.showCardModule(state.activeCard.id, false)"
          />
        </div>
        <div
          class="bg-gray3 px-2 py-0.5 text-sm rounded-sm text-gray-600 cursor-pointer hover:bg-gray5"
          data-cy="calendar-button"
          @click="showDate = true"
        >
          <Clock class="w-4 inline-block mr-2 mb-0.5" />Due date
        </div>
        <div
          class="bg-gray3 px-2 py-0.5 text-sm rounded-sm text-gray-600 cursor-pointer hover:bg-gray5"
          data-cy="copy-properties"
          @click="copyProperties(state.activeCard)"
        >
          <Copy class="w-4 inline-block mr-2 mb-0.5" />Copy attributes
        </div>
        <div
          class="bg-gray3 px-2 py-0.5 text-sm rounded-sm text-gray-600 cursor-pointer hover:bg-gray5"
          data-cy="card-detail-delete"
          @click="state.deleteCard(state.activeCard)"
        >
          <Trash class="w-4 inline-block mr-2 mb-0.5" />Delete card
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DatePicker } from 'v-calendar';
import { blurInput } from '@/utils/blurInput';
import { defineComponent } from 'vue';
import { selectInput } from '@/utils/selectInput';
import { store } from '@/stores/store';
import Attachment from '@/assets/icons/attachment.svg';
import Board from '@/assets/icons/board.svg';
import Card from '@/typings/card';
import Checkbox from '@/components/Checkbox.vue';
import Clock from '@/assets/icons/clock.svg';
import Copy from '@/assets/icons/copy.svg';
import Cross from '@/assets/icons/cross.svg';
import Description from '@/assets/icons/description.svg';
import Downarrow from '@/assets/icons/downarrow.svg';
import Dropzone from '../Dropzone.vue';
import List from '@/typings/list';
import Trash from '@/assets/icons/trash.svg';
import moment from 'moment';

export default defineComponent({
  components: {
    Attachment,
    Board,
    Checkbox,
    Clock,
    Copy,
    Cross,
    DatePicker,
    Description,
    Downarrow,
    Dropzone,
    Trash
  },
  setup() {
    const state = store();
    const cardListName = state.lists.find((l: List) => l.id === state.activeCard.listId)!['name'];
    return { state, cardListName, blurInput, selectInput };
  },
  data() {
    return {
      showDate: false,
      inputActive: false,
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD'
      }
    };
  },
  methods: {
    clickAwayCardName() {
      this.inputActive = false;
    },
    clickAwayDate() {
      this.showDate = false;
    },
    copyProperties(content: Card) {
      const clipBoardValue = JSON.stringify(content, null, 2);
      const clipboard = window.navigator.clipboard;
      this.state.showNotification('Card info copied to clipboard', false);
      return clipboard.writeText(clipBoardValue);
    },
    overdue: (card: Card) => {
      return card.deadline && moment(card.deadline).diff(moment().startOf('day'), 'days') < 1;
    }
  }
});

function ref(arg0: boolean) {
  throw new Error('Function not implemented.');
}
</script>

<style></style>
