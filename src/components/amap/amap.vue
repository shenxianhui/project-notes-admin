<!--
 * @Description: 高德地图
 * @Author: shenxh
 * @Date: 2024-02-26 15:51:01
 * @LastEditors: shenxh
 * @LastEditTime: 2024-02-26 16:53:28
-->

<template>
  <div class="map">
    <div id="amap"></div>
    <div class="select-address">
      <el-cascader
        v-model="selectedAddress.region"
        :options="regionData"
        class="cascader"
      >
      </el-cascader>
      <el-input v-model="selectedAddress.detail" clearable class="address-det">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearch"
        ></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import AMap from '@/utils/amap.js'
import { regionData } from 'element-china-area-data'

export default {
  name: 'amap',
  components: {},
  props: {},
  data() {
    return {
      map: null,
      marker: null,
      regionData,
      selectedAddress: {
        region: [],
        detail: '',
      },
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

          this.map.toAddress(lnglat).then((res = {}) => {
            const { formattedAddress, addressComponent = {} } = res
            const { adcode, province, city, district } = addressComponent
            const area = province + city + district
            const detAddress = formattedAddress.replace(area, '')

            this.selectedAddress.region = [
              adcode.substring(0, 2),
              adcode.substring(0, 4),
              adcode.substring(0, 6),
            ]
            this.selectedAddress.detail = detAddress
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

    handleSearch() {
      console.log(this.selectedAddress)
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
  .select-address {
    position: absolute;
    display: flex;
    align-items: center;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    .cascader {
      width: 200px;
    }
    .address-det {
      width: 400px;
      margin-left: 10px;
    }
  }
}
</style>
