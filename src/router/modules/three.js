/*
 * @Description: three.js
 * @Author: shenxh
 * @Date: 2020-09-04 17:56:08
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-17 11:25:20
 */
export default [
  {
    path: '/three',
    name: 'three',
    meta: {
      label: 'Three',
    },
    redirect: '/three/water-works-sgs',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'water-model',
        name: 'water-model',
        meta: {
          label: '水务模型',
        },
        component: loadView('three/WaterModel'),
      },
      {
        path: 'water-works-zy',
        name: 'water-works-zy',
        meta: {
          label: '状元水厂',
        },
        component: loadView('three/water-works-zy.vue'),
      },
      {
        path: 'water-works-sgs',
        name: 'water-works-sgs',
        meta: {
          label: '石鼓山水厂',
        },
        component: loadView('three/water-works-sgs.vue'),
      },
    ],
  },
]

function loadView(path) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`)
}
