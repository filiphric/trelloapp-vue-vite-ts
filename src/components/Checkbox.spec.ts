import { mount } from '@cypress/vue';
import Checkbox from '@/components/Checkbox.vue';


it('shows checkbox', () => {
  mount(Checkbox);
});
