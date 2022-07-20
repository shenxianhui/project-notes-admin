/*
 * @Author: shenxh
 * @Date: 2020-08-25 09:51:16
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-20 15:24:11
 * @Description: ECharts
 */

export default [
  {
    path: '/e-charts-v2',
    name: 'e-charts-v2',
    meta: {
      label: 'ECharts 2.0',
    },
    redirect: '/e-charts-v2/cartesian-coordinate-system-chart',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'cartesian-coordinate-system-chart',
        name: 'cartesian-coordinate-system-chart',
        meta: {
          label: '直角坐标系图表',
        },
        component: loadView(
          'e-charts-v2/cartesian-coordinate-system-chart/CartesianCoordinateSystemChart',
        ),
      },
    ],
  },
];

function loadView(path) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
