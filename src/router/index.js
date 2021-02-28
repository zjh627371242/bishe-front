import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";

import Task from "../views/Task";
import Teacher from "../views/Teacher";
import Work from "../views/Work";
import Course from "../views/Course";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/home/task",
        name: "Task",
        component: Task,
      },
      {
        path: "/home/teacher",
        name: "Teacher",
        component: Teacher,
      },
      {
        path: "/home/work",
        name: "Work",
        component: Work,
      },
      {
        path: "/home/Course",
        name: "Course",
        component: Course,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem("isLogin") ? true : false;
  if (to.path == "/login" || to.path == "/register" || to.path == "/index") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});

export default router;
