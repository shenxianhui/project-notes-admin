<!--
 * @Description: Maptalks
 * @Author: shenxh
 * @Date: 2023-06-28 14:15:00
 * @LastEditors: shenxh
 * @LastEditTime: 2023-09-07 15:09:22
-->

<template>
  <div class="maptalks" id="map-maptalks"></div>
</template>

<script>
import MT from './utils'
import MARKER from './utils/marker'
import LABEL from './utils/label'

let map = null

// 待整理:
// 1. 手动定位
// 2. 图例相关项
export default {
  name: 'maptalks',
  components: {},
  props: {
    center: {
      type: Array,
      default() {
        return [116.39133827116365, 39.90468692443804]
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
      default: 18,
    },
    // 设置地图可视范围的经纬度范围 [西经，南纬，东经，北纬]
    maxExtent: {
      type: Array, // [114.5, 31.6, 115.1, 32.2]
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
      default: 50,
    },
    // 旋转
    bearing: {
      type: Number,
      default: 0,
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

    window.handleMarkerPopup = this.handleMarkerPopup
  },
  beforeDestroy() {
    MT.map.remove()
  },
  methods: {
    // 地图初始化
    init() {
      map = MT.map.init('map-maptalks', {
        ...this.$props,
      })
    },

    // 点击图例
    selectedMapLegend(legend = {}) {
      const { selected } = legend

      if (selected) {
        const layer = map.getLayer(legend.value)

        if (layer) {
          MT.map.showLayer(legend.value)

          return
        }
      } else {
        MT.map.hideLayer(legend.value)

        return
      }

      switch (legend.value) {
        case 'point-base':
          this.initBasePoint(legend)
          break
        case 'point-cluster':
          this.initClusterPoint(legend)
          break
        case 'line-base':
          this.initBaseLine(legend)
          break
        case 'surface-base':
          this.initBaseSurface(legend)
          break
        case 'surface-drill':
          this.initDrillSurface(legend)
          break
      }
    },

    // 点击地图Tab之前
    beforeChangeMapTab() {
      MT.map.hideLayers()
      // MT.map.removeAllLayers()
    },

    // 点击图例开关
    switchedMapLegend(legend = {}) {
      if (legend.switch?.checked) {
        MT.layer.showAllInfoWindow(legend.value)
      } else {
        MT.layer.hideAllInfoWindow(legend.value)
      }
    },

    // 基础点
    initBasePoint(legend = {}) {
      const mockData = [
        {
          id: 'marker-0',
          name: '天安门',
          coordinate: [116.39103647015702, 39.912311286085355],
          alarm: true,
          infoWindow: [
            {
              alarm: true,
              label: '朝代',
              value: '明清',
              unit: '',
            },
            {
              label: '面积',
              value: '4800',
              unit: '㎡',
            },
          ],
        },
        {
          id: 'marker-1',
          name: '北京大学',
          coordinate: [116.30976921553298, 39.989304628302506],
          infoWindow: [
            {
              label: '面积',
              value: '4127',
              unit: '亩',
            },
          ],
        },
      ]
      const markers = []
      const labels = []

      mockData.forEach(item => {
        const data = {
          ...item,
          markerFile: legend.map?.marker?.icon,
          hasInfoWindow: true,
        }
        const marker = MARKER.init(data)
        const label = LABEL.init(data)

        markers.push(marker)
        labels.push(label)

        marker.on('click', e => {
          const infoWindow = marker.getInfoWindow()

          // 判断当前弹窗状态
          if (infoWindow) {
            if (infoWindow.isVisible()) {
              setTimeout(() => {
                marker.closeInfoWindow()
              }, 30)
            } else {
              marker.openInfoWindow()
            }
          } else {
            MARKER.initInfoWindow(marker, marker.data)
            marker.openInfoWindow()
          }
        })
      })

      MT.layer.init(legend.value, [...markers, ...labels], {
        zIndex: 15,
      })
    },

    // 聚合点
    initClusterPoint(legend = {}) {
      const mockData = [
        {
          id: 'cluster-0',
          name: '点位0',
          coordinate: [116.42327258286122, 39.921218242921924],
        },
        {
          id: 'cluster-1',
          name: '点位1',
          coordinate: [116.41672662318155, 39.91841479974909],
        },
        {
          id: 'cluster-2',
          name: '点位2',
          coordinate: [116.4102017274933, 39.91229350120264],
        },
        {
          id: 'cluster-3',
          name: '点位3',
          coordinate: [116.45187329128277, 39.90531229467916],
        },
      ]
      const markers = mockData.map(item => {
        const data = {
          ...item,
          markerFile: legend.map?.marker?.icon,
          hasInfoWindow: true,
        }
        const marker = MARKER.init(data)

        return marker
      })

      MT.clusterLayer.init(legend.value, markers, {
        zIndex: 10,
      })
    },

    // 基础线
    initBaseLine() {
      console.log('基础线')
    },

    // 基础面
    initBaseSurface() {
      console.log('基础面')
    },

    // 下钻面
    initDrillSurface() {
      console.log('下钻面')
    },

    // 点击点位弹窗
    handleMarkerPopup(type, jsonData) {
      console.log(type, jsonData)
    },
  },
}
</script>

<style lang="less" scoped></style>
