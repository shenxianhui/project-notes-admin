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
import World from '@/data/map/000000';

export default {
    name: 'MapSingle',
    components: {},
    props: {},
    data() {
        return {
            areaName: 'world', // 当前区域-名称
            areaCode: '0', // 当前区域-编号
            areaLevel: 'world', // 当前区域-层级
            map: World, // 加载地图
            option: {
                backgroundColor: '#154e90',
                graphic: { // 顶部导航
                    elements: [
                        {
                            type: 'group',
                            left: 80,
                            top: 40,
                            children: [
                                {
                                    type: 'line',
                                    left: 0,
                                    top: 0,
                                    shape: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 60,
                                        y2: 0
                                    },
                                    style: {
                                        stroke: 'rgba(147, 235, 248, .8)'
                                    }
                                },
                                {
                                    type: 'line',
                                    left: 0,
                                    top: 40,
                                    shape: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 60,
                                        y2: 0
                                    },
                                    style: {
                                        stroke: 'rgba(147, 235, 248, .8)'
                                    }
                                }
                            ]
                        },
                        {
                            id: 'China',
                            type: 'group',
                            left: 90,
                            top: 50,
                            children: [
                                {
                                    type: 'polyline',
                                    left: 70,
                                    top: 5,
                                    shape: {
                                        points: [
                                            [0, 10],
                                            [8, 20],
                                            [0, 30]
                                        ]
                                    },
                                    style: {
                                        // stroke: 'transparent',
                                        stroke: '#fff'
                                    }
                                },
                                {
                                    type: 'text',
                                    left: 0,
                                    // top: 'middle',
                                    top: 5,
                                    style: {
                                        text: 'World',
                                        textAlign: 'center',
                                        fill: '#eee',
                                        font: '14px "Microsoft YaHei", sans-serif'
                                    }
                                },
                                {
                                    type: 'text',
                                    left: 0,
                                    top: 20,
                                    style: {
                                        text: '000000',
                                        textAlign: 'center',
                                        fill: '#eee',
                                        font: '11px "Microsoft YaHei", sans-serif'
                                    }
                                }
                            ]
                        }
                    ]
                },
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
                console.log(e);
                // console.log(AreaCode);
                this.area = e.name;
                switch (this.areaLevel) { // 当前地区层级
                    case 'world': // 世界
                        this.areaName = 'China';
                        this.areaLevel = 'country';
                        this.option.series[0].map = 'country';

                        this.getCountry(e);
                        break;
                    case 'country': // 国家
                        this.areaLevel = 'province';
                        this.option.series[0].map = 'province';

                        this.getProvince(e);
                        break;
                    case 'province': // 省
                        this.areaLevel = 'city';
                        this.option.series[0].map = 'city';

                        this.getCity(e);
                        break;
                    case 'city': // 市
                        this.areaLevel = 'area';
                        this.option.series[0].map = 'area';

                        this.getArea(e);
                        break;
                    case 'area': // 区
                        break;
                }
                // console.log(this.areaName, this.areaCode, this.areaLevel);

                this.initMap();
            });
        },

        // 获取国家
        getCountry(e) {
            this.map = require(`@/data/map/100000`);

            // 修改导航样式
            this.option.graphic.elements[0].children[0].shape.x2 = 170;
            this.option.graphic.elements[0].children[1].shape.x2 = 170;
        },

        // 获取省
        getProvince(e) {
            AreaCode.forEach(province => {
                if (e.name.slice(0, 2) === province.name.slice(0, 2)) {
                    this.areaCode = province.code;
                    this.areaName = province.name;
                    this.map = require(`@/data/map/${province.code}0000`);
                }
            });
        },

        // 获取市
        getCity(e) {
            AreaCode.forEach(province => {
                province.children.forEach(city => {
                    if (e.name.slice(0, 2) === city.name.slice(0, 2)) {
                        this.areaCode = city.code;
                        this.areaName = city.name;
                        this.map = require(`@/data/map/${city.code}00`);
                    }
                });
            });
        },

        // 获取区
        getArea(e) {
            console.log(e);
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
