<!--
 * @Author: shenxh
 * @Date: 2020-09-04 17:53:50
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-21 17:58:49
 * @Description: Swiper-缩放
-->

<template>
  <div class="swiper admin-content">
    <div class="swiper-wrap">
      <div class="swiper-item">
        <xx-swiper :swiper-data="swiperData">
          <template v-slot="{ data }">
            <div class="swiper-item-content">
              <div class="swiper-item-content-wrap">{{ data.label }}</div>
            </div>
          </template>
        </xx-swiper>
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
    return {
      swiperData: [
        {
          label: '第1个',
          value: 1
        },
        {
          label: '第2个',
          value: 2
        },
        {
          label: '第3个',
          value: 3
        },
        {
          label: '第4个',
          value: 4
        },
        {
          label: '第5个',
          value: 5
        },
        {
          label: '第6个',
          value: 6
        },
        {
          label: '第7个',
          value: 7
        },
        {
          label: '第8个',
          value: 8
        }
      ]
    };
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
        .xx-swiper-wrap {
          .swiper-wrapper {
            .swiper-slide {
              /* 中间 */
              &.swiper-slide-active {
                .swiper-item-content {
                  transform: scale(0.9);
                  .swiper-item-content-wrap {
                    transform: none;
                    width: 100%;
                    margin: 0;
                  }
                }
              }
              /* 左一 */
              &.swiper-slide-prev {
                .swiper-item-content {
                  transform: scale(0.9);
                  .swiper-item-content-wrap {
                    transform: rotateY(-40deg);
                    transform-origin: right;
                    width: 120%;
                  }
                }
              }
              /* 右一 */
              &.swiper-slide-next {
                .swiper-item-content {
                  transform: scale(0.9);
                  .swiper-item-content-wrap {
                    transform: rotateY(40deg);
                    transform-origin: left;
                    width: 120%;
                    margin: 0;
                    margin-left: 15%;
                  }
                }
                /* 右二 */
                & + .swiper-slide {
                  .swiper-item-content {
                    transform: scale(0.75);
                    .swiper-item-content-wrap {
                      transform: rotateY(40deg);
                      transform-origin: left;
                      width: 120%;
                      margin-left: 15%;
                    }
                  }
                }
              }
              /* 左二 */
              .swiper-item-content {
                transition: all 0.8s;
                transform: scale(0.75);
                height: 100%;
                perspective: 1000px; // 设置从何处查看一个元素的角度
                .swiper-item-content-wrap {
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
</style>
