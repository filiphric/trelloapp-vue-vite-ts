import Card from "@/typings/card";
import List from "@/typings/list";
import axios from "axios";

export const createCard =  async function(this: any, card: Partial<Card>) {

    const listIndex = this.lists.findIndex( (list: List) => list.id === card.listId )
    const cardsInList = this.lists[listIndex].cards
    const order = cardsInList.length

    const { data } = await axios.post(
      `/api/cards`, { order, ...card } 
    );
    this.lists[listIndex].cards.push(data);

  }
