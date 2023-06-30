<!--
 * @Description: 基础地图
 * @Author: shenxh
 * @Date: 2023-06-27 16:46:54
 * @LastEditors: shenxh
 * @LastEditTime: 2023-06-30 13:39:29
-->

<template>
  <div class="screen-wz admin-content">
    <base-map class="base-map"></base-map>
    <map-legend class="map-legend"></map-legend>
    <map-tab v-model="selectedTab" class="map-tab"></map-tab>
  </div>
</template>

<script>
import BaseMap from '@/components/maptalks/maptalks.vue'
import MapTab from '@/components/map-tab/map-tab.vue'
import MapLegend from '@/components/map-legend/map-legend.vue'

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
      selectedTab: 'point',
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
