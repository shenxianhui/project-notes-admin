<!--
 * @Description: [组件]灵活图表 (适用于: bar/line/pie/radar)
 * @Author: shenxh
 * @Date: 2022-07-11 09:26:09
 * @LastEditors: shenxh
 * @LastEditTime: 2023-06-27 13:59:24
-->

<template>
  <div
    class="flexible-chart"
    ref="$_flexibleChart"
    :style="{ width, height }"
  ></div>
</template>

<script>
import * as Echarts from 'echarts/core'
import {
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  RadarChart,
} from 'echarts/charts'
import {
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import {
  cartesianCoordinateSystemOption,
  pieOption,
  radarOption,
} from '../option'

Echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  RadarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])

export default {
  name: 'flexible-chart',
  components: {},
  props: {
    // 宽度
    width: {
      type: String,
      default: '100%',
    },
    // 高度
    height: {
      type: String,
      default: '100%',
    },
    // 图表配置项 (除 series.data 单独写, 其他与官方文档一致)
    option: {
      type: Object,
      default() {
        return {}
      },
    },
    // name 的 key 值
    nameKey: {
      type: String,
      default: 'name',
    },
    // value 的 key 值
    valueKey: {
      type: String,
      default: 'value',
    },
    // 水平展示
    horizontal: Boolean,
    // 雷达图max的省略位数 (五入, 取整)
    radarIndicatorMax: {
      type: Number,
      default: 2, // 0: 个位; 1: 十位; 2: 百位; ...
    },
    loading: Boolean, // 加载动画效果
  },
  data() {
    return {
      chart: null,
      chartType: '',
      // chartOption: { ...cartesianCoordinateSystemOption },
    }
  },
  computed: {
    chartOption() {
      let option = {}
      let type = ''

      ;(this.option.series || []).forEach(item => {
        // 饼图
        if (item.type === 'pie') {
          type = 'pie'
        }
        // 雷达图
        if (item.type === 'radar') {
          type = 'radar'
        }
      })

      if (type === 'pie') {
        option = { ...pieOption }
      } else if (type === 'radar') {
        option = { ...radarOption }
      } else {
        option = { ...cartesianCoordinateSystemOption }
      }

      return option
    },

    // 设置默认配置项
    optionData() {
      this.chartConfig()

      const optList = Object.entries(this.chartOption)
      let type = ''
      let hasBar = false

      ;(this.option.series || []).forEach(item => {
        if (item.type.toLocaleLowerCase().includes('bar')) {
          hasBar = true
        }

        // 饼图
        if (item.type === 'pie') {
          type = 'pie'
        }
        // 雷达图
        if (item.type === 'radar') {
          type = 'radar'
        }
      })
      let params = {}

      optList.forEach(item => {
        let key = item[0]
        let value = item[1]

        if (key === 'legend' && !type) {
          value = {
            ...value,
            data: this.legendData,
          }
        }
        if (key === 'xAxis') {
          let obj = {}

          if (!this.horizontal) {
            obj.data = this.xAxisData
            obj.boundaryGap = hasBar
          }

          value = {
            ...value,
            ...obj,
          }
        }
        if (key === 'yAxis') {
          let obj = {}

          if (this.horizontal) {
            obj.data = this.xAxisData
            obj.boundaryGap = hasBar
          }

          value = {
            ...value,
            ...obj,
          }
        }
        if (key === 'tooltip') {
          value = {
            ...value,
            axisPointer: {
              type: hasBar ? 'shadow' : 'line',
            },
          }
        }
        if (key === 'radar') {
          const powNum = Math.pow(10, +Math.round(this.radarIndicatorMax || 0))
          let maxNum = 0

          ;(this.option.series || []).forEach(item => {
            item.data &&
              item.data.forEach(item1 => {
                item1.value &&
                  item1.value.forEach(item2 => {
                    if (item2 > maxNum) {
                      maxNum = item2
                    }
                  })
              })
          })

          maxNum = Math.ceil(maxNum / powNum) * powNum
          ;(this.option?.radar?.indicator || []).forEach(item => {
            item.max = maxNum
          })
        }
        if (key === 'series') {
          value = (this.option.series || []).map(item => {
            return {
              ...value,
              type: 'line',
              data: item.data.map(item1 => {
                return {
                  name: item1[this.nameKey],
                  value: item1[this.valueKey],
                }
              }),
            }
          })
        }

        params[item[0]] = this.getOptionParam(value, key)
      })

      return params
    },

    // legend.data
    legendData() {
      let data = (this.option.series || []).map(item => {
        return item.name
      })

      return data
    },

    // xAxis.data
    xAxisData() {
      let data

      for (let i = 0; i < (this.option.series || []).length; i++) {
        const seriesData = this.option.series[i].data

        if (seriesData && seriesData.length) {
          data = seriesData.map(item => {
            return item[this.nameKey]
          })

          break
        }
      }

      return data
    },
  },
  watch: {
    loading() {
      this.setLoading()
    },
  },
  created() {},
  mounted() {
    this.init()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    this.clear(true)
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    // 实例初始化
    init() {
      this.clear(true)

      const chartDom = this.$refs['$_flexibleChart']

      this.chart = Echarts.init(chartDom)

      // this.setOption();
      this.setLoading()
      this.click()
    },

    // 设置配置项, 刷新图表 (需父组件主动调用)
    setOption() {
      let chartOpt = { ...this.option }

      Object.entries(this.optionData).forEach(item => {
        const isArray = Array.isArray(item[1])

        if (isArray) {
          let arr = []
          const list = chartOpt[item[0]] || []

          list.forEach((item1, index1) => {
            arr[index1] = {
              ...item[1][index1],
              ...item1,
            }
          })

          chartOpt[item[0]] = arr
        } else {
          chartOpt[item[0]] = {
            ...item[1],
            ...chartOpt[item[0]],
          }
        }
      })

      this.chart && this.chart.setOption(chartOpt)

      this.$emit('set-option', chartOpt)
    },

    // 点击事件
    click() {
      this.chart.off('click')
      this.chart.on('click', evt => {
        this.$emit('click', evt)
      })
    },

    // 销毁图表实例
    clear(isDestroy) {
      if (this.chart) {
        this.chart.clear() // 释放图形资源
        isDestroy && this.chart.dispose() // 销毁实例对象
      }
    },

    // 窗口尺寸变化
    resize() {
      this.init()
      this.setOption()
    },

    // 获取 option 参数的对应类型
    getOptionParam(param, key) {
      if (Array.isArray(this.option[key]) && !Array.isArray(param)) {
        return this.option[key].map(() => {
          return param
        })
      } else {
        return param
      }
    },

    // 图表配置
    chartConfig() {
      // 水平展示
      if (this.horizontal) {
        let tmpXAxis = this.chartOption.xAxis
        let tmpYAxis = this.chartOption.yAxis

        this.chartOption.xAxis = tmpYAxis
        this.chartOption.yAxis = tmpXAxis
      }
    },

    // 设置 loading
    setLoading() {
      if (!this.chart) return
      if (this.loading) {
        this.chart.showLoading()
      } else {
        this.chart.hideLoading()
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
