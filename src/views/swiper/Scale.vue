<!--
 * @Author: shenxh
 * @Date: 2020-09-04 17:53:50
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-04 18:30:51
 * @Description: Swiper-缩放
-->

<template>
  <div class="swiper admin-content">
    <div class="swiper-wrap">
      <div class="swiper-item">
        <xx-swiper width="100%" height="100%"></xx-swiper>
      </div>
    </div>
  </div>
</template>

<script>
import XxSwiper from '@/components/swiper';

export default {
  name: 'swiper',
  components: {
    XxSwiper
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
.swiper {
  .swiper-wrap {
    width: 100%;
    height: 100%;
    min-height: 100%;
    border: 1px solid #efefef;
    overflow: auto;
    .swiper-item {
      height: 50%;
      padding: 20px;
      border-bottom: 1px solid #efefef;
      /deep/ .xx-swiper {
        .swiper-scale {
          .swiper {
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
      }
    }
  }
}
</style>
