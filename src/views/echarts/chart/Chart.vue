/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-14 09:34:37
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-19 11:03:13
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
                    :legendData="chartOption.legendData"
                    :xAxisData="chartOption.xAxisData"
                    :seriesColor="chartOption.seriesColor"
                    :seriesType="chartOption.seriesType"
                    :seriesDataBar="chartOption.seriesDataBar"
                    :seriesDataLine="chartOption.seriesDataLine"
                    :seriesDataLineA="chartOption.seriesDataLineA"
                    @handleClick="handleClick">
                </BarLine>
            </div>
            <div class="chart-inner">
                <!-- 饼图 -->
                <Pie
                    id="pie"
                    ref="pie">
                </Pie>
            </div>
        </div>
        <div class="wrap">
            <Map></Map>
        </div>
        <div class="select">
            <span>{{ selectVal.name }}</span>
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
            selectVal: {
                name: '',
                seriesType: 'bar'
            },
            dateOptions: [
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
            chartOption: {
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
            this.chartOption.seriesDataBar.forEach(item => {
                if (item.isSelected) {
                    item.isSelected = false;
                }
                if (item.itemStyle && item.itemStyle.opacity) {
                    item.itemStyle.opacity = 1;
                }
            });

            switch (this.selectVal.seriesType) {
                case 'bar':
                    this.chartOption.seriesType = 'bar';

                    this.chartOption.legendData = ['bar'];
                    seriesColor.bar = ['#00C1DE99', '#0080DE0D'];
                    break;
                case 'line':
                    this.chartOption.seriesType = 'line';

                    this.chartOption.legendData = ['line'];
                    seriesColor.line = ['#00C1DE99', '#0080DE0D', '#00C1DE'];
                    break;
                case 'barLineA':
                    this.chartOption.seriesType = 'barLine';

                    this.chartOption.legendData = ['bar', 'line'];
                    seriesColor.line = ['#00C1DE99', '#0080DE0D', '#67C23A'];
                    break;
                case 'barLineB':
                    this.chartOption.seriesType = 'barLine';

                    this.chartOption.legendData = ['bar', 'line2'];
                    seriesColor.line = ['#00C1DE99', '#0080DE0D', '#F56C6C'];
                    break;
                case 'barLines':
                    this.chartOption.seriesType = 'barLines';

                    this.chartOption.legendData = ['bar', 'line1', 'line2'];
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

        // 点击柱状图
        handleClick(data) {
            this.selectVal.name = data.selectName;
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
        top: 30px;
        right: 30px;
        display: flex;
        align-items: center;
        span {
            margin-right: 10px;
        }
    }
}
</style>
