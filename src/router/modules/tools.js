/*
 * @Description: 工具
 * @Author: shenxh
 * @Date: 2020-05-01 18:28:06
 * @LastEditors: shenxh
 * @LastEditTime: 2022-04-02 08:54:36
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
					label: 'vue-drag-zoom',
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
