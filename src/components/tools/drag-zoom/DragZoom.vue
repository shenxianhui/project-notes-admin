<!--
 * @Author: shenxh
 * @Date: 2020-07-10 16:40:30
 * @LastEditors: shenxh
 * @LastEditTime: 2022-02-25 11:29:33
 * @Description: 组件-拖动缩放
-->

<template>
  <div ref="xx-drag-zoom" class="xx-drag-zoom">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'xx-drag-zoom',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    mouseFollow() {
      return this.$refs['xx-drag-zoom'];
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.mouseFollow.addEventListener('mousedown', evt => {
      this.mousedown(evt);
    });
  },
  beforeDestroy() {},
  methods: {
    mousedown(evt) {
      let x = evt.clientX - this.mouseFollow.offsetLeft;
      let y = evt.clientY - this.mouseFollow.offsetTop;
      document.onmousemove = evt => {
        this.mouseFollow.style.left = evt.clientX - x + 'px';
        this.mouseFollow.style.top = evt.clientY - y + 'px';
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
};
</script>

<style scoped lang="less">
.xx-drag-zoom {
  position: absolute;
}
</style>
