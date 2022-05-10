import { mount } from '@cypress/vue';
import Dropdown from '@/components/board/Dropdown.vue';


it('shows checkbox', () => {
  mount(Dropdown);
});
