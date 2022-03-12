import { createRouter, createWebHistory } from "vue-router";
import AllView from "../views/AllView.vue";
import CompletedView from "../views/CompletedView.vue";
import IncompletedView from "../views/IncompletedView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "all",
      component: AllView,
    },
    {
      path: "/completed",
      name: "completed",
      component: CompletedView,
    },
    {
      path: "/incompleted",
      name: "incompleted",
      component: IncompletedView,
    },
  ],
});

export default router;
