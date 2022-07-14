<!--
 * @Author: shenxh
 * @Date: 2020-09-10 15:12:31
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-14 13:51:58
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
    XxBarLine,
  },
  props: {
    id: [String, Number],
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    seriesType: {
      type: String,
      default: 'bar',
    },
    // 展示类型
    type: {
      type: String,
      default: 'horizontal', // horizontal: 左右; vertical: 上下
    },

    title: String,
    titleText: String,
    grid: Object,
    legend: Object,
    tooltip: Object,
    xAxis: Object,
    xAxis1: Object,
    yAxis: Object,
    yAxis1: Object,
    series: Array,
    seriesData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    horizontal() {
      return this.type === 'horizontal';
    },
    getGrid() {
      let grid;

      if (this.grid) {
        grid = this.grid;
      } else {
        if (this.type === 'horizontal') {
          grid = [
            {
              left: '10%',
              top: '15%',
              bottom: '12%',
              width: '36%',
            },
            {
              top: '15%',
              right: '10%',
              bottom: '12%',
              width: '36%',
            },
          ];
        } else {
          grid = [
            {
              left: '15%',
              top: '15%',
              right: '5%',
              height: '32%',
            },
            {
              left: '15%',
              right: '5%',
              bottom: '10%',
              height: '32%',
            },
          ];
        }
      }

      return grid;
    },
    getXAxis() {
      let xAxis = Object.assign(
        {
          axisLabel: {
            show: this.type === 'vertical',
          },
        },
        this.xAxis || {},
      );

      return xAxis;
    },
    getXAxis1() {
      let xAxis1 = Object.assign(
        {
          gridIndex: 1,
          axisLabel: {
            show: this.type === 'horizontal',
          },
        },
        this.xAxis1 || {},
      );

      return xAxis1;
    },
    getYAxis() {
      let yAxis = Object.assign(
        {
          inverse: this.type === 'horizontal',
          axisLabel: {
            show: true,
          },
        },
        this.yAxis || {},
      );

      return yAxis;
    },
    getYAxis1() {
      let yAxis1 = Object.assign(
        {
          inverse: this.type === 'vertical',
          gridIndex: 1,
        },
        this.yAxis1 || {},
      );

      return yAxis1;
    },
    getSeries() {
      let series = JSON.parse(JSON.stringify(this.series)).slice(0, 2);

      series[1].xAxisIndex = 1;
      series[1].yAxisIndex = 1;

      return series;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style scoped lang="less"></style>
