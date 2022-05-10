import { mount } from '@cypress/vue';
import Dropzone from '@/components/Dropzone.vue';


it('shows Dropzone', () => {
  mount(Dropzone);
});
