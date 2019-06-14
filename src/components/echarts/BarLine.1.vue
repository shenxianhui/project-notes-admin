/*
 * @Author: ShenXianhui
 * @Date: 2019-03-28 08:23:39
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-14 15:27:23
 */

<!-- 柱状折线图 -->
<template>
    <div class="bar-line" :id="id"></div>
</template>

<script>

export default {
    name: 'BarLine',
    components: {},
    props: {
        id: {
            type: String,
            default: 'bar-line'
        },
        // title: {
        //     type: Object,
        //     default: () => {
        //         return {
        //             show: true, // 显示
        //             text: '柱状折线图', // 文字
        //             textStyle: { // 样式
        //                 color: '#999' // 颜色
        //             },
        //             left: 20, // 左边距
        //             top: 10 // 上边距
        //         };
        //     }
        // },
        test: { // 标题
            type: Object
        },
        tooltip: { // 提示框
            type: Object,
            default: () => {
                return {
                    show: true // 显示
                };
            }
        },
        legend: { // 图例
            type: Object,
            default: () => {
                return {
                    show: true, // 显示
                    data: ['data1', 'data2'], // 与 series.name 对应
                    // 自定义图例
                    icon: 'roundRect', // 形状
                    itemWidth: 30, // 宽度
                    itemHeight: 15, // 高度
                    itemGap: 40 // 间距
                };
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
                ];
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
                ];
            }
        },
        series: { // 图表
            type: Array,
            default: () => {
                return [
                    { // 柱状图
                        type: 'bar', // 类型
                        name: 'data1', // 名称
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
                    },
                    {
                        type: 'line', // 类型
                        name: 'data2', // 名称
                        data: [15, 28, 30, 11, 30, 15], // 数据
                        lineStyle: { // 线样式
                            color: '#ccc', // 颜色
                            width: 2 // 宽度
                        },
                        symbol: 'circle', // 拐点类型
                        symbolSize: 6, // 拐点大小
                        itemStyle: { // 拐点样式
                            color: '#ccc', // 颜色
                            borderColor: '#ccc' // 边框颜色
                        }
                    }
                ];
            }
        }
    },
    data() {
        return {
            title: {
                show: true, // 显示
                text: '柱状折线图', // 文字
                textStyle: { // 样式
                    color: '#999' // 颜色
                },
                left: 20, // 左边距
                top: 10 // 上边距
            }
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.getLines();
    },
    // created() {},
    methods: {
        getLines() {
            let myChart = this.$echarts.init(document.getElementById(this.id));

            let option = {
                // title: this.title,
                title: Object.assign(this.title, this.test),
                tooltip: this.tooltip,
                legend: this.legend,
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                series: this.series
            };

            // Object.assign(option, this.title1);
            myChart.setOption(option);
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
