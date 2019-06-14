/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-14 09:41:52
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-14 17:45:48
 */
<!-- 柱状折线图 -->
<template>
    <div class="bar-line" :id="id"></div>
</template>

<script>
let axisLineColor = '#666';
let lineColor = '#00C1DE';
let linearColor = {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
        {
            offset: 0,
            color: '#00C1DE99'
        },
        {
            offset: 1,
            color: '#0080DE0D'
        }
    ]
};
let seriesBar = {
    type: 'bar',
    name: '',
    itemStyle: {
        color: linearColor
    },
    barMaxWidth: 20,
    data: [820, 932, 901, 934, 1290, 1330, 1320]
};
let seriesLine = {
    type: 'line',
    name: '',
    yAxisIndex: 0,
    symbolSize: 6,
    lineStyle: {
        color: lineColor,
        width: 2
    },
    itemStyle: {
        color: lineColor,
        borderWidth: 1
    },
    emphasis: {
        itemStyle: {
            borderWidth: 2
        }
    },
    areaStyle: {
        color: linearColor,
        opacity: 1
    },
    data: [820, 932, 901, 934, 1290, 1330, 1320]
};

export default {
    name: 'BarLine',
    components: {},
    props: {
        id: {
            type: String,
            default: 'chart'
        },
        seriesColor: { // 颜色 (非渐变色两项写一样的)
            type: Object,
            default: () => {
                return {
                    bar: ['#00C1DE99', '#0080DE0D'],
                    line: ['#4BD84F', '#4BD84F'],
                    line1: ['#ECAD00', '#ECAD00']
                };
            }
        },
        seriesType: { // bar line barLine barLines
            type: String,
            default: 'barLine'
        },
        legendData: {
            type: Array,
            default: () => []
        },
        xAxisData: {
            type: Array,
            default: () => []
        },
        seriesDataBar: {
            type: Array,
            default: () => []
        },
        seriesDataLine: {
            type: Array,
            default: () => []
        },
        seriesDataLine1: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            option: {
                grid: {
                    left: 20,
                    top: 60,
                    right: 20,
                    bottom: 20,
                    containLabel: true // 包含坐标轴的刻度标签
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器
                        lineStyle: {
                            color: '#ccc',
                            opacity: 0.5
                        }
                    }
                },
                legend: {
                    show: true,
                    type: 'plain',
                    top: 20,
                    icon: 'rect',
                    itemWidth: 12,
                    itemHeight: 8,
                    itemGap: 4,
                    textStyle: {
                        fontSize: 14
                    },
                    data: []
                },
                xAxis: {
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    boundaryGap: false, // 两边留白
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: [
                    {
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: axisLineColor
                            }
                        },
                        splitLine: { // 网格分割线
                            color: '#ccc',
                            lineStyle: {
                                opacity: 0.4
                            }
                        }
                    },
                    {
                        show: false,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: axisLineColor
                            }
                        },
                        splitLine: { // 网格分割线
                            show: false
                        }
                    }
                ],
                series: []
            }
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.initChart();
    },
    beforeDestroy() {
        this.destroyChart();
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
            this.destroyChart();

            let myChart = this.$echarts.init(document.getElementById(this.id));

            this.setChart();

            // 设置配置项, 刷新图表
            myChart.setOption(this.option, true);
        },

        // 图表样式修改
        setChart() {
            let seriesData = [];

            // 图表类型
            this.option.xAxis.boundaryGap = true;
            this.option.yAxis[1].show = false;
            switch (this.seriesType) {
                case 'bar': // 柱
                    seriesData.push(seriesBar);
                    break;
                case 'line': // 线
                    this.option.xAxis.boundaryGap = false;
                    seriesData.push(seriesLine);
                    break;
                case 'barLine': // 柱 + 线
                    seriesData.push(seriesBar, seriesLine);
                    seriesData.forEach((item, index) => {
                        if (item.type === 'line') {
                            item.areaStyle.opacity = 0;
                        }
                    });
                    break;
                case 'barLines': // 柱 + 2线
                    break;
            }

            // 颜色
            seriesData.forEach((item, index) => {
                if (this.seriesColor.bar.length && item.type === 'bar') {
                    item.itemStyle.color.colorStops[0].color = this.seriesColor.bar[0];
                    item.itemStyle.color.colorStops[1].color = this.seriesColor.bar[1];
                    console.log(item);
                }
                if (this.seriesColor.line.length && item.type === 'line' && index === 1) {
                    item.areaStyle.color.colorStops[0].color =
                    item.lineStyle.color =
                    item.itemStyle.color =
                    this.seriesColor.line[0];

                    item.areaStyle.color.colorStops[1].color =
                    item.lineStyle.color =
                    item.itemStyle.color =
                    this.seriesColor.line[1];
                    if (seriesData.length > 2) {
                        seriesData[index + 1].areaStyle.color.colorStops[0].color =
                        seriesData[index + 1].lineStyle.color =
                        seriesData[index + 1].itemStyle.color =
                        this.seriesColor.line[0];

                        seriesData[index + 1].areaStyle.color.colorStops[1].color =
                        seriesData[index + 1].lineStyle.color =
                        seriesData[index + 1].itemStyle.color =
                        this.seriesColor.line[1];
                    }
                }
            });

            this.option.series = seriesData;
        }
    }
};
</script>

<style scoped lang='less'>
.bar-line {
    width: 100%;
    height: 100%;
}
</style>
