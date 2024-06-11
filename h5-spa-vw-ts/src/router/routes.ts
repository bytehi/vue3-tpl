import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Home' },
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('@/views/home/index.vue'),
  },
]
