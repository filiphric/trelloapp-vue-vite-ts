import { createRouter, createWebHistory } from 'vue-router';
import Board from '../views/Board.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';
import Signup from '../views/Signup.vue';

const routes = [
  {
    component: Home,
    name: 'Home',
    path: '/',
  },
  {
    component: Login,
    name: 'Login',
    path: '/login',
  },
  {
    component: Signup,
    name: 'Signup',
    path: '/signup',
  },
  {
    component: Board,
    name: 'Board',
    path: '/board/:board',
  },
  {
    component: NotFound,
    name: 'Page not found',
    path: '/404',
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
