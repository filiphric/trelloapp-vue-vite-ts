import Board from '@/typings/board';
import axios from 'axios';
import { router } from '@/router/index';

export const createBoard = async function (this: any, name: Board['name']) {
  if (!name) {
    return;
  }
  axios
    .post('/api/boards', { name })
    .then(({ data }) => {
      this.redirectBoardId = data.id;
      router.push(`/board/${data.id}`);
    })
    .catch((e) => {
      console.log(e);
      this.showNotification('There was an error creating board', true);
    });
};
