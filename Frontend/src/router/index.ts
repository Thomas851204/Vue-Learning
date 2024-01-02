import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import RedirectedVue from "@/views/Tests/Redirected.vue";
import Home from "../views/Home.vue";
import FormTestVue from "@/views/Tests/FormTest.vue";
import MineSweepVue from "@/views/MineSweep.vue";
import HTTPcallVue from "@/views/Tests/HTTPcall/HTTPcall.vue";
import RegisterVue from "@/views/UserOps/Register.vue";
import LoginVue from "@/views/UserOps/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/redir",
    name: "Redirected",
    component: RedirectedVue,
  },
  {
    path: "/http",
    name: "HTTPcall",
    component: HTTPcallVue,
  },
  {
    path: "/form",
    name: "FormTest",
    component: FormTestVue,
  },
  {
    path: "/mine",
    name: "MineSweeper",
    component: MineSweepVue,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterVue,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
