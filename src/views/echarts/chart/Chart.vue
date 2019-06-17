/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-14 09:34:37
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-17 10:55:18
 */
<!-- 图表 -->
<template>
    <div class="chart">
        <!-- 柱状折线图 -->
        <div class="group">
            <BarLine
                id="bar-line"
                ref="bar-line"
                :legendData="chartOption.legendData"
                :xAxisData="chartOption.xAxisData"
                :seriesColor="chartOption.seriesColor"
                :seriesType="chartOption.seriesType"
                :seriesDataBar="chartOption.seriesDataBar"
                :seriesDataLine="chartOption.seriesDataLine"
                :seriesDataLineA="chartOption.seriesDataLineA">
            </BarLine>
        </div>
        <div class="select">
            <el-select v-model="selectVal.seriesType" @change="handleDate" size="mini" style="width: 100px">
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
import { clearTimeout } from 'timers';

let seriesColor = {
    bar: ['#00C1DE99', '#0080DE0D'],
    line: ['#00C1DE99', '#0080DE0D', '#67C23A'],
    line1: ['#F56C6C99', '#F56C6C00', '#F56C6C']
};

export default {
    name: 'Chart',
    components: {
        BarLine
    },
    props: {},
    data() {
        return {
            selectVal: {
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
                seriesDataBar: [6, 2, 9],
                seriesDataLine: [5, 1, 8],
                seriesDataLineA: [2, 0, 3]
            }
        };
    },
    computed: {},
    watch: {},
    // created() {},
    // mounted() {},
    methods: {
        handleDate(v) {
            switch (v) {
                case 'bar':
                    this.chartOption.seriesType = 'bar';
                    seriesColor.bar = ['#00C1DE99', '#0080DE0D'];
                    break;
                case 'line':
                    this.chartOption.seriesType = 'line';
                    seriesColor.line = ['#00C1DE99', '#0080DE0D', '#00C1DE'];
                    break;
                case 'barLineA':
                    this.chartOption.seriesType = 'barLine';
                    seriesColor.line = ['#00C1DE99', '#0080DE0D', '#67C23A'];
                    break;
                case 'barLineB':
                    this.chartOption.seriesType = 'barLine';
                    seriesColor.line = ['#00C1DE99', '#0080DE0D', '#F56C6C'];
                    break;
                case 'barLines':
                    this.chartOption.seriesType = 'barLines';
                    seriesColor.line = ['#00C1DE99', '#0080DE0D', '#67C23A'];
                    seriesColor.line1 = ['#00C1DE99', '#0080DE0D', '#F56C6C'];
                    break;
            }

            // 解决图表数据没有及时更新BUG
            let timer;
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.$refs['bar-line'].initChart();
            }, 10);
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
    .group {
        width: 50%;
        height: 50%;
        border-bottom: 1px solid #ddd;
        &:not(:nth-child(2n)) {
            border-right: 1px solid #ddd;
        }
    }
    .select {
        position: absolute;
        top: 30px;
        right: 30px;
    }
}
</style>
