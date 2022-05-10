import { mount } from '@cypress/vue';
import CardCreateButton from '@/components/card/CardCreateButton.vue';


it('shows card create button', () => {
  mount(CardCreateButton);
});
