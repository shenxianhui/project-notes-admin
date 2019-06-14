/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-14 09:34:37
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-14 10:07:32
 */
<!-- 图表 -->
<template>
    <div class="chart">
        <!-- 柱状折线图 -->
        <div class="group">
            <BarLine id="bar-line" :test="{text: 'dsaf'}"></BarLine>
        </div>
    </div>
</template>

<script>
import BarLine from '@/components/echarts/BarLine';

export default {
    name: 'Chart',
    components: {
        BarLine
    },
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    // created() {},
    // mounted() {},
    methods: {}
};
</script>

<style scoped lang='less'>
.chart {
    display: flex;
    flex-wrap: wrap;

    width: 100%;
    height: 100%;
    .group {
        width: 50%;
        height: 50%;
        border-bottom: 1px solid #ddd;
        &:not(:nth-child(2n)) {
            border-right: 1px solid #ddd;
        }
    }
}
</style>
