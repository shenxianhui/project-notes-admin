<!--
 * @Author: shenxh
 * @Date: 2020-09-11 11:36:48
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-20 16:44:35
 * @Description: 组件-饼图
-->

<template>
  <div :id="id || myId" class="xx-pie" :style="{ width, height }"></div>
</template>

<script>
import { uuid } from '@/utils/utils'

export default {
  name: 'xx-pie',
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

    title: Object,
    titleText: String,
    legend: Object,
    tooltip: Object,
    series: [Array, Object],
    seriesData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      myId: uuid(),
    }
  },
  computed: {
    option() {
      return {
        title: this._title,
        legend: this._legend,
        tooltip: this._tooltip,
        series: this._series,
      }
    },
    _title() {
      let title = Object.assign(
        {
          show: this.titleText ? true : false,
          text: this.titleText,
        },
        this.title,
      )

      return title
    },
    _legend() {
      let legend = Object.assign(
        {
          show: false,
          top: '2%',
          textStyle: {
            fontSize: 14,
            color: '#000',
          },
          data: (() => {
            this.seriesData.map(item => {
              return {
                name: item.name,
              }
            })
          })(),
        },
        this.legend,
      )

      return legend
    },
    _tooltip() {
      let tooltip = Object.assign(
        {
          confine: true,
        },
        this.tooltip,
      )

      return tooltip
    },
    _series() {
      let series =
        this.series && Array.isArray(this.series)
          ? this.series
          : [
              Object.assign(
                {
                  type: 'pie',
                  radius: '75%',
                  data: this.seriesData,
                },
                this.series,
              ),
            ]

      return series
    },
  },
  watch: {
    seriesData() {
      this.initChart()
    },
  },
  created() {},
  mounted() {
    window.addEventListener('resize', this.initChart)
    if (this.seriesData && this.seriesData.length) {
      this.initChart()
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initChart)
  },
  methods: {
    initChart() {
      this.destroyChart()

      let id = this.id || this.myId
      let myChart = this.$echarts.init(document.getElementById(id))

      // 设置配置项, 刷新图表
      myChart.setOption(this.option, true)

      // 点击事件
      myChart.off('click')
      myChart.on('click', evt => {
        this.$emit('click', evt)

        myChart.setOption(this.option, true)
      })
    },
    // 销毁图表实例
    destroyChart() {
      let id = this.id || this.myId
      let chart = this.$echarts.getInstanceByDom(document.getElementById(id))

      if (chart) {
        chart.clear() // 释放图形资源
        chart.dispose() // 销毁实例对象
      }
    },
  },
}
</script>

<style scoped lang="less"></style>
