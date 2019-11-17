import Vue from "vue";
import VueRouter from "vue-router";
import UserStore from "../store/modules/users";
import LoaderStore from "../store/modules/loader";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      layout: "full",
      public: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
    meta: {
      layout: "full",
      public: true
    }
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  LoaderStore.showLoading();

  if (to.matched.some(record => record.meta.public)) {
    next();
  } else {
    const isAuthenticated = await UserStore.isAuthenticated();
    if (!isAuthenticated) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  }
});

router.afterEach((to, from) => {
  LoaderStore.hideLoading();
});

export default router;
