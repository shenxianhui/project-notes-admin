<!--
 * @Author: shenxh
 * @Date: 2020-09-04 17:54:51
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-21 17:40:06
 * @Description: 组件-Swiper
-->

<template>
  <div class="xx-swiper" :style="{ width, height }">
    <swiper class="xx-swiper-wrap" ref="swiper" :style="{ width, height }" :options="options">
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
    }
  },
  data() {
    return {
      options: {
        navigation: {
          nextEl: '.xx-swiper-next',
          prevEl: '.xx-swiper-prev'
        },
        slidesPerView: 5,
        centeredSlides: true,
        watchSlidesProgress: true,
        loop: true, // 循环
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        speed: 1500, // 滑动速度
        grabCursor: true // 鼠标拖动
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.swiper.$swiper;
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
