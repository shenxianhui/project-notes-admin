<!--
 * @Description: [Demo]折线图
 * @Author: shenxh
 * @Date: 2022-07-11 09:30:22
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-12 17:21:57
-->

<template>
  <div class="dm-line admin-content">
    <div class="dm-line-wrap">
      <div class="dm-line-item">
        <xx-line ref="xx-line" :option="option"></xx-line>
      </div>
    </div>
  </div>
</template>

<script>
import XxLine from '@/components/e-charts-v2/line';

export default {
  name: 'dm-line',
  components: {
    XxLine,
  },
  props: {},
  data() {
    return {
      option: {
        series: [
          {
            data: [],
          },
        ],
      },
      chartData: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getChartData();
  },
  beforeDestroy() {},
  methods: {
    getChartData() {
      setTimeout(() => {
        const num = Math.random(0, 1) * 100;
        this.option.series[0].data = [
          {
            name: 'a',
            value: num,
          },
          {
            name: 'b',
            value: 30,
          },
          {
            name: 'c',
            value: 80,
          },
          {
            name: 'd',
            value: 60,
          },
          {
            name: 'e',
            value: 100,
          },
        ];

        this.$refs['xx-line'].setOption();
      }, 500);
    },
  },
};
</script>

<style lang="less" scoped>
.dm-line {
  .dm-line-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    min-height: 100%;
    border: 1px solid #efefef;
    overflow: auto;
    .dm-line-item {
      flex-shrink: 0;
      width: 33.3%;
      height: 50%;
      border-bottom: 1px solid #efefef;
      &:not(:nth-of-type(3n)) {
        border-right: 1px solid #efefef;
      }
    }
  }
}
</style>
