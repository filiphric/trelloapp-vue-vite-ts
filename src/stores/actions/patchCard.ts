import Card from "@/typings/card";
import axios from "axios";
import { PiniaCustomStateProperties } from "pinia";

export const patchCard =  async function(this: PiniaCustomStateProperties, card: Card) {
  const { id, completed } = card
  await axios.patch(`/api/cards/${id}`, {
    completed: !completed
  }).then( res => {
    const patchedCardIndex: number = this.cards.findIndex((c: Card) => c.id === id)
    this.cards[patchedCardIndex] = res.data
    this.activeCard = res.data
  });
}