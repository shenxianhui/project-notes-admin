/*
 * @Author: ShenXianhui 
 * @Date: 2019-03-28 08:23:39 
 * @Last Modified by: ShenXianhui
 * @Last Modified time: 2019-04-01 17:03:22
 */

<!-- 柱状图 -->
<template>
    <div class="bar-simple" :id="id"></div>
</template>

<script>
export default {
    name: 'BarSimple',
    components: {},
    props: {
        id: {
            type: String,
            default: 'bar-simple'
        },
        title: { // 标题
            type: Object,
            default: () => {
                return {
                    show: true, // 显示
                    text: '柱状图', // 文字
                    textStyle: { // 样式
                        color: '#999' // 颜色
                    },
                    left: 20, // 左边距
                    top: 10 // 上边距
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
                    show: false, // 显示
                    data:['data'] // 与 series.name 对应
                }
            }
        },
        xAxis: { // X轴
            type: Array,
            default: () => {
                return [
                    { // 底部
                        show: true, // 显示
                        data: ['一', '二', '三', '四', '五', '六'], // 数据
                        axisTick: { // 刻度
                            show: false // 显示
                        },
                        axisLine: { // 轴线
                            lineStyle: { // 样式
                                color: '#333', // 颜色
                                width: 0 // 宽度
                            }
                        }
                    }
                ]
            }
        },
        yAxis: { // Y轴
            type: Array,
            default: () => {
                return [
                    { // 左侧
                        show: true, // 显示
                        axisTick: { // 刻度
                            show: false
                        },
                        axisLine: { // 轴线
                            lineStyle: { // 样式
                                color: '#333', // 颜色
                                width: 0.3 // 宽度
                            }
                        },
                        splitLine: { // 分割线
                            show: true, // 显示
                            lineStyle: {// 样式
                                color: ['#ddd'], // 颜色
                                opacity: 0.5 // 透明度
                            }
                        }
                    },
                    { // 右侧
                        show: true, // 显示
                        axisTick: { // 刻度
                            show: false // 显示
                        },
                        axisLine: { // 轴线
                            lineStyle: { // 样式
                                color: '#333', // 颜色
                                width: 0.3 // 宽度
                            }
                        }
                    }
                ]
            }
        },
        series: { // 图表
            type: Array,
            default: () => {
                return [
                    { // 柱状图
                        type: 'bar', // 类型
                        name: 'data', // 名称
                        data: [5, 20, 36, 10, 10, 20], // 数据
                        itemStyle: { // 样式
                            color: '#aaa' // 颜色
                            // color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [ // 渐变色(写在data内)
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
                        barWidth: 40 // 柱条宽度(不填为自适应)
                    }
                ]
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
            let myChart = this.$echarts.init(document.getElementById(this.id));

            let option = {
                title: this.title,
                tooltip: this.tooltip,
                legend: this.legend,
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                series: this.series
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
