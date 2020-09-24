/*
 * @Author: shenxh
 * @Date: 2020-05-01 18:28:06
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-24 09:00:44
 * @Description: Animate
 */
export default [
  {
    path: '/animate',
    name: 'animate',
    meta: {
      label: '动画'
    },
    redirect: '/animate/galaxy',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'galaxy',
        name: 'animate-galaxy',
        meta: {
          label: '星系'
        },
        component: loadView('animate/galaxy/Galaxy')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
