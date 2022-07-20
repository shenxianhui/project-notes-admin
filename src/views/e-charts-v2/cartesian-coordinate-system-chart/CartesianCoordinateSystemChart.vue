<!--
 * @Description: [Demo]直角坐标系图表
 * @Author: shenxh
 * @Date: 2022-07-11 09:30:22
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-20 15:25:48
-->

<template>
  <div class="dm-cartesian-coordinate-system-chart admin-content">
    <div class="dm-cartesian-coordinate-system-chart-wrap">
      <div
        v-for="(item, index) in chart"
        :key="index"
        class="dm-cartesian-coordinate-system-chart-item"
      >
        <cartesian-coordinate-system-chart
          ref="line"
          :option="item.option"
          :horizontal="item.horizontal"
        ></cartesian-coordinate-system-chart>
      </div>
    </div>
  </div>
</template>

<script>
import CartesianCoordinateSystemChart from '@/components/e-charts-v2/cartesian-coordinate-system-chart';

let timer = null;

export default {
  name: 'dm-cartesian-coordinate-system-chart',
  components: {
    CartesianCoordinateSystemChart,
  },
  props: {},
  data() {
    return {
      chart: [
        {
          option: {
            title: {
              show: true,
              text: '折线图',
            },
            yAxis: {
              name: 'm',
            },
            series: [
              {
                name: 'demo1',
                type: 'line',
              },
            ],
          },
        },
        {
          option: {
            title: {
              show: true,
              text: '柱状图',
            },
            yAxis: {
              name: 'm',
            },
            series: [
              {
                name: 'demo1',
                type: 'bar',
              },
            ],
          },
        },
        {
          option: {
            title: {
              show: true,
              text: '柱线混合',
            },
            yAxis: [
              {
                name: 'm',
              },
              {
                name: 'kg',
              },
            ],
            series: [
              {
                name: 'demo1',
                type: 'bar',
              },
              {
                name: 'demo2',
                type: 'line',
                yAxisIndex: 1,
              },
            ],
          },
        },
        {
          option: {
            title: {
              show: true,
              text: '柱状图(组)',
            },
            yAxis: {
              name: 'm',
            },
            series: [
              {
                name: 'demo1',
                type: 'bar',
              },
              {
                name: 'demo2',
                type: 'bar',
                stack: true,
              },
              {
                name: 'demo3',
                type: 'bar',
                stack: true,
              },
            ],
          },
        },
        {
          horizontal: true,
          option: {
            title: {
              show: true,
              text: '水平柱状图',
            },
            grid: {
              right: 50,
            },
            xAxis: {
              name: 'm',
            },
            series: [
              {
                name: 'demo1',
                type: 'bar',
              },
            ],
          },
        },
        {
          option: {
            title: {
              show: true,
              text: '上下双图',
            },
            grid: [
              {
                top: 40,
                left: 50,
                right: 20,
                bottom: undefined,
                height: '30%',
                containLabel: false,
              },
              {
                left: 50,
                right: 20,
                top: undefined,
                bottom: 15,
                height: '30%',
                containLabel: false,
              },
            ],
            xAxis: [
              {
                gridIndex: 0,
              },
              {
                gridIndex: 1,
                axisLabel: {
                  show: false,
                },
              },
            ],
            yAxis: [
              {
                gridIndex: 0,
              },
              {
                gridIndex: 1,
                inverse: true,
              },
            ],
            series: [
              {
                name: 'demo1',
                type: 'line',
              },
              {
                name: 'demo2',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
              },
            ],
          },
        },
        {
          horizontal: true,
          option: {
            title: {
              show: true,
              text: '左右双图',
            },
            grid: [
              {
                top: 40,
                bottom: 30,
                left: 30,
                right: undefined,
                width: '38%',
                containLabel: false,
              },
              {
                top: 40,
                bottom: 30,
                left: undefined,
                right: 30,
                width: '38%',
                containLabel: false,
              },
            ],
            xAxis: [
              {
                gridIndex: 0,
                inverse: true,
              },
              {
                gridIndex: 1,
              },
            ],
            yAxis: [
              {
                gridIndex: 0,
                axisLabel: {
                  show: false,
                },
              },
              {
                gridIndex: 1,
              },
            ],
            series: [
              {
                name: 'demo1',
                type: 'line',
              },
              {
                name: 'demo2',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
              },
            ],
          },
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initData();
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    initData() {
      this.clearTimer();
      this.getData();

      timer = setInterval(() => {
        this.getData();
      }, 2000);
    },

    getData() {
      this.chart.forEach((item, index) => {
        this.getChartData(item, index);
      });
    },

    getChartData(itm, idx) {
      for (let i = 0; i < 3; i++) {
        this.chart[idx].option.series[i] &&
          (this.chart[idx].option.series[i].data = this.mockData()[i]);
      }

      this.$refs['line'][idx].setOption();
    },

    clearTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    },

    mockData() {
      let data1 = [];
      let data2 = [];
      let data3 = [];

      for (let i = 0; i < 10; i++) {
        data1.push({
          name: 'X' + i,
          value: Math.round(Math.random() * 1000),
        });
        data2.push({
          name: 'X' + i,
          value: Math.round(Math.random() * 1000),
        });
        data3.push({
          name: 'X' + i,
          value: Math.round(Math.random() * 1000),
        });
      }

      return [data1, data2, data3];
    },
  },
};
</script>

<style lang="less" scoped>
.dm-cartesian-coordinate-system-chart {
  .dm-cartesian-coordinate-system-chart-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    min-height: 100%;
    border: 1px solid #efefef;
    overflow: auto;
    .dm-cartesian-coordinate-system-chart-item {
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
