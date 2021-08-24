import Card from "@/typings/card";
import axios from "axios";
import router from '@/router'

export const deleteCard =  async function(this: any, cardId: Card['id']) {
  await axios.delete(
    `/api/cards/${cardId}`
  );
  router.push(router.currentRoute.value.path)
  this.cards = this.cards.filter((item: Card) => item.id !== cardId)
  this.activeCard = {}
  this.cardModule = false
  this.showNotification('Card was deleted', false)
}