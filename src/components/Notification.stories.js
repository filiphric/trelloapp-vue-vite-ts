import Notification from './Notification.vue';
import { store } from '@/stores/store';

export default {
  component: Notification,
  title: 'Components/Notification',
};

export const ErrorMessage = () => ({
  components: { Notification },
  setup() {
    const state = store();
    state.$state = {
      notification: {
      show: true,
      message: 'There was an error creating board',
      error: true
    }}
    return { state }
  },
  template: '<Notification />',
});

export const InfoMessage = () => ({
  components: { Notification },
  setup() {
    const state = store();
    state.$state = {
      notification: {
      show: true,
      message: 'New board was created',
      error: false
    }}
    return { state }
  },
  template: '<Notification />',
});