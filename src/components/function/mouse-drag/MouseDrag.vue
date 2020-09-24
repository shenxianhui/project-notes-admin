<!--
 * @Author: shenxh
 * @Date: 2020-07-10 16:40:30
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-24 09:24:48
 * @Description: 组件-鼠标拖动
-->

<template>
  <div ref="xx-mouse-drag" class="xx-mouse-drag">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'xx-mouse-drag',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    mouseFollow() {
      return this.$refs['xx-mouse-drag'];
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
.xx-mouse-drag {
  position: absolute;
}
</style>
