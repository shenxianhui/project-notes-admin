<!--
 * @Author: shenxh
 * @Date: 2020-07-10 16:40:30
 * @LastEditors: shenxh
 * @LastEditTime: 2022-02-25 11:27:44
 * @Description: 鼠标拖动
-->

<template>
  <div class="drag-zoom">
    <xx-drag-zoom>
      <div class="drag-zoom-content">
        鼠标拖动
      </div>
    </xx-drag-zoom>
  </div>
</template>

<script>
import XxDragZoom from '@/components/tools/drag-zoom';

export default {
  name: 'drag-zoom',
  components: {
    XxDragZoom
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
.drag-zoom {
  width: 100%;
  height: 100%;
  .drag-zoom-content {
    width: 100px;
    height: 100px;
    border: 1px solid #000;
    background: url('~@/assets/logo.png') no-repeat;
    background-size: 100% 100%;
    cursor: move;
  }
}
</style>
