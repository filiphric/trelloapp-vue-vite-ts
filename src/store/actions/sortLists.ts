import List from '@/typings/list';

export const sortLists = (set: any, get: any) => {
  get().lists.forEach((list: List, index: number) => {
    get().patchList(list, { order: index });
  });
};
