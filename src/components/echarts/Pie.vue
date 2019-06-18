/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-18 15:59:28
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-18 16:55:30
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
        }
    },
    data() {
        return {
            option: {
                grid: this.$myStore.grid,
                tooltip: {
                    trigger: 'item' // 触发类型
                },
                color: [
                    '#00C1FF',
                    '#0067FF',
                    '#3426BD',
                    '#5F1E95',
                    '#3426BD',
                    '#00D1B8',
                    '#C5B808',
                    '#E4A749'
                ],
                series: [
                    {
                        type: 'pie',
                        radius: ['20%', '60%'],
                        center: ['50%', '50%'],
                        roseType: 'radius',
                        clockwise: true, // 顺时针
                        data: [
                            {value: 335, name: '直接访问'},
                            {value: 310, name: '邮件营销'},
                            {value: 274, name: '联盟广告'},
                            {value: 235, name: '视频广告'},
                            {value: 400, name: '搜索引擎'}
                        ]
                    }
                ]
            }
        };
    },
    computed: {},
    watch: {},
    // created() {},
    mounted() {
        this.initChart();
    },
    beforeDestroy() {
        this.destroyChart();
    },
    methods: {
        // 图表初始化
        initChart() {
            this.destroyChart();

            let myChart = this.$echarts.init(document.getElementById(this.id));

            // 事件解绑
            myChart.off('click');

            // 设置配置项, 刷新图表
            myChart.setOption(this.option, true);

            // 点击事件
            myChart.on('click', (e) => {
                this.$emit('handleClick', {
                    e: e
                });

                myChart.setOption(this.option, true);
            });
        },

        // 销毁图表实例, 防止内存泄漏
        destroyChart() {
            let chart = this.$echarts.getInstanceByDom(document.getElementById(this.id));

            if (chart) {
                chart.clear(); // 释放图形资源
                chart.dispose(); // 销毁实例对象
            }
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
