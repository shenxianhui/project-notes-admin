<template>
  <div class="map">
    <div id="amap"></div>
  </div>
</template>

<script>
import AMap from '@/utils/amap.js'

export default {
  name: 'amap',
  components: {},
  props: {},
  data() {
    return {
      map: null,
      marker: null,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initMap()
  },
  beforeDestroy() {
    this.map.destory()
  },
  methods: {
    initMap() {
      this.map = new AMap({
        initNow: true,
        id: 'amap',
        initData: {
          zoom: 13,
          zooms: [3, 20],
          resizeEnable: true,
        },
      })

      this.map.on('complete', mapinstance => {
        mapinstance.on('click', e => {
          const { lnglat = {} } = e || {}
          const { lng, lat } = lnglat

          if (this.marker) {
            this.marker.setPosition(e.lnglat)
          } else {
            this.initMarker(lng, lat)
          }

          this.map.toAddress(lnglat).then(res => {
            console.log('选中地址: ', res)
          })
        })
      })
    },

    initMarker(lng, lat) {
      this.marker = this.map.createMarker({
        title: '',
        lng,
        lat,
      })

      this.marker.setMap(this.map.mapInstance)
    },
  },
}
</script>

<style lang="less" scoped>
.map {
  position: relative;
  width: 100%;
  height: 100%;
  #amap {
    width: 100%;
    height: 100%;
    /deep/ .amap-logo {
      display: none !important;
    }
    /deep/ .amap-copyright {
      display: none !important;
    }
    /deep/ .amap-marker-label {
      padding: 4px 6px;
      font-weight: 400;
      font-size: 12px;
      border-radius: 4px;
      background: #5f627d;
      color: #ffffff;
      border: none;
    }
  }
}
</style>
