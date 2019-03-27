/*
 * @Author: ShenXianhui 
 * @Date: 2019-03-21 15:35:31 
 * @Last Modified by: ShenXianhui
 * @Last Modified time: 2019-03-27 08:39:21
 */
<!-- 导航菜单-顶部 -->
<template>
    <div class="main">
        <!-- 顶部导航 -->
        <div class="header">
            <div class="logo">
                <img src="@/assets/icon/logo.png" alt="logo">
                <h2>小贤笔记</h2>
            </div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item
                    v-for="(item, index) in headerList"
                    :key="item.value"
                    :index="String(index)">
                    {{ item.label }}
                </el-menu-item>
            </el-menu>
        </div>

        <!-- 侧边栏+内容 -->
        <div class="aside">
            <el-menu
                :default-active="String($route.path.split('/').pop())"
                class="el-menu-vertical-demo"
                :unique-opened="true"
                @open="handleOpen"
                @close="handleClose"
                :collapse="isCollapse">
                <div class="collapse" @click="isCollapse = !isCollapse">{{ isCollapse ? '→' : '←' }}</div>
                <el-submenu
                    v-show="item.type === activeHeaderMenu"
                    v-for="(item, index) in asideList"
                    :key="item.id"
                    :index="String(index)">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{ item.label }}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item
                            v-for="item1 in item.children"
                            :key="item1.value"
                            :index="item1.url"
                            @click="handleClick(item1)">
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

            headerList: [ // 顶部导航列表
                {
                    label: 'ECharts',
                    value: 'echarts',
                    url: 'echarts'
                },
                {
                    label: '高德地图',
                    value: 'gaode',
                    url: 'gaode'
                }
            ],
            asideList: [ // 菜单列表
                {
                    label: '路径图',
                    value: 'lines',
                    type: 'echarts',
                    children: [
                        {
                            label: '北京出租车',
                            value: 'linesBeijing',
                            url: 'lines-beijing'
                        },
                        {
                            label: '上海出租车',
                            value: 'linesShanghai',
                            url: 'lines-shanghai'
                        }
                    ]
                },
                {
                    label: '3D路径图',
                    value: 'lines3D',
                    type: 'echarts',
                    children: [
                        {
                            label: '南非',
                            value: 'lines3DSouthAfrica',
                            url: 'lines-3d-south-africa'
                        },
                        {
                            label: '成都',
                            value: 'lines3DChengdu',
                            url: 'lines-3d-chengdu'
                        },
                        {
                            label: '上海出租车',
                            value: 'lines3DShanghai',
                            url: 'lines-3d-shanghai'
                        }
                    ]
                }
            ]
        };
    },
    computed: {},
    watch: {},
    created() {},
    methods: {
        // 顶栏-选中
        handleSelect(key, keyPath) {
            this.activeHeaderMenu = this.headerList[key].value;
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
            this.$router.push(`/${this.activeHeaderMenu}/${v.url}`)
        }
    }
};
</script>

<style scoped lang='less'>
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
