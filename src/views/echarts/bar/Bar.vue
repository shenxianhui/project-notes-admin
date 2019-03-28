/*
 * @Author: Shen Xianhui 
 * @Date: 2019-03-27 21:32:19 
 * @Last Modified by: ShenXianhui
 * @Last Modified time: 2019-03-28 10:34:38
 */
<!-- 柱状图 -->
<template>
    <div class="bar">
        <div class="item">
            <BarSimple></BarSimple>
        </div>
        <!-- <div class="item">
            <div class="chart" id="chart2"></div>
        </div> -->
    </div>
</template>

<script>
import BarSimple from '@/components/echarts/BarSimple'

export default {
    name: 'Bar',
    components: {
        BarSimple
    },
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {}
};
</script>

<style scoped lang='less'>
.bar {
    display: flex;

    width: 100%;
    height: 100%;
    .item {
        width: 50%;
        height: 50%;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        &:not(:nth-child(2n)) {
            border-right: 1px solid #ddd;
        }
        .chart {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
