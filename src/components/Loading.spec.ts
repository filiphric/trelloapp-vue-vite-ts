import { mount } from '@cypress/vue';
import Loading from '@/components/Loading.vue';


it('shows loading', () => {
  mount(Loading);
});
