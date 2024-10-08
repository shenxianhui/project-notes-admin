/*
 * @Description: three.js
 * @Author: shenxh
 * @Date: 2020-09-04 17:56:08
 * @LastEditors: shenxh
 * @LastEditTime: 2023-06-06 17:05:44
 */
export default [
  {
    path: '/three',
    name: 'three',
    meta: {
      label: 'Three',
    },
    redirect: '/three/water-model',
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
        path: 'water-works-zy-new',
        name: 'water-works-zy-new',
        meta: {
          label: '状元水厂-新',
        },
        component: loadView('three/water-works-zy-new/water-works-zy-new.vue'),
      },
      {
        path: 'earth-rotation',
        name: 'earth-rotation',
        meta: {
          label: '地球自转',
        },
        component: loadView('three/earth-rotation.vue'),
      },
    ],
  },
]

function loadView(path) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`)
}
