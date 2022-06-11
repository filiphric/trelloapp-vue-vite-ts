import BoardCreate from '@/components/board/BoardCreate.vue';
import { useStore } from '@/store/store';
import { createPinia } from 'pinia';

const pinia = createPinia();
const store = useStore(pinia);

it('Loads board create component', () => {
  cy.mount(BoardCreate, { store });
});
