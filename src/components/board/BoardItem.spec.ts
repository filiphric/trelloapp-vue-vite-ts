import { mount } from '@cypress/vue';
import BoardItem from '@/components/board/BoardItem.vue';


it('shows checkbox', () => {
  mount(BoardItem);
});
