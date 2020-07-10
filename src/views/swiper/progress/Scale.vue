<!--
 * @Author: shenxh
 * @Date: 2020-06-30 17:43:11
 * @LastEditors: shenxh
 * @LastEditTime: 2020-07-10 16:27:48
 * @Description: swiper-scale
-->

<template>
  <div class="swiper-scale">
    <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="item in 10" :key="item" ref="swiper-slide">
        <div class="content">{{ item }}</div>
      </swiper-slide>
    </swiper>
    <div class="button prev" slot="button-prev" @click="prev()">上一页</div>
    <div class="button next" slot="button-next" @click="next()">下一页</div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

export default {
  name: 'swiper-scale',
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive,
    currentIdx: 0
  },
  props: {},
  data() {
    return {
      swiperOptions: {
        slidesPerView: 5,
        centeredSlides: true,
        watchSlidesProgress: true,
        loop: true, // 循环
        autoplay: {
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        speed: 1000, // 滑动速度
        grabCursor: true // 鼠标拖动
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  watch: {},
  created() {},
  mounted() {
    // this.swiper.slideTo(2, 1000, false);
  },
  beforeDestroy() {},
  methods: {
    // 手动实现左右按钮切换功能
    prev() {
      this.swiper.slidePrev();
    },
    next() {
      this.swiper.slideNext();
    }
  }
};
</script>

<style scoped lang="less">
.swiper-scale {
  position: relative;
  width: 100%;
  height: 300px;
  .swiper {
    width: 1000px;
    height: 100%;
    .swiper-wrapper {
      .swiper-slide {
        transition: all 0.8s;
        transform: scale(0.6);
        &.swiper-slide-active {
          transform: scale(1);
          margin: 0 20px;
        }
        &.swiper-slide-prev {
          transform: scale(0.8);
          margin-left: -20px;
        }
        &.swiper-slide-next {
          transform: scale(0.8);
          margin-right: -20px;
        }
        .content {
          height: 100%;
          background-color: lightblue;
          border: 1px solid #999;
        }
      }
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
