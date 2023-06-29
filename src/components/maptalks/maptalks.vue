<!--
 * @Description: 地图
 * @Author: shenxh
 * @Date: 2023-06-28 14:15:00
 * @LastEditors: shenxh
 * @LastEditTime: 2023-06-29 15:46:10
-->

<template>
  <div class="maptalks" id="map-maptalks"></div>
</template>

<script>
import * as Maptalks from 'maptalks'
import MapboxGL from 'mapbox-gl'
import { MapboxglLayer } from 'maptalks.mapboxgl/dist/maptalks.mapboxgl.js'
import { ClusterLayer } from 'maptalks.markercluster'

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
          style: 'mapbox://styles/shenxh0928/cljgibp4c002r01prdnwn4o5r',
        },
      })

      // https://studio.mapbox.com
      MapboxGL.accessToken =
        'pk.eyJ1Ijoic2hlbnhoMDkyOCIsImEiOiJjbGpnZmhqMmowM3hkM29xbWk1aWY0eHJ6In0.xwShSuiFuLRxRd0eKVtu6g'

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
