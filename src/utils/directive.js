/* 自定义全局指令 */
import Vue from 'vue';

// input 聚焦 `v-focus`
Vue.directive('focus', {
  inserted: el => {
    el.focus();
  }
});

// Element-UI Table 滚动加载 `v-loadmore`
Vue.directive('loadmore', {
  bind(el, binding) {
    const table = el.querySelector('.el-table__body-wrapper');
    table.addEventListener('scroll', function() {
      // 距离底部 100px 时触发
      if (this.scrollHeight - this.scrollTop <= this.clientHeight + 100) {
        binding.value();
      }
    });
  }
});
