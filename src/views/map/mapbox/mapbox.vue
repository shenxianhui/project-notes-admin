<!--
 * @Description: Mapbox
 * @Author: shenxh
 * @Date: 2023-09-18 13:51:37
 * @LastEditors: shenxh
 * @LastEditTime: 2023-09-18 13:59:54
-->

<template>
  <div class="mapbox admin-content">
    <map-box ref="mapbox" class="mapbox"></map-box>
  </div>
</template>

<script>
import MapBox from '@/components/mapbox/mapbox.vue'

export default {
  name: 'mapbox',
  components: {
    MapBox,
  },
  props: {},
  data() {
    return {}
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
.mapbox {
  user-select: none;
  padding: 0;
  background: #061225cc;
  .mapbox {
    width: 100%;
    height: 100%;
  }
}
</style>
