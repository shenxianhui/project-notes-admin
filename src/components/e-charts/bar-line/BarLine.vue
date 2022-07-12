<!--
 * @Author: shenxh
 * @Date: 2020-08-27 16:24:15
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-11 11:17:19
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
    horizontal: Boolean, // 横向展示(XY轴交换)

    title: Object,
    titleText: String,
    grid: [Array, Object],
    legend: Object,
    tooltip: Object,
    xAxis: Object,
    xAxis1: [Object, Boolean],
    yAxis: Object,
    yAxis1: [Object, Boolean],
    series: [Array, Object],
    seriesData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      myId: uuid(),
    };
  },
  computed: {
    option() {
      return {
        title: this._title,
        grid: this._grid,
        legend: this._legend,
        tooltip: this._tooltip,
        xAxis: this._xAxis,
        yAxis: this._yAxis,
        series: this._series,
      };
    },
    _title() {
      let title = Object.assign(
        {
          show: this.titleText ? true : false,
          text: this.titleText,
        },
        this.title,
      );

      return title;
    },
    _grid() {
      let grid =
        this.grid && Array.isArray(this.grid)
          ? this.grid
          : Object.assign(
              {
                left: '5%',
                top: this._legend.show ? '20%' : '15%',
                right: '5%',
                bottom: '10%',
                containLabel: true, // 包含坐标轴的刻度标签
              },
              this.grid,
            );

      return grid;
    },
    _legend() {
      let legend = Object.assign(
        {
          show: this.series && this.series.length > 1 ? true : false,
          top: '2%',
          textStyle: {
            fontSize: 14,
            color: '#000',
          },
          data: (() => {
            this.seriesData.map(item => {
              return {
                name: item.name,
              };
            });
          })(),
        },
        this.legend,
      );

      return legend;
    },
    _tooltip() {
      let tooltip = Object.assign(
        {
          trigger: 'axis',
          axisPointer: {
            type: 'line', // line shadow
          },
          confine: true,
        },
        this.tooltip,
      );

      return tooltip;
    },
    _xAxis() {
      let xAxisData = {
        name: '',
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#000',
          },
        },
        axisLabel: {
          color: '#000',
          fontSize: 12,
          // rotate: 20
        },
        boundaryGap: this.seriesType === 'bar',
        data: (() => {
          let data = this.seriesData.map(item => {
            return item.name;
          });
          return data;
        })(),
      };
      let xAxis = [Object.assign(xAxisData, this.xAxis)];
      if (this.xAxis1) {
        let _xAxisData = JSON.parse(JSON.stringify(xAxisData));
        xAxis.push(
          Object.assign(
            _xAxisData,
            this.xAxis1 && typeof this.xAxis1 === 'object' ? this.xAxis1 : {},
          ),
        );
      }

      return xAxis;
    },
    _yAxis() {
      let yAxisData = {
        name: '',
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#000',
          },
        },
        axisLabel: {
          color: '#000',
          fontSize: 12,
        },
        splitLine: {
          color: '#eee',
          lineStyle: {
            opacity: 0.2,
          },
        },
      };
      let yAxis = [Object.assign(yAxisData, this.yAxis)];
      if (this.yAxis1) {
        let _yAxisData = JSON.parse(JSON.stringify(yAxisData));
        yAxis.push(
          Object.assign(
            _yAxisData,
            this.yAxis1 && typeof this.yAxis1 === 'object' ? this.yAxis1 : {},
          ),
        );
      }

      return yAxis;
    },
    _series() {
      let series =
        this.series && Array.isArray(this.series)
          ? this.series
          : [
              Object.assign(
                {
                  type: this.seriesType,
                  smooth: true,
                  itemStyle: {
                    color: '#a1c4fd',
                  },
                  lineStyle: {
                    color: '#a1c4fd',
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
                          color: '#00C1DE99',
                        },
                        {
                          offset: 1,
                          color: '#0080DE0D',
                        },
                      ],
                    },
                  },
                  data: this.seriesData,
                },
                this.series,
              ),
            ];

      return series;
    },
  },
  watch: {
    seriesData() {
      this.initChart();
    },
  },
  created() {},
  mounted() {
    window.addEventListener('resize', this.initChart);
    if (this.seriesData && this.seriesData.length) {
      this.initChart();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initChart);
  },
  methods: {
    initChart() {
      this.setOption();
      this.destroyChart();

      let id = this.id || this.myId;
      let myChart = this.$echarts.init(document.getElementById(id));

      // 设置配置项, 刷新图表
      myChart.setOption(this.option, true);

      // 点击事件
      myChart.off('click');
      myChart.on('click', evt => {
        this.$emit('click', evt);

        myChart.setOption(this.option, true);
      });
    },
    // 销毁图表实例
    destroyChart() {
      let id = this.id || this.myId;
      let chart = this.$echarts.getInstanceByDom(document.getElementById(id));

      if (chart) {
        chart.clear(); // 释放图形资源
        chart.dispose(); // 销毁实例对象
      }
    },
    // 数据处理
    setOption() {
      // 横向
      if (this.horizontal) {
        let _xAxis = this.option.xAxis;
        let _yAxis = this.option.yAxis;

        this.option.xAxis = _yAxis;
        this.option.yAxis = _xAxis;
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
