<!--
 * @Author: shenxh
 * @Date: 2020-08-31 16:51:26
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-09 17:37:04
 * @Description: 长方体柱状图
-->

<template>
  <div class="xx-bar-cuboid" :style="{ width, height }">
    <xx-bar-line
      ref="chart-bar"
      :id="id"
      :width="width"
      :height="height"
      :seriesType="seriesType"
      :grid="grid"
      :legend="legend"
      :tooltip="setTooltip"
      :xAxis="xAxis"
      :yAxis="yAxis"
      :series="getSeries"
      :series-data="seriesData"
    ></xx-bar-line>
  </div>
</template>

<script>
import XxBarLine from '@/components/e-charts/bar-line';

export default {
  name: 'xx-bar-cuboid',
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
    barWidth: {
      type: Number,
      default: 20
    },
    colors: {
      type: Array,
      default() {
        return ['#00FFF6', '#00CCFF', '#006CFF']; // 左 右 上
      }
    },
    grid: Object,
    legend: Object,
    tooltip: Object,
    xAxis: Object,
    yAxis: Object,
    series: Array,
    seriesData: Array
  },
  data() {
    return {
      setTooltip: Object.assign(
        {
          formatter(params) {
            let html = `
              <div>
                <div>${params[0].name || ''}</div>
                <div>${params[0].value || 0}次</div>
              </div>
            `;
            return html;
          }
        },
        this.tooltip
      )
    };
  },
  computed: {
    getSeries() {
      let color = {
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: this.colors[0]
          },
          {
            offset: 0.5,
            color: this.colors[0]
          },
          {
            offset: 0.5,
            color: this.colors[1]
          },
          {
            offset: 1,
            color: this.colors[1]
          }
        ]
      };
      let barWidth = this.barWidth;
      let data = [
        {
          z: 1,
          type: 'bar',
          barWidth,
          data: this.seriesData,
          itemStyle: {
            normal: {
              color: color
            }
          }
        },
        {
          z: 2,
          // name: '底部',
          type: 'pictorialBar',
          data: this.seriesData,
          symbol: 'diamond',
          symbolOffset: [0, '50%'],
          symbolSize: [barWidth, 10],
          itemStyle: {
            normal: {
              color: color
            }
          }
        },
        {
          z: 3,
          // name: '上部',
          type: 'pictorialBar',
          symbolPosition: 'end',
          data: this.seriesData.map(item => {
            return {
              name: item.name,
              value: item.value || null // 为 0 时会出现样式问题
            };
          }),
          symbol: 'diamond',
          symbolOffset: [0, '-50%'],
          symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
          itemStyle: {
            borderColor: this.colors[2],
            borderWidth: 2,
            color: this.colors[2]
          }
        },
        ...this.series
      ];

      return data;
    }
  },
  watch: {
    seriesData() {
      this.initChart();
    }
  },
  created() {},
  mounted() {
    this.initChart();
  },
  beforeDestroy() {},
  methods: {
    initChart() {
      this.$refs['chart-bar'].initChart();
    }
  }
};
</script>

<style scoped lang="less"></style>
