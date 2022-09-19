<!--
 * @Author: shenxh
 * @Date: 2020-09-04 17:53:50
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-19 13:48:08
 * @Description: Swiper-基础
-->

<template>
  <div class="swiper admin-content">
    <div class="swiper-wrap">
      <!-- 横向滚动 -->
      <div class="swiper-item">
        <xx-swiper
          ref="swiper-horizontal"
          :swiper-data="swiperData"
          @slide-change="slideChangeHor"
        >
          <template v-slot="{ item, index }">
            <div
              class="swiper-item-content"
              :class="item.value % 2 === 0 ? 'bg-lightblue' : 'bg-lightcoral'"
            >
              <span>{{ item.label }}</span>
            </div>
          </template>
        </xx-swiper>
        <i
          class="swiper-btn prev el-icon-arrow-left"
          @click="$refs['swiper-horizontal'].slidePrev()"
        ></i>
        <i
          class="swiper-btn next el-icon-arrow-right"
          @click="$refs['swiper-horizontal'].slideNext()"
        ></i>
      </div>
      <!-- 纵向滚动 -->
      <div class="swiper-item">
        <xx-swiper
          ref="swiper-vertical"
          :swiper-data="swiperData"
          :options="{ centeredSlides: false, direction: 'vertical' }"
        >
          <template v-slot="{ item, index }">
            <div
              class="swiper-item-content"
              :class="item.value % 2 === 0 ? 'bg-lightblue' : 'bg-lightcoral'"
            >
              <span>{{ item.label }}</span>
            </div>
          </template>
        </xx-swiper>
      </div>
      <!-- 缩略图 -->
      <div class="swiper-item">
        <div class="swiper-main">
          <xx-swiper
            ref="swiper-thumbs"
            :swiper-data="swiperData"
            :show-pagination="false"
            :options="{
              slidesPerView: 1,
              centeredSlides: false,
              loop: false,
            }"
            @slide-change="slideChangeThumbs"
          >
            <template v-slot="{ item, index }">
              <div
                class="swiper-item-content"
                :class="item.value % 2 === 0 ? 'bg-lightblue' : 'bg-lightcoral'"
              >
                <span>{{ item.label }}</span>
              </div>
            </template>
          </xx-swiper>
          <i
            class="swiper-btn prev el-icon-arrow-left"
            @click="$refs['swiper-thumbs'].slidePrev()"
          ></i>
          <i
            class="swiper-btn next el-icon-arrow-right"
            @click="$refs['swiper-thumbs'].slideNext()"
          ></i>
        </div>
        <div class="swiper-sider">
          <xx-swiper
            ref="swiper-sider"
            :swiper-data="swiperData"
            :show-pagination="false"
            :options="{
              centeredSlides: false,
              direction: 'vertical',
              autoplay: false,
              loop: false,
              mousewheel: true,
              speed: 0,
            }"
          >
            <template v-slot="{ item, index }">
              <div
                class="swiper-item-content"
                :class="{
                  'bg-lightblue': item.value % 2 === 0,
                  'bg-lightcoral': item.value % 2 === 1,
                  'bg-lightyellow': index === thumbsMainIdx,
                }"
                @click="handleSwiperSider(item, index)"
              >
                <span>{{ item.label }}</span>
              </div>
            </template>
          </xx-swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XxSwiper from '@/components/swiper';

export default {
  name: 'swiper',
  components: {
    XxSwiper,
  },
  props: {},
  data() {
    return {
      realIndex: 0,
      thumbsMainIdx: 0,
      thumbsSiderIdx: 0,
    };
  },
  computed: {
    swiperData() {
      let arr = [];

      for (let i = 1; i <= 20; i++) {
        arr.push({
          label: `slider${i}`,
          value: i,
        });
      }

      return arr;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    slideChangeHor(swiper) {
      this.realIndex = swiper.realIndex;
    },
    slideChangeThumbs(swiper) {
      this.thumbsMainIdx = swiper.realIndex;
      this.$refs['swiper-sider'].slideTo(swiper.realIndex - 1);
    },
    handleSwiperSider(item, index) {
      this.thumbsSiderIdx = index;
      this.$refs['swiper-thumbs'].slideTo(index);
      this.$refs['swiper-sider'].slideTo(index - 1);
    },
  },
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
      position: relative;
      display: flex;
      justify-content: space-between;
      height: 49%;
      border-bottom: 1px solid #efefef;
      &:not(:last-child) {
        margin-bottom: 1%;
      }
      .swiper-main {
        position: relative;
        width: 70%;
      }
      .swiper-sider {
        width: 29%;
        .swiper-item-content {
          cursor: pointer;
        }
      }
      .swiper-item-content {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 30px;
        &.bg-lightblue {
          background-color: lightblue;
        }
        &.bg-lightcoral {
          background-color: lightcoral;
        }
        &.bg-lightyellow {
          background-color: lightgreen;
        }
      }
      .swiper-btn {
        position: absolute;
        top: 50%;
        font-size: 50px;
        color: #999;
        transform: translate(0, -50%);
        cursor: pointer;
        z-index: 9;
        &:hover {
          color: #333;
        }
        &.prev {
          left: 20px;
        }
        &.next {
          right: 20px;
        }
      }
    }
  }
}
</style>
