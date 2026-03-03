import Board from './board';
import Card from './card';
import List from './list';

export interface StoreState {
  board: Board;
  redirectBoardId: Board['id'];
  lists: List[];
  loading: boolean;
  loadingListCards: Record<number, boolean>;
  loadingError: {
    show: boolean;
    status: number;
    message: string;
    tooLong: boolean;
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
    id: number;
    accessToken: string;
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
  pricing: {
    activePlan: number;
    location: string;
    currency: string;
    discountEligible: boolean;
    discountAmount: number;
  };
  showTools: boolean;
  showSearch: boolean;
  searchResults: Card[];
}
