import { mount } from '@cypress/vue';
import BoardList from '@/components/boardList/BoardList.vue';


it('shows board list', () => {
  mount(BoardList);
});
