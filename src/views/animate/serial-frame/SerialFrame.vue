<!--
 * @Author: shenxh
 * @Date: 2021-07-07 10:41:02
 * @LastEditors: shenxh
 * @LastEditTime: 2021-07-07 16:28:28
 * @Description: 序列帧
-->

<template>
  <div class="serial-frame admin-content">
    <frame-animation
      canvasTargetId="frames1"
      :width="800"
      :height="800"
      :framesUrl="framesUrl1"
    ></frame-animation>
  </div>
</template>

<script>
import FrameAnimation from '@/components/frame-animation';

// 静态文件要在 public 目录下引入, 否则 frame-animation.js 中不好查找文件位置
const framesUrl1 = require
  .context('../../../../public/static/serial-frame/demo1', true, /\.png$/)
  .keys()
  .map(item => item.replace('.', '/static/serial-frame/demo1'));

export default {
  name: 'serial-frame',
  components: {
    FrameAnimation
  },
  props: {},
  data() {
    return {
      framesUrl1
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style lang="less" scoped></style>
