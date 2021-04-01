import { defineStore } from "pinia";
import axios from "axios";
import Board from "@/typings/board";

export const boardList = defineStore({
  id: "boardList",
  state() {
    return {
      all: [],
      loading: true
    };
  },
  actions: {
    async fetch() {
      const boards = await axios.get(`/api/boards`);
      this.all = boards.data;
      this.loading = false;
    }
  },
  getters: {
    starred: state => {
      return state.all.filter((board: Board) => board.starred === true);
    }
  }
});
