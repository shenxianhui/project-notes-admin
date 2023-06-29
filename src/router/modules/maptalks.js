/*
 * @Description: maptalks
 * @Author: shenxh
 * @Date: 2023-06-27 14:22:09
 * @LastEditors: shenxh
 * @LastEditTime: 2023-06-29 16:45:03
 */

export default [
  {
    path: '/maptalks',
    name: 'maptalks',
    meta: {
      label: 'Maptalks',
    },
    redirect: '/maptalks/base-map',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'base-map',
        name: 'base-map',
        meta: {
          label: '基础',
        },
        component: loadView('maptalks/base-map'),
      },
    ],
  },
]

function loadView(path) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`)
}
