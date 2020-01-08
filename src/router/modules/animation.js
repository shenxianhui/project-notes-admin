/*
 * @Author: Wells
 * @Date: 2020-01-08 09:42:12
 * @LastEditors  : Wells
 * @LastEditTime : 2020-01-08 10:48:05
 * @Description: 动画
 */
export default [
  {
    path: 'animation',
    name: 'animation',
    component: { render: f => f('router-view') },
    redirect: 'animation/galaxy', // 默认
    children: [
      // 星系
      {
        path: 'galaxy',
        name: 'galaxy',
        component: loadView('trajectory/Galaxy.vue')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/animation/${path || ''}`);
}
