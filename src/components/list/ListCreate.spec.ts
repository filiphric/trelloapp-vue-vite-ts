import { mount } from '@cypress/vue';
import ListCreate from '@/components/list/ListCreate.vue';


it('shows list create button', () => {
  mount(ListCreate);
});
