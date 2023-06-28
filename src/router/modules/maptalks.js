/*
 * @Description: maptalks
 * @Author: shenxh
 * @Date: 2023-06-27 14:22:09
 * @LastEditors: shenxh
 * @LastEditTime: 2023-06-27 16:52:05
 */

export default [
  {
    path: '/maptalks',
    name: 'maptalks',
    meta: {
      label: 'Maptalks',
    },
    redirect: '/maptalks/screen-wz',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'screen-wz',
        name: 'screen-wz',
        meta: {
          label: '温州大屏',
        },
        component: loadView('maptalks/screen-wz'),
      },
    ],
  },
]

function loadView(path) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`)
}
