/*
 * @Author: shenxh
 * @Date: 2020-05-01 18:28:06
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-24 09:26:00
 * @Description: Function
 */
export default [
  {
    path: '/function',
    name: 'function',
    meta: {
      label: '功能'
    },
    redirect: '/function/mouse-drag',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'mouse-drag',
        name: 'mouse-drag',
        meta: {
          label: '鼠标拖动'
        },
        component: loadView('function/MouseDrag')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
