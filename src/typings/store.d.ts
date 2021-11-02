import 'pinia';
import Board from './board';
import Card from './card';
import List from './list';

declare module 'pinia' {
  export interface PiniaCustomStateProperties<S> {
    board: Board;
    lists: List[];
    loading: boolean;
    loadingError: {
      show: boolean;
      status: number;
      message: string;
    };
    createListInput: boolean;
    cardModule: boolean;
    activeCard: Card;
    notification: {
      error: boolean;
      show: boolean;
      message: string;
    };
    boardList: {
      all: Board[];
    };
    activeUser: {
      loggedIn: boolean;
      email: string;
    };
    signupForm: {
      email: string;
      password: string;
      welcomeEmail: boolean;
    };
    loginForm: {
      email: string;
      password: string;
    };
    showTools: boolean;
  }
}
