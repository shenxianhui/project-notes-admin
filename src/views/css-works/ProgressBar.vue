<!--
 * @Description: [Demo]进度条
 * @Author: shenxh
 * @Date: 2022-11-10 13:21:04
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-10 13:31:36
-->

<template>
  <div class="progress-bar admin-content">
    <div class="progress-bar-wrap">
      <div class="progress-bar-item">
        <semi-circle-progress :value="50"></semi-circle-progress>
      </div>
    </div>
  </div>
</template>

<script>
import SemiCircleProgress from '@/components/semi-circle-progress/semi-circle-progress.vue'

export default {
  name: 'progress-bar',
  components: {
    SemiCircleProgress,
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
.progress-bar {
  .progress-bar-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    min-height: 100%;
    border: 1px solid #efefef;
    overflow: auto;
    .progress-bar-item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 33.3%;
      height: 50%;
      border-bottom: 1px solid #efefef;
      &:not(:nth-of-type(3n)) {
        border-right: 1px solid #efefef;
      }
    }
  }
}
</style>
