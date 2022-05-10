import { mount } from '@cypress/vue';
import BoardDetail from '@/components/board/BoardDetail.vue';


it('shows BoardDetail', () => {
  mount(BoardDetail);
});
