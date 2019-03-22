import Vue from 'vue';
import Router from 'vue-router';

// 导航
const Main = () => import('../views/main/Main');

// 错误页面
const Error = () => import('../views/common/Error.vue');

// ECharts
const Echarts = () => import('../views/echarts/Echarts.vue');
const LinesBeijing = () => import('../views/echarts/lines/LinesBeijing.vue');

// 高德地图
const Gaode = () => import('../views/gaode/Gaode.vue');

Vue.use(Router);

export default new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        { // 默认
            path: '/',
            redirect: '/echarts/lines-beijing'
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
                    component: Echarts,
                    redirect: 'echarts/lines-beijing',
                    children: [
                        { // 北京出租车路线
                            path: 'lines-beijing',
                            name: 'linesBeijing',
                            component: LinesBeijing,
                        }
                    ]
                },
                { // 高德地图
                    path: 'gaode',
                    name: 'gaode',
                    component: Gaode
                }
            ]
        }
    ]
});
