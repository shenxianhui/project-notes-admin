<!--
 * @Description: 高德地图
 * @Author: shenxh
 * @Date: 2024-02-26 15:51:01
 * @LastEditors: shenxh
 * @LastEditTime: 2024-02-27 14:10:28
-->

<template>
  <div class="map">
    <div id="amap"></div>
    <div class="select-address">
      <el-autocomplete
        class="address-det"
        v-model="address"
        :fetch-suggestions="querySearch"
        select-when-unmatched
        clearable
        placeholder="请输入详细地址"
        @select="handleSelect"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearch"
        ></el-button
      ></el-autocomplete>
    </div>
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
      address: '',
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
            this.address = res.formattedAddress
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
      this.searchMap(this.address)
    },

    handleSelect(data) {
      const { value = '' } = data || {}

      this.searchMap(value)
    },

    async querySearch(queryString, cb) {
      if (queryString === '') cb([])

      const data = await this.map.usePoiSearch(queryString)
      const { tips = [] } = data || {}
      const list = tips.map(item => {
        return {
          ...item,
          value: item.district + item.name,
        }
      })

      cb(list)
    },

    searchMap(content) {
      this.map.PlaceSearch().search(content, (status, result) => {
        // const { poiList = {} } = result || {}
      })
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
    .address-det {
      width: 600px;
      margin-left: 10px;
    }
  }
}
</style>
