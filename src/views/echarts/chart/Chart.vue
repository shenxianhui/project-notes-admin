/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-14 09:34:37
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-19 14:12:08
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
                    :xAxisData="barOption.xAxisData"
                    :seriesColor="barOption.seriesColor"
                    :seriesType="barOption.seriesType"
                    :seriesDataBar="barOption.seriesDataBar"
                    :seriesDataLine="barOption.seriesDataLine"
                    :seriesDataLineA="barOption.seriesDataLineA"
                    @handleClick="handleClickBar">
                </BarLine>
            </div>
            <div class="chart-inner">
                <!-- 饼图 -->
                <Pie
                    id="pie"
                    ref="pie"
                    @handleClick="handleClickPie">
                </Pie>
            </div>
        </div>
        <div class="wrap">
            <Map
                id="map"
                ref="map"
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
                name: '',
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
                xAxisData: ['X1', 'X2', 'X3'],
                seriesColor: seriesColor,
                seriesType: 'bar',
                seriesDataBar: [
                    {
                        name: 'X1',
                        value: 6
                    },
                    {
                        name: 'X2',
                        value: 2
                    },
                    {
                        name: 'X3',
                        value: 9
                    }
                ],
                seriesDataLine: [
                    {
                        name: 'X1',
                        value: 5
                    },
                    {
                        name: 'X2',
                        value: 1
                    },
                    {
                        name: 'X3',
                        value: 8
                    }
                ],
                seriesDataLineA: [
                    {
                        name: 'X1',
                        value: 2
                    },
                    {
                        name: 'X2',
                        value: 0
                    },
                    {
                        name: 'X3',
                        value: 3
                    }
                ]
            },
            mapOption: { // 地图
                areaName: [],
                areaCode: '',
                areaLevel: ''
            }
        };
    },
    computed: {},
    watch: {},
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
            }, 100);
        },

        // 柱状图-点击
        handleClickBar(data) {
            this.selectVal.name = data.selectName;
        },

        // 饼图-点击
        handleClickPie(data) {
            console.log(data);
        },

        // 地图-点击
        handleClickMap(data) {
            // console.log(data);
        },

        // 地图-返回
        handleBackMap(data) {
            // console.log(data);
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
