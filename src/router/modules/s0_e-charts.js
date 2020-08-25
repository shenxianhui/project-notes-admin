/*
 * @Author: shenxh
 * @Date: 2020-08-25 09:51:16
 * @LastEditors: shenxh
 * @LastEditTime: 2020-08-25 18:27:13
 * @Description: ECharts
 */
export default [
  {
    path: '/e-charts',
    name: 'e-charts',
    meta: {
      label: 'ECharts'
    },
    redirect: '/e-charts/bar/base',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'bar',
        name: 'bar',
        meta: {
          label: '柱状图'
        },
        component: { render: f => f('router-view') },
        children: [
          {
            path: 'base',
            name: 'base',
            meta: {
              label: '普通'
            },
            component: loadView('e-charts/bar/Bar')
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
