<!--
 * @Description: 地图
 * @Author: shenxh
 * @Date: 2023-06-28 14:15:00
 * @LastEditors: shenxh
 * @LastEditTime: 2023-06-28 15:19:53
-->

<template>
  <div class="base-map" id="map-maptalks"></div>
</template>

<script>
import * as Maptalks from 'maptalks'
import Mapboxgl from 'mapbox-gl'
import { MapboxglLayer } from 'maptalks.mapboxgl/dist/maptalks.mapboxgl.js'
import { ClusterLayer } from 'maptalks.markercluster'

export default {
  name: 'base-map',
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
      default: false,
    },
    // 可以通过右键单击或 ctrl + 左键将地图拖动俯仰
    dragPitch: {
      type: Boolean,
      default: false,
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
    return {
      map: null,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.remove()
  },
  methods: {
    // 地图初始化
    init() {
      const baseLayer = new MapboxglLayer('tile', {
        glOptions: {
          style: 'mapbox://styles/waka1234/cl5gfgwi1001v15p8vrierrfc',
          // style: 'mapbox://styles/waka1234/cl9gh8szg000814qmyod9l6q6', // 2d
        },
      })

      const map = new Maptalks.Map('map-maptalks', {
        baseLayer,
        center: this.center,
        zoom: this.zoom,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
        maxExtent: this.maxExtent,
        dragRotate: this.dragRotate,
        dragPitch: this.dragPitch,
        pitch: this.pitch,
        bearing: this.bearing,
      })

      Mapboxgl.accessToken =
        'pk.eyJ1Ijoid2FrYTEyMzQiLCJhIjoiY2tyMXFxYzkzMXdqdjJucnpycDEwMDJkbiJ9._i9NTkELvuvwactlVYhaqA'

      map.on('baselayerload', () => {
        console.log('基础层加载完成')
      })

      this.map = map
    },

    // 销毁地图
    remove() {
      this.map && this.map.remove()
    },
  },
}
</script>

<style lang="less" scoped></style>
