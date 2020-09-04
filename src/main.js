import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style/common.less';
// Element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// ECharts
import * as Echarts from 'echarts';
// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);

// 挂载
Vue.prototype.$echarts = Echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

// 添加请求拦截器
// axios.interceptors.request.use(
//   config => {
//     // 在发送请求之前做些什么
//     // open loading...
//     return config;
//   },
//   error => {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   }
// );

// 添加响应拦截器
// axios.interceptors.response.use(
//   response => {
//     // 对响应数据做点什么
//     if (!response.data.success) {
//       // alert(response.data.msg);
//     }
//     // close loading...
//     return response;
//   },
//   error => {
//     // 对响应错误做点什么
//     // close loading...
//     // alert(error.data.msg);
//     return Promise.reject(error);
//   }
// );
