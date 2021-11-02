import CardItem from './CardItem.vue';
import { store } from '@/stores/store';

export default {
  component: CardItem,
  title: 'Components/CardItem',
  decorators: [() => ({ template: '<div style="width: 272px;"><story/></div>' })],
};

const Template = (args) => ({
  components: { CardItem },
  setup() {
    const state = store();
    return { args, state }
  },
  template: '<CardItem v-bind="args" />',
});

export const Overdue = Template.bind({});
Overdue.args = {
  card: {
    name: 'new card',
    completed: false,
    deadline: '2012-10-20',
    id: 3798027439082
  }
}
export const Completed = Template.bind({});
Completed.args = {
  card: {
    name: 'new card',
    completed: true,
    deadline: '2012-10-20',
    id: 3798027439082
  }
}

export const NotCompleted = Template.bind({});
NotCompleted.args = {
  card: {
    name: 'new card',
    completed: false,
    deadline: '2030-10-20',
    id: 3798027439082
  }
}