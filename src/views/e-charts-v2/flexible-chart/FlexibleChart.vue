<!--
 * @Description: [Demo]灵活图表
 * @Author: shenxh
 * @Date: 2022-07-11 09:30:22
 * @LastEditors: shenxh
 * @LastEditTime: 2024-01-26 11:09:19
-->

<template>
  <div class="dm-flexible-chart admin-content">
    <div class="buttons">
      <span></span>
      <el-button
        class="update-btn"
        type="primary"
        size="mini"
        @click="handleUpdateData"
      >
        数据更新
      </el-button>
    </div>
    <div class="dm-flexible-chart-wrap">
      <div
        v-for="(item, index) in charts"
        :key="index"
        class="dm-flexible-chart-item"
      >
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{ item.option?.title?.text }}</span>
            <el-button
              class="button-config"
              type="text"
              @click="handleConfig(item, index)"
            >
              配置项
            </el-button>
          </div>
          <flexible-chart
            ref="chart"
            :option="item.option"
            :horizontal="item.horizontal"
            @set-option="setOption($event, item, index)"
          ></flexible-chart>
        </el-card>
      </div>
    </div>

    <el-drawer
      :title="currentChartOption?.title?.text"
      :visible.sync="showDrawer"
      direction="ltr"
      append-to-body
    >
      <pre>{{ currentChartOption }}</pre>
    </el-drawer>
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
      showDrawer: false,
      chartsOption: [],
      currentChartOption: {},
      charts: [
        {
          option: {
            title: {
              show: false,
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
              show: false,
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
              show: false,
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
              show: false,
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
              show: false,
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
              show: false,
              text: '上下双图',
            },
            grid: [
              {
                top: 40,
                left: 50,
                right: 20,
                bottom: null,
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
                top: null,
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
              show: false,
              text: '左右双图',
            },
            grid: [
              {
                top: 40,
                bottom: 30,
                left: 30,
                right: null,
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
                left: null,
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
          noSeriesData: true,
          option: {
            title: {
              show: false,
              text: '图表标线',
            },
            legend: {
              show: false,
            },
            grid: {
              top: 0,
              tooltip: {
                show: false,
              },
            },
            xAxis: {
              data: ['X0', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'X8'],
            },
            yAxis: {
              name: '',
              type: 'value',
            },
            series: [
              {
                name: 'demo1',
                type: 'line',
                markLine: {
                  lineStyle: {
                    type: 'solid',
                  },
                  symbol: 'none',
                  label: {
                    show: false,
                  },
                  emphasis: {
                    disabled: true,
                  },
                  data: [
                    {
                      xAxis: 'X2',
                    },
                    {
                      xAxis: 'X3',
                    },
                    {
                      xAxis: 'X5',
                    },
                  ],
                },
                data: [],
              },
            ],
          },
        },
        {
          setSeries: true,
          option: {
            title: {
              show: false,
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
              show: false,
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
              show: false,
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
              show: false,
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
          noSeriesData: true,
          option: {
            title: {
              show: false,
              text: '半环进度图',
            },
            tooltip: {
              trigger: 'item',
            },
            legend: {
              show: false,
            },
            series: [
              {
                type: 'pie',
                radius: ['80%', '90%'],
                center: ['50%', '70%'],
                startAngle: 180,
                data: [
                  {
                    value: 80,
                    name: '进度',
                    label: {
                      show: false,
                    },
                  },
                  {
                    value: 20,
                    name: '剩余',
                    itemStyle: {
                      color: '#ccc',
                    },
                    label: {
                      show: false,
                    },
                  },
                  {
                    value: 100,
                    itemStyle: {
                      color: 'none',
                      decal: {
                        symbol: 'none',
                      },
                    },
                    label: {
                      show: true,
                      position: 'center',
                      formatter: params => {
                        return [
                          '{a|进度}',
                          '{b|' + params.value + '%}',
                          '{c|半环进度条}',
                        ].join('\n')
                      },
                      rich: {
                        a: {
                          color: '#000',
                          fontWeight: 700,
                          fontSize: 16,
                          padding: [-50, 0, 0, 0],
                        },
                        b: {
                          color: '#000',
                          fontWeight: 700,
                          fontSize: 20,
                          padding: [-10, 0, 0, 0],
                        },
                        c: {
                          color: '#9b9b9b',
                          lineHeight: 20,
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          option: {
            title: {
              show: false,
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
    this.getData()
  },
  beforeDestroy() {},
  methods: {
    handleUpdateData() {
      this.getData()
    },

    handleConfig(itm, idx) {
      this.currentChartOption = this.chartsOption[idx]
      this.showDrawer = true
    },

    getData() {
      this.charts.forEach((item, index) => {
        this.getChartData(item, index)
      })
    },

    getChartData(itm, idx) {
      for (let i = 0; i < 3; i++) {
        const chart = this.charts[idx]
        const chartOptionSeries = chart.option.series

        if (!chart.setSeries) {
          if (chartOptionSeries[i]) {
            if (chartOptionSeries[i].type === 'radar') {
              chartOptionSeries[i].data = this.mockRadarData()
            } else {
              if (!chart.noSeriesData) {
                chartOptionSeries[i].data = this.mockData()[i]

                // 解决数据不更新问题
                this.charts[idx].option.series = JSON.parse(
                  JSON.stringify(chartOptionSeries),
                )
              }
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

    setOption(opt, itm, idx) {
      this.chartsOption[idx] = opt
    },

    clearTimer() {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    },

    mockData() {
      const total = Math.round(Math.random() * 5) + 5
      let data1 = []
      let data2 = []
      let data3 = []

      for (let i = 0; i < total; i++) {
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
  display: flex;
  flex-direction: column;
  .dm-flexible-chart-wrap {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    width: 100%;
    // height: 100%;
    // min-height: 100%;
    overflow: auto;
    .dm-flexible-chart-item {
      flex-shrink: 0;
      width: 32.6%;
      height: 48%;
      margin-bottom: 1%;
      &:not(:nth-of-type(3n)) {
        margin-right: 1%;
      }
      /deep/ .el-card {
        display: flex;
        flex-direction: column;
        height: 100%;
        .el-card__header {
          height: 40px;
          padding: 0 10px;
          .clearfix {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
          }
        }
        .el-card__body {
          flex-grow: 1;
          padding: 10px;
        }
      }
    }
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
</style>
