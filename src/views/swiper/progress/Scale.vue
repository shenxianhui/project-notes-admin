<!--
 * @Author: shenxh
 * @Date: 2020-06-30 17:43:11
 * @LastEditors: shenxh
 * @LastEditTime: 2020-07-13 16:17:26
 * @Description: swiper-scale
-->

<template>
  <div class="swiper-scale">
    <div class="xx-swiper" ref="xx-swiper">
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
  props: {},
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
.swiper-scale {
  position: relative;
  width: 100%;
  height: 300px;
  .xx-swiper {
    margin: 0 auto;
    width: 1000px;
    height: 100%;
    .swiper {
      width: 100%;
      height: 100%;
      .swiper-wrapper {
        .swiper-slide {
          /* 中间 */
          &.swiper-slide-active {
            .content {
              transform: scale(0.9);
              .content-wrap {
                transform: none;
                width: 100%;
                margin: 0;
              }
            }
          }
          /* 左一 */
          &.swiper-slide-prev {
            .content {
              transform: scale(0.9);
              .content-wrap {
                transform: rotateY(-40deg);
                transform-origin: right;
                width: 120%;
              }
            }
          }
          /* 右一 */
          &.swiper-slide-next {
            .content {
              transform: scale(0.9);
              .content-wrap {
                transform: rotateY(40deg);
                transform-origin: left;
                width: 120%;
                margin: 0;
                margin-left: 15%;
              }
            }
            /* 右二 */
            & + .swiper-slide {
              .content {
                transform: scale(0.75);
                .content-wrap {
                  transform: rotateY(40deg);
                  transform-origin: left;
                  width: 120%;
                  margin-left: 15%;
                }
              }
            }
          }
          /* 左二 */
          .content {
            transition: all 0.8s;
            transform: scale(0.75);
            height: 100%;
            perspective: 1000px; // 设置从何处查看一个元素的角度
            .content-wrap {
              transition: all 0.8s;
              transform: rotateY(-40deg);
              transform-origin: right;
              height: 100%;
              background-color: lightblue;
              border: 1px solid #999;
              width: 120%;
              margin-left: -35%;
            }
          }
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
