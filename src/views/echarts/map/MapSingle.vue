/*
 * @Author: Shen Xianhui
 * @Date: 2019-05-31 15:09:26
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-05-31 17:18:29
 */
<!-- 中国地图 -->
<template>
    <div class="container">
        <span v-show="areaLevel !== 'world'" @click="back()">返回上级</span>
        <div class="map-single" id="map-single"></div>
    </div>
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
            areaName: ['World'], // 当前区域-名称
            areaCode: '0', // 当前区域-编号
            areaLevel: 'world', // 当前区域-层级
            map: World, // 加载地图
            option: {
                backgroundColor: '#154e90',
                series: [
                    {
                        type: 'map',
                        map: 'World', // 要与 `registerMap()` 的第一个参数对应
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
                        data: []
                    }
                ]
            }
        };
    },
    computed: {},
    watch: {
        areaLevel() {
            this.option.series[0].map = this.areaLevel;
        }
    },
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
                this.area = e.name;
                switch (this.areaLevel) { // 当前地区层级
                    case 'world': // 世界
                        this.getCountry(e);
                        break;
                    case 'country': // 国家
                        this.getProvince(e);
                        break;
                    case 'province': // 省
                        this.getCity(e);
                        break;
                    case 'city': // 市
                        this.getArea(e);
                        // 选中区
                        if (this.areaLevel === 'area') {
                            return;
                        }
                        break;
                    case 'area': // 区
                        this.getArea(e);
                        return;
                }

                this.initMap();
            });
        },

        // 获取国家
        getCountry(e) {
            this.map = require(`@/data/map/100000`);
            this.areaName.push('China');
            this.areaCode = '1';
            this.areaLevel = 'country';
        },

        // 获取省
        getProvince(e) {
            this.areaLevel = 'province';

            AreaCode.forEach(province => {
                if (e.name.slice(0, 2) === province.name.slice(0, 2)) {
                    this.areaCode = province.code;
                    this.areaName.push(province.name);
                    this.map = require(`@/data/map/${province.code}0000`);
                }
            });
        },

        // 获取市
        getCity(e) {
            this.areaLevel = 'city';

            AreaCode.forEach(province => {
                province.children.forEach(city => {
                    if (e.name.slice(0, 2) === city.name.slice(0, 2)) {
                        this.areaCode = city.code;
                        this.areaName.push(city.name);
                        this.map = require(`@/data/map/${city.code}00`);
                    }
                });
            });
        },

        // 获取区
        getArea(e) {
            this.areaLevel = 'area';

            AreaCode.forEach(province => {
                province.children.forEach(city => {
                    city.children.forEach(area => {
                        if (e.name.slice(0, 2) === area.name.slice(0, 2)) {
                            this.areaCode = area.code;
                            this.areaName[4] = area.name;
                            // this.map = require(`@/data/map/${area.code}`);
                        }
                    });
                });
            });
        },

        // 返回键
        back() {
            --this.areaName.length;
            switch (this.areaLevel) { // 当前地区层级
                case 'country': // 国家
                    this.map = require(`@/data/map/000000`);
                    this.areaCode = '0';
                    this.areaLevel = 'world';
                    break;
                case 'province': // 省
                    this.map = require(`@/data/map/100000`);
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

            this.initMap();
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
    .map-single {
        width: 100%;
        height: 100%;
    }
}
</style>
