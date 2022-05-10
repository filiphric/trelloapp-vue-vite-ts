import { mount } from '@cypress/vue';
import ListItem from '@/components/list/ListItem.vue';

import { setActivePinia, createPinia } from 'pinia';

beforeEach(() => {
  setActivePinia(createPinia());
});

it('hello', () => {
  const list = {
    boardId: 1,
    name: 'list',
    order: 0,
    created: '2022-05-06',
    id: 1,
    cards: [],
  };

  mount(ListItem, {
    props: {
      list,
    },
  });
});
