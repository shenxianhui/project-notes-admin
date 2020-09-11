/*
 * @Author: shenxh
 * @Date: 2020-09-04 17:56:08
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-11 10:12:45
 * @Description: Swiper
 */
export default [
  {
    path: '/swiper',
    name: 'swiper',
    meta: {
      label: 'Swiper'
    },
    redirect: '/swiper/common',
    component: loadView('layout/Layout'),
    children: [
      {
        path: 'common',
        name: 'swiper-common',
        meta: {
          label: '普通'
        },
        component: loadView('swiper/Common')
      },
      {
        path: 'scale',
        name: 'swiper-scale',
        meta: {
          label: '缩放'
        },
        component: loadView('swiper/Scale')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
