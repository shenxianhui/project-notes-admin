/*
 * @Author: Shen Xianhui 
 * @Date: 2019-03-27 21:32:19 
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-03-27 22:12:21
 */
<!-- 柱状图 -->
<template>
    <div class="bar">
        <div class="item">
            <div class="chart" id="chart1"></div>
        </div>
        <!-- <div class="item">
            <div class="chart" id="chart2"></div>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'Bar',
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    mounted() {
        this.getLines();
    },
    methods: {
        getLines() {
            let myChart1 = this.$echarts.init(document.getElementById('chart1'));

            // 图1
            let option1 = {
                title: {
                    text: '图1'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };

            myChart1.setOption(option1);
        }
    }
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
