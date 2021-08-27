import axios from 'axios';
import router from '@/router';
import Board from '@/typings/board';

export const deleteBoard = async function(this: any, boardId: Board['id']) {
  await axios.delete(`/api/boards/${boardId}`);
  router.push('/');
  this.showNotification('Board was deleted', false);
};
