/*
 * @Description: 地图
 * @Author: shenxh
 * @Date: 2023-06-27 14:22:09
 * @LastEditors: shenxh
 * @LastEditTime: 2023-09-18 13:58:43
 */

export default [
  {
    path: '/map',
    name: 'map',
    meta: {
      label: '地图',
    },
    redirect: '/map/maptalks/point',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'maptalks',
        name: 'maptalks',
        meta: {
          label: 'Maptalks',
        },
        component: loadView('map/maptalks/maptalks'),
        children: [
          {
            path: 'point',
            name: 'point',
            meta: {
              label: '点',
            },
            component: loadView('map/maptalks/point'),
          },
          {
            path: 'line',
            name: 'line',
            meta: {
              label: '线',
            },
            component: loadView('map/maptalks/line'),
          },
          {
            path: 'surface',
            name: 'surface',
            meta: {
              label: '面',
            },
            component: loadView('map/maptalks/surface'),
          },
        ],
      },
      {
        path: 'mapbox',
        name: 'mapbox',
        meta: {
          label: 'Mapbox',
        },
        component: loadView('map/mapbox/mapbox'),
      },
    ],
  },
]

function loadView(path) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`)
}
