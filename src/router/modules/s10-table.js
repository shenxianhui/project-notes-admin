/*
 * @Author: shenxh
 * @Date: 2020-05-01 18:28:06
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-21 14:51:23
 * @Description: Table
 */
export default [
  {
    path: '/table',
    name: 'table',
    meta: {
      label: '表格'
    },
    redirect: '/table/base',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'base',
        name: 'base-table',
        meta: {
          label: '基础'
        },
        component: loadView('table/Base')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
