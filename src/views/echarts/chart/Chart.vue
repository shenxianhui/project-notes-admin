/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-14 09:34:37
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-26 17:48:27
 */
<!-- 图表 -->
<template>
    <div class="chart">
        <div class="wrap">
            <div class="chart-inner">
                <!-- 柱状折线图 -->
                <BarLine
                    id="bar-line"
                    ref="bar-line"
                    :legendData="barOption.legendData"
                    :seriesColor="barOption.seriesColor"
                    :seriesType="barOption.seriesType"
                    :seriesDataBar="mapData"
                    :seriesDataLine="mapData"
                    :seriesDataLineA="mapData"
                    @handleClick="handleClickBar">
                </BarLine>
            </div>
            <div class="chart-inner">
                <!-- 饼图 -->
                <Pie
                    id="pie"
                    ref="pie"
                    :seriesData="mapData"
                    @handleClick="handleClickPie">
                </Pie>
            </div>
        </div>
        <div class="wrap">
            <!-- 地图 -->
            <Map
                id="map"
                ref="map"
                :mapData="mapData"
                @handleClick="handleClickMap"
                @handleBack="handleBackMap">
            </Map>
        </div>
        <div class="select">
            <el-select
                v-model="selectVal.seriesType"
                @change="handleDate"
                size="mini"
                style="width: 100px">
                <el-option
                    v-for="item in dateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <span>{{ selectVal.name }}</span>
        </div>
    </div>
</template>

<script>
import AreaCode from '@/data/map/area-code';
import BarLine from '@/components/echarts/BarLine';
import Pie from '@/components/echarts/Pie';
import Map from '@/components/echarts/Map';

let seriesColor = {
    bar: ['#00C1DE99', '#0080DE0D'],
    line: ['#00C1DE99', '#0080DE0D', '#67C23A'],
    line1: ['#F56C6C99', '#F56C6C00', '#F56C6C']
};

