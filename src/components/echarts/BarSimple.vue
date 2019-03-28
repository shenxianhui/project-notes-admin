/*
 * @Author: ShenXianhui 
 * @Date: 2019-03-28 08:23:39 
 * @Last Modified by: ShenXianhui
 * @Last Modified time: 2019-03-28 10:33:44
 */
<!-- 柱状图 -->
<template>
    <div class="bar-simple" id="bar-simple"></div>
</template>

<script>
export default {
    name: 'BarSimple',
    components: {},
    props: {
        title: { // 标题
            type: Object,
            default: () => {
                return {
                    show: true, // 显示
                    text: '柱状图', // 文字
                    fontSize: 15, // 大小
                    color: '#333', // 颜色
                    fontWeight: 'normal', // 粗细
                    right: 20, // 右边距
                    top: 20 // 上边距
                }
            }
        },
        tooltip: { // 提示框
            type: Object,
            default: () => {
                return {
                    show: true, // 显示
                }
            }
        },
        legend: { // 图例
            type: Object,
            default: () => {
                return {
                    show: false
                }
            }
        },
        xAxis: { // X轴
            type: Object,
            default: () => {
                return {
                    show: true, // 显示
                    data: ['0-10%', '10%-20%', '12%-30%', '30%-40%', '40%-50%', '50%以上'], // 数据
                    axisTick: { // 刻度
                        show: false
                    },
                    axisLine: { // 轴线
                        lineStyle: { // 样式
                            color: '#333' // 颜色
                        }
                    }
                }
            }
        },
        yAxis: { // Y轴
            type: Object,
            default: () => {
                return {
                    showLeft: true, // 显示-左轴
                    showRight: true, // 显示-右轴
                    axisTick: { // 刻度
                        show: false
                    },
                    axisLine: { // 轴线
                        lineStyle: { // 样式
                            color: '#333' // 颜色
                        }
                    }
                }
            }
        },
        series: { // 图表
            type: Object,
            default: () => {
                return {
                    data: [5, 20, 36, 10, 10, 20], // 数据
                    itemStyle: { // 样式
                        color: '#aaa' // 颜色
                    },
                    barWidth: 40 // 柱条宽度(不填为自适应)
                }
            }
        }
    },
    data() {
        return {};
    },
    computed: {},
    watch: {},
    mounted() {
        this.getLines();
    },
    created() {},
    methods: {
        getLines() {
            let myChart = this.$echarts.init(document.getElementById('bar-simple'));

            let option = {
                title: {
                    show: this.title.show,
                    text: this.title.text,
                    textStyle: {
                        color: this.title.color,
                        fontWeight: this.title.fontWeight,
                        fontSize: this.title.fontSize
                    },
                    right: this.title.right,
                    top: this.title.top
                },
                tooltip: {
                    show: this.tooltip.show
                },
                legend: {
                    show: this.legend.show
                    // data:['销量']
                },
                xAxis: {
                    show: this.xAxis.show,
                    data: this.xAxis.data,
                    axisTick: {
                        show: this.xAxis.axisTick.show
                    },
                    axisLine: {
                        lineStyle: {
                            color: this.xAxis.axisLine.lineStyle.color
                        }
                    }
                },
                yAxis: [
                    {
                        show: this.yAxis.showLeft,
                        position: 'left',
                        axisTick: {
                            show: this.yAxis.axisTick.show
                        },
                        axisLine: {
                            lineStyle: {
                                color: this.yAxis.axisLine.lineStyle.color
                            }
                        }
                    },
                    {
                        show: this.yAxis.showRight,
                        position: 'right',
                        axisTick: {
                            show: this.yAxis.axisTick.show
                        },
                        axisLine: {
                            lineStyle: {
                                color: this.yAxis.axisLine.lineStyle.color,
                                width: 0.3
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        data: this.series.data,
                        itemStyle: {
                            color: this.series.itemStyle.color
                            // color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [ // 渐变色
                            //     {
                            //         offset: 0,
                            //         color: "#eee" // 0% 处的颜色
                            //     },
                            //     {
                            //         offset: 0.6,
                            //         color: "#ccc" // 60% 处的颜色
                            //     },
                            //     {
                            //         offset: 1,
                            //         color: "#aaa" // 100% 处的颜色
                            //     }
                            // ], false)
                        },
                        barWidth: this.series.barWidth // 空为自适应
                    }
                ]
            };

            myChart.setOption(option);
        }
    }
};
</script>

<style scoped lang='less'>
.bar-simple {
    width: 100%;
    height: 100%;
}
</style>
