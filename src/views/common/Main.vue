/* * @Author: ShenXianhui * @Date: 2019-03-21 15:35:31 * @Last Modified by: Shen Xianhui * @Last Modified time:
2019-07-21 10:05:51 */
<!-- 导航菜单-顶部 -->
<template>
  <div class="main">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="logo">
        <img src="@/assets/img/common/logo.png" alt="logo" />
        <h2 ref="logo" @click="setLogo()">xx-notes</h2>
      </div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="(item, index) in headerList" :key="item.value" :index="String(index)">
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
export default {
  name: 'Main',
  components: {},
  props: {},
  data() {
    return {
      activeIndex: '0', // 当前选中-顶栏
      isCollapse: false, // 折叠
      activeHeaderMenu: 'echarts', // 顶部选中菜单
      menuList: [], // 菜单

      headerList: [
        // 顶部导航列表
        {
          label: 'ECharts',
          value: 'echarts',
          url: 'echarts',
          list: 'echartsList'
        },
        {
          label: '地图',
          value: 'map',
          url: 'map',
          list: 'mapList'
        },
        {
          label: '动画',
          value: 'animation',
          url: 'animation',
          list: 'animationList'
        },
        {
          label: '游戏',
          value: 'game',
          url: 'game',
          list: 'gameList'
        },
        {
          label: '模板',
          value: 'template',
          url: 'template',
          list: 'templateList'
        },
        {
          label: '其他',
          value: 'other',
          url: 'other',
          list: 'otherList'
        }
      ],
      sideList: {
        // 侧边导航列表
        echartsList: [
          // Echarts
          {
            label: '图表',
            value: 'chart',
            type: 'echarts',
            children: [
              {
                label: '联动',
                value: 'chart',
                url: 'chart'
              }
            ]
          },
          {
            label: '地图',
            value: 'map',
            type: 'echarts',
            children: [
              {
                label: '散点&映射',
                value: 'mapScatter',
                url: 'map-scatter'
              }
            ]
          },
          {
            label: '路径图',
            value: 'lines',
            type: 'echarts',
            children: [
              {
                label: '北京',
                value: 'linesBeijing',
                url: 'lines-beijing'
              },
              {
                label: '上海',
                value: 'linesShanghai',
                url: 'lines-shanghai'
              }
            ]
          },
          {
            label: '路径图 - 3D',
            value: 'lines3D',
            type: 'echarts',
            children: [
              {
                label: '成都',
                value: 'lines3DChengdu',
                url: 'lines-3d-chengdu'
              },
              {
                label: '上海',
                value: 'lines3DShanghai',
                url: 'lines-3d-shanghai'
              }
            ]
          }
        ],
        mapList: [
          // 地图
          {
            label: '高德',
            value: 'gaode',
            type: 'map',
            children: [
              {
                label: '高德',
                value: 'gaode',
                url: 'gaode'
              }
            ]
          }
        ],
        animationList: [
          // 动画
          {
            label: '轨迹',
            value: 'trajectory',
            type: 'animation',
            children: [
              {
                label: '星系',
                value: 'galaxy',
                url: 'galaxy'
              }
            ]
          }
        ],
        gameList: [
          // 游戏
          {
            label: '贪吃蛇',
            value: 'snake',
            type: 'game',
            children: [
              {
                label: '贪吃蛇',
                value: 'snake',
                url: 'snake'
              }
            ]
          }
        ],
        templateList: [
          // 模板
          {
            label: '表格页',
            value: 'tablePage',
            type: 'template',
            children: [
              {
                label: '表格页',
                value: 'tablePage',
                url: 'table-page'
              }
            ]
          },
          {
            label: '编辑页',
            value: 'editPage',
            type: 'template',
            children: [
              {
                label: '编辑页',
                value: 'editPage',
                url: 'edit-page/0'
              }
            ]
          },
          {
            label: '详情页',
            value: 'detailsPage',
            type: 'template',
            children: [
              {
                label: '详情页',
                value: 'detailsPage',
                url: 'details-page/0'
              }
            ]
          }
        ],
        otherList: [
          // 其他
          {
            label: '表格',
            value: 'table',
            type: 'other',
            children: [
              {
                label: '实例',
                value: 'table',
                url: 'table'
              }
            ]
          }
        ]
      }
    };
  },
  computed: {
    asideActive() {
      return this.$route.path.split('/').pop();
    }
  },
  watch: {},
  created() {
    this.menuList = this.sideList.echartsList;
    this.activeHeaderMenu = this.headerList[0].value;
  },
  methods: {
    // 顶栏-选中
    handleSelect(key) {
      this.activeHeaderMenu = this.headerList[key].value;
      this.menuList = this.sideList[this.headerList[key].list];
      this.$router.push(`/${this.headerList[key].url}`);
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

      for (let i = 0; i < 3; i++) {
        let num = Math.floor(Math.random() * 16);
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
