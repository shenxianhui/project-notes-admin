<!--
 * @Author: shenxh
 * @Date: 2020-09-04 17:54:51
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-23 11:45:02
 * @Description: 组件-Swiper (中文文档: https://www.swiper.com.cn/api/index.html)
-->

<template>
  <div ref="xx-swiper" class="xx-swiper" :style="{ width, height }">
    <swiper ref="swiper" :options="_options">
      <swiper-slide v-for="(item, index) in swiperData" :key="index">
        <slot :item="item" :index="index"></slot>
      </swiper-slide>

      <!-- 分页 -->
      <div v-show="showPagination" class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  name: 'xx-swiper',
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
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
    // 显示分页
    showPagination: {
      type: Boolean,
      default: true
    },
    options: Object
  },
  data() {
    return {
      swiper: null
    };
  },
  computed: {
    _options() {
      return Object.assign(
        {
          /* Basic */
          initialSlide: 0,
          direction: 'horizontal',
          speed: 1000,

          /* Slides grid */
          centeredSlides: true,
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
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('click', { swiper, evt });
              });
            },
            // 当碰触到 slider 时执行
            touchStart: evt => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('touch-start', { swiper, evt });
              });
            },
            // 手指触碰 Swiper 并滑动 (手指) 时执行
            touchMove: evt => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('touch-move', { swiper, evt });
              });
            },
            // 触摸释放时执行
            touchEnd: evt => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('touch-end', { swiper, evt });
              });
            },
            // 在当前 Slide 切换到另一个 Slide 时执行(activeIndex 发生改变)，一般是在点击控制组件、释放滑动的时间点。
            slideChange: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('slide-change', swiper);
              });
            },
            // swiper 从当前 slide 开始过渡到另一个 slide 时执行
            slideChangeTransitionStart: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('slide-change-transition-start', swiper);
              });
            },
            // swiper 从一个 slide 过渡到另一个 slide 结束时执行
            slideChangeTransitionEnd: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('slide-change-transition-end', swiper);
              });
            },
            // slider 向前(右、下)切换开始时执行
            slideNextTransitionStart: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('slide-next-transition-start', swiper);
              });
            },
            // slider 向前(右、下)切换结束时执行
            slideNextTransitionEnd: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('slide-next-transition-end', swiper);
              });
            },
            // slider 向后(左、上)切换开始时执行
            slidePrevTransitionStart: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('slide-prev-transition-start', swiper);
              });
            },
            // slider 向后(左、上)切换结束时执行
            slidePrevTransitionEnd: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('slide-prev-transition-end', swiper);
              });
            },
            // 所有内置图像加载完成后执行, 同时 `updateOnImagesReady` 需设置为 `true`
            imagesReady: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('images-ready', swiper);
              });
            },
            // 手指触碰 Swiper 并拖动 slide 的过程中不断触发 sliderMove 函数
            sliderMove: evt => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('slider-move', { swiper, evt });
              });
            },
            // 轻触 Swiper 后执行 (移动端)
            tap: evt => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('tap', { swiper, evt });
              });
            },
            // 两次轻触(双击) Swiper 时执行
            doubleTap: evt => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('double-tap', { swiper, evt });
              });
            },
            // 当 Swiper 的 progress 被改变时执行
            progress: progress => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('progress', { swiper, progress });
              });
            },
            // Swiper 切换到初始化位置时执行
            reachBeginning: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('reach-beginning', swiper);
              });
            },
            // Swiper 切换到最后一个 Slide 时执行
            reachEnd: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('reach-end', swiper);
              });
            },
            // 当 Swiper 是从第一个或最后一个 Slide 切换时执行
            fromEdge: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('from-edge', swiper);
              });
            },
            // 当 Swiper 要切换到第一个或最后一个 Slide 时执行
            toEdge: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('to-edge', swiper);
              });
            },
            // 在 slide 自动切换开始时执行
            autoplay: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('autoplay', swiper);
              });
            },
            // 自动切换开始时执行 (由不自动切换进入到自动切换)
            autoplayStart: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('autoplay-start', swiper);
              });
            },
            // 自动切换结束时执行 (由自动切换进入到不自动切换)
            autoplayStop: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('autoplay-stop', swiper);
              });
            },
            // 浏览器尺寸发生变化时执行
            resize: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('resize', swiper);
              });
            },
            // 销毁 Swiper 时执行
            beforeDestroy: () => {
              this.$nextTick(() => {
                const swiper = this.swiper;

                this.$emit('before-destroy', swiper);
              });
            }
          },

          /* 组件 */
          autoplay: true,
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,

          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true
          }
        },
        this.options
      );
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.swiper = this.$refs.swiper.$swiper;

    if (this._options.autoplay) {
      // 鼠标移入停止轮播
      this.$refs['xx-swiper'].addEventListener('mouseover', () => {
        this.swiper.autoplay.stop();
      });
      // 鼠标移出恢复轮播
      this.$refs['xx-swiper'].addEventListener('mouseout', () => {
        this.swiper.autoplay.start();
      });
    }
  },
  beforeDestroy() {},
  methods: {
    // 滑动到下一个滑块
    slideNext(speed, runCallbacks) {
      this.swiper.slideNext(speed, runCallbacks);
    },
    // 滑动到上一个滑块
    slidePrev(speed, runCallbacks) {
      this.swiper.slidePrev(speed, runCallbacks);
    },
    // 切换到指定 slide
    slideTo(index, speed, runCallbacks) {
      this.swiper.slideTo(index, speed, runCallbacks);
    },
    // 切换到指定 slide (loop模式)
    slideToLoop(index, speed, runCallbacks) {
      this.swiper.slideToLoop(index, speed, runCallbacks);
    },
    // 销毁 Swiper
    destroy(deleteInstance, cleanupStyles) {
      this.swiper.destroy(deleteInstance, cleanupStyles);
    },
    // 返回实时的 wrapper 位移
    getTranslate() {
      this.swiper.getTranslate();
    },
    // 设置 wrapper 的位移
    setTranslate(translate) {
      this.swiper.setTranslate(translate);
    },
    // 重新计算 Swiper 尺寸
    updateSize() {
      this.swiper.updateSize();
    },
    // 重新计算 Swiper 数量
    updateSlides() {
      this.swiper.updateSlides();
    },
    // 重新计算 Swiper 的 progress 值
    updateProgress() {
      this.swiper.updateProgress();
    },
    // 更新 slides 和 bullets 的 active/prev/next 类名
    updateSlidesClasses() {
      this.swiper.updateSlidesClasses();
    },
    // 更新Swiper，就像重新初始化一样
    // 这个方法包含了 updateContainerSize, updateSlidesSize, updateProgress, updateClasses 方法
    update(updateTranslate) {
      this.swiper.update(updateTranslate);
    },
    // 移除所有监听事件
    detachEvents() {
      this.swiper.detachEvents();
    },
    // 重新绑定所有监听事件
    attachEvents() {
      this.swiper.attachEvents();
    },
    // 添加 slide 到 slides 的结尾
    appendSlide(slides) {
      this.swiper.appendSlide(slides);
    },
    // 添加 slide 到 slides 的开头
    prependSlide(slides) {
      this.swiper.prependSlide(slides);
    },
    // 在指定位置增加 slide
    addSlide(index, slides) {
      this.swiper.addSlide(index, slides);
    },
    // 移除索引为 index 的 slide
    removeSlide(index) {
      this.swiper.removeSlide(index);
    },
    // 移除所有 slides
    removeAllSlides() {
      this.swiper.removeAllSlides();
    },
    // 添加回调函数或者事件句柄
    on(event, handler) {
      this.swiper.on(event, handler);
    },
    // 添加回调函数或者事件句柄, 这些事件只会执行一次
    once(event, handler) {
      this.swiper.once(event, handler);
    },
    // 移除事件的所有句柄或某个回调/事件
    off(event, handler) {
      this.swiper.off(event, handler);
    },
    // 开启鼠标的抓手形状
    setGrabCursor() {
      this.swiper.setGrabCursor();
    },
    // 关闭鼠标的抓手形状
    unsetGrabCursor() {
      this.swiper.unsetGrabCursor();
    },
    // 当 autoHeight 为启用状态，设置更新 swiper 高度的时间
    updateAutoHeight(speed) {
      this.swiper.updateAutoHeight(speed);
    },
    // 使得 Swiper 贴合边缘
    slideToClosest(speed, runCallbacks) {
      this.swiper.slideToClosest(speed, runCallbacks);
    },
    // 动态改变切换方向
    changeDirection(direction) {
      this.swiper.changeDirection(direction);
    },
    // 对Swiper 的Wrapper 进行自定义的 CSS3 位移动画
    translateTo(translate, speed, runCallbacks, translateBounds) {
      this.swiper.translateTo(translate, speed, runCallbacks, translateBounds);
    }
  }
};
</script>

<style scoped lang="less">
.xx-swiper {
  .swiper-container {
    width: 100%;
    height: 100%;
  }
}
</style>
