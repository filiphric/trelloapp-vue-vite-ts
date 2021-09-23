import Board from '@/typings/board';
import axios from 'axios';

export const patchBoard = async function(this: any, board: Board, payload: object) {
  const patchedBoard = await axios.patch(`/api/boards/${board.id}`, payload);
  this.board = patchedBoard.data;
};
