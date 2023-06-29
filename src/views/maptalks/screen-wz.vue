<!--
 * @Description: 温州大屏地图
 * @Author: shenxh
 * @Date: 2023-06-27 16:46:54
 * @LastEditors: shenxh
 * @LastEditTime: 2023-06-29 11:04:16
-->

<template>
  <div class="screen-wz admin-content">
    <base-map class="base-map"></base-map>
    <map-tab v-model="selectedTab" class="map-tab"></map-tab>
    <map-legend :screen-name="selectedTab" class="map-legend"></map-legend>
  </div>
</template>

<script>
import BaseMap from '@/components/maptalks/base-map.vue'
import MapTab from '../../components/maptalks/map-tab.vue'
import MapLegend from '../../components/maptalks/map-legend.vue'

export default {
  name: 'screen-wz',
  components: {
    BaseMap,
    MapTab,
    MapLegend,
  },
  props: {},
  data() {
    return {
      selectedTab: 'overview',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.screen-wz {
  user-select: none;
  padding: 0;
  background: #061225cc;
  .base-map {
    width: 100%;
    height: 100%;
  }
  .map-tab {
    position: absolute;
    left: 50%;
    bottom: 15px;
    transform: translate(-50%, 0);
  }
  .map-legend {
    position: absolute;
    left: 10px;
    bottom: 10px;
  }
}
</style>
