import { createRouter, createWebHistory } from "vue-router";
import Profile from "../pages/Profile.vue";
import Home from "../pages/Home.vue";
import Book from "../pages/Book.vue";
import Cart from "../pages/Cart.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Error from "../pages/Error.vue";
import store from "../store/store";

function isAuthenticated() {
  return store.state.logued;
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/book/:id",
    name: "Book",
    component: Book,
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    name: "Error",
    component: Error,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { requiresAuth: true },
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
