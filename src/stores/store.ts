import { createBoard } from './actions/createBoard';
import { createCard } from './actions/createCard';
import { createList } from './actions/createList';
import { defineStore } from 'pinia';
import { deleteBoard } from './actions/deleteBoard';
import { deleteCard } from './actions/deleteCard';
import { deleteList } from './actions/deleteList';
import { getBoardDetail } from './actions/getBoardDetail';
import { getBoardList } from './actions/getBoardList';
import { login } from './actions/login';
import { patchBoard } from './actions/patchBoard';
import { patchCard } from './actions/patchCard';
import { patchList } from './actions/patchList';
import { reset } from './actions/reset';
import { resetBoards } from './actions/resetBoards';
import { resetCards } from './actions/resetCards';
import { resetLists } from './actions/resetLists';
import { resetUsers } from './actions/resetUsers';
import { showCardModule } from './actions/showCardModule';
import { showNotification } from './actions/showNotification';
import { signup } from './actions/signup';
import { toggleTools } from './actions/toggleTools';
import { uploadFile } from './actions/uploadFile';
import { user } from './actions/user';
import Board from '@/typings/board';

export const store = defineStore({
  actions: {
    // board actions
    createBoard,
    
// card actions
createCard,
    

// list actions
createList,
    

deleteBoard,
    

deleteCard,

    
    
deleteList,
    
getBoardDetail,
    
getBoardList,

    
    login,
    patchBoard,
    patchCard,
    
patchList,

    
    

// reset actions
reset,
    



showCardModule,
    



resetBoards,

    
    

// other actions
showNotification,
    

resetCards,

    
    
// user actions
signup,

    
    
resetLists,
    
uploadFile,
    
resetUsers,
    
// api tools
toggleTools,
    
user
  },
  getters: {
    allBoards: state => {
      return state.boardList.all.filter((board: Board) => board.starred === false);
    },
    starred: state => {
      return state.boardList.all.filter((board: Board) => board.starred === true);
    }
  },
  id: 'store',
  state() {
    return {
      activeCard: {},
      board: {},
      activeUser: {
        email: '',
        loggedIn: false
      },
      boardList: {
        all: []
      },
      cardModule: false,
      createListInput: true,
      lists: [],
      loading: true,
      loadingError: {
        message: '',
        show: false,
        status: 0
      },
      loginForm: {
        email: '',
        password: ''
      },
      notification: {
        error: false,
        message: '',
        show: false
      },
      showTools: false,
      signupForm: {
        email: '',
        password: '',
        welcomeEmail: false
      },
    };
  }
});

if (window.Cypress) {
  window.store = store;
}
