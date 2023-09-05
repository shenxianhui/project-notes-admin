/*
 * @Description: 地图
 * @Author: shenxh
 * @Date: 2023-06-27 14:22:09
 * @LastEditors: shenxh
 * @LastEditTime: 2023-09-05 16:05:20
 */

export default [
  {
    path: '/map',
    name: 'map',
    meta: {
      label: '地图',
    },
    redirect: '/map/maptalks',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'maptalks',
        name: 'maptalks',
        meta: {
          label: 'Maptalks',
        },
        component: loadView('map/maptalks'),
      },
    ],
  },
]

function loadView(path) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`)
}
