import { mount } from '@cypress/vue';
import CardItem from '@/components/card/CardItem.vue';


it('shows card item', () => {
  mount(CardItem);
});
