import SaveButton from './SaveButton.vue';

export default {
  component: SaveButton,
  title: 'Components/SaveButton'
};

const Template = args => ({
  components: { SaveButton },
  setup() {
    return { args };
  },
  template: '<SaveButton v-bind="args" />',
});
export const NewBoard = Template.bind({});
NewBoard.args = {
  buttonText: 'Create board'
};
export const AddList = Template.bind({});
AddList.args = {
  buttonText: 'Add list'
};
export const AddCard = Template.bind({});
AddCard.args = {
  buttonText: 'Add card'
};