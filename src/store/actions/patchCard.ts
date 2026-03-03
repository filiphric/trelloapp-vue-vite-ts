import Card from '@/typings/card';
import List from '@/typings/list';
import axios from 'axios';

export const patchCard = async (set: any, get: any, card: Card, changes: Partial<Card>) => {
  const { id } = card;
  await axios.patch(`/api/cards/${id}`, changes).then((res) => {
    const newLists = [...get().lists];
    const listIndex = newLists.findIndex((list: List) => list.cards.some((c: Card) => c.id === id));
    const cardsInList = [...newLists[listIndex].cards];
    const patchedCardIndex: number = cardsInList.findIndex((c: Card) => c.id === id);
    cardsInList[patchedCardIndex] = res.data;
    newLists[listIndex] = { ...newLists[listIndex], cards: cardsInList };
    set({ lists: newLists, activeCard: res.data });
  });
  if (changes.hasOwnProperty('name')) {
    get().showNotification('Card was renamed', false);
  }
  if (changes.hasOwnProperty('description')) {
    get().showNotification('Description was changed', false);
  }
};
