import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Redirected from "../views/Redirected.vue";
import Page2 from "../views/Page2.vue";
import Home from "../views/Home.vue";
import FormTest from "../views/FormTest.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/redir",
    name: "Redirected",
    component: Redirected,
  },
  {
    path: "/page2",
    name: "Page2",
    component: Page2,
  },
  {
    path: "/form",
    name: "FormTest",
    component: FormTest,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
