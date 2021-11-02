import BoardList from './BoardList.vue';
import { store } from '@/stores/store';

export default {
  component: BoardList,
  title: 'Components/BoardList'
};

export const FirstBoard = () => ({
  components: { BoardList },
  setup() {
    const state = store();
    state.getBoardList = () => {
      return
    }
    state.$state = {
      loading: false
    }
    return { state }
  },
  template: '<BoardList />',
});

export const Loading = () => ({
  components: { BoardList },
  setup() {
    const state = store();
    state.getBoardList = () => {
      return 
    }
    state.$state = {
      loading: true
    }
    return { state }
  },
  template: '<BoardList />',
});