<!--
 * @Author: shenxh
 * @Date: 2020-08-25 09:58:52
 * @LastEditors: shenxh
 * @LastEditTime: 2020-08-26 10:25:48
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
      <xx-sider-menu :menu-data="currentRoute"></xx-sider-menu>
    </el-menu>
  </div>
</template>

<script>
import Router from '@/router/modules'
import XxSiderMenu from './sider-menu/SiderMenu'

export default {
  name: 'menu',
  components: {
    XxSiderMenu,
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    currentRoute() {
      let arr = []

      Router.forEach(item => {
        if (this.$route.path.includes(item.path)) {
          arr = item
        }
      })

      return arr
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
}
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
