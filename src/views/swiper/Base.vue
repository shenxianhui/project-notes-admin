<!--
 * @Author: shenxh
 * @Date: 2020-09-04 17:53:50
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-21 17:55:05
 * @Description: Swiper-基础
-->

<template>
  <div class="swiper admin-content">
    <div class="swiper-wrap">
      <div class="swiper-item">
        <xx-swiper :swiper-data="swiperData">
          <template v-slot="{ data }">
            <div
              class="swiper-item-content"
              :class="data.value % 2 === 0 ? 'bg-lightblue' : 'bg-lightcoral'"
            >
              <span>{{ data.label }}</span>
            </div>
          </template>
          <template v-slot:prev>
            <i class="xx-swiper-btn xx-swiper-prev el-icon-arrow-left"></i>
          </template>
          <template v-slot:next>
            <i class="xx-swiper-btn xx-swiper-next el-icon-arrow-right"></i>
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
      border-bottom: 1px solid #efefef;
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
      .xx-swiper-btn {
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
        &.xx-swiper-prev {
          left: 20px;
        }
        &.xx-swiper-next {
          right: 20px;
        }
      }
    }
  }
}
</style>
