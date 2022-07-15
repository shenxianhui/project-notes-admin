/*
 * @Author: shenxh
 * @Date: 2020-08-25 09:51:16
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-15 11:14:28
 * @Description: ECharts
 */

export default [
  {
    path: '/e-charts-v2',
    name: 'e-charts-v2',
    meta: {
      label: 'ECharts 2.0',
    },
    redirect: '/e-charts-v2/line',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'line',
        name: 'line',
        meta: {
          label: '柱线图',
        },
        component: loadView('e-charts-v2/line/Line'),
      },
    ],
  },
];

function loadView(path) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
