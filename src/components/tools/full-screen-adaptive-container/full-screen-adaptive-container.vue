<!--
 * @Description: 全屏自适应容器
 * @Author: shenxh
 * @Date: 2023-02-06 19:16:25
 * @LastEditors: shenxh
 * @LastEditTime: 2023-02-06 19:42:10
-->

<template>
  <div class="full-screen-adaptive-container" :style="style">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'full-screen-adaptive-container',
  components: {},
  props: {
    width: {
      type: Number,
      default: 1920,
    },
    height: {
      type: Number,
      default: 1080,
    },
  },
  data() {
    return {
      style: {
        width: this.width + 'px',
        height: this.height + 'px',
        transform: 'scale(1) translate(-50%, -50%)',
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.setScale()
    window.addEventListener('resize', this.Debounce(this.setScale, 1000))
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setScale)
  },
  methods: {
    // 设置比例
    setScale() {
      const num =
        window.innerWidth > 3800 ? Math.ceil(this.getScale()) : this.getScale()

      this.style.transform = 'scale(' + num + ') translate(-50%, -50%)'
    },

    // 获取放大缩小比例
    getScale() {
      const w = window.innerWidth / this.width
      const h = window.innerHeight / this.height
      return w < h ? w : h
    },

    // 防止反复跳动
    Debounce(fn, t) {
      const delay = t || 500
      let timer
      return function() {
        const args = arguments
        if (timer) {
          clearTimeout(timer)
        }
        const context = this
        timer = setTimeout(() => {
          timer = null
          fn.apply(context, args)
        }, delay)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.full-screen-adaptive-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  transform-origin: 0 0;
  overflow: hidden;
}
</style>
