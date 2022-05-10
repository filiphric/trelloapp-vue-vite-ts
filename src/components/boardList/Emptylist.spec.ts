import { mount } from '@cypress/vue';
import Emptylist from '@/components/boardList/Emptylist.vue';


it('shows empty list', () => {
  mount(Emptylist);
});
