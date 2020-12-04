/*
 * @Author: shenxh
 * @Date: 2020-05-01 18:28:06
 * @LastEditors: shenxh
 * @LastEditTime: 2020-12-04 17:50:28
 * @Description: Element
 */
export default [
  {
    path: '/element',
    name: 'element',
    meta: {
      label: 'Element'
    },
    redirect: '/element/table',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'table',
        name: 'element-table',
        meta: {
          label: '表格'
        },
        component: loadView('element/table/Table')
      },
      {
        path: 'form',
        name: 'element-form',
        meta: {
          label: '表单'
        },
        component: loadView('element/form/Form')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
