/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-19 08:20:07
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-19 14:31:27
 */
<!-- 地图 -->
<template>
    <div class="container">
        <span v-show="areaLevel !== 'country'" @click="back()">返回上级</span>
        <div class="map" :id="id"></div>
    </div>
</template>

<script>
import AreaCode from '@/data/map/area-code';
import China from '@/data/map/100000';

export default {
    name: 'Map',
    components: {},
    props: {
        id: {
            type: String,
            default: 'map'
        },
        mapData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            areaName: ['China'], // 当前区域-名称
            areaCode: '0', // 当前区域-编号
            areaLevel: 'country', // 当前区域-层级
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

            // 气泡设置 (根据地图 json 文件, 把对应坐标写到气泡对应的 data 中)
            // this.map.features.forEach(province => {
            //     console.log(province);
            // });

            // this.setData();

            // 事件解绑
            myChart.off('click');

            // 设置配置项, 刷新图表
            myChart.setOption(this.option, true);

            // 点击事件
            myChart.on('click', (e) => {
                this.area = e.name;
                switch (this.areaLevel) { // 当前地区层级
                    case 'country': // 国
                        this.getProvince(e);
                        break;
                    case 'province': // 省
                        this.getCity(e);
                        break;
                    case 'city': // 市
                        this.getArea(e);
                        // 已选中区的话不要 `init`, 否则不会触发选中模式
                        // if (this.areaLevel === 'area') {
                        //     return;
                        // }
                        break;
                    case 'area': // 区
                        this.getArea(e);
                        return;
                }

                this.$emit('handleClick', {
                    areaName: this.areaName,
                    areaCode: this.areaCode,
                    areaLevel: this.areaLevel
                });

                this.mockData();
                this.initMap();
            });
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
            // if (this.areaLevel === 'area') {

            // }
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

            this.$emit('handleBack', {
                areaName: this.areaName,
                areaCode: this.areaCode,
                areaLevel: this.areaLevel
            });

            this.mockData();
            this.initMap();
        },

        // 数据导入
        // setData() {

        // },

        // 模拟数据
        mockData() {
            let areaList = [];

            switch (this.areaLevel) {
                case 'country':
                    AreaCode.forEach(province => {
                        let obj = {
                            // 使之 name 与地图对应
                            name: (province.name === '内蒙古自治区') || (province.name === '黑龙江省') ?
                                province.name.slice(0, 3) :
                                province.name.slice(0, 2),
                            code: province.code,
                            value: Math.round(Math.random() * 10000 + 5000)
                        };

                        areaList.push(obj);
                    });
                    break;
                case 'province':
                    AreaCode.forEach(province => {
                        if (province.code === this.areaCode) {
                            province.children.forEach(city => {
                                let obj = {
                                    name: city.name,
                                    code: city.code,
                                    value: Math.round(Math.random() * 1000 + 500)
                                };

                                areaList.push(obj);
                            });
                        }
                    });
                    break;
                case 'city':
                    AreaCode.forEach(province => {
                        province.children.forEach(city => {
                            if (city.code === this.areaCode) {
                                city.children.forEach(area => {
                                    let obj = {
                                        name: area.name,
                                        code: area.code,
                                        value: Math.round(Math.random() * 100 + 50)
                                    };

                                    areaList.push(obj);
                                });
                            }
                        });
                    });
                    break;
            }

            areaList.sort((a, b) => b['value'] - a['value']); // 降序
            this.option.series[0].data = areaList;
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
