<!--
 * @Author: shenxh
 * @Date: 2020-08-25 09:58:52
 * @LastEditors: shenxh
 * @LastEditTime: 2020-08-25 11:51:18
 * @Description: 侧边栏
-->

<template>
  <div class="sider">
    <el-menu :default-active="$route.name" unique-opened text-color="#fff" active-text-color="#fff">
      <div v-for="(item, index) in currentRoute.children" :key="index" class="menu-wrap">
        <div v-if="item.children" class="menu-item">
          <el-submenu :index="item.name">
            <template slot="title">
              <span>{{ item.meta.label }}</span>
            </template>
            <div v-for="(item1, index1) in item.children" :key="index1" class="menu-wrap">
              <div v-if="item1.children" class="menu-item">
                <el-submenu :index="item1.name">
                  <template slot="title">
                    <span>{{ item1.meta.label }}</span>
                  </template>
                  <div v-for="(item2, index2) in item1.children" :key="index2" class="menu-wrap">
                    <el-menu-item
                      :index="item2.name"
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
                  :index="item1.name"
                  @click="handleMenu(`${currentRoute.path}/${item.path}/${item1.path}`)"
                >
                  <span slot="title">{{ item1.meta.label }}</span>
                </el-menu-item>
              </div>
            </div>
          </el-submenu>
        </div>
        <div v-else class="menu-item">
          <el-menu-item :index="item.name" @click="handleMenu(`${currentRoute.path}/${item.path}`)">
            <span slot="title">{{ item.meta.label }}</span>
          </el-menu-item>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import Router from '@/router/modules';

console.log(Router);

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
    background-color: rgb(37, 37, 48);
    .menu-wrap {
      width: 100%;
      .menu-item {
        width: 100%;
        background-color: rgb(37, 37, 48);
        .el-submenu {
          .el-submenu__title {
            &:hover {
              background-color: transparent;
            }
          }
        }
        .el-menu-item {
          &.is-active {
            background-color: rgb(63, 142, 187);
          }
          &:hover {
            background-color: rgb(63, 142, 187);
          }
        }
      }
    }
  }
}
</style>
