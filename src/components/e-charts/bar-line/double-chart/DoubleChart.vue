<!--
 * @Author: shenxh
 * @Date: 2020-09-10 15:12:31
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-10 18:54:51
 * @Description: 组件-双图表
-->

<template>
  <div class="double-chart" :style="{ width, height }">
    <xx-bar-line
      ref="chart-bar"
      :id="id"
      :width="width"
      :height="height"
      :horizontal="horizontal"
      :seriesType="seriesType"
      :title-text="titleText"
      :title="title"
      :grid="getGrid"
      :legend="legend"
      :xAxis="getXAxis"
      :xAxis1="getXAxis1"
      :yAxis="getYAxis"
      :yAxis1="getYAxis1"
      :series="getSeries"
      :series-data="seriesData"
      @click="$emit('click', $event)"
    ></xx-bar-line>
  </div>
</template>

<script>
import XxBarLine from '@/components/e-charts/bar-line';

export default {
  name: 'double-chart',
  components: {
    XxBarLine
  },
  props: {
    id: [String, Number],
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    seriesType: {
      type: String,
      default: 'bar'
    },
    // horizontal: Boolean, // 横向展示(XY轴交换)
    titleText: String,

    title: String,
    grid: Object,
    legend: Object,
    tooltip: Object,
    xAxis: Object,
    xAxis1: Object,
    yAxis: Object,
    yAxis1: Object,
    series: Array,
    seriesData: Array
  },
  data() {
    return {};
  },
  computed: {
    horizontal() {
      return true;
    },
    getGrid() {
      let grid = this.grid || [
        {
          left: '2%',
          top: '10%',
          // right: '2%',
          bottom: '5%',
          width: '44%'
        },
        {
          // left: '2%',
          top: '10%',
          right: '2%',
          bottom: '5%',
          width: '44%'
        }
      ];

      return grid;
    },
    getXAxis() {
      let xAxis = Object.assign(
        {
          axisLabel: {
            show: false
          }
        },
        this.xAxis || {}
      );

      return xAxis;
    },
    getXAxis1() {
      let xAxis1 = Object.assign(
        {
          gridIndex: 1,
          axisLabel: {
            show: true
          }
        },
        this.xAxis1 || {}
      );

      return xAxis1;
    },
    getYAxis() {
      let yAxis = Object.assign(
        {
          inverse: true,
          axisLabel: {
            show: false
          }
        },
        this.yAxis || {}
      );

      return yAxis;
    },
    getYAxis1() {
      let yAxis1 = Object.assign(
        {
          inverse: false,
          gridIndex: 1
        },
        this.yAxis1 || {}
      );

      return yAxis1;
    },
    getSeries() {
      let series = JSON.parse(JSON.stringify(this.series)).slice(0, 2);

      series[1].xAxisIndex = 1;
      series[1].yAxisIndex = 1;

      return series;
    }
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style scoped lang="less"></style>