export default {
    name: 'Chart',
    components: {
        BarLine,
        Pie,
        Map
    },
    props: {},
    data() {
        return {
            selectVal: { // 选择框
                name: 'China',
                seriesType: 'bar'
            },
            dateOptions: [ // 选择框列表
                {
                    label: 'bar',
                    value: 'bar'
                },
                {
                    label: 'line',
                    value: 'line'
                },
                {
                    label: 'barLineA',
                    value: 'barLineA'
                },
                {
                    label: 'barLineB',
                    value: 'barLineB'
                },
                {
                    label: 'barLines',
                    value: 'barLines'
                }
            ],
            barOption: { // 柱状折线图
                legendData: [],
                seriesColor: seriesColor,
                seriesType: 'bar',
                seriesDataBar: [],
                seriesDataLine: [],
                seriesDataLineA: []
            },
            mapOption: { // 地图
                areaName: ['China'], // 当前区域-名称
                areaCode: '0', // 当前区域-编号
                areaLevel: 'country' // 当前区域-层级
            },
            mapData: [] // 地图数据
        };
    },
    computed: {},
    watch: {},
    created() {
        this.mockData();
    },
    mounted() {
        this.handleDate();
    },
    methods: {
        // 选择图表类型
        handleDate(v) {
            // 清空选中的柱状图
            this.barOption.seriesDataBar.forEach(item => {
                if (item.isSelected) {
                    item.isSelected = false;
                    this.selectVal.name = '';
                }
                if (item.itemStyle && item.itemStyle.opacity) {
                    item.itemStyle.opacity = 1;
                }
            });

            switch (this.selectVal.seriesType) {
                case 'bar':
                    this.barOption.seriesType = 'bar';

                    this.barOption.legendData = ['bar'];
                    seriesColor.bar = ['#00C1DE99', '#0080DE0D'];
                    break;
                case 'line':
                    this.barOption.seriesType = 'line';

                    this.barOption.legendData = ['line'];
                    seriesColor.line = ['#00C1DE99', '#0080DE0D', '#00C1DE'];
                    break;
                case 'barLineA':
                    this.barOption.seriesType = 'barLine';

                    this.barOption.legendData = ['bar', 'line'];
                    seriesColor.line = ['#00C1DE99', '#0080DE0D', '#67C23A'];
                    break;
                case 'barLineB':
                    this.barOption.seriesType = 'barLine';

                    this.barOption.legendData = ['bar', 'line2'];
                    seriesColor.line = ['#00C1DE99', '#0080DE0D', '#F56C6C'];
                    break;
                case 'barLines':
                    this.barOption.seriesType = 'barLines';

                    this.barOption.legendData = ['bar', 'line1', 'line2'];
                    seriesColor.line = ['#00C1DE99', '#0080DE0D', '#67C23A'];
                    seriesColor.line1 = ['#00C1DE99', '#0080DE0D', '#F56C6C'];
                    break;
            }

            // 解决图表数据没有及时更新BUG
            let timer;
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.$refs['bar-line'].initChart();
            }, 20);
        },

        // 柱状图-点击
        handleClickBar(data) {
            if (data.selectName) {
                this.selectVal.name = data.selectName;
            } else {
                this.selectVal.name = this.mapOption.areaName[this.mapOption.areaName.length - 1];
            }

            let timer;
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.$refs['pie'].initChart();
            }, 20);
        },

        // 饼图-点击
        handleClickPie(data) {
            if (data.selectName) {
                this.selectVal.name = data.selectName;
            } else {
                this.selectVal.name = this.mapOption.areaName[this.mapOption.areaName.length - 1];
            }

            let timer;
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.$refs['bar-line'].initChart();
            }, 20);
        },

        // 地图-点击
        handleClickMap(data) {
            this.selectVal.name = data.areaName[data.areaName.length - 1];
            Object.assign(this.mapOption, data);

            if (this.mapOption.areaLevel !== 'area') {
                this.mockData();

                let timer;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    this.$refs['map'].initMap();
                    this.$refs['bar-line'].initChart();
                    this.$refs['pie'].initChart();
                }, 20);
            } else {
                this.mapData.forEach(item => {
                    if (data.areaCode === item.code) {
                        Object.assign(item, { isSelected: true, itemStyle: {opacity: 1} });
                    } else {
                        Object.assign(item, { isSelected: false, itemStyle: {opacity: 0.2} });
                    }
                });
                this.$refs['bar-line'].initChart();
                this.$refs['pie'].initChart();
            }
        },

        // 地图-返回
        handleBackMap(data) {
            this.selectVal.name = data.areaName[data.areaName.length - 1];

            Object.assign(this.mapOption, data);
            this.mockData();

            let timer;
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.$refs['map'].initMap();
                this.$refs['bar-line'].initChart();
                this.$refs['pie'].initChart();
            }, 20);
        },

        // 模拟数据
        mockData() {
            let areaList = [];

            switch (this.mapOption.areaLevel) {
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
                        if (province.code === this.mapOption.areaCode) {
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
                default:
                    AreaCode.forEach(province => {
                        if (province.code === this.mapOption.areaCode.slice(0, 2)) {
                            province.children.forEach(city => {
                                if (city.code === this.mapOption.areaCode.slice(0, 4)) {
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
                        }
                    });
                    break;
            }

            areaList.sort((a, b) => b['value'] - a['value']); // 降序
            this.mapData = areaList;
        }
    }
};
</script>

<style scoped lang='less'>
.chart {
    position: relative;
    display: flex;
    flex-wrap: wrap;

    width: 100%;
    height: 100%;
    .wrap {
        display: flex;
        flex-direction: column;

        width: 50%;
        height: 100%;
        .chart-inner {
            width: 100%;
            height: 50%;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
        }
    }
    .select {
        position: absolute;
        top: 10px;
        left: 10px;
        display: flex;
        align-items: center;
        span {
            margin-left: 10px;
        }
    }
}
</style>
