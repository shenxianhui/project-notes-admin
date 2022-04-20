/*
 * @Description: three.js
 * @Author: shenxh
 * @Date: 2020-09-04 17:56:08
 * @LastEditors: shenxh
 * @LastEditTime: 2022-04-20 14:41:00
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
