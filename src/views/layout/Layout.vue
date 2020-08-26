<!--
 * @Author: shenxh
 * @Date: 2020-08-25 09:27:47
 * @LastEditors: shenxh
 * @LastEditTime: 2020-08-26 10:49:10
 * @Description: 布局
-->

<template>
  <div class="layout">
    <xx-header></xx-header>
    <div class="layout-body">
      <xx-sider></xx-sider>
      <div class="layout-body-wrap">
        <xx-tags :before-route-update="routeInfo"></xx-tags>
        <div class="breadcrumb">
          <el-breadcrumb>
            <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
              {{ item.meta.label }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
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
      routeInfo: {}
    };
  },
  computed: {
    breadcrumbList() {
      let list = [];
      this.$route.matched.map(item => {
        if (item.meta.label) {
          list.push(item);
        }
      });
      return list;
    }
  },
  watch: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.routeInfo = {
        to,
        from
      };
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.routeInfo = {
      to,
      from
    };
    next();
  },
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
      .breadcrumb {
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: 50px;
      }
      .layout-body-content {
        height: calc(100% - 90px);
        overflow: hidden;
      }
    }
  }
}
</style>
