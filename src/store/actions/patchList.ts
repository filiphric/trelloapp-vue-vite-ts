import List from '@/typings/list';
import axios from 'axios';

export const patchList = async (set: any, get: any, list: List, changes: Partial<List>) => {
  const { id } = list;
  await axios.patch(`/api/lists/${id}`, changes).then(({ data }) => {
    const newLists = [...get().lists];
    const patchedListIndex: number = newLists.findIndex((c: List) => c.id === id);
    data.cards = newLists[patchedListIndex].cards;
    newLists[patchedListIndex] = data;
    set({ lists: newLists });
  });
  changes.hasOwnProperty('name') && get().showNotification('List was renamed', false);
};
