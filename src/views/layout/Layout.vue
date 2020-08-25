<!--
 * @Author: shenxh
 * @Date: 2020-08-25 09:27:47
 * @LastEditors: shenxh
 * @LastEditTime: 2020-08-25 11:32:33
 * @Description: 布局
-->

<template>
  <div class="layout">
    <xx-header></xx-header>
    <div class="layout-body">
      <xx-sider></xx-sider>
      <div class="layout-body-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import XxHeader from './components/header/Header';
import XxSider from './components/sider/Sider';

export default {
  name: 'layout',
  components: {
    XxHeader,
    XxSider
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style scoped lang="less">
.layout {
  width: 100vw;
  height: 100vh;
  .layout-body {
    display: flex;
    height: calc(100% - 60px);
    .layout-body-content {
      width: 100%;
      overflow: auto;
    }
  }
}
</style>
