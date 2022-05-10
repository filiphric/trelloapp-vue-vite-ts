import { mount } from '@cypress/vue';
import CardDetail from '@/components/card/CardDetail.vue';


it('shows card detail', () => {
  mount(CardDetail);
});
