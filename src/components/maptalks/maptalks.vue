<!--
 * @Description: 地图
 * @Author: shenxh
 * @Date: 2023-06-28 14:15:00
 * @LastEditors: shenxh
 * @LastEditTime: 2023-06-30 17:30:12
-->

<template>
  <div class="maptalks" id="map-maptalks"></div>
</template>

<script>
import MT from './utils/base'
import MARKER from './utils/marker'

import basePointData from '@/data/maptalks/base-point.js'

let map = null

export default {
  name: 'maptalks',
  components: {},
  props: {
    center: {
      type: Array,
      default() {
        return [120.722249, 27.963267]
      },
    },
    zoom: {
      type: Number,
      default: 12,
    },
    minZoom: {
      type: Number,
      default: 11,
    },
    maxZoom: {
      type: Number,
      default: 25,
    },
    // 地图将被限制在给定的最大范围内，并在用户尝试平移范围外时弹回
    maxExtent: {
      type: Number,
      default: 2,
    },
    // 可以通过右键单击或 ctrl + 左键单击拖动地图进行旋转
    dragRotate: {
      type: Boolean,
      default: true,
    },
    // 可以通过右键单击或 ctrl + 左键将地图拖动俯仰
    dragPitch: {
      type: Boolean,
      default: true,
    },
    // 俯仰角度
    pitch: {
      type: Number,
      default: 57,
    },
    // 旋转
    bearing: {
      type: Number,
      default: 38,
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.init()
    this.$root.$on('change-map-legend', this.changeMapLegend)
  },
  beforeDestroy() {
    MT.map.remove()
    this.$root.$off('change-map-legend', this.changeMapLegend)
  },
  methods: {
    // 地图初始化
    init() {
      map = MT.map.init('map-maptalks', {
        ...this.$props,
      })
    },

    // 改变地图图例
    changeMapLegend(legend = {}, tab = {}) {
      // console.log(legend, tab)
      switch (legend.value) {
        case 'basePoint':
          this.initBasePoint(legend)
          break
        case 'clusterPoint':
          this.initClusterPoint(legend)
          break
        case 'baseLine':
          this.initBaseLine(legend)
          break
        case 'baseSurface':
          this.initBaseSurface(legend)
          break
        case 'drillSurface':
          this.initDrillSurface(legend)
          break
      }
    },

    // 基础点
    initBasePoint(legend) {
      const markers = basePointData.map(item => {
        const data = {
          ...item,
          markerFile: legend.pointIcon,
          hasInfoWindow: true,
        }
        const marker = MARKER.init(data)

        marker.on('click', e => {
          // const hasInfoWindow = marker.getInfoWindow()
          // 判断当前弹窗状态
          // if (hasInfoWindow) {
          //   if (hasInfoWindow.isVisible()) {
          //     marker.closeInfoWindow()
          //   } else {
          //     marker.openInfoWindow()
          //   }
          // } else {
          //   MARKER.initInfoWindow(marker, data)
          // }
        })

        return marker
      })

      MT.layer.init(legend.value, markers, {
        zIndex: 10,
      })
    },

    // 聚合点
    initClusterPoint() {
      console.log('聚合点')
    },

    // 聚合线
    initBaseLine() {
      console.log('聚合线')
    },

    // 基础面
    initBaseSurface() {
      console.log('基础面')
    },

    // 下钻面
    initDrillSurface() {
      console.log('下钻面')
    },
  },
}
</script>

<style lang="less" scoped></style>
