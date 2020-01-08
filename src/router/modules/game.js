/*
 * @Author: Wells
 * @Date: 2020-01-08 09:42:12
 * @LastEditors  : Wells
 * @LastEditTime : 2020-01-08 10:42:29
 * @Description: 游戏
 */
export default [
  {
    path: 'game',
    name: 'game',
    component: { render: f => f('router-view') },
    redirect: 'game/snake', // 默认
    children: [
      // 贪吃蛇
      {
        path: 'snake',
        name: 'snake',
        component: loadView('snake/Snake.vue')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/game/${path || ''}`);
}
