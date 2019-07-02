/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-19 08:20:07
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-07-02 17:22:04
 */
<!-- 地图 -->
<template>
    <div class="container">
        <span v-show="areaLevel !== 'country'" @click="back()">返回上级</span>
        <div class="map" :id="id"></div>
    </div>
</template>

<script>
import China from '@/data/map/100000';

export default {
    name: 'Map',
    components: {},
    props: {
        id: {
            type: String,
            default: 'map'
        },
        areaCode: { // 当前区域-编号
            type: String,
            default: ''
        },
        areaLevel: { // 当前区域-层级
            type: String,
            default: 'country'
        },
        areaName: { // 当前区域-名称
            type: Array,
            default: () => ['China']
        },
        mapData: { // 地图数据
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            map: China, // 加载地图
            option: {
                backgroundColor: '#154e90',
                tooltip: {
                    // formatter: `{b}: {c}`
                    formatter(params) {
                        if (typeof (params.value)[2] === 'undefined') { // 改变气泡提示框内容
                            return params.name + ' : ' + (params.value || 0);
                        } else {
                            return params.name + ' : ' + params.value[2];
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
                    }
                },
                series: [
                    {
                        type: 'map',
                        map: 'China', // 要与 `registerMap()` 的第一个参数对应
                        geoIndex: 0, // 共享 geo 样式
                        data: []
                    },
                    { // 气泡
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbol: 'pin',
                        symbolSize: [70, 60],
                        zlevel: 1,
                        label: {
                            show: true,
                            textStyle: {
                                color: '#00E0FF',
                                fontSize: 14
                            },
                            formatter(value) {
                                return value.data.value[2];
                            }
                        },
                        itemStyle: {
                            color: '#fff',
                            opacity: 1
                        },
                        data: [
                            // {
                            //     name: '杭州市',
                            //     value: [120.21, 30.25, 666] // [经度, 纬度, value]
                            // }
                        ]
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
        // areaCode() {
        //     console.log(this.areaLevel, this.areaCode);
        //     switch (this.areaLevel) { // 当前地区层级
        //         case 'country': // 国
        //             this.map = China;
        //             break;
        //         case 'province': // 省
        //             this.map = require(`@/data/map/${this.areaCode}0000`);
        //             break;
        //         // case 'city': // 市
        //         //     this.map = require(`@/data/map/${this.areaCode}00`);
        //         //     break;
        //         default: // 市/区
        //             this.map = require(`@/data/map/${this.areaCode.slice(0, 4)}00`);
        //             break;
        //     }
        // }
    },
    mounted() {
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
            this.setData();
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

            // 气泡设置 (根据地图 json 文件, 把对应坐标写到气泡对应的 data 中)
            // this.map.features.forEach(province => {
            //     console.log(province);
            // });

            // 事件解绑
            myChart.off('click');

            // 设置配置项, 刷新图表
            myChart.setOption(this.option, true);

            // 点击事件
            myChart.on('click', (e) => {
                this.$emit('handleClick', e);

                switch (this.areaLevel) { // 当前地区层级
                    case 'country': // 国
                        this.map = require(`@/data/map/${e.data.code}0000`);
                        break;
                    case 'province': // 省
                        this.map = require(`@/data/map/${e.data.code}00`);
                        break;
                    default: // 市/区
                        this.map = require(`@/data/map/${e.data.code.slice(0, 4)}00`);
                        break;
                }
            });

            // this.initMap();
        },

        // 返回键
        back() {
            switch (this.areaLevel) { // 当前地区层级
                case 'province': // 省
                    this.map = China;
                    break;
                case 'city': // 市
                    this.map = require(`@/data/map/${this.areaCode.slice(0, 2)}0000`);
                    break;
                case 'area': // 区
                    this.map = require(`@/data/map/${this.areaCode.slice(0, 4)}00`);
                    break;
            }

            this.$emit('handleBack');
        },

        // 数据导入
        setData() {
            this.option.series[0].data = this.mapData;
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
