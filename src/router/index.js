import { createRouter, createWebHistory } from "vue-router";
import UserListView from "../views/UserListView.vue";
import UserDetailView from "../views/UserDetailView.vue";
import UserFormView from "../views/UserFormView.vue";
import AboutView from "../views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/users" },
    { path: "/users", name: "users", component: UserListView },
    { path: "/users/new", name: "userNew", component: UserFormView },
    { path: "/users/:id", name: "userDetail", component: UserDetailView },
    { path: "/about", name: "about", component: AboutView }
  ]
});

export default router;
