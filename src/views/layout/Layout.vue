<!--
 * @Author: shenxh
 * @Date: 2020-08-25 09:27:47
 * @LastEditors: shenxh
 * @LastEditTime: 2020-08-25 18:45:58
 * @Description: 布局
-->

<template>
  <div class="layout">
    <xx-header></xx-header>
    <div class="layout-body">
      <xx-sider @handle-menu="handleSiderMenu"></xx-sider>
      <div class="layout-body-wrap">
        <xx-tags :current-router-path="currentRouterPath"></xx-tags>
        <div class="layout-body-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XxHeader from './components/header/Header';
import XxSider from './components/sider/Sider';
import XxTags from './components/tags/Tags';

export default {
  name: 'layout',
  components: {
    XxHeader,
    XxSider,
    XxTags
  },
  props: {},
  data() {
    return {
      currentRouterPath: ''
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleSiderMenu(path) {
      this.currentRouterPath = path;
    }
  }
};
</script>

<style scoped lang="less">
.layout {
  width: 100vw;
  height: 100vh;
  background-color: #efefef;
  .layout-body {
    display: flex;
    height: calc(100% - 60px);
    .layout-body-wrap {
      width: 100%;
      overflow: auto;
    }
  }
}
</style>
