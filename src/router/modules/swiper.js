/*
 * @Author: shenxh
 * @Date: 2020-09-04 17:56:08
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-21 16:24:38
 * @Description: Swiper
 */
export default [
	{
		path: '/swiper',
		name: 'swiper',
		meta: {
			label: 'Swiper',
		},
		redirect: '/swiper/base',
		component: loadView('layout/Layout'),
		children: [
			{
				path: 'base',
				name: 'swiper-base',
				meta: {
					label: '基础',
				},
				component: loadView('swiper/Base'),
			},
			{
				path: 'scale',
				name: 'swiper-scale',
				meta: {
					label: '缩放',
				},
				component: loadView('swiper/Scale'),
			},
		],
	},
];

function loadView(path) {
	return () =>
		import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
