/*
 * @Author: Wells
 * @Date: 2020-01-08 09:42:12
 * @LastEditors  : Wells
 * @LastEditTime : 2020-01-08 10:36:52
 * @Description: ECharts
 */
export default [
  {
    path: 'echarts',
    name: 'echarts',
    component: { render: f => f('router-view') },
    redirect: 'echarts/chart', // 默认
    children: [
      {
        // 图表
        path: 'chart',
        name: 'chart',
        component: loadView('chart/Chart.vue')
      },
      {
        // 地图-散点&映射
        path: 'map-scatter',
        name: 'mapScatter',
        component: loadView('map/MapScatter.vue')
      },
      {
        // 路线图-北京出租车
        path: 'lines-beijing',
        name: 'linesBeijing',
        component: loadView('lines/Beijing.vue')
      },
      {
        // 路线图-上海出租车
        path: 'lines-shanghai',
        name: 'linesShanghai',
        component: loadView('lines/Shanghai.vue')
      },
      {
        // 3D路线图-成都出租车
        path: 'lines-3d-chengdu',
        name: 'lines3DChengdu',
        component: loadView('lines_3d/Chengdu.vue')
      },
      {
        // 3D路线图-上海出租车
        path: 'lines-3d-shanghai',
        name: 'lines3DShanghai',
        component: loadView('lines_3d/Shanghai.vue')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/echarts/${path || ''}`);
}
