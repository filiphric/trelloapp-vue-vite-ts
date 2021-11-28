import { defineStore } from 'pinia';
import { createBoard } from './actions/createBoard';
import { getBoardDetail } from './actions/getBoardDetail';
import { getBoardList } from './actions/getBoardList';
import { patchCard } from './actions/patchCard';
import { uploadFile } from './actions/uploadFile';
import { deleteCard } from './actions/deleteCard';
import { deleteList } from './actions/deleteList';
import { patchList } from './actions/patchList';
import { createCard } from './actions/createCard';
import { createList } from './actions/createList';
import { sortLists } from './actions/sortLists';
import { deleteBoard } from './actions/deleteBoard';
import { signup } from './actions/signup';
import { login } from './actions/login';
import { user } from './actions/user';
import { reset } from './actions/reset';
import { showNotification } from './actions/showNotification';
import { showCardModule } from './actions/showCardModule';
import { resetBoards } from './actions/resetBoards';
import { resetLists } from './actions/resetLists';
import { resetCards } from './actions/resetCards';
import { resetUsers } from './actions/resetUsers';
import { patchBoard } from './actions/patchBoard';
import { toggleTools } from './actions/toggleTools';
import Board from '@/typings/board';

export const store = defineStore({
  id: 'store',
  state() {
    return {
      board: {},
      lists: [],
      loading: true,
      loadingError: {
        show: false,
        status: 0,
        message: '',
        tooLong: false
      },
      createListInput: true,
      cardModule: false,
      activeCard: {},
      notification: {
        error: false,
        show: false,
        message: ''
      },
      boardList: {
        all: []
      },
      activeUser: {
        loggedIn: false,
        email: ''
      },
      signupForm: {
        email: '',
        password: '',
        welcomeEmail: false
      },
      loginForm: {
        email: '',
        password: ''
      },
      showTools: false
    };
  },
  actions: {
    // board actions
    createBoard,
    getBoardDetail,
    getBoardList,
    patchBoard,
    deleteBoard,

    // list actions
    createList,
    deleteList,
    patchList,
    sortLists,

    // card actions
    createCard,
    patchCard,
    deleteCard,
    uploadFile,

    // user actions
    signup,
    login,
    user,

    // other actions
    showNotification,
    showCardModule,

    // api tools
    toggleTools,

    // reset actions
    reset,
    resetBoards,
    resetLists,
    resetCards,
    resetUsers
  },
  getters: {
    starred: state => {
      return state.boardList.all.filter((board: Board) => board.starred === true);
    },
    allBoards: state => {
      return state.boardList.all.filter((board: Board) => board.starred === false);
    }
  }
});

/* istanbul ignore next */
if (window.Cypress) {
  window.store = store;
}
