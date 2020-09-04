<!--
 * @Author: shenxh
 * @Date: 2020-09-04 17:53:50
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-04 18:30:38
 * @Description: Swiper-普通
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
import XxSwiper from '@/components/swiper/Swiper';

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
      border-bottom: 1px solid #efefef;
    }
  }
}
</style>
