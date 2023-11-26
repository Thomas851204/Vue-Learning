import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Redirected from "../views/Redirected.vue";
import Home from "../views/Home.vue";
import FormTest from "../views/FormTest.vue";
import HTTPcall from "@/views/HTTPcall/HTTPcall.vue";

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
    path: "/http",
    name: "HTTPcall",
    component: HTTPcall,
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
