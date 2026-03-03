import axios from 'axios';

export const reset = async (set: any, get: any) => {
  axios
    .post('/api/reset')
    .then(() => {
      set({
        activeCard: {},
        boardList: { all: [] },
        cardModule: false,
        showTools: false,
      });
      get().showNotification('All data was deleted', false);
    })
    .catch((e) => {
      console.log(e);
      get().showNotification('Data could not be deleted', true);
    });
};
