<!--
 * @Author: shenxh
 * @Date: 2020-09-04 17:54:51
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-22 11:18:25
 * @Description: 组件-Swiper
-->

<template>
  <div class="xx-swiper" :style="{ width, height }">
    <swiper ref="swiper" :style="{ width, height }" :options="_options">
      <swiper-slide v-for="(item, index) in swiperData" :key="index">
        <slot :data="item"></slot>
      </swiper-slide>
    </swiper>
    <slot name="prev"></slot>
    <slot name="next"></slot>
  </div>
</template>

<script>
export default {
  name: 'xx-swiper',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    swiperData: {
      type: Array,
      required: true
    },
    /* Swiper 中文文档: https://www.swiper.com.cn/api/index.html */
    options: Object
  },
  data() {
    return {};
  },
  computed: {
    _options() {
      return Object.assign(
        {
          /* Basic */
          initialSlide: 0,
          direction: 'horizontal',
          speed: 1000,
          grabCursor: true,

          /* Slides grid */
          centeredSlides: false,
          slidesPerView: 3,
          slidesPerGroup: 1,
          centerInsufficientSlides: true,

          /* Loop */
          loop: true,

          /* Ecents */
          on: {
            // 初始化后执行
            init: () => {
              this.$emit('init');
            },
            // 点击 Swiper 后执行
            click: evt => {
              this.$emit('click', evt);
            },
            // 当碰触到 slider 时执行
            touchStart: evt => {
              this.$emit('touch-start', evt);
            },
            // 手指触碰 Swiper 并滑动（手指）时执行
            touchMove: evt => {
              this.$emit('touch-move', evt);
            },
            // 触摸释放时执行
            touchEnd: evt => {
              this.$emit('touch-end', evt);
            },
            // 在当前 Slide 切换到另一个 Slide 时执行(activeIndex发生改变)，一般是在点击控制组件、释放滑动的时间点。
            slideChange: () => {
              this.$emit('slide-change');
            },
            // swiper 从当前 slide 开始过渡到另一个 slide 时执行
            slideChangeTransitionStart: () => {
              this.$emit('slide-change-transition-start');
            },
            // swiper 从一个 slide 过渡到另一个 slide 结束时执行
            slideChangeTransitionEnd: () => {
              this.$emit('slide-change-transition-end');
            },
            // slider 向前(右、下)切换开始时执行
            slideNextTransitionStart: () => {
              this.$emit('slide-next-transition-start');
            },
            // slider 向前(右、下)切换结束时执行
            slideNextTransitionEnd: () => {
              this.$emit('slide-next-transition-end');
            },
            // slider 向后(左、上)切换开始时执行
            slidePrevTransitionStart: () => {
              this.$emit('slide-prev-transition-start');
            },
            // slider 向后(左、上)切换结束时执行
            slidePrevTransitionEnd: () => {
              this.$emit('slide-prev-transition-end');
            },
            // 所有内置图像加载完成后执行, 同时 `updateOnImagesReady` 需设置为 `true`
            imagesReady: () => {
              this.$emit('images-ready');
            },
            // 手指触碰 Swiper 并拖动 slide 的过程中不断触发 sliderMove 函数
            sliderMove: evt => {
              this.$emit('slider-move', evt);
            },
            // 轻触 Swiper 后执行 (移动端)
            tap: evt => {
              this.$emit('tap', evt);
            },
            // 两次轻触(双击) Swiper 时执行
            doubleTap: evt => {
              this.$emit('double-tap', evt);
            },
            // 当 Swiper 的 progress 被改变时执行
            progress: progress => {
              this.$emit('progress', progress);
            },
            // Swiper 切换到初始化位置时执行
            reachBeginning: () => {
              this.$emit('reach-beginning');
            },
            // Swiper 切换到最后一个 Slide 时执行
            reachEnd: () => {
              this.$emit('reach-end');
            },
            // 当 Swiper 是从第一个或最后一个 Slide 切换时执行
            fromEdge: () => {
              this.$emit('from-edge');
            },
            // 当 Swiper 要切换到第一个或最后一个 Slide 时执行
            toEdge: () => {
              this.$emit('to-edge');
            },
            // 在 slide 自动切换开始时执行
            autoplay: () => {
              this.$emit('autoplay');
            },
            // 自动切换开始时执行 (由不自动切换进入到自动切换)
            autoplayStart: () => {
              this.$emit('autoplay-start');
            },
            // 自动切换结束时执行 (由自动切换进入到不自动切换)
            autoplayStop: () => {
              this.$emit('autoplay-stop');
            },
            // 浏览器尺寸发生变化时执行
            resize: () => {
              this.$emit('resize');
            },
            // 销毁 Swiper 时执行
            beforeDestroy: () => {
              this.$emit('before-destroy');
            }
          },

          /* Methods */
          Methods: {},

          /* 组件 */
          autoplay: true,
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,

          /* Effects */
          effect: 'slide',

          /* Navigation Buttons */
          navigation: {
            nextEl: '.xx-swiper-next',
            prevEl: '.xx-swiper-prev'
          }
        },
        this.options
      );
    }
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style scoped lang="less">
.xx-swiper {
  position: relative;
}
</style>
