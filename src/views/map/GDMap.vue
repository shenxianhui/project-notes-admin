<!--
 * @Author: Shen Xianhui
 * @Date: 2019-07-21 10:03:53
 * @LastEditors  : Wells
 * @LastEditTime : 2020-01-17 09:34:05
 * @Description: 高德地图
 -->
<template>
  <div class="gaode-map">
    <GaoDe></GaoDe>
  </div>
</template>

<script>
import GaoDe from '@/components/map/GaoDe';

export default {
  name: 'GaodeMap',
  components: {
    GaoDe
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  // created() {},
  // mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.gaode-map {
  width: 100%;
  height: 100%;
}
</style>
