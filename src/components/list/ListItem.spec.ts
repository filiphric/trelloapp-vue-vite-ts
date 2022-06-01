
import ListItem from '@/components/list/ListItem.vue';

it('hello', () => {
  const list = {
    boardId: 1,
    name: 'list',
    order: 0,
    created: '2022-05-06',
    id: 1,
    cards: [],
  };

  cy.mount(ListItem, {
    props: {
      list,
    },
  });
});
