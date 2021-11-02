import Navbar from './Navbar.vue';
import vueRouter from 'storybook-vue3-router'
import { useRouter } from 'vue-router';

export default {
  component: Navbar,
  title: 'Components/Navbar',
};

export const Board = () => ({
  components: { Navbar },
  setup() {
    const router = useRouter()
    router.push('/board/1234')
    return { router }
  },
  template: '<Navbar />',
});

Board.decorators = [
  vueRouter()
]

export const Home = () => ({
  components: { Navbar },
  setup() {
    const router = useRouter()
    router.push('/')
    return { router }
  },
  template: '<Navbar />',
});

Home.decorators = [
  vueRouter()
]