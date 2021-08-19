import { defineStore } from "pinia";
import axios from "axios";
import Board from "@/typings/board";
import List from "@/typings/list";
import Card from "@/typings/card";
import router from '@/router'

export const boardDetail = defineStore({
  id: "boardDetail",
  state() {
    return {
      board: {},
      lists: [],
      cards: [],
      loading: true,
      cardModule: false,
      activeCard: {},
      errorMessage: {
        show: false,
        message: ""
      }
    };
  },
  actions: {
    async fetch(id: string) {

      this.loading = true;

      const board = await axios.get(`/api/boards/${id}`);
      this.board = board.data;

      const lists = await axios.get(`/api/lists?boardId=${id}`);
      this.lists = lists.data;

      // if there are no lists, don’t fetch cards
      if (lists.data.length) {
        const cards = await axios.get(`/api/cards?boardId=${id}`);
        this.cards = cards.data;
      }

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
    async updateList(list: List) {
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
      this.errorMessage.message = message;
      this.errorMessage.show = true;
      setTimeout(() => {
        // hide error message after 4 seconds
        this.errorMessage.show = false;
      }, 4000);
    }
  }
});
