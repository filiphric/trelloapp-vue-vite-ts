import axios from "axios";
import { StateTree } from "pinia";

export const getBoardDetail =  async function(this: StateTree, id: string) {

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
}