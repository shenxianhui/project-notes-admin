/*
 * @Author: ShenXianhui 
 * @Date: 2019-03-21 15:34:46 
 * @Last Modified by: ShenXianhui
 * @Last Modified time: 2019-03-22 09:42:47
 */
<!-- 导航菜单-左侧 -->
<template>
    <div class="secondary">
        <el-menu
            default-active="1-1"
            class="el-menu-vertical-demo"
            :unique-opened="true"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse">
            <div class="collapse" @click="isCollapse = !isCollapse">{{ isCollapse ? '→' : '←' }}</div>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
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
        return {
            isCollapse: false // 折叠
        };
    },
    computed: {},
    watch: {},
    created() {},
    methods: {
        // 展开
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },

        // 折叠
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<style scoped lang='less'>
.secondary {
    display: flex;

    width: 100%;
    height: 100%;
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
        width: 200px;
        min-height: 400px;
    }
}
</style>
