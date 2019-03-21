/*
 * @Author: ShenXianhui 
 * @Date: 2019-03-21 15:35:31 
 * @Last Modified by: ShenXianhui
 * @Last Modified time: 2019-03-21 17:12:35
 */
<!-- 导航菜单-顶部 -->
<template>
    <div class="main">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="2">处理中心</el-menu-item>
            <el-menu-item index="3">处理中心</el-menu-item>
            <el-menu-item index="4">处理中心</el-menu-item>
            <el-menu-item index="5">处理中心</el-menu-item>
            <el-menu-item index="6">处理中心</el-menu-item>
        </el-menu>
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
    .aside {
        width: 100%;
        height: calc(100% - 61px);
    }
}
</style>
