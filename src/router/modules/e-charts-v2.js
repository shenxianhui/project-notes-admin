/*
 * @Author: shenxh
 * @Date: 2020-08-25 09:51:16
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-21 11:05:53
 * @Description: ECharts
 */

export default [
  {
    path: '/e-charts-v2',
    name: 'e-charts-v2',
    meta: {
      label: 'ECharts 2.0',
    },
    redirect: '/e-charts-v2/flexible-chart',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'flexible-chart',
        name: 'flexible-chart',
        meta: {
          label: '灵活图表',
        },
        component: loadView('e-charts-v2/flexible-chart/FlexibleChart'),
      },
    ],
  },
]

function loadView(path) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`)
}
