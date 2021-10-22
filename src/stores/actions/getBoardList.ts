import axios from 'axios';

export const getBoardList = async function(this: any) {
  this.loadingError.show = false;
  this.loadingError.message = '';
  this.loadingError.status = '';
  axios
    .get('/api/boards')
    .then(boardList => {
      this.boardList.all = boardList.data;
      this.loading = false;
    })
    .catch(e => {
      this.loading = false;
      this.loadingError.show = true;
      if (e.response) {
        this.loadingError.message = e.response.data.message;
        this.loadingError.status = e.response.status;
      }
    });
};
