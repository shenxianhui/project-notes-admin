/*
 * @Author: shenxh
 * @Date: 2020-05-01 18:28:06
 * @LastEditors: shenxh
 * @LastEditTime: 2022-02-25 11:20:17
 * @Description: Element
 */
export default [
  {
    path: '/element',
    name: 'element',
    meta: {
      label: 'Element',
    },
    redirect: '/element/table',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'table',
        name: 'element-table',
        meta: {
          label: '表格',
        },
        component: loadView('element/table/Table'),
      },
      {
        path: 'form',
        name: 'element-form',
        meta: {
          label: '表单',
        },
        component: loadView('element/form/Form'),
      },
      {
        path: 'tree',
        name: 'element-tree',
        meta: {
          label: '树形控件',
        },
        component: loadView('element/tree/Tree'),
      },
    ],
  },
]

function loadView(path) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`)
}
