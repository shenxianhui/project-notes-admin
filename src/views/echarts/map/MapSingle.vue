/*
 * @Author: Shen Xianhui
 * @Date: 2019-05-31 15:09:26
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-05-31 17:18:29
 */
<!-- 中国地图 -->
<template>
    <div class="map-single" id="map-single"></div>
</template>

<script>
import AreaCode from '@/data/map/area-code';
import World from '@/data/map/0';

export default {
    name: 'MapSingle',
    components: {},
    props: {},
    data() {
        return {
            areaName: 'world', // 当前区域-名称
            areaCode: '0', // 当前区域-编号
            level: 'world', // 当前地区层级
            map: World, // 加载地图
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
                            shadowOffsetY: 2
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
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            let chart = this.$echarts.getInstanceByDom(document.getElementById('map-single'));
            if (chart) {
                // 销毁实例
                chart.dispose();
            }

            let myChart = this.$echarts.init(document.getElementById('map-single'));
            // // 注册地图
            this.$echarts.registerMap(this.option.series[0].map, this.map);

            // 设置配置项, 刷新图表
            myChart.setOption(this.option, true);

            // 点击事件
            myChart.on('click', (e) => {
                // console.log(e);
                // console.log(AreaCode);
                this.area = e.name;
                switch (this.level) { // 当前地区层级
                    case 'world': // 世界
                        this.level = 'country';
                        this.option.series[0].map = 'country';
                        this.map = require(`@/data/map/10`);
                        break;
                    case 'country': // 国家
                        this.level = 'province';
                        this.option.series[0].map = 'province';
                        break;
                    case 'province': // 省
                        this.level = 'city';
                        this.option.series[0].map = 'city';
                        break;
                    case 'city': // 市
                        this.level = 'area';
                        this.option.series[0].map = 'area';
                        break;
                    case 'area': // 区
                        break;
                }

                AreaCode.forEach(province => {
                    console.log(province);
                });

                this.initMap();
            });
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
