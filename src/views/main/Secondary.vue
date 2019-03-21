/*
 * @Author: ShenXianhui 
 * @Date: 2019-03-21 15:34:46 
 * @Last Modified by: ShenXianhui
 * @Last Modified time: 2019-03-21 17:12:20
 */
<!-- 导航菜单-左侧 -->
<template>
    <div class="secondary">
        <div class="wrap">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo">
                <el-menu-item index="1">
                    <span slot="title">导航一</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <span slot="title">导航一</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <span slot="title">导航一</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <span slot="title">导航一</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <span slot="title">导航一</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Secondary',
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    created() {},
    methods: {}
};
</script>

<style scoped lang='less'>
.secondary {
    display: flex;

    width: 100%;
    height: 100%;
    .wrap {
        width: 200px;
        height: 100%;
        /deep/ .el-menu {
            height: 100%;
        }
    }
}
</style>
