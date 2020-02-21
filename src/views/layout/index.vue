<!--
 * @Author: ShenXianhui
 * @Date: 2019-03-21 15:35:31
 * @LastEditors: Wells
 * @LastEditTime: 2020-02-21 16:38:56
 * @Description: 导航菜单-顶部
 -->
<template>
  <div class="main">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="logo">
        <img src="@/assets/img/common/logo.png" alt="logo" />
        <h2 ref="logo" @click="setLogo()">xx-notes</h2>
      </div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="(item, index) in menus" :key="item.value" :index="String(index)">
          {{ item.label }}
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 侧边栏+内容 -->
    <div class="aside">
      <el-menu
        :default-active="asideActive"
        class="el-menu-vertical-demo"
        :unique-opened="true"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <div class="collapse" @click="isCollapse = !isCollapse">{{ isCollapse ? '→' : '←' }}</div>
        <el-submenu
          v-show="item.type === activeHeaderMenu"
          v-for="(item, index) in menuList"
          :key="item.id"
          :index="String(index)"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="item1 in item.children"
              :key="item1.value"
              :index="item1.url"
              @click="handleClick(item1)"
            >
              {{ item1.label }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { menus, submenus } from '@/router/menus';

export default {
  name: 'Main',
  components: {},
  props: {},
  data() {
    return {
      // activeIndex: '0', // 当前选中-顶栏
      isCollapse: false, // 折叠
      activeHeaderMenu: 'echarts', // 顶部选中菜单
      menuList: [], // 菜单
      menus
    };
  },
  computed: {
    asideActive() {
      return this.$route.path.split('/').pop();
    },
    activeIndex() {
      let num = '0';
      menus.forEach((item, index) => {
        if (item.value === this.$route.path.split('/')[1]) {
          num = index + '';
        }
      });
      return num;
    }
  },
  watch: {},
  created() {
    this.menuList = submenus.echartsList;
    this.activeHeaderMenu = menus[0].value;
  },
  methods: {
    // 顶栏-选中
    handleSelect(key) {
      this.activeHeaderMenu = menus[key].value;
      this.menuList = submenus[menus[key].list];
      this.$router.push(`/${menus[key].url}`);
    },

    // 侧边栏-展开
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },

    // 侧边栏-折叠
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    // 侧边栏-选择
    handleClick(v) {
      this.$router.push(`/${this.activeHeaderMenu}/${v.url}`);
    },

    // logo 设置
    setLogo() {
      let str = '#';
      for (let i = 0; i < 6; i++) {
        let num = Math.floor(Math.random() * 10);
        str += num;
      }
      this.$refs.logo.style.color = str;
    }
  }
};
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  /* 顶部导航 */
  .header {
    display: flex;
    padding: 0 20px;
    border-bottom: 1px solid #e6e6e6;
    .logo {
      display: flex;
      align-items: center;
      min-width: 180px;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
        margin-right: 15px;
        border-radius: 4px;
      }
      h2 {
        color: #333;
        user-select: none;
      }
    }
    /deep/ .el-menu-demo {
      width: 100%;
      border: none;
    }
  }

  /* 侧边栏+内容 */
  .aside {
    display: flex;
    width: 100%;
    height: calc(100% - 61px);
    /deep/ .el-menu {
      .collapse {
        width: 100%;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border-bottom: 1px solid #eee;
        user-select: none;
        cursor: pointer;
      }
      .collapse:hover {
        background-color: #eee;
      }
    }
    /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
      min-width: 200px;
      min-height: 400px;
    }
    /* 内容 */
    .content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
