import Vue from 'vue';
import Router from 'vue-router';

// 通用容器
const Container = () => import('../views/Container');

// 导航页
const Main = () => import('../views/main/Main');

// 错误页面
const Error = () => import('../views/common/Error.vue');

// ECharts
const Bar = () => import('../views/echarts/bar/Bar.vue');
const Pie = () => import('../views/echarts/pie/Pie.vue');
const MapChina = () => import('../views/echarts/map/China.vue');
const LinesBeijing = () => import('../views/echarts/lines/Beijing.vue');
const LinesShanghai = () => import('../views/echarts/lines/Shanghai.vue');
const Lines3DSouthAfrica = () => import('../views/echarts/lines_3d/SouthAfrica.vue');
const Lines3DChengdu = () => import('../views/echarts/lines_3d/Chengdu.vue');
const Lines3DShanghai = () => import('../views/echarts/lines_3d/Shanghai.vue');

// 其他
const Table = () => import('../views/other/table/Table.vue');

Vue.use(Router);

export default new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        { // 默认
            path: '/',
            redirect: '/echarts/bar'
        },
        { // 错误页
            path: '/error',
            name: 'error',
            component: Error
        },
        { // 主路由
            path: '/',
            name: 'main',
            component: Main,
            children: [
                { // ECharts
                    path: 'echarts',
                    name: 'echarts',
                    component: Container,
                    redirect: 'echarts/bar', // 默认
                    children: [
                        { // 柱状图
                            path: 'bar',
                            name: 'bar',
                            component: Bar
                        },
                        { // 饼图
                            path: 'pie',
                            name: 'pie',
                            component: Pie
                        },
                        { // 地图-中国
                            path: 'map-china',
                            name: 'mapChina',
                            component: MapChina
                        },
                        { // 路线图-北京出租车
                            path: 'lines-beijing',
                            name: 'linesBeijing',
                            component: LinesBeijing
                        },
                        { // 路线图-上海出租车
                            path: 'lines-shanghai',
                            name: 'linesShanghai',
                            component: LinesShanghai
                        },
                        { // 3D路线图-南非出租车
                            path: 'lines-3d-south-africa',
                            name: 'lines3DSouthAfrica',
                            component: Lines3DSouthAfrica
                        },
                        { // 3D路线图-成都出租车
                            path: 'lines-3d-chengdu',
                            name: 'lines3DChengdu',
                            component: Lines3DChengdu
                        },
                        { // 3D路线图-上海出租车
                            path: 'lines-3d-shanghai',
                            name: 'lines3DShanghai',
                            component: Lines3DShanghai
                        }
                    ]
                },
                { // 其他
                    path: 'other',
                    name: 'other',
                    component: Container,
                    redirect: 'other/table', // 默认
                    children: [
                        {
                            path: 'table',
                            name: 'table',
                            component: Table
                        }
                    ]
                }
            ]
        }
    ]
});
