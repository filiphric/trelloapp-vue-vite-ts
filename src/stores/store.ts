import { defineStore } from "pinia";
import { getBoardDetail } from "./actions/getBoardDetail";
import { patchCard } from "./actions/patchCard";
import axios from "axios";
import Board from "@/typings/board";
import List from "@/typings/list";
import Card from "@/typings/card";
import router from '@/router'

export const store = defineStore({
  id: "store",
  state() {
    return {
      board: {},
      lists: [],
      cards: [],
      loading: true,
      cardModule: false,
      activeCard: {},
      notification: {
        error: false,
        show: false,
        message: ""
      },
      boardList: {
        all: []
      }
    };
  },
  actions: {
    // board actions
    getBoardDetail,

    // card actions
    patchCard,

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
    async createList(boardId: Board, name: string) {
      const createdList = await axios.post(
        `/api/lists`,
        { name, boardId }
      );
      this.lists.push(createdList.data);
    },
    async deleteList(listId: List) {
      await axios.delete(
        `/api/lists/${listId}`
      );
      this.lists = this.lists.filter(item => item.id !== listId)
    },
    async renameList(list: List) {
      const { id, name } = list
      await axios.patch(`/api/lists/${id}`, {
        name
      });
    },
    
    async createCard(card: Card) {
      const createdCard = await axios.post(
        `/api/cards`, card 
      );
      this.cards.push(createdCard.data);
    },
    async showCardModule(cardId: string, flag: boolean) {
      if (flag) {
        router.push(`${router.currentRoute.value.path}?card=${cardId}`) 
        await axios.get(`/api/cards/${cardId}`)
        .then( (c) => {
          this.activeCard = c.data;
          this.cardModule = true
        })
        .catch(() => {
          router.push(router.currentRoute.value.path)
          this.activeCard = {}
          this.cardModule = false
          this.showError('Card was not found');
        });
      } else {
        router.push(router.currentRoute.value.path)
        this.activeCard = {}
        this.cardModule = false
      }
    },
    async showError(message: string) {
      this.notification.message = message;
      this.notification.error = true;
      this.notification.show = true;
      setTimeout(() => {
        // hide error message after 4 seconds
        this.notification.show = false;
      }, 4000);
    }
  },
  getters: {
    starred: state => {
      return state.boardList.all.filter((board: Board) => board.starred === true);
    }
  }
});
