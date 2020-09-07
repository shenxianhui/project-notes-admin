/*
 * @Author: shenxh
 * @Date: 2020-09-07 09:24:12
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-07 09:27:49
 * @Description: 运动
 */

export default [
  {
    path: '/animation',
    name: 'animation',
    meta: {
      label: '运动'
    },
    redirect: '/animation/sequence-frame',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'sequence-frame',
        name: 'sequence-frame',
        meta: {
          label: '序列帧'
        },
        component: loadView('animation/sequence-frame/SequenceFrame')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
