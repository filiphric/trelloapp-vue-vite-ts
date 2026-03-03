import { create } from 'zustand';
import { createBoard as _createBoard } from './actions/createBoard';
import { getBoardDetail as _getBoardDetail } from './actions/getBoardDetail';
import { getBoardList as _getBoardList } from './actions/getBoardList';
import { patchCard as _patchCard } from './actions/patchCard';
import { uploadFile as _uploadFile } from './actions/uploadFile';
import { deleteCard as _deleteCard } from './actions/deleteCard';
import { deleteList as _deleteList } from './actions/deleteList';
import { patchList as _patchList } from './actions/patchList';
import { createCard as _createCard } from './actions/createCard';
import { createList as _createList } from './actions/createList';
import { sortLists as _sortLists } from './actions/sortLists';
import { deleteBoard as _deleteBoard } from './actions/deleteBoard';
import { signup as _signup } from './actions/signup';
import { login as _login } from './actions/login';
import { user as _user } from './actions/user';
import { reset as _reset } from './actions/reset';
import { showNotification as _showNotification } from './actions/showNotification';
import { showCardModule as _showCardModule } from './actions/showCardModule';
import { resetBoards as _resetBoards } from './actions/resetBoards';
import { resetLists as _resetLists } from './actions/resetLists';
import { resetCards as _resetCards } from './actions/resetCards';
import { resetUsers as _resetUsers } from './actions/resetUsers';
import { patchBoard as _patchBoard } from './actions/patchBoard';
import { toggleTools as _toggleTools } from './actions/toggleTools';
import { toggleSearch as _toggleSearch } from './actions/toggleSearch';
import { searchCard as _searchCard } from './actions/searchCard';
import { getLocation as _getLocation } from './actions/getLocation';
import Board from '@/typings/board';
import Card from '@/typings/card';
import List from '@/typings/list';

interface StoreState {
  board: Board | Record<string, any>;
  redirectBoardId: number;
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
  activeCard: Card | Record<string, any>;
  notification: {
    error: boolean;
    show: boolean;
    message: string;
  };
  boardList: {
    all: Board[];
  };
  activeUser: {
    accessToken: string;
    email: string;
    id: number;
    loggedIn: boolean;
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

  // actions
  createBoard: (name: Board['name']) => Promise<any>;
  getBoardDetail: (id: Board['id'], cardQueryParam?: string) => Promise<void>;
  getBoardList: () => Promise<void>;
  patchBoard: (board: Board, payload: object) => Promise<void>;
  deleteBoard: (boardId: Board['id']) => Promise<void>;
  createList: (boardId: Board['id'], name: string) => Promise<void>;
  deleteList: (listId: List['id']) => Promise<void>;
  patchList: (list: List, changes: Partial<List>) => Promise<void>;
  sortLists: () => void;
  createCard: (card: Partial<Card>) => Promise<void>;
  patchCard: (card: Card, changes: Partial<Card>) => Promise<void>;
  deleteCard: (card: Card) => Promise<void>;
  uploadFile: (card: Card, acceptFile?: File) => Promise<void>;
  signup: (email: string, password: string, welcomeEmail: boolean) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  user: (id: number) => Promise<void>;
  showNotification: (message: string, isError: boolean) => void;
  showCardModule: (cardId: Card['id'], flag: boolean) => Promise<void>;
  getLocation: () => Promise<void>;
  toggleTools: (flag: boolean) => void;
  toggleSearch: (flag: boolean) => void;
  searchCard: (query: string) => Promise<void>;
  reset: () => Promise<void>;
  resetBoards: () => Promise<void>;
  resetLists: () => Promise<void>;
  resetCards: () => Promise<void>;
  resetUsers: () => Promise<void>;

  // getters
  starred: () => Board[];
  allBoards: () => Board[];
}

export const useStore = create<StoreState>((set, get) => ({
  // state
  board: {},
  redirectBoardId: 0,
  lists: [],
  loading: true,
  loadingListCards: {},
  loadingError: {
    show: false,
    status: -1,
    message: '',
    tooLong: false,
  },
  createListInput: true,
  cardModule: false,
  activeCard: {},
  notification: {
    error: false,
    show: false,
    message: '',
  },
  boardList: {
    all: [],
  },
  activeUser: {
    accessToken: '',
    email: '',
    id: 0,
    loggedIn: false,
  },
  signupForm: {
    email: '',
    password: '',
    welcomeEmail: false,
  },
  loginForm: {
    email: '',
    password: '',
  },
  pricing: {
    activePlan: 2,
    location: 'us',
    currency: 'USD',
    discountEligible: false,
    discountAmount: 0,
  },
  showTools: false,
  showSearch: false,
  searchResults: [],

  // actions
  createBoard: (name) => _createBoard(set, get, name),
  getBoardDetail: (id, cardQueryParam?) => _getBoardDetail(set, get, id, cardQueryParam),
  getBoardList: () => _getBoardList(set, get),
  patchBoard: (board, payload) => _patchBoard(set, get, board, payload),
  deleteBoard: (boardId) => _deleteBoard(set, get, boardId),
  createList: (boardId, name) => _createList(set, get, boardId, name),
  deleteList: (listId) => _deleteList(set, get, listId),
  patchList: (list, changes) => _patchList(set, get, list, changes),
  sortLists: () => _sortLists(set, get),
  createCard: (card) => _createCard(set, get, card),
  patchCard: (card, changes) => _patchCard(set, get, card, changes),
  deleteCard: (card) => _deleteCard(set, get, card),
  uploadFile: (card, acceptFile?) => _uploadFile(set, get, card, acceptFile),
  signup: (email, password, welcomeEmail) => _signup(set, get, email, password, welcomeEmail),
  login: (email, password) => _login(set, get, email, password),
  user: (id) => _user(set, get, id),
  showNotification: (message, isError) => _showNotification(set, get, message, isError),
  showCardModule: (cardId, flag) => _showCardModule(set, get, cardId, flag),
  getLocation: () => _getLocation(set, get),
  toggleTools: (flag) => _toggleTools(set, get, flag),
  toggleSearch: (flag) => _toggleSearch(set, get, flag),
  searchCard: (query) => _searchCard(set, get, query),
  reset: () => _reset(set, get),
  resetBoards: () => _resetBoards(set, get),
  resetLists: () => _resetLists(set, get),
  resetCards: () => _resetCards(set, get),
  resetUsers: () => _resetUsers(set, get),

  // getters (as functions)
  starred: () => get().boardList.all?.filter((board: Board) => board.starred === true) || [],
  allBoards: () => get().boardList.all?.filter((board: Board) => board.starred === false) || [],
}));

/* istanbul ignore if */
if ((window as any).Cypress) {
  (window as any).store = useStore;
}
