import Vue from 'vue';
import App from './App.vue';
import Router from './router/index';
import Store from './store/index';
import ElementUI from 'element-ui';
// ECharts 及扩展
import Echarts from 'echarts';
import 'echarts-gl';

import 'element-ui/lib/theme-chalk/index.css';
import './style/common.less';
require('echarts/extension/bmap/bmap');

Vue.use(ElementUI);

// 挂载到 Vue 实例上
Vue.prototype.$echarts = Echarts;

Vue.config.productionTip = false;

new Vue({
  router: Router,
  store: Store,
  render: h => h(App)
}).$mount('#app');
