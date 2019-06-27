/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-18 15:59:28
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-19 11:25:20
 */
<!-- 饼图 -->
<template>
    <div class="pie" :id="id"></div>
</template>

<script>
export default {
    name: 'Pie',
    components: {},
    props: {
        id: {
            type: String,
            default: 'chart'
        },
        color: { // 颜色
            type: Array,
            default: () => [
                '#00C1FF',
                '#0067FF',
                '#3426BD',
                '#5F1E95',
                '#3426BD',
                '#00D1B8',
                '#C5B808',
                '#E4A749'
            ]
        },
        seriesRadius: { // 饼图半径
            type: Array,
            default: () => ['20%', '60%']
        },
        seriesRoseType: { // 南丁格尔图
            type: String,
            default: 'radius'
        },
        seriesClockwise: { // 扇区顺时针
            type: Boolean,
            default: true
        },
        seriesData: { // 数据
            type: Array,
            default: () => [
                { value: 500, name: '区域一' },
                { value: 400, name: '区域二' },
                { value: 300, name: '区域三' },
                { value: 200, name: '区域四' },
                { value: 100, name: '区域五' }
            ]
        }
    },
    data() {
        return {
            option: {
                grid: this.$myStore.grid,
                tooltip: {
                    trigger: 'item' // 触发类型
                },
                color: [],
                series: [
                    {
                        type: 'pie',
                        radius: [],
                        center: ['50%', '50%'],
                        roseType: '', // 南丁格尔图
                        clockwise: true, // 扇区顺时针
                        data: []
                    }
                ]
            }
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.initChart();
    },
    methods: {
        // 销毁图表实例, 防止内存泄漏
        destroyChart() {
            let chart = this.$echarts.getInstanceByDom(document.getElementById(this.id));

            if (chart) {
                chart.clear(); // 释放图形资源
                chart.dispose(); // 销毁实例对象
            }
        },

        // 图表初始化
        initChart() {
            this.setChart();
            this.destroyChart();

            let myChart = this.$echarts.init(document.getElementById(this.id));

            // 事件解绑
            myChart.off('click');

            // 设置配置项, 刷新图表
            myChart.setOption(this.option, true);

            // 点击事件
            myChart.on('click', (e) => {
                let selectName = '';

                if (e.data.isSelected) {
                    selectName = '';
                    this.option.series[0].data.forEach(item => {
                        Object.assign(item, { isSelected: false, itemStyle: {opacity: 1} });
                    });
                } else {
                    this.option.series[0].data.forEach(item => {
                        if (e.name === item.name) {
                            selectName = item.name;
                            Object.assign(item, { isSelected: true, itemStyle: {opacity: 1} });
                        } else {
                            Object.assign(item, { isSelected: false, itemStyle: {opacity: 0.2} });
                        }
                    });
                }

                this.$emit('handleClick', {
                    e: e,
                    selectName: selectName
                });

                myChart.setOption(this.option, true);
            });
        },

        // 图表样式修改
        setChart() {
            this.option.color = this.color;
            this.option.series[0].clockwise = this.seriesClockwise;
            this.option.series[0].roseType = this.seriesRoseType;
            this.option.series[0].radius = this.seriesRadius;
            this.option.series[0].data = this.seriesData;
        }
    }
};
</script>

<style scoped lang='less'>
.pie {
    width: 100%;
    height: 100%;
}
</style>
