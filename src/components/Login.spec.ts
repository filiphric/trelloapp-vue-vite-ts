import { mount } from '@cypress/vue';
import Login from '@/components/Login.vue';


it('shows login', () => {
  mount(Login);
});
