<!--
 * @Description: 地图
 * @Author: shenxh
 * @Date: 2023-06-28 14:15:00
 * @LastEditors: shenxh
 * @LastEditTime: 2023-09-18 14:19:49
-->

<template>
  <div class="mapbox" id="map-mapbox"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
  name: 'mapbox',
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
      default: 25,
    },
    // 可以通过右键单击或 ctrl + 左键单击拖动地图进行旋转
    dragRotate: {
      type: Boolean,
      default: false,
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
      // https://studio.mapbox.com
      mapboxgl.accessToken =
        'pk.eyJ1Ijoic2hlbnhoMDkyOCIsImEiOiJjbGpnZmhqMmowM3hkM29xbWk1aWY0eHJ6In0.xwShSuiFuLRxRd0eKVtu6g'

      const map = new mapboxgl.Map({
        ...this.$props,
        container: 'map-mapbox',
        style: 'mapbox://styles/shenxh0928/cljgibp4c002r01prdnwn4o5r',
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
