import axios from 'axios';

export const getBoardList = async function(this: any) {
  const boards = await axios.get(`/api/boards`);
  this.boardList.all = boards.data;
  this.loading = false;
};
