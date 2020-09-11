/*
 * @Author: shenxh
 * @Date: 2020-05-01 18:28:06
 * @LastEditors: shenxh
 * @LastEditTime: 2020-08-25 11:54:01
 * @Description: Table
 */
export default [
  {
    path: '/table',
    name: 'table',
    meta: {
      label: '表格'
    },
    redirect: '/table/common',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'common',
        name: 'table-common',
        meta: {
          label: '普通'
        },
        component: loadView('table/Table')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
