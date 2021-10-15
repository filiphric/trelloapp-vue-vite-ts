import axios from 'axios';

export const getBoardList = async function(this: any) {
  axios
    .get('/api/boards')
    .then(({ data }) => {
      this.boardList.all = data;
      this.loading = false;
    })
    .catch( () => {
      this.boardLoading = true;
      this.loading = false;
    });
};
