import axios from 'axios';

export const getBoardList = async (set: any, get: any) => {
  set({
    loadingError: { ...get().loadingError, show: false, message: '', status: -1 },
  });
  setTimeout(() => {
    set({
      loadingError: { ...get().loadingError, tooLong: true },
    });
  }, 3000);
  axios
    .get('/api/boards')
    .then(({ data }) => {
      set({ boardList: { all: data }, loading: false });
    })
    .catch(({ response }) => {
      const loadingError = { ...get().loadingError, show: true };
      if (response) {
        loadingError.message = response.data.message;
        loadingError.status = response.status;
      }
      set({ loading: false, loadingError });
    });
};
