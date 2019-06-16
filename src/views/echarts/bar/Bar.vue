/*
 * @Author: Shen Xianhui
 * @Date: 2019-03-27 21:32:19
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-16 17:02:29
 */
<!-- 柱状图 -->
<template>
    <div class="bar">
        <!-- 柱状图 -->
        <div class="container">
            <BarSimple id="bar-simple"></BarSimple>
        </div>
        <!-- 柱状折线图 -->
        <div class="container">
            <BarLine id="bar-line"></BarLine>
        </div>
    </div>
</template>

<script>
import BarSimple from '@/components/echarts/BarSimple';
import BarLine from '@/components/echarts/BarLine';

export default {
    name: 'Bar',
    components: {
        BarSimple,
        BarLine
    },
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    // mounted() {},
    methods: {}
};
</script>

<style scoped lang='less'>
.bar {
    display: flex;

    width: 100%;
    height: 100%;
    .container {
        width: 50%;
        height: 50%;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        &:not(:nth-child(2n)) {
            border-right: 1px solid #ddd;
        }
    }
}
</style>
