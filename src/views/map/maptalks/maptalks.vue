<!--
 * @Description: Maptalks
 * @Author: shenxh
 * @Date: 2023-06-27 16:46:54
 * @LastEditors: shenxh
 * @LastEditTime: 2023-09-18 14:10:45
-->

<template>
  <div class="screen-wz admin-content">
    <router-view />
    <map-talks ref="maptalks" class="maptalks"></map-talks>
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
import MapTalks from '@/components/maptalks/maptalks.vue'
import MapTab from '@/components/map-tab/map-tab.vue'
import MapLegend from '@/components/map-legend/map-legend.vue'

export default {
  name: 'screen-wz',
  components: {
    MapTalks,
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
    this.$refs.maptalks && this.$refs.maptalks.beforeChangeMapTab()
    next()
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    changeTab(name) {
      // this.$refs.maptalks && this.$refs.maptalks.beforeChangeMapTab()
      this.$router.push('/map/maptalks/' + name)
    },

    changeLegend(data) {
      this.$refs.maptalks && this.$refs.maptalks.selectedMapLegend(data)
    },

    changeSwitch(data) {
      this.$refs.maptalks && this.$refs.maptalks.switchedMapLegend(data)
    },
  },
}
</script>

<style lang="less" scoped>
.screen-wz {
  user-select: none;
  padding: 0;
  background: #061225cc;
  .maptalks {
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
