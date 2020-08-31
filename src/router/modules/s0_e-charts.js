/*
 * @Author: shenxh
 * @Date: 2020-08-25 09:51:16
 * @LastEditors: shenxh
 * @LastEditTime: 2020-08-31 16:01:44
 * @Description: ECharts
 */
export default [
  {
    path: '/e-charts',
    name: 'e-charts',
    meta: {
      label: 'ECharts'
    },
    redirect: '/e-charts/bar-line/base',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'bar-line',
        name: 'bar-line',
        meta: {
          label: '柱线图'
        },
        component: { render: f => f('router-view') },
        children: [
          {
            path: 'base',
            name: 'base',
            meta: {
              label: '普通'
            },
            component: loadView('e-charts/bar-line/BarLine')
          }
        ]
      },
      {
        path: 'line',
        name: 'line',
        meta: {
          label: '折线图'
        },
        component: { render: f => f('router-view') },
        children: [
          {
            path: 'base',
            name: 'base',
            meta: {
              label: '普通'
            },
            component: loadView('e-charts/line/Line')
          }
        ]
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
