import Card from "@/typings/card";
import axios from "axios";
import router from '@/router'
import { PiniaCustomStateProperties } from "pinia";

export const deleteCard =  async function(this: PiniaCustomStateProperties, cardId: Card['id']) {
  await axios.delete(
    `/api/cards/${cardId}`
  );
  router.push(router.currentRoute.value.path)
  this.cards = this.cards.filter(item => item.id !== cardId)
  this.activeCard = {}
  this.cardModule = false
}