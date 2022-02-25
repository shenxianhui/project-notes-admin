/*
 * @Author: shenxh
 * @Date: 2020-08-25 09:51:16
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-11 11:33:45
 * @Description: ECharts
 */
export default [
	{
		path: '/e-charts',
		name: 'e-charts',
		meta: {
			label: 'ECharts',
		},
		redirect: '/e-charts/bar-line',
		component: loadView('layout/Layout'),
		children: [
			{
				path: 'bar-line',
				name: 'bar-line',
				meta: {
					label: '柱线图',
				},
				component: loadView('e-charts/bar-line/BarLine'),
			},
			{
				path: 'pie',
				name: 'pie',
				meta: {
					label: '饼图',
				},
				component: loadView('e-charts/pie/Pie'),
			},
			{
				path: 'radar',
				name: 'radar',
				meta: {
					label: '雷达图',
				},
				component: loadView('e-charts/radar/Radar'),
			},
			{
				path: 'map',
				name: 'map',
				meta: {
					label: '地图',
				},
				component: loadView('e-charts/map/Map'),
			},
		],
	},
];

function loadView(path) {
	return () =>
		import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
