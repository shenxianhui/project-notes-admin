<!--
 * @Author: shenxh
 * @Date: 2020-08-25 18:24:28
 * @LastEditors: shenxh
 * @LastEditTime: 2020-08-31 16:00:03
 * @Description: 柱线图
-->

<template>
  <div class="chart-bar-line admin-content">
    <div class="chart-bar-line-wrap">
      <!-- 柱形图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line ref="xx-bar-line" :series-data="chartData"></xx-bar-line>
      </div>
      <!-- 多柱图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line ref="xx-bar-line1" :series="seriesBars" :series-data="chartData"></xx-bar-line>
      </div>
      <!-- 折线图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line ref="xx-bar-line2" series-type="line" :series-data="chartData"></xx-bar-line>
      </div>
      <!-- 柱线图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line
          ref="xx-bar-line3"
          :series="seriesBarLine"
          :series-data="chartData"
        ></xx-bar-line>
      </div>
    </div>
  </div>
</template>

<script>
import XxBarLine from '@/components/e-charts/bar-line/BarLine';

let timer;

export default {
  name: 'chart-bar-line',
  components: {
    XxBarLine
  },
  props: {},
  data() {
    return {
      chartData: []
    };
  },
  computed: {
    seriesBars() {
      return [
        {
          name: '数据1',
          type: 'bar',
          barWidth: 5,
          itemStyle: {
            color: '#ffa0a0'
          },
          data: this.chartData
        },
        {
          name: '数据2',
          type: 'bar',
          barWidth: 5,
          itemStyle: {
            color: '#ffd599'
          },
          data: this.chartData
        },
        {
          name: '数据3',
          type: 'bar',
          barWidth: 5,
          itemStyle: {
            color: '#a1c4fd'
          },
          data: this.chartData
        }
      ];
    },
    seriesBarLine() {
      return [
        {
          name: '数据1',
          type: 'line',
          itemStyle: {
            color: '#ffa0a0'
          },
          lineStyle: {
            color: '#ffa0a0'
          },
          data: this.chartData
        },
        {
          name: '数据2',
          type: 'bar',
          itemStyle: {
            color: '#9fff9f'
          },
          data: this.chartData
        }
      ];
    }
  },
  watch: {
    chartData() {
      this.$refs['xx-bar-line'].initChart();
      this.$refs['xx-bar-line1'].initChart();
      this.$refs['xx-bar-line2'].initChart();
      this.$refs['xx-bar-line3'].initChart();
    }
  },
  created() {
    this._clearTimer();
    this._getChartData();
    timer = setInterval(() => {
      this._getChartData();
    }, 5000);
  },
  mounted() {},
  beforeDestroy() {
    this._clearTimer();
  },
  methods: {
    _getChartData() {
      let list = [];
      for (let i = 0; i < 10; i++) {
        list.push({
          name: 'X' + i,
          value: Math.round(Math.random() * 1000)
        });
      }

      this.chartData = list;
    },
    _clearTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
  }
};
</script>

<style scoped lang="less">
.chart-bar-line {
  .chart-bar-line-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    min-height: 100%;
    border: 1px solid #efefef;
    overflow: auto;
    .chart-bar-line-item {
      flex-shrink: 0;
      width: 33.3%;
      height: 50%;
      border-bottom: 1px solid #efefef;
      &:not(:nth-of-type(3n)) {
        border-right: 1px solid #efefef;
      }
    }
  }
}
</style>
