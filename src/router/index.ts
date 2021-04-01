import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Board from "../views/Board.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/board/:board",
    name: "Board",
    component: Board
  },
  {
    path: "/404",
    name: "Page not found",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

export default router;
