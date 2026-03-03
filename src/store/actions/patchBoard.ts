import Board from '@/typings/board';
import axios from 'axios';

export const patchBoard = async (set: any, get: any, board: Board, payload: object) => {
  const patchedBoard = await axios.patch(`/api/boards/${board.id}`, payload);
  const boardList = { ...get().boardList };
  const boardIndex = boardList.all.findIndex((b: Board) => b.id === board.id);
  if (boardIndex >= 0) {
    boardList.all = [...boardList.all];
    boardList.all[boardIndex] = patchedBoard.data;
  }
  set({ board: patchedBoard.data, boardList });
};
