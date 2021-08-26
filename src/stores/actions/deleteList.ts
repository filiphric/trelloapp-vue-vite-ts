import axios from 'axios';
import List from '@/typings/list';

export const deleteList = async function(this: any, listId: List['id']) {
  await axios.delete(`/api/lists/${listId}`);
  this.lists = this.lists.filter((item: List) => item.id !== listId);
  this.lists.forEach((item: List, index: number) => (item.order = index));
};
