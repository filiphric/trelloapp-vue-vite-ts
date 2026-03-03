import Board from '@/typings/board';
import axios from 'axios';

export const createList = async (set: any, get: any, boardId: Board['id'], name: string) => {
  axios
    .post('/api/lists', { boardId, name, order: get().lists.length })
    .then(({ data }) => {
      data.cards = [];
      set({ lists: [...get().lists, data] });
    })
    .catch(() => {
      get().showNotification('List was not created', true);
    });
};
