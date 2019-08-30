import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import ElementUI from 'element-ui';
// ECharts 及扩展
import echarts from 'echarts';
import 'echarts-gl';
// 公共变量
import Params from '@/components/common/Params';

import 'element-ui/lib/theme-chalk/index.css';
import './style/common.less';
require('echarts/extension/bmap/bmap');

Vue.use(ElementUI);

// 挂载到 Vue 实例上
Vue.prototype.$echarts = echarts;
Vue.prototype.$params = Params;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
