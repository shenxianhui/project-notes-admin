<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-27 08:59:05
 * @LastEditTime: 2019-05-27 14:21:35
 * @LastEditors: Shen Xianhui
 -->
<!-- 中国地图 -->
<template>
    <div class="map-single" id="map-single"></div>
</template>

<script>
import World from "@/data/map/world";
// import World from "@/data/map/china/china";

export default {
    name: 'MapSingle',
    components: {},
    props: {},
    data() {
        return {
            option: {
                backgroundColor: '#154e90',
                series: [
                    {
                        type: 'map',
                        map: 'world', // 要与 `registerMap()` 的第一个参数对应
                        roam: true, // 鼠标缩放+平移
                        selectedMode: false, // 选中模式
                        label: {
                            show: true,
                            fontSize: 12,
                            color: '#fff'
                        },
                        itemStyle: {
                            areaColor: {
                                type: 'radial', // 径向渐变
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                                    }
                                ],
                                globalCoord: false // 缺省为 false
                            },
                            borderColor: 'rgba(147, 235, 248, 1)',
                            borderWidth: 1,
                            shadowColor: 'rgba(128, 217, 248, 1)',
                            shadowBlur: 10,
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                        },
                        emphasis: { // 高亮状态
                            itemStyle: {
                                areaColor: '#389BB7'
                            }
                        },
                        data: []
                    }
                ]
            }
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            // let chart = this.$echarts.getInstanceByDom(document.getElementById('map-single'));
            // if (chart) {
            //     // 销毁实例
            //     chart.dispose();
            // }

            let myChart = this.$echarts.init(document.getElementById('map-single'));
            // 注册地图
            this.$echarts.registerMap('world', World);

            // 设置配置项, 刷新图表
            myChart.setOption(this.option);
        }
    }
};
</script>

<style scoped lang='less'>
.map-single {
    width: 100%;
    height: 100%;
}
</style>
