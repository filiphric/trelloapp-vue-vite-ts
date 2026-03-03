export const toggleSearch = (set: any, _get: any, flag: boolean) => {
  set({ showSearch: flag, searchResults: [] });
};
