/*
 * @Author: Wells
 * @Date: 2020-01-08 09:42:12
 * @LastEditors  : Wells
 * @LastEditTime : 2020-01-08 10:55:03
 * @Description: 其他
 */
export default [
  {
    path: 'other',
    name: 'other',
    component: { render: f => f('router-view') },
    redirect: 'other/table', // 默认
    children: [
      // 表格
      {
        path: 'table',
        name: 'table',
        component: loadView('table/Table.vue')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/other/${path || ''}`);
}
