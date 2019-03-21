import Vue from 'vue';
import Router from 'vue-router';

// 导航
import Main from '../views/main/Main';
import Secondary from '../views/main/Secondary';

// 错误页面
const Error = () => import(/* webpackChunkName: "about" */ '../views/common/Error.vue');

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { // 错误页
            path: '/error',
            name: 'error',
            component: Error
        },
        { // 一级导航页
            path: '/',
            name: 'main',
            component: Main,
            children: [
                { // 二级导航页
                    path: '',
                    name: 'secondary',
                    component: Secondary
                }
            ]
        }
    ]
});
