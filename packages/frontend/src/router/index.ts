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

  // already authenticated
  if (store.getters['auth/isAuthenticated']) {
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

    if (error.message.includes('No accessToken found in storage')) {
      next({ name: 'auth-login' });
      return;
    }

    return;
  }

  // don't need auth
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }
});

export default router;
