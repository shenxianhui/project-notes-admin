/*
 * @Author: ShenXianhui 
 * @Date: 2019-03-28 13:53:54 
 * @Last Modified by: ShenXianhui
 * @Last Modified time: 2019-03-28 16:27:05
 */
<!-- 饼图-渐变 -->
<template>
    <div class="pie-gradient" id="pie-gradient"></div>
</template>

<script>
export default {
    name: 'PieGradient',
    components: {},
    props: {
        title: { // 标题
            type: Object,
            default: () => {
                return {
                    show: true, // 显示
                    text: '饼图-渐变', // 文字
                    textStyle: { // 样式
                        color: '#999' // 颜色
                    },
                    left: 20, // 左边距
                    top: 20 // 上边距
                }
            }
        },
        visualMap: { // 视觉映射
            type: Object,
            default: () => {
                return {
                    show: false, // 显示
                    min: 1, // 允许的最小值
                    max: 10, // 允许的最大值
                    inRange: { // 在选中范围中的视觉元素
                        color: ['#fff', '#000'], // 颜色
                        colorLightness: [0, 1] // 颜色顺序反转
                    }
                }
            }
        },
        tooltip: { // 提示框组件
            type: Object,
            default: () => {
                return {
                    trigger: 'item', // 触发类型
                    formatter: "{a} <br/>{b} : {c} ({d}%)" // 提示框浮层内容格式器
                }
            }
        },
        series: { // 图表
            type: Array,
            default: () => {
                return [
                    {
                        name:'访问来源', // 名称
                        type:'pie', // 类型
                        radius: ['20%', '70%'], // 半径
                        center: ['50%', '50%'], // 中心
                        clockwise: false, // 顺时针
                        startAngle: 90, // 起始角度
                        minAngle: 10, // 最小的扇区角度（0 ~ 360）
                        data:[ // 数据
                            {value: 1, name:'1'},
                            {value: 2, name:'2'},
                            {value: 3, name:'3'},
                            {value: 4, name:'4'},
                            {value: 5, name:'5'},
                            {value: 6, name:'6'},
                            {value: 7, name:'7'},
                            {value: 8, name:'8'},
                            {value: 9, name:'9'},
                            {value: 10, name:'10'}
                        ],
                        roseType: 'radius', // 南丁格尔图，通过半径区分数据大小
                        label: { // 标注-文本
                            show: true, // 显示
                            color: '#999', // 颜色
                            fontSize: 15 // 字体
                        },
                        labelLine: { // 标注-引线
                            show: true, // 显示
                            length2: 50, // 第二段长度
                            lineStyle: {
                                color: '#999' // 颜色
                            }
                        },
                        itemStyle: { // 图形样式
                            shadowBlur: 10, // 阴影大小
                            shadowColor: 'rgba(0, 0, 0, 0.5)' // 阴影颜色
                        },
                        animationType: 'scale', // 初始动画效果
                        animationEasing: 'elasticOut' // 初始动画的缓动效果
                    }
                ]
            }
        },
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
            let myChart = this.$echarts.init(document.getElementById('pie-gradient'));

            let option = {
                title: this.title,
                visualMap: this.visualMap,
                tooltip: this.tooltip,
                series: this.series
            };

            myChart.setOption(option);
        }
    }
};
</script>

<style scoped lang='less'>
.pie-gradient {
    width: 100%;
    height: 100%;
}
</style>
