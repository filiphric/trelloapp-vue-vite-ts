import Board from '@/typings/board';
import Card from '@/typings/card';
import List from '@/typings/list';
import axios, { AxiosError } from 'axios';

export const getBoardDetail = async (set: any, get: any, id: Board['id'], cardQueryParam?: string) => {
  set({ loading: true });

  try {
    const board = await axios.get(`/api/boards/${id}`);
    set({ board: board.data });

    const lists = await axios.get(`/api/lists?boardId=${id}`);
    lists.data.sort((a: List, b: List) => {
      return a.order - b.order;
    });
    set({ lists: lists.data });
    if (lists.data.length) set({ createListInput: false });

    lists.data.forEach((list: List, index: number) => {
      set({
        loadingListCards: { ...get().loadingListCards, [list.id]: true },
      });
      axios.get(`/api/cards?listId=${list.id}`).then(({ data }) => {
        data.sort((a: Card, b: Card) => {
          return a.order - b.order;
        });
        const newLists = [...get().lists];
        newLists[index] = { ...newLists[index], cards: [...data] };
        set({
          lists: newLists,
          loadingListCards: { ...get().loadingListCards, [list.id]: false },
        });
      });
    });

    if (cardQueryParam !== undefined) {
      get().showCardModule(cardQueryParam, true);
    }
    set({ loading: false });
  }
 catch (err) {
    const { response } = err as AxiosError<any>;
    set({
      loading: false,
      loadingError: {
        ...get().loadingError,
        show: true,
        message: response?.data?.message,
        status: response?.status,
      },
    });
  }
};
