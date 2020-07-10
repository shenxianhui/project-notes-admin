import Vue from 'vue';
import VueRouter from 'vue-router';
import Modules from './modules'; // 引入业务逻辑模块
import Common from './common'; // 引入通用模块

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // routes: Modules.concat(Common)
  routes: [
    // 主路由
    {
      path: '/',
      name: 'main',
      component: loadView('index'),
      children: Modules.concat(Common)
    }
  ]
});

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/layout/${path || ''}`);
}
