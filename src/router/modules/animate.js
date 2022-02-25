/*
 * @Author: shenxh
 * @Date: 2020-05-01 18:28:06
 * @LastEditors: shenxh
 * @LastEditTime: 2022-02-25 11:20:15
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
		],
	},
];

function loadView(path) {
	return () =>
		import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
