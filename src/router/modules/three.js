/*
 * @Description: three.js
 * @Author: shenxh
 * @Date: 2020-09-04 17:56:08
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-21 15:05:18
 */
export default [
  {
    path: '/three',
    name: 'three',
    meta: {
      label: 'Three',
    },
    redirect: '/three/lesson1',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'lesson1',
        name: 'lesson1',
        meta: {
          label: '创建一个场景',
        },
        component: loadView('three/learn/lesson1.vue'),
      },
      {
        path: 'lesson2',
        name: 'lesson2',
        meta: {
          label: '画线',
        },
        component: loadView('three/learn/lesson2.vue'),
      },
      {
        path: 'water-model',
        name: 'water-model-demo',
        meta: {
          label: '水务模型',
        },
        component: loadView('three/WaterModel'),
      },
    ],
  },
];

function loadView(path) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
