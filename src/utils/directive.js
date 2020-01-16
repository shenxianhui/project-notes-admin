/* 自定义全局指令 */
import Vue from 'vue';

// input 聚焦 `v-focus`
Vue.directive('focus', {
  inserted: el => {
    el.focus();
  }
});
