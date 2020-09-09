<!--
 * @Author: shenxh
 * @Date: 2020-08-25 18:24:28
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-09 17:37:28
 * @Description: 柱线图
-->

<template>
  <div class="chart-bar-line admin-content">
    <div class="chart-bar-line-wrap">
      <!-- 柱形图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line :series-data="chartData"></xx-bar-line>
      </div>
      <!-- 多柱图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line :series="seriesBars" :series-data="chartData"></xx-bar-line>
      </div>
      <!-- 折线图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line series-type="line" :series-data="chartData"></xx-bar-line>
      </div>
      <!-- 柱线图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line :series="seriesBarLine" :series-data="chartData"></xx-bar-line>
      </div>
      <!-- 立体图 -->
      <div class="chart-bar-line-item">
        <xx-bar-cuboid :series="seriesCuboid" :series-data="chartData"></xx-bar-cuboid>
      </div>
      <!-- 象形图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line :series="seriesPictorialBars" :series-data="chartData"></xx-bar-line>
      </div>
    </div>
  </div>
</template>

<script>
import XxBarLine from '@/components/e-charts/bar-line';
import XxBarCuboid from '@/components/e-charts/bar-line/bar-cuboid';

let timer;

export default {
  name: 'chart-bar-line',
  components: {
    XxBarLine,
    XxBarCuboid
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
    },
    seriesCuboid() {
      return [
        {
          type: 'line',
          data: this.chartData,
          smooth: true,
          lineStyle: {
            type: 'dashed',
            color: '#FF9C00'
          }
        }
      ];
    },
    seriesPictorialBars() {
      return [
        {
          name: '',
          type: 'pictorialBar',
          barCategoryGap: '-60%',
          symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(0, 255, 255, 0.4)'
                },
                {
                  offset: 1,
                  color: 'rgba(0, 255, 255, 0.4)'
                }
              ])
            }
          },
          barMaxWidth: '100%',
          data: this.seriesData,
          z: 10
        }
      ];
    }
  },
  watch: {},
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
