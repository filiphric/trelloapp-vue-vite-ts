import { mount } from '@cypress/vue';
import Signup from '@/components/Signup.vue';


it('shows signup', () => {
  mount(Signup);
});
