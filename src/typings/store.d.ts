import 'pinia'
import Board from './board';
import Card from './card';
import List from './list';

declare module 'pinia' {
  export interface PiniaCustomStateProperties<S> {
    board: Board,
    lists: List[],
    cards: Card[],
    loading: boolean,
    cardModule: boolean,
    activeCard: Card | {},
    notification: {
      show: boolean,
      error: boolean,
      message: string
    },
    boardList: {
      all: Board[]
    }
  }
}