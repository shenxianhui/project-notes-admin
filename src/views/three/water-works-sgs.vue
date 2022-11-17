<!--
 * @Description: 石鼓山水厂
 * @Author: shenxh
 * @Date: 2022-09-19 15:10:58
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-17 11:26:01
-->

<template>
  <div class="water-works-yq admin-content">
    <three width="100%" height="100%" @loader-modules="loaderModules"></three>
  </div>
</template>

<script>
import Three from '@/components/three'

export default {
  name: 'water-works-yq',
  components: {
    Three,
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
  methods: {
    loaderModules(three) {},
  },
}
</script>

<style lang="less" scoped></style>
