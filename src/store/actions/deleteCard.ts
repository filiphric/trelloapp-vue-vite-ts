import Card from '@/typings/card';
import List from '@/typings/list';
import axios from 'axios';

export const deleteCard = async (set: any, get: any, card: Card) => {
  const { id, listId } = card;
  await axios.delete(`/api/cards/${id}`);
  const lists = [...get().lists];
  const listIndex = lists.findIndex((list: List) => list.id === listId);
  lists[listIndex] = {
    ...lists[listIndex],
    cards: lists[listIndex].cards.filter((item: Card) => item.id !== id),
  };
  set({ lists, activeCard: {} as Card, cardModule: false });
  get().showNotification('Card was deleted', false);
};
