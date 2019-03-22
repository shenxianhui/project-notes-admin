/*
 * @Author: ShenXianhui 
 * @Date: 2019-03-21 15:35:31 
 * @Last Modified by: ShenXianhui
 * @Last Modified time: 2019-03-22 09:41:29
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
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-menu-item index="2">处理中心</el-menu-item>
                <el-menu-item index="3">处理中心</el-menu-item>
                <el-menu-item index="4">处理中心</el-menu-item>
                <el-menu-item index="5">处理中心</el-menu-item>
                <el-menu-item index="6">处理中心</el-menu-item>
            </el-menu>
        </div>
        

        <!-- 侧边栏+内容 -->
        <div class="aside">
            <router-view />
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
            activeIndex: '1', // 当前选中
        };
    },
    computed: {},
    watch: {},
    created() {},
    methods: {
        // 选中项
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
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
        width: 100%;
        height: calc(100% - 61px);
    }
}
</style>
