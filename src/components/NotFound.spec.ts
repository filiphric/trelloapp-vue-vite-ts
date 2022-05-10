import { mount } from '@cypress/vue';
import NotFound from '@/components/NotFound.vue';


it('shows not found page', () => {
  mount(NotFound);
});
