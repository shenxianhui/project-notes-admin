/*
 * @Author: shenxh
 * @Date: 2020-05-01 18:28:06
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-19 14:10:12
 * @Description: Animate
 */

export default [
  {
    path: '/animate',
    name: 'animate',
    meta: {
      label: '动画',
    },
    redirect: '/animate/galaxy',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'galaxy',
        name: 'animate-galaxy',
        meta: {
          label: '星系',
        },
        component: loadView('animate/galaxy/Galaxy'),
      },
      {
        path: 'serial-frame',
        name: 'serial-frame',
        meta: {
          label: '序列帧',
        },
        component: loadView('animate/serial-frame/SerialFrame'),
      },
      {
        path: 'media-file',
        name: 'media-file',
        meta: {
          label: '媒体文件',
        },
        component: loadView('animate/media-file/MediaFile'),
      },
      {
        path: 'line',
        name: 'line',
        meta: {
          label: '线',
        },
        component: loadView('animate/line/Line'),
      },
    ],
  },
];

function loadView(path) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
