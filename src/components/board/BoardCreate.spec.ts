import { mount } from '@cypress/vue';
import BoardCreate from '@/components/board/BoardCreate.vue';

import { setActivePinia, createPinia } from 'pinia';

beforeEach(() => {
  setActivePinia(createPinia());
});

it('hello', () => {
  mount(BoardCreate);
});
