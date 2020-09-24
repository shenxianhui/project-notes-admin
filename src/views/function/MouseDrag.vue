<!--
 * @Author: shenxh
 * @Date: 2020-07-10 16:40:30
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-24 09:28:39
 * @Description: 鼠标拖动
-->

<template>
  <div class="mouse-drag">
    <xx-mouse-drag>
      <div class="mouse-drag-content">
        鼠标拖动
      </div>
    </xx-mouse-drag>
  </div>
</template>

<script>
import XxMouseDrag from '@/components/function/mouse-drag';

export default {
  name: 'mouse-drag',
  components: {
    XxMouseDrag
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style scoped lang="less">
.mouse-drag {
  width: 100%;
  height: 100%;
  .mouse-drag-content {
    width: 100px;
    height: 100px;
    border: 1px solid #000;
    cursor: pointer;
    background: url('~@/assets/logo.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
