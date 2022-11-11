<!--
 * @Description: [Demo]灵活图表
 * @Author: shenxh
 * @Date: 2022-07-11 09:30:22
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-11 10:00:35
-->

<template>
  <div class="dm-flexible-chart admin-content">
    <div class="dm-flexible-chart-wrap">
      <div
        v-for="(item, index) in chart"
        :key="index"
        class="dm-flexible-chart-item"
      >
        <flexible-chart
          ref="chart"
          :option="item.option"
          :horizontal="item.horizontal"
        ></flexible-chart>
      </div>
    </div>
  </div>
</template>

<script>
import FlexibleChart from '@/components/e-charts-v2/flexible-chart'

let timer = null

export default {
  name: 'dm-flexible-chart',
  components: {
    FlexibleChart,
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
                tooltip: {
                  axisPointer: {
                    type: 'line',
                  },
                },
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
                tooltip: {
                  axisPointer: {
                    type: 'line',
                  },
                },
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
        {
          setSeries: true,
          option: {
            title: {
              show: true,
              text: '长方体柱图',
            },
            tooltip: {
              formatter(params) {
                return `${params[0].name}<br />${params[0].value}`
              },
            },
            yAxis: {
              name: 'm',
            },
            series: this.cuboidSeries(),
          },
        },
        {
          option: {
            title: {
              show: true,
              text: '象形柱图',
            },
            yAxis: {
              name: 'm',
            },
            series: [
              {
                name: 'demo1',
                type: 'pictorialBar',
                barCategoryGap: '-60%',
                symbol:
                  'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                itemStyle: {
                  color: '#ffa0a0',
                },
                barMaxWidth: '100%',
                z: 10,
              },
            ],
          },
        },
        {
          option: {
            title: {
              show: true,
              text: '饼图',
            },
            series: [
              {
                name: 'demo1',
                type: 'pie',
              },
            ],
          },
        },
        {
          key: 'spacing-annular-chart',
          option: {
            title: {
              show: true,
              text: '环形间隔图表',
            },
            legend: {
              data: [],
            },
            series: [
              {
                name: 'demo1',
                type: 'pie',
              },
            ],
          },
        },
        {
          option: {
            title: {
              show: true,
              text: '雷达图',
            },
            radar: {
              indicator: [
                { name: 'X1', max: 1 },
                { name: 'X2', max: 1 },
                { name: 'X3', max: 1 },
                { name: 'X4', max: 1 },
                { name: 'X5', max: 1 },
                { name: 'X6', max: 1 },
                { name: 'X7', max: 1 },
              ],
            },
            series: [
              {
                type: 'radar',
              },
            ],
          },
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initData()
  },
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    initData() {
      this.clearTimer()
      this.getData()

      timer = setInterval(() => {
        this.getData()
      }, 2000)
    },

    getData() {
      this.chart.forEach((item, index) => {
        this.getChartData(item, index)
      })
    },

    getChartData(itm, idx) {
      for (let i = 0; i < 3; i++) {
        let chart = this.chart[idx]
        let chartOptionSeries = chart.option.series

        if (!chart.setSeries) {
          if (chartOptionSeries[i]) {
            if (chartOptionSeries[i].type === 'radar') {
              chartOptionSeries[i].data = this.mockRadarData()
            } else {
              chartOptionSeries[i].data = this.mockData()[i]
            }
          }
        } else {
          chart.option.series = this.cuboidSeries()
        }

        if (chart.key === 'spacing-annular-chart') {
          chart.option.series[0].data = this.spacingAnnularData(
            this.mockData()[i],
          ).list
          chart.option.legend.data = this.spacingAnnularData(
            this.mockData()[i],
          ).nativeList
        }
      }

      this.$refs.chart[idx].setOption()
    },

    clearTimer() {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    },

    mockData() {
      let data1 = []
      let data2 = []
      let data3 = []

      for (let i = 0; i < 10; i++) {
        data1.push({
          name: 'X' + i,
          value: Math.round(Math.random() * 1000),
        })
        data2.push({
          name: 'X' + i,
          value: Math.round(Math.random() * 1000),
        })
        data3.push({
          name: 'X' + i,
          value: Math.round(Math.random() * 1000),
        })
      }

      return [data1, data2, data3]
    },

    mockRadarData() {
      let data1 = []
      let data2 = []
      let data3 = []

      for (let i = 0; i < 10; i++) {
        data1.push(Math.round(Math.random() * 1000))
        data2.push(Math.round(Math.random() * 1000))
        data3.push(Math.round(Math.random() * 1000))
      }

      return [
        {
          name: 'demo1',
          value: data1,
        },
        {
          name: 'demo2',
          value: data2,
        },
        {
          name: 'demo3',
          value: data3,
        },
      ]
    },

    // 长方体柱图 series
    cuboidSeries() {
      const barWidth = 20
      const colors = ['#00FFF6', '#00CCFF', '#006CFF'] // 左 右 上
      const color = {
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: colors[0],
          },
          {
            offset: 0.5,
            color: colors[0],
          },
          {
            offset: 0.5,
            color: colors[1],
          },
          {
            offset: 1,
            color: colors[1],
          },
        ],
      }
      const seriesData = this.mockData()[0]
      const data = [
        {
          z: 1,
          name: '',
          type: 'bar',
          barWidth,
          data: seriesData,
          itemStyle: {
            color,
          },
        },
        // 底部
        {
          z: 2,
          name: '',
          type: 'pictorialBar',
          data: seriesData,
          symbol: 'diamond',
          symbolOffset: [0, '50%'],
          symbolSize: [barWidth, 10],
          itemStyle: {
            color,
          },
        },
        // 上部
        {
          z: 3,
          name: '',
          type: 'pictorialBar',
          symbolPosition: 'end',
          data: seriesData.map(item => {
            return {
              name: item.name,
              value: item.value || null, // 为 0 时会出现样式问题
            }
          }),
          symbol: 'diamond',
          symbolOffset: [0, '-50%'],
          symbolSize: [barWidth, (10 * barWidth) / barWidth],
          itemStyle: {
            borderColor: colors[2],
            borderWidth: 2,
            color: colors[2],
          },
        },
      ]

      return data || []
    },

    // 环形间隔图表 data
    spacingAnnularData(data) {
      let nativeList = []
      let list = []
      let total = 0

      data.forEach(item => {
        total += item.value
      })
      data.forEach(item => {
        // 间隔 = 总数 * 占比 / 个数
        const gapVal = Number(((total * 0.05) / data.length).toFixed(2))

        if (data.length > 1) {
          list.push(item, this.getBlankItem(gapVal))
        } else {
          list.push(item)
        }
        nativeList.push(item)
      })

      return {
        nativeList,
        list,
      }
    },
    getBlankItem(value) {
      return {
        value,
        name: '空',
        itemStyle: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          color: 'rgba(0, 0, 0, 0)',
          borderWidth: 0,
        },
        tooltip: {
          backgroundColor: '#00000000',
          textStyle: {
            color: '#00000000',
          },
        },
        label: {
          show: false,
        },
      }
    },
  },
}
</script>

<style lang="less" scoped>
.dm-flexible-chart {
  .dm-flexible-chart-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    min-height: 100%;
    border: 1px solid #efefef;
    overflow: auto;
    .dm-flexible-chart-item {
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
