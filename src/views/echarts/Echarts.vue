/*
 * @Author: ShenXianhui 
 * @Date: 2019-03-22 10:53:33 
 * @Last Modified by: ShenXianhui
 * @Last Modified time: 2019-03-22 17:04:54
 */
<!-- ECharts -->
<template>
    <div class="echarts">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'Echarts',
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
.echarts {
    width: 100%;
    height: 100%;
}
</style>
