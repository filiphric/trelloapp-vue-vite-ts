import { mount } from '@cypress/vue';
import GoogleButton from '@/components/GoogleButton.vue';


it('shows google button', () => {
  mount(GoogleButton);
});
