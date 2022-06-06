
import BoardCreate from '@/components/board/BoardCreate.vue';
import { useStore } from '@/stores/store';
import { createPinia } from 'pinia'

const pinia = createPinia()
const store = useStore(pinia)
const { createBoard } = useStore();

it('Loads board creat component', () => {
  cy.mount(BoardCreate, { store });
});
