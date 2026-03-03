import axios from 'axios';

export const resetBoards = async (set: any, get: any) => {
  axios
    .delete('/api/boards')
    .then(() => {
      set({
        activeCard: {},
        board: {},
        boardList: { all: [] },
        cardModule: false,
        lists: [],
      });
      get().showNotification('All boards were deleted', false);
    })
    .catch((e) => {
      console.log(e);
      get().showNotification('Boards could not be deleted', true);
    });
};
