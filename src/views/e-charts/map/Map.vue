<!--
 * @Author: shenxh
 * @Date: 2020-09-11 11:31:30
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-12 19:36:03
 * @Description: 地图
-->

<template>
  <div class="chart-map admin-content">
    <div class="chart-map-wrap">
      <div class="chart-map-item">
        <xx-map v-model="mapCode" :series-data="getSeriesData"></xx-map>
      </div>
    </div>
  </div>
</template>

<script>
import AreaCode from '@/data/area/area-code';
import XxMap from '@/components/e-charts/map';

export default {
  name: 'chart-map',
  components: {
    XxMap
  },
  props: {},
  data() {
    return {
      mapCode: '100000'
    };
  },
  computed: {
    getSeriesData() {
      const mockData = list => {
        return list.map(item => {
          return Object.assign(item, {
            value: Math.round(Math.random() * 1000),
            children: item.children && item.children.length ? mockData(item.children) : null
          });
        });
      };

      return mockData(AreaCode);
    }
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
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
