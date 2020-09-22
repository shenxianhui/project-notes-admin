<!--
 * @Author: shenxh
 * @Date: 2020-09-04 17:53:50
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-22 17:56:51
 * @Description: Swiper-基础
-->

<template>
  <div class="swiper admin-content">
    <div class="swiper-wrap">
      <!-- 横向滚动 -->
      <div class="swiper-item">
        <xx-swiper
          ref="swiper"
          :swiper-data="swiperData"
          @slide-change="realIndex = $event.realIndex"
        >
          <template v-slot="{ data }">
            <div
              class="swiper-item-content"
              :class="data.value % 2 === 0 ? 'bg-lightblue' : 'bg-lightcoral'"
            >
              <span>{{ data.label }}</span>
            </div>
          </template>
        </xx-swiper>
        <i class="swiper-btn prev el-icon-arrow-left" @click="$refs.swiper.slidePrev()"></i>
        <i class="swiper-btn next el-icon-arrow-right" @click="$refs.swiper.slideNext()"></i>
        <ul class="pagination">
          <li
            v-for="(item, index) in swiperData"
            :key="index"
            :class="{ active: index === realIndex }"
            @click="handlePage(item, index)"
          ></li>
        </ul>
      </div>
      <!-- 纵向滚动 -->
      <div class="swiper-item">
        <xx-swiper
          :swiper-data="swiperData"
          :options="{ centeredSlides: false, direction: 'vertical' }"
        >
          <template v-slot="{ data }">
            <div
              class="swiper-item-content"
              :class="data.value % 2 === 0 ? 'bg-lightblue' : 'bg-lightcoral'"
            >
              <span>{{ data.label }}</span>
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
      realIndex: 0,
      currentSwiper: {}
    };
  },
  computed: {
    swiperData() {
      let arr = [];

      for (let i = 1; i <= 20; i++) {
        arr.push({
          label: `slider${i}`,
          value: i
        });
      }

      return arr;
    }
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    handlePage(item, index) {
      this.$refs.swiper.slideToLoop(index, 500);
      this.currentSwiper = item;
    }
  }
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
      height: 49%;
      border-bottom: 1px solid #efefef;
      &:not(:last-child) {
        margin-bottom: 1%;
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
      .pagination {
        position: absolute;
        display: flex;
        left: 50%;
        bottom: 20px;
        transform: translate(-50%, 0);
        z-index: 9;
        li {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.3);
          cursor: pointer;
          &:not(:last-child) {
            margin-right: 5px;
          }
          &:hover {
            background-color: rgba(0, 0, 0, 0.5);
          }
          &.active {
            background-color: rgb(255, 255, 255, 0.3);
          }
        }
      }
    }
  }
}
</style>
