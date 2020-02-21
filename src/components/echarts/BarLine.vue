<!--
 * @Author: Shen Xianhui
 * @Date: 2019-06-14 09:41:52
 * @LastEditors: Wells
 * @LastEditTime: 2020-02-21 16:31:24
 * @Description: 柱状折线图
 -->

<template>
  <div class="bar-line" :id="id"></div>
</template>

<script>
import { grid } from '@/data/common/params';
import { debounce } from '@/utils/utils.js';

let axisLineColor = '#666';
let lineColor = '#00C1DE';
let linearColor = {
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
};
let seriesBar = {
  type: 'bar',
  name: '',
  itemStyle: {
    color: linearColor
  },
  barMaxWidth: 20,
  data: []
};
let seriesLine = {
  type: 'line',
  name: '',
  yAxisIndex: 0,
  symbolSize: 6,
  lineStyle: {
    color: lineColor,
    width: 2
  },
  itemStyle: {
    color: lineColor,
    borderWidth: 1
  },
  emphasis: {
    itemStyle: {
      borderWidth: 2
    }
  },
  areaStyle: {
    color: linearColor,
    opacity: 1
  },
  data: []
};

export default {
  name: 'BarLine',
  components: {},
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    legendData: {
      type: Array,
      default: () => []
    },
    seriesColor: {
      // 颜色 [渐变色0%, 渐变色100%, lineColor(柱状图不传)]
      type: Object,
      default: () => {
        return {
          // 折线图不需要 areaStyle 的话, 前两项为空
          bar: ['#00C1DE99', '#0080DE0D'],
          line: ['#67C23A99', '#67C23A00', '#67C23A'],
          line1: ['#F56C6C99', '#F56C6C00', '#F56C6C']
        };
      }
    },
    seriesType: {
      // bar line barLine barLines
      type: String,
      default: 'barLines'
    },
    seriesDataBar: {
      type: Array,
      default: () => [
        // {
        //     name: 'X1',
        //     value: 6
        // },
        // {
        //     name: 'X2',
        //     value: 2
        // },
        // {
        //     name: 'X3',
        //     value: 9
        // }
      ]
    },
    seriesDataLine: {
      type: Array,
      default: () => [
        // {
        //     name: 'X1',
        //     value: 5
        // },
        // {
        //     name: 'X2',
        //     value: 1
        // },
        // {
        //     name: 'X3',
        //     value: 8
        // }
      ]
    },
    seriesDataLineA: {
      type: Array,
      default: () => [
        // {
        //     name: 'X1',
        //     value: 2
        // },
        // {
        //     name: 'X2',
        //     value: 0
        // },
        // {
        //     name: 'X3',
        //     value: 3
        // }
      ]
    }
  },
  data() {
    return {
      option: {
        grid,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器
            lineStyle: {
              color: '#ccc',
              opacity: 0.5
            }
          }
        },
        legend: {
          show: true,
          type: 'plain',
          top: 20,
          icon: 'rect',
          itemWidth: 12,
          itemHeight: 8,
          itemGap: 20,
          textStyle: {
            fontSize: 14
          },
          data: []
        },
        xAxis: {
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: axisLineColor
            }
          },
          axisLabel: {
            rotate: -30
          },
          boundaryGap: false, // 两边留白
          data: []
        },
        yAxis: [
          {
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: axisLineColor
              }
            },
            splitLine: {
              // 网格分割线
              color: '#ccc',
              lineStyle: {
                opacity: 0.4
              }
            }
          },
          {
            show: false,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: axisLineColor
              }
            },
            splitLine: {
              // 网格分割线
              show: false
            }
          }
        ],
        series: []
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.initChart();
    window.addEventListener('resize', debounce(this.initChart));
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initChart);
  },
  methods: {
    // 销毁图表实例, 防止内存泄漏
    destroyChart() {
      let chart = this.$echarts.getInstanceByDom(document.getElementById(this.id));

      if (chart) {
        chart.clear(); // 释放图形资源
        chart.dispose(); // 销毁实例对象
      }
    },

    // 图表初始化
    initChart() {
      this.setChart();
      this.setData();
      this.destroyChart();

      let myChart = this.$echarts.init(document.getElementById(this.id));

      // 事件解绑
      myChart.off('click');

      // 设置配置项, 刷新图表
      myChart.setOption(this.option, true);

      // 点击事件
      myChart.on('click', e => {
        if (this.seriesType !== 'bar') {
          return;
        }

        this.$emit('click', e);

        myChart.setOption(this.option, true);
      });
    },

    // 图表样式修改
    setChart() {
      let seriesData = [];

      let _seriesBar = JSON.parse(JSON.stringify(seriesBar));
      let _seriesLine = JSON.parse(JSON.stringify(seriesLine));
      let _seriesLine1 = JSON.parse(JSON.stringify(seriesLine));

      // 颜色设置
      _seriesBar.itemStyle.color.colorStops[0].color = this.seriesColor.bar[0];
      _seriesBar.itemStyle.color.colorStops[1].color = this.seriesColor.bar[1];

      _seriesLine.areaStyle.color.colorStops[0].color = this.seriesColor.line[0];
      _seriesLine.areaStyle.color.colorStops[1].color = this.seriesColor.line[1];
      _seriesLine.lineStyle.color = _seriesLine.itemStyle.color = this.seriesColor.line[2];

      _seriesLine1.areaStyle.color.colorStops[0].color = this.seriesColor.line1[0];
      _seriesLine1.areaStyle.color.colorStops[1].color = this.seriesColor.line1[1];
      _seriesLine1.lineStyle.color = _seriesLine1.itemStyle.color = this.seriesColor.line1[2];

      // 图表类型
      this.option.xAxis.boundaryGap = true;
      this.option.yAxis[1].show = false;
      switch (this.seriesType) {
        case 'bar': // 柱
          seriesData.push(_seriesBar);
          break;
        case 'line': // 线
          this.option.xAxis.boundaryGap = false;
          seriesData.push(_seriesLine);
          break;
        case 'barLine': // 柱 + 线
          seriesData.push(_seriesBar, _seriesLine);
          seriesData.forEach(item => {
            if (item.type === 'line') {
              item.areaStyle.opacity = 0;
            }
          });
          break;
        case 'barLines': // 柱 + 2线
          seriesData.push(_seriesBar, _seriesLine, _seriesLine1);
          seriesData.forEach(item => {
            if (item.type === 'line') {
              item.areaStyle.opacity = 0;
            }
          });
          break;
      }

      this.option.series = seriesData;
    },

    // 数据导入
    setData() {
      let _xAxisData = [];

      if (this.seriesDataBar && this.seriesDataBar.length) {
        this.seriesDataBar.forEach(item => {
          _xAxisData.push(item.name);
        });
      } else if (this.seriesDataLine && this.seriesDataLine.length) {
        this.seriesDataLine.forEach(item => {
          _xAxisData.push(item.name);
        });
      }
      this.option.xAxis.data = _xAxisData;
      this.option.legend.data = this.legendData;
      switch (this.seriesType) {
        case 'bar': // 柱
          this.option.series[0].data = this.seriesDataBar;
          break;
        case 'line': // 线
          this.option.series[0].data = this.seriesDataLine;
          break;
        case 'barLine': // 柱 + 线
          this.option.series[0].data = this.seriesDataBar;
          this.option.series[1].data = this.seriesDataLine;
          break;
        case 'barLines': // 柱 + 2线
          this.option.series[0].data = this.seriesDataBar;
          this.option.series[1].data = this.seriesDataLine;
          this.option.series[2].data = this.seriesDataLineA;
          break;
      }

      this.option.series.forEach((item, index) => {
        item.name = this.legendData[index];
      });
    }
  }
};
</script>

<style scoped lang="less">
.bar-line {
  width: 100%;
  height: 100%;
}
</style>
