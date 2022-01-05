import axios from 'axios';
import router from '@/router';

export const resetBoards = async function (this: any) {
  await axios.delete('/api/boards');
  router.push('/');
  this.activeCard = {};
  this.board = {};
  this.boardList.all = [];
  this.cardModule = false;
  this.lists = [];
  this.showNotification('All boards were deleted', false);
};
