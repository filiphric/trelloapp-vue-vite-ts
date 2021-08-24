import { defineStore } from "pinia";
import { getBoardDetail } from "./actions/getBoardDetail";
import { patchCard } from "./actions/patchCard";
import { uploadFile } from "./actions/uploadFile";
import { deleteCard } from "./actions/deleteCard";
import { deleteList } from "./actions/deleteList";
import { patchList } from "./actions/patchList";
import { createCard } from "./actions/createCard";
import axios from "axios";
import Board from "@/typings/board";
import Card from "@/typings/card";
import router from '@/router'

export const store = defineStore({
  id: "store",
  state() {
    return {
      board: {},
      lists: [],
      loading: true,
      cardModule: false,
      activeCard: {},
      notification: {
        error: false,
        show: false,
        message: ""
      },
      activeLists: {},
      boardList: {
        all: []
      }
    };
  },
  actions: {
    // board actions
    getBoardDetail,

    // list actions
    deleteList,
    patchList,

    // card actions
    createCard,
    patchCard,
    deleteCard,
    uploadFile,

    // to refactor
    async getBoardList() {
      const boards = await axios.get(`/api/boards`);
      this.boardList.all = boards.data;
      this.loading = false;
    },
    async patchBoard(board: Board, payload: object) {
      const patchedBoard = await axios.patch(
        `/api/boards/${board.id}`,
        payload
      );
      this.board = patchedBoard.data;
    },
    async createList(boardId: Board['id'], name: string) {
      const { data } = await axios.post(
        `/api/lists`,
        { name, boardId, order: this.lists.length }
      );
      data.cards = [];
      this.lists.push(data);
    },
    async showCardModule(cardId: Card['id'], flag: boolean) {
      if (flag) {
        router.push(`${router.currentRoute.value.path}?card=${cardId}`) 
        await axios.get(`/api/cards/${cardId}`)
        .then( ({ data }) => {
          this.activeCard = data;
          this.cardModule = true
        })
        .catch(() => {
          router.push(router.currentRoute.value.path)
          this.activeCard = {}
          this.cardModule = false
          this.showNotification(`Card with id: ${cardId} was not found`, true);
        });
      } else {
        router.push(router.currentRoute.value.path)
        this.activeCard = {}
        this.cardModule = false
      }
    },
    async showNotification(message: string, isError: boolean) {
      this.notification.message = message;
      this.notification.error = isError;
      this.notification.show = true;
      setTimeout(() => {
        // hide error message after 4 seconds
        this.notification.show = false;
      }, 4000);
    },
  },
  getters: {
    starred: (state) => {
      return state.boardList.all.filter((board: Board) => board.starred === true);
    },

  }
});
