/*
 * @Description: 工具
 * @Author: shenxh
 * @Date: 2020-05-01 18:28:06
 * @LastEditors: shenxh
 * @LastEditTime: 2022-02-25 11:28:03
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
					label: '拖动+缩放',
				},
				component: loadView('tools/DragZoom'),
			},
		],
	},
];

function loadView(path) {
	return () =>
		import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
