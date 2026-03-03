import List from '@/typings/list';
import axios from 'axios';

export const deleteList = async (set: any, get: any, listId: List['id']) => {
  await axios.delete(`/api/lists/${listId}`);
  set({ lists: get().lists.filter((item: List) => item.id !== listId) });
  get().sortLists();
};
