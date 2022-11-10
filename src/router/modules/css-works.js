/*
 * @Description: CSS作品
 * @Author: shenxh
 * @Date: 2022-11-10 13:17:53
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-10 13:22:57
 */

export default [
  {
    path: '/css-works',
    name: 'css-works',
    meta: {
      label: 'CSS作品',
    },
    redirect: '/css-works/progress-bar',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'progress-bar',
        name: 'progress-bar',
        meta: {
          label: '进度条',
        },
        component: loadView('css-works/ProgressBar'),
      },
    ],
  },
]

function loadView(path) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`)
}
