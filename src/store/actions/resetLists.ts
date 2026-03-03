import axios from 'axios';

export const resetLists = async (set: any, get: any) => {
  await axios.delete('/api/lists');
  set({ activeCard: {}, cardModule: false, lists: [] });
  get().showNotification('All lists were deleted', false);
};
