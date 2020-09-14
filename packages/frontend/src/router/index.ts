import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/new-room',
    name: 'new-room',
    component: () => import(/* webpackChunkName: "new-room" */ '../views/NewRoom.vue'),
  },
  {
    path: '/book-desk',
    name: 'bookDesk',
    component: () => import(/* webpackChunkName: "BookDesk" */ '../views/BookDesk.vue'),
  },
  {
    path: '/book-desk/modify',
    name: 'modify',
    component: () => import(/* webpackChunkName: "modify" */ '../views/Modify.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'auth-login',
    component: () => import(/* webpackChunkName: "auth-login" */ '../views/Login.vue'),
  },
  {
    path: '/auth/callback',
    name: 'auth-callback',
    component: () => import(/* webpackChunkName: "auth-callback" */ '../views/AuthCallback.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.name === 'auth-callback') {
    next();
    return;
  }

  try {
    await store.dispatch('auth/authenticate');
  } catch (error) {
    if (to.name === 'auth-login') {
      next();
      return;
    }
  }

  // don't need auth
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  // already authenticated
  if (store.getters['auth/isAuthenticated']) {
    next();
    return;
  }

  next({ name: 'auth-login' });
  return;
});

export default router;
