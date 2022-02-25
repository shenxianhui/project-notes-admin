/*
 * @Author: shenxh
 * @Date: 2020-05-01 18:28:06
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-24 09:38:21
 * @Description: Game
 */
export default [
	{
		path: '/game',
		name: 'game',
		meta: {
			label: '游戏',
		},
		redirect: '/game/snake',
		component: loadView('layout/Layout'),
		children: [
			{
				path: 'snake',
				name: 'snake',
				meta: {
					label: '贪吃蛇',
				},
				component: loadView('game/snake/Snake'),
			},
		],
	},
];

function loadView(path) {
	return () =>
		import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
