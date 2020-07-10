/*
 * @Author: Wells
 * @Date: 2020-01-08 09:42:12
 * @LastEditors: shenxh
 * @LastEditTime: 2020-07-06 15:35:31
 * @Description: Swiper
 */
export default [
  {
    path: 'swiper',
    name: 'swiper',
    component: { render: f => f('router-view') },
    redirect: 'swiper/scale', // 默认
    children: [
      // 缩放
      {
        path: 'scale',
        name: 'scale',
        component: loadView('progress/Scale.vue')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/swiper/${path || ''}`);
}
