/*
 * @Author: Wells
 * @Date: 2020-02-02 09:09:16
 * @LastEditors: Wells
 * @LastEditTime: 2020-02-21 17:02:45
 * @Description: 算法
 */

export default [
  {
    path: 'algorithm',
    name: 'algorithm',
    component: { render: f => f('router-view') },
    redirect: 'algorithm/sort', // 默认
    children: [
      {
        path: 'sort',
        name: 'sort',
        component: loadView('sort/index.vue')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/algorithm/${path || ''}`);
}
