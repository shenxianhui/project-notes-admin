/*
 * @Description: 工具
 * @Author: shenxh
 * @Date: 2020-05-01 18:28:06
 * @LastEditors: shenxh
 * @LastEditTime: 2023-02-06 19:29:22
 */
export default [
  {
    path: '/tools',
    name: 'tools',
    meta: {
      label: '工具',
    },
    redirect: '/tools/drag-zoom',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'drag-zoom',
        name: 'drag-zoom',
        meta: {
          label: 'vue-drag-zoom',
        },
        component: loadView('tools/DragZoom'),
      },
      {
        path: 'full-screen-adaptive-container',
        name: 'full-screen-adaptive-container',
        meta: {
          label: '全屏自适应容器',
        },
        component: loadView('tools/full-screen-adaptive-container'),
      },
    ],
  },
]

function loadView(path) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`)
}
