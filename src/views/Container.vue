/*
 * @Author: Shen Xianhui 
 * @Date: 2019-04-01 20:54:46 
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-04-01 20:57:14
 */
<!-- 通用容器 -->
<template>
    <div class="container">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'Container'
};
</script>

<style scoped lang='less'>
.container {
    width: 100%;
    height: 100%;
}
</style>
