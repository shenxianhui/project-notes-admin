/*
 * @Author: Wells
 * @Date: 2020-01-08 09:42:12
 * @LastEditors: shenxh
 * @LastEditTime: 2020-07-10 16:50:44
 * @Description: 功能
 */
export default [
  {
    path: 'function',
    name: 'function',
    component: { render: f => f('router-view') },
    redirect: 'function/mouse-follow', // 默认
    children: [
      // 鼠标跟随
      {
        path: 'mouse-follow',
        name: 'mouse-follow',
        component: loadView('common/MouseFollow.vue')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/function/${path || ''}`);
}
