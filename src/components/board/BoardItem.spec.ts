import BoardItem from '@/components/board/BoardItem.vue';

import { useStore } from '@/stores/store';

it('shows checkbox', () => {
  cy.mount(BoardItem);
});
