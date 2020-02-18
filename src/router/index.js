import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    // 默认
    {
      path: '/',
      redirect: '/main/home'
    },
    // 错误
    {
      path: '*',
      name: 'error',
      component: loadView('Error')
    },
    {
      path: '/main',
      component: { render: f => f('router-view') },
      children: [
        {
          path: 'home',
          name: 'home',
          component: loadView('Home')
        },
        {
          path: 'about',
          name: 'about',
          component: loadView('About')
        }
      ]
    }
  ]
});

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
