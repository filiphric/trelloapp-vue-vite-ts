import { mount } from '@cypress/vue';
import CardCreateInput from '@/components/card/CardCreateInput.vue';


it('shows card create input', () => {
  mount(CardCreateInput);
});
