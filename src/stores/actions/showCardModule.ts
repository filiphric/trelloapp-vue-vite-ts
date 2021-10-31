import axios from 'axios';
import Card from '@/typings/card';
import router from '@/router';

export const showCardModule = async function(this: any, cardId: Card['id'], flag: boolean) {
  if (flag) {
    router.push(`${router.currentRoute.value.path}?card=${cardId}`);
    await axios
      .get(`/api/cards/${cardId}`)
      .then(({ data }) => {
        this.activeCard = data;
        this.cardModule = true;
      })
      .catch(() => {
        router.push(router.currentRoute.value.path);
        this.activeCard = {};
        this.cardModule = false;
        this.showNotification(`Card with id: ${cardId} was not found`, true);
      });
  }
 else {
    router.push(router.currentRoute.value.path);
    this.activeCard = {};
    this.cardModule = false;
  }
};
