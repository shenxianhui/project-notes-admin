<!--
 * @Author: shenxh
 * @Date: 2020-08-25 18:24:28
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-21 09:20:08
 * @Description: 雷达图
-->

<template>
  <div class="chart-radar admin-content">
    <div class="chart-radar-wrap">
      <!-- 雷达图 -->
      <div class="chart-radar-item">
        <xx-radar
          title-text="雷达图"
          :radar-indicator="radarIndicator"
          :series-data="chartData"
        ></xx-radar>
      </div>
    </div>
  </div>
</template>

<script>
import XxRadar from '@/components/e-charts/radar';

let timer;

export default {
  name: 'chart-radar',
  components: {
    XxRadar,
  },
  props: {},
  data() {
    return {
      chartData: [],
      radarIndicator: [],
    };
  },
  computed: {
    getMaxData() {
      let maxNum = 0;
      this.chartData.forEach(item => {
        if (item.value > maxNum) {
          maxNum = item.value;
        }
      });

      return maxNum;
    },
  },
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
      let IndicatorList = [];

      for (let i = 0; i < 10; i++) {
        list.push(Math.round(Math.random() * 1000));
        IndicatorList.push({
          name: 'X' + i,
          max: 1000,
        });
      }

      this.chartData = [
        {
          name: '数据1',
          value: list,
        },
      ];
      this.radarIndicator = IndicatorList;
    },
    _clearTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    },
  },
};
</script>

<style scoped lang="less">
.chart-radar {
  .chart-radar-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    min-height: 100%;
    border: 1px solid #efefef;
    overflow: auto;
    .chart-radar-item {
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
