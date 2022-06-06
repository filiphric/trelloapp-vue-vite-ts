import ListItem from '@/components/list/ListItem.vue';
import List from '@/typings/list';

it('mounts component', () => {
  const list: List = {
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
    } as any,
  });
});
