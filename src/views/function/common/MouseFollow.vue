<!--
 * @Author: shenxh
 * @Date: 2020-07-10 16:40:30
 * @LastEditors: shenxh
 * @LastEditTime: 2020-07-10 16:55:06
 * @Description: 鼠标跟随
-->

<template>
  <div class="mouse-follow">
    <xx-mouse-follow>
      <div class="content">
        123
      </div>
    </xx-mouse-follow>
  </div>
</template>

<script>
import XxMouseFollow from '@/components/common/MouseFollow';

export default {
  name: 'mouse-follow',
  components: {
    XxMouseFollow
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
.mouse-follow {
  width: 100%;
  height: 100%;
  .content {
    width: 100px;
    height: 100px;
    border: 1px solid #000;
    cursor: pointer;
  }
}
</style>
