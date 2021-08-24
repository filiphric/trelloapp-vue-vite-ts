import Card from "@/typings/card";
import List from "@/typings/list";
import axios from "axios";
import { useRoute } from 'vue-router';

export const getBoardDetail =  async function(this: any, id: string) {
  
  const route = useRoute();
  
  this.loading = true;

  const board = await axios.get(`/api/boards/${id}`);
  this.board = board.data;

  const lists = await axios.get(`/api/lists?boardId=${id}`);
  lists.data.sort((a: List, b: List) => {
    return a.order - b.order;
  });
  this.lists = lists.data;

  // if there are no lists, don’t fetch cards
  this.lists.forEach( (list: List, index: number) => {

    axios.get(`/api/cards?listId=${list.id}`)
    .then( ({data}) => {
      data.sort((a: Card, b: Card) => {
        return a.order - b.order;
      });
      this.lists[index].cards = []
      this.lists[index].cards.push(...data)
    })

  })

  const qs: any = route.query?.card
    if (qs !== undefined) {
      this.showCardModule(qs, true)
    }

  this.loading = false;
}