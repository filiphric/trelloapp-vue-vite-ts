import Board from '@/typings/board';
import axios from 'axios';

export const deleteBoard = async (set: any, get: any, boardId: Board['id']) => {
  axios
    .delete(`/api/boards/${boardId}`)
    .then(() => {
      get().showNotification('Board was deleted', false);
    })
    .catch((e) => {
      console.log(e);
      get().showNotification('Board could not be deleted', true);
    });
};
