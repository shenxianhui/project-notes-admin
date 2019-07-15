/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-05 10:54:25
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-07-15 15:55:44
 */
<!-- 地图-散点&映射 -->
<template>
    <div class="container">
        <span v-show="areaLevel !== 'country'" @click="back()">返回上级</span>
        <div class="map" id="map"></div>
    </div>
</template>

<script>
import China from '@/data/map/100000';

export default {
    name: 'MapScatter',
    components: {},
    props: {},
    data() {
        return {
            areaName: ['China'], // 当前区域-名称
            areaCode: '0', // 当前区域-编号
            areaLevel: 'country', // 当前区域-层级
            map: China, // 加载地图
            option: {
                backgroundColor: '#154e90',
                tooltip: {
                    // formatter: '{b}: {c}'
                    formatter: (params) => {
                        if (this.areaLevel === 'area') {
                            if (params.data.code === this.areaCode) {
                                return `${params.name}: ${params.value}`;
                            }
                        } else {
                            return `${params.name}: ${params.value}`;
                        }
                    }
                },
                visualMap: { // 视觉映射
                    show: true,
                    right: 0,
                    min: 0,
                    max: 100,
                    itemWidth: 10,
                    itemHeight: 70,
                    align: 'left',
                    text: ['高', '低'],
                    realtime: false,
                    calculable: true,
                    seriesIndex: 0,
                    inRange: {
                        color: ['#043E6D', '#00A2FF']
                    },
                    textStyle: {
                        color: '#fff',
                        fontSize: 14
                    }
                },
                geo: {
                    show: true,
                    map: 'China', // 要与 `registerMap()` 的第一个参数对应
                    roam: true, // 鼠标缩放+平移
                    selectedMode: 'single', // 选中
                    label: {
                        show: true,
                        fontSize: 12,
                        color: '#fff',
                        position: 'inside' // 注: 将地图 JSON 文件的 cp 坐标删掉才有效
                    },
                    itemStyle: {
                        areaColor: {
                            type: 'radial', // 径向渐变
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [
                                { // 0% 处的颜色
                                    offset: 0,
                                    color: 'rgba(147, 235, 248, 0)'
                                },
                                { // 100% 处的颜色
                                    offset: 1,
                                    color: 'rgba(147, 235, 248, .2)'
                                }
                            ]
                        },
                        borderColor: 'rgba(147, 235, 248, 1)',
                        borderWidth: 1,
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        shadowBlur: 10,
                        shadowOffsetX: -2,
                        shadowOffsetY: 2
                    },
                    emphasis: { // 高亮状态
                        label: {
                            color: '#fff'
                        },
                        itemStyle: {
                            areaColor: '#389BB7'
                        }
                    },
                    regions: [] // 在地图中对特定的区域配置样式
                },
                series: [
                    {
                        type: 'map',
                        map: 'China', // 要与 `registerMap()` 的第一个参数对应
                        geoIndex: 0, // 共享 geo 样式
                        data: []
                    },
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        silent: true, // 不响应和触发鼠标事件
                        symbol: 'pin',
                        symbolSize: [70, 60],
                        zlevel: 1,
                        label: {
                            show: true,
                            color: '#00E0FF',
                            fontSize: 14,
                            formatter(v) {
                                return v.data.value[2];
                            }
                        },
                        itemStyle: {
                            color: '#fff', // 标志颜色
                            opacity: 1
                        },
                        data: []
                    }
                ]
            }
        };
    },
    computed: {},
    watch: {
        areaLevel() {
            this.option.series[0].map = this.option.geo.map = this.areaLevel;
        }
    },
    mounted() {
        this.mockData();
        this.initMap();
    },
    methods: {
        // 销毁图表实例, 防止内存泄漏
        destroyChart() {
            let chart = this.$echarts.getInstanceByDom(document.getElementById('map'));

            if (chart) {
                chart.clear(); // 释放图形资源
                chart.dispose(); // 销毁实例对象
            }
        },

        // 图表初始化
        initMap() {
            this.destroyChart();

            let myChart = this.$echarts.init(document.getElementById('map'));
            let maxNum = 0;

            // 注册地图
            this.$echarts.registerMap(this.option.series[0].map, this.map);

            // 计算视觉映射 max
            this.option.series[0].data.forEach(item => {
                if (maxNum < item.value) {
                    maxNum = item.value;
                }
            });
            if (String(maxNum).length <= 1) {
                maxNum = 10;
            } else {
                let powNum = Math.pow(10, String(maxNum).length - 2);
                maxNum = Math.ceil(maxNum / powNum) * powNum;
            }
            this.option.visualMap.max = maxNum;

            // 事件解绑
            myChart.off('click');

            // 设置配置项, 刷新图表
            myChart.setOption(this.option, true);

            // 触发图表行为
            if (this.areaLevel === 'area') {
                myChart.dispatchAction({ // 选中指定的地图区域
                    type: 'geoSelect',
                    name: this.areaName[this.areaName.length - 1],
                    seriesIndex: 0
                });
            }

            // 点击事件
            myChart.on('click', (e) => {
                this.areaCode = e.data.code;
                switch (this.areaLevel) { // 当前地区层级
                    case 'country': // 国
                        this.areaLevel = 'province';
                        this.areaName[1] = e.data.name;
                        this.map = require(`@/data/map/${e.data.code}`);
                        break;
                    case 'province': // 省
                        this.areaLevel = 'city';
                        this.areaName[2] = e.data.name;
                        this.map = require(`@/data/map/${e.data.code}`);
                        break;
                    default: // 市/区
                        this.areaLevel = 'area';
                        this.areaName[3] = e.data.name;
                        break;
                }

                this.mockData();

                // 选中模式
                if (this.areaLevel === 'area') {
                    let regions = [];

                    if (e.data.selected) {
                        this.areaLevel = 'city';
                        --this.areaName.length;

                        this.option.series[0].data.forEach(item => {
                            Object.assign(item, {
                                selected: false,
                                itemStyle: {opacity: 1}
                            });
                            regions.push({
                                name: item.name,
                                itemStyle: {opacity: 1}
                            });
                        });
                        this.option.series[1].data.forEach(item => {
                            Object.assign(item, {itemStyle: {opacity: 1}});
                        });
                    } else {
                        this.option.series[0].data.forEach(item => {
                            if (e.data.code === item.code) {
                                Object.assign(item, {
                                    selected: true,
                                    itemStyle: {opacity: 1}
                                });
                                regions.push({
                                    name: item.name,
                                    itemStyle: {opacity: 1}
                                });
                            } else {
                                Object.assign(item, {
                                    selected: false,
                                    itemStyle: {opacity: 0.2}
                                });
                                regions.push({
                                    name: item.name,
                                    itemStyle: {opacity: 0.2}
                                });
                            }
                        });
                        this.option.series[1].data.forEach(item => {
                            if (e.data.code === item.code) {
                                Object.assign(item, {itemStyle: {opacity: 1}});
                            } else {
                                Object.assign(item, {itemStyle: {opacity: 0}});
                            }
                        });
                    }

                    this.option.geo.regions = regions;
                }

                setTimeout(() => {
                    this.initMap();
                }, 0);
            });
        },

        // 返回键
        back() {
            --this.areaName.length;
            this.option.geo.regions = []; // 清空样式
            switch (this.areaLevel) { // 当前地区层级
                case 'province': // 省
                    this.map = China;
                    this.areaCode = '1';
                    this.areaLevel = 'country';
                    break;
                case 'city': // 市
                    this.map = require(`@/data/map/${this.areaCode.slice(0, 2)}0000`);
                    this.areaCode = `${this.areaCode.slice(0, 2)}`;
                    this.areaLevel = 'province';
                    break;
                case 'area': // 区
                    this.map = require(`@/data/map/${this.areaCode.slice(0, 4)}00`);
                    this.areaCode = `${this.areaCode.slice(0, 4)}`;
                    this.areaLevel = 'city';
                    break;
            }

            this.mockData();
            this.initMap();
        },

        // 模拟数据
        mockData() {
            let mapDataList = [];
            let scatterDataList = [];

            this.map.features.forEach(item => {
                let mapData = {
                    name: item.properties.name,
                    code: this.areaName.length < 3 ? item.id : String(item.properties.adcode),
                    value: Math.round(Math.random() * 500 + 500)
                };
                let scatterData = {
                    name: item.properties.name,
                    code: this.areaName.length < 3 ? item.id : String(item.properties.adcode),
                    value: this.areaName.length < 3 ? item.properties.cp : item.properties.center,
                    label: {
                        color: mapData.value >= 900 ? '#FE5B5B' : '#00E0FF'
                    }
                };
                scatterData.value[2] = mapData.value;

                mapDataList.push(mapData);
                scatterDataList.push(scatterData);
            });

            mapDataList.sort((a, b) => b['value'] - a['value']); // 降序

            this.option.series[0].data = mapDataList;
            this.option.series[1].data = scatterDataList;
        }
    }
};
</script>

<style scoped lang='less'>
.container {
    position: relative;

    width: 100%;
    height: 100%;
    span {
        position: absolute;
        right: 50px;
        top: 40px;

        font-size: 20px;
        color: #fff;
        cursor: pointer;
        z-index: 1;
    }
    .map {
        width: 100%;
        height: 100%;
    }
}
</style>
