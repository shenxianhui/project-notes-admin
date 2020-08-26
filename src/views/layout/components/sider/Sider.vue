<!--
 * @Author: shenxh
 * @Date: 2020-08-25 09:58:52
 * @LastEditors: shenxh
 * @LastEditTime: 2020-08-26 09:30:28
 * @Description: 侧边栏
-->

<template>
  <div class="sider">
    <el-menu
      :default-active="$route.path"
      unique-opened
      text-color="#000"
      active-text-color="#1890ff"
    >
      <div v-for="(item, index) in currentRoute.children" :key="index" class="menu-wrap">
        <div v-if="item.children" class="menu-item">
          <el-submenu :index="`${currentRoute.path}/${item.path}`">
            <template slot="title">
              <span>{{ item.meta.label }}</span>
            </template>
            <div v-for="(item1, index1) in item.children" :key="index1" class="menu-wrap">
              <div v-if="item1.children" class="menu-item">
                <el-submenu :index="`${currentRoute.path}/${item.path}/${item1.path}`">
                  <template slot="title">
                    <span>{{ item1.meta.label }}</span>
                  </template>
                  <div v-for="(item2, index2) in item1.children" :key="index2" class="menu-wrap">
                    <el-menu-item
                      :index="`${currentRoute.path}/${item.path}/${item1.path}/${item2.path}`"
                      @click="
                        handleMenu(`${currentRoute.path}/${item.path}/${item1.path}/${item2.path}`)
                      "
                    >
                      <span slot="title">{{ item2.meta.label }}</span>
                    </el-menu-item>
                  </div>
                </el-submenu>
              </div>
              <div v-else class="menu-item">
                <el-menu-item
                  :index="`${currentRoute.path}/${item.path}/${item1.path}`"
                  @click="handleMenu(`${currentRoute.path}/${item.path}/${item1.path}`)"
                >
                  <span slot="title">{{ item1.meta.label }}</span>
                </el-menu-item>
              </div>
            </div>
          </el-submenu>
        </div>
        <div v-else class="menu-item">
          <el-menu-item
            :index="`${currentRoute.path}/${item.path}`"
            @click="handleMenu(`${currentRoute.path}/${item.path}`)"
          >
            <span slot="title">{{ item.meta.label }}</span>
          </el-menu-item>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import Router from '@/router/modules';

export default {
  name: 'sider',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    currentRoute() {
      let arr = [];

      Router.forEach(item => {
        if (this.$route.path.includes(item.path)) {
          arr = item;
        }
      });

      return arr;
    }
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleMenu(path) {
      if (this.$route.path === path) return;
      this.$router.push(path);
    }
  }
};
</script>

<style scoped lang="less">
.sider {
  flex-shrink: 0;
  width: 180px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  /deep/ .el-menu {
    width: 100%;
    min-height: 100%;
    border: none;
    .menu-wrap {
      width: 100%;
      .menu-item {
        width: 100%;
        .el-submenu {
          .el-submenu__title {
            &:hover {
              background-color: transparent;
            }
          }
        }
        .el-menu-item {
          &.is-active {
            background-color: #a1c4fd33;
          }
          &:hover {
            background-color: #a1c4fd33;
          }
        }
      }
    }
  }
}
</style>
