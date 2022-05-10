import { mount } from '@cypress/vue';
import Dropdown from '@/components/list/Dropdown.vue';


it('shows dropdown', () => {
  mount(Dropdown);
});
