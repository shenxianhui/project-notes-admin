<!--
 * @Author: shenxh
 * @Date: 2020-08-27 16:24:15
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-06 11:22:22
 * @Description: 组件-柱线图
-->

<template>
  <div :id="id || myId" class="xx-bar-line" :style="{ width, height }"></div>
</template>

<script>
import { uuid } from '@/utils/utils';

export default {
  name: 'xx-bar-line',
  components: {},
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
      myId: uuid()
    };
  },
  computed: {
    option() {
      let legend = Object.assign(
        {
          show: this.series && this.series.length > 1 ? true : false,
          top: '2%',
          textStyle: {
            fontSize: 14,
            color: '#000'
          },
          data: (() => {
            this.seriesData.map(item => {
              return {
                name: item.name
              };
            });
          })()
        },
        this.legend
      );
      let grid = Object.assign(
        {
          left: '2%',
          top: legend.show ? '15%' : '10%',
          right: '2%',
          bottom: '5%',
          containLabel: true // 包含坐标轴的刻度标签
        },
        this.grid
      );
      let tooltip = Object.assign(
        {
          trigger: 'axis',
          axisPointer: {
            type: 'line' // line shadow
          }
        },
        this.tooltip
      );
      let xAxis = [
        Object.assign(
          {
            name: '',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#000'
              }
            },
            axisLabel: {
              color: '#000',
              fontSize: 12
              // rotate: 20
            },
            boundaryGap: this.seriesType === 'bar',
            data: (() => {
              let data = this.seriesData.map(item => {
                return item.name;
              });
              return data;
            })()
          },
          this.xAxis
        )
      ];
      let yAxis = [
        Object.assign(
          {
            name: '',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#000'
              }
            },
            axisLabel: {
              color: '#000',
              fontSize: 12
            },
            splitLine: {
              color: '#eee',
              lineStyle: {
                opacity: 0.2
              }
            }
          },
          this.yAxis
        )
      ];
      let series = this.series
        ? this.series
        : [
            {
              name: '',
              type: this.seriesType,
              smooth: true,
              itemStyle: {
                color: '#a1c4fd'
              },
              lineStyle: {
                color: '#a1c4fd'
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#00C1DE99'
                    },
                    {
                      offset: 1,
                      color: '#0080DE0D'
                    }
                  ]
                }
              },
              data: this.seriesData
            }
          ];

      return {
        grid,
        legend,
        tooltip,
        xAxis,
        yAxis,
        series
      };
    }
  },
  watch: {
    seriesData() {
      this.initChart();
    }
  },
  created() {},
  mounted() {
    if (this.seriesData && this.seriesData.length) {
      this.initChart();
    }
  },
  beforeDestroy() {},
  methods: {
    initChart() {
      this.destroyChart();

      let id = this.id || this.myId;
      let myChart = this.$echarts.init(document.getElementById(id));

      // 事件解绑
      myChart.off('click');

      // 设置配置项, 刷新图表
      myChart.setOption(this.option, true);
    },
    // 销毁图表实例
    destroyChart() {
      let id = this.id || this.myId;
      let chart = this.$echarts.getInstanceByDom(document.getElementById(id));

      if (chart) {
        chart.clear(); // 释放图形资源
        chart.dispose(); // 销毁实例对象
      }
    }
  }
};
</script>

<style scoped lang="less"></style>
