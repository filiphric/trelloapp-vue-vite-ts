import axios from 'axios';

export const searchCard = async (set: any, _get: any, query: string) => {
  const { data } = await axios.get(`/api/cards?q=${query}`);
  set({ searchResults: data });
};
