import Card from '@/typings/card';
import List from '@/typings/list';
import axios from 'axios';

export const createCard = async (set: any, get: any, card: Partial<Card>) => {
  const lists = get().lists;
  const listIndex = lists.findIndex((list: List) => list.id === card.listId);
  const cardsInList = lists[listIndex].cards;
  const order = cardsInList.length;

  axios
    .post('/api/cards', { order, ...card })
    .then(({ data }) => {
      const newLists = [...get().lists];
      newLists[listIndex] = { ...newLists[listIndex], cards: [...newLists[listIndex].cards, data] };
      set({ lists: newLists });
    })
    .catch(() => {
      get().showNotification('Card was not created', true);
    });
};
