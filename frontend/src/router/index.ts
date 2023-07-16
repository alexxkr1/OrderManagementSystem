import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import OrderPageView from "../views/OrderPageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => IndexView,
      meta: {
        title: "Index",
        layout: "platform",
      },
    },
    {
      path: "/:id",
      name: "OrderPage",
      component: () => OrderPageView,
      meta: {
        title: "Order Page",
        layout: "platform",
      },
    },
  ],
});

export default router;
