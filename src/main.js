import Vue from 'vue';
import App from './App.vue';
import Router from './router/index';
import Store from './store/index';
import './style/common.less';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

import Echarts from 'echarts';
import 'echarts-gl';
require('echarts/extension/bmap/bmap');

Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);

// 挂载到 Vue 实例上
Vue.prototype.$echarts = Echarts;

Vue.config.productionTip = false;

new Vue({
  router: Router,
  store: Store,
  render: h => h(App)
}).$mount('#app');
