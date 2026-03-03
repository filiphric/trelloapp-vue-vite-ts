import Card from '@/typings/card';
import axios from 'axios';

export const showCardModule = async (set: any, get: any, cardId: Card['id'], flag: boolean) => {
  if (flag) {
    await axios
      .get(`/api/cards/${cardId}`)
      .then(({ data }) => {
        set({ activeCard: data, cardModule: true });
      })
      .catch(() => {
        set({ activeCard: {} as Card, cardModule: false });
        get().showNotification(`Card with id: ${cardId} was not found`, true);
      });
  }
 else {
    set({ activeCard: {} as Card, cardModule: false });
  }
};
