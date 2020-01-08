/*
 * @Author: Wells
 * @Date: 2020-01-08 09:42:12
 * @LastEditors  : Wells
 * @LastEditTime : 2020-01-08 10:38:53
 * @Description: 地图
 */
export default [
  {
    path: 'map',
    name: 'map',
    component: { render: f => f('router-view') },
    redirect: 'map/gaode', // 默认
    children: [
      // 高德
      {
        path: 'gaode',
        name: 'gaode',
        component: loadView('GDMap.vue')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/map/${path || ''}`);
}
