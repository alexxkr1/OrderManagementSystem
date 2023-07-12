import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => IndexView,
      meta: {
        title: "Index",
        layout: 'platform'
      },
    },
  ],
});

export default router;
