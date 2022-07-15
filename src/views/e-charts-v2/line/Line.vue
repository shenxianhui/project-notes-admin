<!--
 * @Description: [Demo]折线图
 * @Author: shenxh
 * @Date: 2022-07-11 09:30:22
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-15 10:14:33
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

let timer = null;

export default {
  name: 'dm-line',
  components: {
    XxLine,
  },
  props: {},
  data() {
    return {
      option: {
        series: [],
      },
      chartData: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initData();
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    initData() {
      this.clearTimer();
      this.getChartData();

      timer = setInterval(() => {
        this.getChartData();
      }, 2000);
    },

    getChartData() {
      let data1 = [];
      let data2 = [];
      let data3 = [];

      for (let i = 0; i < 10; i++) {
        data1.push({
          name: 'X' + i,
          value: Math.round(Math.random() * 1000),
        });
        data2.push({
          name: 'X' + i,
          value: Math.round(Math.random() * 1000),
        });
        data3.push({
          name: 'X' + i,
          value: Math.round(Math.random() * 1000),
        });
      }

      this.option.series = [
        {
          name: '折线1',
          data: data1,
        },
        {
          name: '折线2',
          data: data2,
        },
        {
          name: '折线3',
          data: data3,
        },
      ];

      this.$refs['xx-line'].setOption();
    },

    clearTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
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
