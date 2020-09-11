<!--
 * @Author: shenxh
 * @Date: 2020-08-25 18:24:28
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-11 16:15:36
 * @Description: 饼图
-->

<template>
  <div class="chart-pie admin-content">
    <div class="chart-pie-wrap">
      <!-- 饼图 -->
      <div class="chart-pie-item">
        <xx-pie title-text="饼图" :series-data="chartData"></xx-pie>
      </div>
      <!-- 环形图 -->
      <div class="chart-pie-item">
        <xx-pie
          title-text="环形图"
          :series="{ radius: ['50%', '75%'] }"
          :series-data="chartData"
        ></xx-pie>
      </div>
      <!-- 玫瑰图 -->
      <div class="chart-pie-item">
        <xx-pie title-text="玫瑰图" :series="{ roseType: true }" :series-data="chartData"></xx-pie>
      </div>
    </div>
  </div>
</template>

<script>
import XxPie from '@/components/e-charts/pie';

let timer;

export default {
  name: 'chart-pie',
  components: {
    XxPie
  },
  props: {},
  data() {
    return {
      chartData: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this._clearTimer();
    this._getChartData();
    timer = setInterval(() => {
      this._getChartData();
    }, 5000);
  },
  mounted() {},
  beforeDestroy() {
    this._clearTimer();
  },
  methods: {
    _getChartData() {
      let list = [];
      for (let i = 0; i < 10; i++) {
        list.push({
          name: 'X' + i,
          value: Math.round(Math.random() * 1000)
        });
      }

      this.chartData = list.sort((a, b) => {
        return a.value - b.value;
      });
    },
    _clearTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
  }
};
</script>

<style scoped lang="less">
.chart-pie {
  .chart-pie-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    min-height: 100%;
    border: 1px solid #efefef;
    overflow: auto;
    .chart-pie-item {
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
