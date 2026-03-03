import List from '@/typings/list';
import axios from 'axios';

export const resetCards = async (set: any, get: any) => {
  await axios.delete('/api/cards');
  const newLists = get().lists.map((list: List) => ({ ...list, cards: [] }));
  set({ activeCard: {}, cardModule: false, lists: newLists });
  get().showNotification('All cards were deleted', false);
};
