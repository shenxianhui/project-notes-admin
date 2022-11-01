<!--
 * @Author: shenxh
 * @Date: 2020-09-12 08:52:18
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-16 15:42:39
 * @Description: 组件-地图
-->

<template>
  <div class="xx-map" :style="{ width, height }">
    <div :id="id || myId" class="xx-map-wrap" :style="{ width, height }"></div>
    <div v-if="area.code != '000000'" class="xx-map-back" @click="handleBack()">
      返回上级
    </div>
  </div>
</template>

<script>
import { uuid } from '@/utils/utils'

export default {
  name: 'xx-map',
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
    // 当前区域 (父组件只需传入编号 code 即可)
    area: {
      type: Object,
      default() {
        return {
          code: '000000', // 区域编码
        }
      },
    },

    tooltip: Object,
    visualMap: Object,
    geo: Object,
    series: [Array, Object],
    seriesData: Array,
  },
  data() {
    return {
      myId: uuid(),
      areaLevel: 0, // 0世界 1中国 2省 3市 4区
      areaPath: [],
    }
  },
  computed: {
    // 是否为最小区域
    isMinArea() {
      let areaCode = this.area.code
      let isMin

      if (areaCode / 100 !== parseInt(areaCode / 100)) {
        isMin = true
      } else {
        isMin = false
      }

      return isMin
    },
    // 获取地图模块
    mapModule() {
      let areaCode = this.area.code

      if (this.isMinArea) {
        areaCode = areaCode.slice(0, 4) + '00'
      }

      return require(`./data/${areaCode}`)
    },
    // 获取视觉映射最大值
    visualMapMax() {
      let maxNum = 0

      this.seriesData.forEach(item => {
        if (maxNum < item.value) {
          maxNum = item.value
        }
      })
      if (String(maxNum).length <= 1) {
        maxNum = 10
      } else {
        let powNum = Math.pow(10, String(maxNum).length - 2)
        maxNum = Math.ceil(maxNum / powNum) * powNum
      }

      return maxNum
    },

    // ECharts 参数
    option() {
      return {
        tooltip: this._tooltip,
        visualMap: this._visualMap,
        geo: this._geo,
        series: this._series,
      }
    },
    _tooltip() {
      let tooltip = Object.assign(
        {
          formatter(data) {
            if (!data) return

            let str = ''

            if (data.seriesType === 'map') {
              str = `${data.name || data.data.name}: ${
                data.value || data.data ? data.data.value : '无数据'
              }`
            }
            if (data.seriesType === 'scatter') {
              str = `${data.name || data.data.name}: ${
                data.value ? data.value[2] : '无数据'
              }`
            }

            return str
          },
        },
        this.tooltip,
      )

      return tooltip
    },
    _visualMap() {
      let visualMap = Object.assign(
        {
          show: true,
          right: 0,
          min: 0,
          max: this.visualMapMax,
          itemWidth: 10,
          itemHeight: 70,
          align: 'left',
          text: ['高', '低'],
          realtime: false,
          calculable: true,
          seriesIndex: 0,
          inRange: {
            color: ['#043E6D', '#00A2FF'],
          },
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
        },
        this.visualMap,
      )

      return visualMap
    },
    _geo() {
      let geo = Object.assign(
        {
          show: true,
          map: this.area.code === '100000' ? 'china' : '',
          roam: true, // 鼠标缩放+平移
          selectedMode: 'single', // 选中
          label: {
            show: true,
            fontSize: 12,
            color: '#fff',
            position: 'inside', // 注: 将地图 JSON 文件的 cp 坐标删掉才有效
          },
          itemStyle: {
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                // 0% 处的颜色
                {
                  offset: 0,
                  color: 'rgba(147, 235, 248, 0)',
                },
                // 100% 处的颜色
                {
                  offset: 1,
                  color: 'rgba(147, 235, 248, .2)',
                },
              ],
            },
            borderColor: 'rgba(147, 235, 248, 1)',
            borderWidth: 1,
            shadowColor: 'rgba(128, 217, 248, 1)',
            shadowBlur: 10,
            shadowOffsetX: -2,
            shadowOffsetY: 2,
          },
          emphasis: {
            label: {
              color: '#fff',
            },
            itemStyle: {
              areaColor: '#389BB7',
            },
          },
          regions: [], // 在地图中对特定的区域配置样式
        },
        this.geo,
      )

      return geo
    },
    _series() {
      let series =
        this.series && Array.isArray(this.series)
          ? this.series
          : [
              {
                type: 'map',
                // map: 'china',
                geoIndex: 0,
                data: this.seriesData.map(item => {
                  return {
                    code: item.id,
                    name: item.name,
                    value: item.value,
                  }
                }),
              },
              {
                type: 'scatter', // 气泡
                geoIndex: 0,
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: [50, 50],
                zlevel: 1,
                label: {
                  show: true,
                  color: '#00E0FF',
                  fontSize: 10,
                  formatter(data) {
                    return data.data.value[2]
                  },
                },
                itemStyle: {
                  color: '#fff',
                  opacity: 1,
                },
                data: this.seriesData.map(item => {
                  return {
                    code: item.id,
                    name: item.name,
                    value: [...item.cp, item.value],
                    label: {
                      color: item.value >= 500 ? '#FE5B5B' : '#00E0FF',
                    },
                  }
                }),
              },
            ]

      return series
    },
  },
  watch: {
    seriesData() {
      this.initChart()
    },
    area: {
      handler(val) {
        this._setAreaLevel(val.code)
      },
      deep: true,
    },
    areaPath(val) {
      this.$emit('area-path', val)
    },
  },
  created() {
    this._setAreaLevel(this.area.code)
  },
  mounted() {
    window.addEventListener('resize', this.initChart)
    this.initChart()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initChart)
  },
  methods: {
    initChart() {
      if (this.isMinArea) return

      this.destroyChart()

      let id = this.id || this.myId
      let myChart = this.$echarts.init(document.getElementById(id))

      // 注册地图
      this.$echarts.registerMap(this._geo.map, this.mapModule)

      // 设置配置项, 刷新图表
      myChart.setOption(this.option, true)

      // 点击事件
      myChart.off('click')
      myChart.on('click', evt => {
        this._handleArea(evt)
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
    handleBack() {
      switch (this.areaLevel) {
        case 1:
          this.area.code = '000000'
          break
        case 2:
          this.area.code = '100000'
          break
        case 3:
          this.area.code = this.area.code.slice(0, 2) + '0000'
          break
        case 4:
          this.area.code = this.area.code.slice(0, 4) + '00'
          break
      }

      this.initChart()
    },
    _handleArea(evt) {
      let areaCode = this.area.code
      let areaLevel = this.areaLevel

      // 世界地图中只能点击中国
      if (areaCode == '000000' && evt.name !== 'China') {
        this.$message.warning('请点击中国~')
        return
      }

      // 获取 areaCode
      if (evt.name === 'China') {
        areaCode = '100000'
      } else {
        this.mapModule.features.forEach(item => {
          if (item.properties.name.slice(0, 2) === evt.name.slice(0, 2)) {
            areaCode = item.id || item.properties.adcode + ''
          }
        })
      }

      // 区级地域权限
      if (areaLevel > 1 && areaCode.slice(0, 2) != '33') {
        this.$message.warning('区级地域只对浙江省开放~')
        return
      }

      this.area.code = areaCode

      this.initChart()

      this.$emit('handle-area', { evt, areaLevel })
    },
    _setAreaLevel(code) {
      if (code == '000000') {
        this.areaLevel = 0
      } else if (code == '100000') {
        this.areaLevel = 1
      } else {
        if (code / 10000 === parseInt(code / 10000)) {
          this.areaLevel = 2 // 省
        } else if (code / 100 === parseInt(code / 100)) {
          this.areaLevel = 3 // 市
        } else {
          this.areaLevel = 4 // 区
        }
      }

      this._setAreaPath()
    },
    _setAreaPath() {
      let areaCode = this.area.code
      let areaLevel = this.areaLevel
      let areaPath = []

      switch (areaLevel) {
        // 世界
        case 0:
          areaPath = ['000000']
          break
        // 中国
        case 1:
          areaPath = ['000000', '100000']
          break
        // 省
        case 2:
          areaPath = ['000000', '100000', areaCode]
          break
        // 市
        case 3:
          areaPath = [
            '000000',
            '100000',
            areaCode.slice(0, 2) + '0000',
            areaCode,
          ]
          break
        // 区
        case 4:
          areaPath = [
            '000000',
            '100000',
            areaCode.slice(0, 2) + '0000',
            areaCode.slice(0, 4) + '00',
            areaCode,
          ]
          break
      }

      this.areaPath = areaPath
    },
  },
}
</script>

<style scoped lang="less">
.xx-map {
  position: relative;
  .xx-map-back {
    position: absolute;
    top: 50px;
    right: 80px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
