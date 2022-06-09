import { createWebHistory, createRouter } from "vue-router";
import AuthenticationService from "@/services/AuthenticationService";
import Homepage from "@/components/Homepage";
import Sidebar from "@/components/Register/Sidebar";
import Login from "@/components/Login";
import User from "@/components/User/User";

const routes = [
  {
    path: "/",
    name: "Hompage",
    component: Homepage,
  },
  {
    path: "/register",
    name: "Sidebar",
    component: Sidebar,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/user",
    name: "User",
    component: User,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // Check for protected route
  if (requiresAuth && !AuthenticationService.isLoggedIn()) next("login");
  else next();
});

export default router;
