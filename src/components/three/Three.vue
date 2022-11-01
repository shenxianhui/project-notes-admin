<!--
 * @Description: [组件]Three
 * @Author: shenxh
 * @Date: 2022-08-06 11:09:14
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-23 17:21:35
-->

<template>
  <div
    class="three"
    :id="threeId"
    ref="three"
    :style="{ width: width, height: height }"
  >
    <div class="stats" :id="statsId"></div>
  </div>
</template>

<script>
import Three from './utils'

let three = null

export default {
  name: 'three',
  components: {},
  props: {
    threeId: {
      type: String,
      default: '$_three',
    },
    statsId: {
      type: String,
      default: '$_stats',
    },
    width: {
      type: String,
      default: '500px',
    },
    height: {
      type: String,
      default: '300px',
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initThree()
  },
  beforeDestroy() {
    this.clearThree()
  },
  methods: {
    // three 初始化
    initThree() {
      if (!three) three = new Three(this.threeId, this.statsId)

      /* 模型加载 */
      this.$emit('loader-modules', three)
    },

    // 清空 three
    clearThree() {
      three.clearThree()

      three = null
    },
  },
}
</script>

<style lang="less" scoped>
.three {
  position: relative;
}
</style>
