<!--
 * @Author: shenxh
 * @Date: 2020-09-04 17:54:51
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-04 18:32:42
 * @Description: 组件-Swiper
-->

<template>
  <div class="xx-swiper" :style="{ width: width, height: height }">
    <div class="swiper-scale" ref="xx-swiper">
      <swiper class="swiper" ref="swiper" :options="swiperOptions">
        <swiper-slide v-for="item in 10" :key="item" ref="swiper-slide">
          <div class="content">
            <div class="content-wrap">
              {{ item }}
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="button prev" slot="button-prev">上一页</div>
    <div class="button next" slot="button-next">下一页</div>
  </div>
</template>

<script>
export default {
  name: 'swiper-scale',
  props: {
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '100px'
    }
  },
  data() {
    return {
      swiperOptions: {
        navigation: {
          nextEl: '.next',
          prevEl: '.prev'
        },
        slidesPerView: 5,
        centeredSlides: true,
        watchSlidesProgress: true,
        loop: true, // 循环
        autoplay: {
          delay: 200000,
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
  mounted() {
    this.$refs['xx-swiper'].addEventListener('mouseover', () => {
      this.swiper.autoplay.stop();
    });
    this.$refs['xx-swiper'].addEventListener('mouseout', () => {
      this.swiper.autoplay.start();
    });
  },
  beforeDestroy() {},
  methods: {}
};
</script>

<style scoped lang="less">
.xx-swiper {
  display: inline-block;
  position: relative;
  .swiper-scale {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    .swiper {
      width: 100%;
      height: 100%;
    }
  }
  .button {
    position: absolute;
    top: 50%;
    transform: translate(0 -50%);
    cursor: pointer;
    &.prev {
      left: 80px;
    }
    &.next {
      right: 80px;
    }
  }
}
</style>
