import axios from 'axios';
import router from '@/router';

export const reset = async function (this: any) {
  await axios.post('/api/reset');
  router.push('/');
  this.activeCard = {};
  this.boardList.all = [];
  this.cardModule = false;
  this.showTools = false;
  this.showNotification('All data was deleted', false);
};
