<!--
 * @Description: 全屏自适应容器演示
 * @Author: shenxh
 * @Date: 2023-02-06 19:15:47
 * @LastEditors: shenxh
 * @LastEditTime: 2023-02-06 19:37:58
-->

<template>
  <div class="full-screen-adaptive-container-demo">
    <full-screen-adaptive-container :width="1920" :height="1080">
      <div class="test">内容区域</div>
    </full-screen-adaptive-container>
  </div>
</template>

<script>
import FullScreenAdaptiveContainer from '@/components/tools/full-screen-adaptive-container/full-screen-adaptive-container.vue'

export default {
  name: 'full-screen-adaptive-container-demo',
  components: {
    FullScreenAdaptiveContainer,
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
.test {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 100px;
  background: #ff000033;
  border: 1px solid #f00;
}
</style>
