import { createRouter, createWebHistory } from "vue-router";
import Profile from "../pages/Profile.vue";
import Home from "../pages/Home.vue";
import Book from "../pages/Book.vue";
import Cart from "../pages/Cart.vue";
import Login from "../pages/Login.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/book/:id", name: "Book", component: Book },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/login", name: "Login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
