<!--
 * @Author: shenxh
 * @Date: 2020-09-11 11:31:30
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-16 10:03:34
 * @Description: 地图
-->

<template>
  <div class="chart-map admin-content">
    <div class="chart-map-wrap">
      <div class="chart-map-item">
        <xx-map :area="area" :series-data="seriesData"></xx-map>
      </div>
    </div>
  </div>
</template>

<script>
import XxMap from '@/components/e-charts/map'

export default {
  name: 'chart-map',
  components: {
    XxMap,
  },
  props: {},
  data() {
    return {
      area: {
        code: '000000', // 区域编码
      },
    }
  },
  computed: {
    mapModule() {
      let areaCode = this.area.code

      if (areaCode / 100 !== parseInt(areaCode / 100)) {
        areaCode = areaCode.slice(0, 4) + '00'
      }

      return require(`@/components/e-charts/map/data/${areaCode}`)
    },
    seriesData() {
      let areaCode = this.area.code
      let data = []

      if (areaCode !== '000000') {
        this.mapModule.features.forEach(item => {
          data.push({
            name: item.properties.name || '',
            code: String(item.id) || String(item.properties.adcode) || '',
            cp: item.properties.cp || item.properties.center || [],
            value: Math.round(Math.random() * 1000),
          })
        })
      }

      return data
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
}
</script>

<style scoped lang="less">
.chart-map {
  .chart-map-wrap {
    height: 100%;
    .chart-map-item {
      height: 100%;
      background-color: #3074da;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
