import Vue from 'vue';
import VueRouter from 'vue-router';

// 公共
const Error = () => import(/* webpackChunkName: "error" */ '@/views/common/Error');

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home');
const About = () => import(/* webpackChunkName: "about" */ '@/views/About');

Vue.use(VueRouter);

const routes = [
  // 默认
  {
    path: '/',
    redirect: '/main/home'
  },
  // 错误
  {
    path: 'error',
    name: 'error',
    component: Error
  },
  {
    path: '/main',
    component: { render: f => f('router-view') },
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'about',
        name: 'about',
        component: About
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
