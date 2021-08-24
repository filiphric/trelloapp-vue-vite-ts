import Card from "@/typings/card";
import axios from "axios";

export const patchCard =  async function(this: any, card: Card, changes: Partial<Card>) {
  const { id } = card
  await axios.patch(`/api/cards/${id}`, changes).then( res => {
    const patchedCardIndex: number = this.cards.findIndex((c: Card) => c.id === id)
    this.cards[patchedCardIndex] = res.data
    this.activeCard = res.data
  })
  if (changes.hasOwnProperty('name')) {
    this.showNotification('Card was renamed', false)
  }
}