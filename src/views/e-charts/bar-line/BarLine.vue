<!--
 * @Author: shenxh
 * @Date: 2020-08-25 18:24:28
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-15 10:12:27
 * @Description: 柱线图
-->

<template>
  <div class="chart-bar-line admin-content">
    <div class="chart-bar-line-wrap">
      <!-- 柱形图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line
          title-text="柱形图"
          horizontal
          :series-data="chartData"
          @click="handleBar"
        ></xx-bar-line>
      </div>
      <!-- 多柱图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line
          title-text="多柱图"
          :series="seriesBars"
          :series-data="chartData"
        ></xx-bar-line>
      </div>
      <!-- 堆叠柱形图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line
          title-text="堆叠柱形图"
          :series="seriesBarsStack"
          :series-data="chartData"
        ></xx-bar-line>
      </div>
      <!-- 双Y柱形图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line
          title-text="双Y柱形图"
          y-axis1
          :series="seriesBarsDoubleY"
          :series-data="chartData"
        ></xx-bar-line>
      </div>
      <!-- 上下双图表 -->
      <div class="chart-bar-line-item">
        <xx-double-chart
          title-text="上下双图表"
          type="vertical"
          :series="seriesBars"
          :series-data="chartData"
        ></xx-double-chart>
      </div>
      <!-- 左右双图表 -->
      <div class="chart-bar-line-item">
        <xx-double-chart
          title-text="左右双图表"
          :series="seriesBars"
          :series-data="chartData"
        ></xx-double-chart>
      </div>
      <!-- 柱线图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line
          title-text="柱线图"
          :series="seriesBarLine"
          :series-data="chartData"
        ></xx-bar-line>
      </div>
      <!-- 立体图 -->
      <div class="chart-bar-line-item">
        <xx-bar-cuboid
          title-text="立体图"
          :series="seriesCuboid"
          :series-data="chartData"
        ></xx-bar-cuboid>
      </div>
      <!-- 象形图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line
          title-text="象形图"
          :series="seriesPictorialBars"
          :series-data="chartData"
        ></xx-bar-line>
      </div>
      <!-- 折线图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line
          title-text="折线图"
          series-type="line"
          :series-data="chartData"
        ></xx-bar-line>
      </div>
      <!-- 多线图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line
          title-text="多线图"
          :series="seriesLines"
          :series-data="chartData"
        ></xx-bar-line>
      </div>
      <!-- 堆叠折线图 -->
      <div class="chart-bar-line-item">
        <xx-bar-line
          title-text="堆叠折线图"
          :series="seriesLinesStack"
          :series-data="chartData"
        ></xx-bar-line>
      </div>
    </div>
  </div>
</template>

<script>
import XxBarLine from '@/components/e-charts/bar-line';
import XxBarCuboid from '@/components/e-charts/bar-line/bar-cuboid';
import XxDoubleChart from '@/components/e-charts/bar-line/double-chart';

let timer;

export default {
  name: 'chart-bar-line',
  components: {
    XxBarLine,
    XxBarCuboid,
    XxDoubleChart,
  },
  props: {},
  data() {
    return {
      chartData: [],
      chartData1: [],
      chartData2: [],
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
            color: '#ffa0a0',
          },
          data: this.chartData,
        },
        {
          name: '数据2',
          type: 'bar',
          barWidth: 5,
          itemStyle: {
            color: '#ffd599',
          },
          data: this.chartData1,
        },
        {
          name: '数据3',
          type: 'bar',
          barWidth: 5,
          itemStyle: {
            color: '#a1c4fd',
          },
          data: this.chartData2,
        },
      ];
    },
    seriesBarsStack() {
      let seriesBars = JSON.parse(JSON.stringify(this.seriesBars));

      return seriesBars.map(item => {
        return Object.assign(item, {
          barWidth: null,
          stack: 'A',
        });
      });
    },
    seriesBarsDoubleY() {
      let seriesBars = JSON.parse(JSON.stringify(this.seriesBars)).slice(0, 2);

      seriesBars.forEach((item, index) => {
        if (index === 1) {
          item.yAxisIndex = 1;
        }
      });

      return seriesBars;
    },
    seriesLines() {
      let seriesBars = JSON.parse(JSON.stringify(this.seriesBars));

      return seriesBars.map(item => {
        return Object.assign(item, {
          type: 'line',
        });
      });
    },
    seriesLinesStack() {
      let seriesBars = JSON.parse(JSON.stringify(this.seriesBars));

      return seriesBars.map(item => {
        return Object.assign(item, {
          type: 'line',
          smooth: true,
          stack: 'A',
        });
      });
    },
    seriesBarLine() {
      return [
        {
          name: '数据1',
          type: 'line',
          itemStyle: {
            color: '#ffa0a0',
          },
          lineStyle: {
            color: '#ffa0a0',
          },
          data: this.chartData,
        },
        {
          name: '数据2',
          type: 'bar',
          itemStyle: {
            color: '#9fff9f',
          },
          data: this.chartData,
        },
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
            color: '#FF9C00',
          },
        },
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
            color: '#ffa0a0',
          },
          barMaxWidth: '100%',
          data: this.chartData,
          z: 10,
        },
      ];
    },
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
    handleBar(evt) {
      const data = evt.data;

      this.$message.success(data.name + ': ' + data.value);
    },
    _getChartData() {
      let list = [];
      let list1 = [];
      let list2 = [];
      for (let i = 0; i < 10; i++) {
        list.push({
          name: 'X' + i,
          value: Math.round(Math.random() * 1000),
        });
        list1.push({
          name: 'X' + i,
          value: Math.round(Math.random() * 1000),
        });
        list2.push({
          name: 'X' + i,
          value: Math.round(Math.random() * 1000),
        });
      }

      this.chartData = list;
      this.chartData1 = list1;
      this.chartData2 = list2;
    },
    _clearTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    },
  },
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
