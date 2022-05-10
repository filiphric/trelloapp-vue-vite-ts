import { mount } from '@cypress/vue';
import LoginButton from '@/components/LoginButton.vue';


it('shows login button', () => {
  mount(LoginButton);
});
