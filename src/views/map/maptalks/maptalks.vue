<!--
 * @Description: Maptalks
 * @Author: shenxh
 * @Date: 2023-06-27 16:46:54
 * @LastEditors: shenxh
 * @LastEditTime: 2023-09-06 14:44:25
-->

<template>
  <div class="screen-wz admin-content">
    <router-view />
    <base-map ref="map" class="base-map"></base-map>
    <map-legend
      ref="legend"
      class="map-legend"
      @change-legend="changeLegend"
      @change-switch="changeSwitch"
    ></map-legend>
    <map-tab
      v-model="selectedTab"
      class="map-tab"
      @change="changeTab"
    ></map-tab>
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
      selectedTab: this.$route.name,
    }
  },
  computed: {},
  watch: {},
  beforeRouteUpdate(to, from, next) {
    this.selectedTab = to.name
    this.$refs.map && this.$refs.map.beforeChangeMapTab()
    next()
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    changeTab(name) {
      // this.$refs.map && this.$refs.map.beforeChangeMapTab()
      this.$router.push('/map/maptalks/' + name)
    },

    changeLegend(data) {
      this.$refs.map && this.$refs.map.selectedMapLegend(data)
    },

    changeSwitch(data) {
      this.$refs.map && this.$refs.map.switchedMapLegend(data)
    },
  },
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
