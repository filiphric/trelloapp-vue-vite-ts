import { mount } from '@cypress/vue';
import LoadingError from '@/components/boardList/LoadingError.vue';


it('shows loading error', () => {
  mount(LoadingError);
});
