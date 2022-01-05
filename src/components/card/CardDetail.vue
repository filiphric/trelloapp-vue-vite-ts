<template>
  <div
    class="flex fixed top-0 left-0 z-40 justify-center items-center w-full h-full bg-backdrop"
    data-cy="card-detail-backdrop"
    @click.self="state.showCardModule(state.activeCard.id, false)"
  >
    <div
      class="grid overflow-scroll grid-cols-8 gap-x-2 p-8 w-cardDetail h-5/6 bg-gray2"
      data-cy="card-detail"
    >
      <div class="col-span-6 text-gray-800">
        <div class="mb-4 ml-9">
          <div class="inline-block">
            <Board class="-mb-1 -ml-8 w-5 h-5 text-gray-800 fill-current stroke-current" />
          </div>
          <input
            v-model="state.activeCard.name"
            v-click-away="clickAwayCardName"
            class="py-1 focus:px-1.5 w-full font-bold bg-gray2 focus:bg-white rounded-sm cursor-pointer"
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
        <div class="mb-4 ml-9">
          <h2 class="block text-sm text-gray10 cursor-default">
            DUE DATE
          </h2>
          <div class="inline-block mt-2">
            <Checkbox :card="state.activeCard" />
            <h2 class="inline-block py-1 px-4 font-light text-gray-800 bg-gray3 hover:bg-gray5 rounded-sm cursor-default">
              {{ new Date(state.activeCard.deadline).toDateString() }}
              <div
                v-show="state.activeCard.completed"
                class="inline-block px-2 mx-1 text-sm text-white bg-green5 rounded-sm"
              >
                COMPLETED
              </div>
              <div
                v-show="overdue(state.activeCard) && !state.activeCard.completed"
                class="inline-block px-2 mx-1 text-sm text-white bg-red-500 rounded-sm"
              >
                OVERDUE
              </div>
              <button
                data-cy="calendar-dropdown"
                @click="showDate = true"
              >
                <Downarrow class="inline-block py-2 pl-2 w-5 text-gray-800 cursor-pointer fill-current stroke-current" />
              </button>
            </h2>
            <div
              v-if="showDate"
              class="absolute w-full"
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
        <div class="mb-4 ml-9">
          <div class="inline-block">
            <Description class="-mb-1 -ml-8 w-5 h-5 text-gray-800 fill-current stroke-current" />
          </div>
          <h1 class="inline-block mb-4 text-lg font-semibold text-black">
            Description
          </h1>
          <textarea
            v-model="state.activeCard.description"
            class="p-3 w-full h-36 resize-none"
            data-cy="card-description"
          />
        </div>
        <div class="mb-4 ml-9">
          <div class="inline-block">
            <Attachment class="-mb-1 -ml-8 w-5 h-5 text-gray-800 fill-current stroke-current" />
          </div>
          <h1 class="inline-block mb-4 text-lg font-semibold text-black">
            Image
          </h1>
          <div
            v-if="state.activeCard.image"
            class="grid grid-cols-6 gap-x-4"
            data-cy="image-attachment"
          >
            <div class="col-span-2 row-span-2">
              <img :src="'/backend' + state.activeCard.image">
            </div>
            <div class="col-span-4 font-bold">
              {{ state.activeCard.image.replace(`/data/uploaded/${state.activeCard.id}_`, '') }}
              <div
                class="block font-normal underline cursor-pointer"
                data-cy="image-delete"
                @click="state.patchCard(state.activeCard, { image: null })"
              >
                <Cross class="inline-block mb-1 w-4" />Delete
              </div>
            </div>
          </div>
          <Dropzone
            v-else
            :card="state.activeCard"
          />
        </div>
      </div>
      <div class="grid col-span-2 gap-y-2 content-start">
        <div class="grid self-end place-content-center place-self-end w-8 h-8 hover:bg-gray5 cursor-pointer">
          <Cross
            class="w-6 h-6 text-gray-600 fill-current"
            @click="state.showCardModule(state.activeCard.id, false)"
          />
        </div>
        <div
          class="py-0.5 px-2 text-sm text-gray-600 bg-gray3 hover:bg-gray5 rounded-sm cursor-pointer"
          data-cy="calendar-button"
          @click="showDate = true"
        >
          <Clock class="inline-block mr-2 mb-0.5 w-4" />Due date
        </div>
        <div
          class="py-0.5 px-2 text-sm text-gray-600 bg-gray3 hover:bg-gray5 rounded-sm cursor-pointer"
          data-cy="copy-properties"
          @click="copyProperties(state.activeCard)"
        >
          <Copy class="inline-block mr-2 mb-0.5 w-4" />Copy attributes
        </div>
        <div
          class="py-0.5 px-2 text-sm text-gray-600 bg-gray3 hover:bg-gray5 rounded-sm cursor-pointer"
          data-cy="card-detail-delete"
          @click="state.deleteCard(state.activeCard)"
        >
          <Trash class="inline-block mr-2 mb-0.5 w-4" />Delete card
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DatePicker } from 'v-calendar';
import { blurInput } from '@/utils/blurInput';
import { defineComponent, PropType, ref } from 'vue';
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
    Trash,
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
        mask: 'YYYY-MM-DD',
      },
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
    },
  },
});
</script>
