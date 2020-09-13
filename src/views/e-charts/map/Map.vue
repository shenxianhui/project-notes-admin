<!--
 * @Author: shenxh
 * @Date: 2020-09-11 11:31:30
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-13 17:33:03
 * @Description: 地图
-->

<template>
  <div class="chart-map admin-content">
    <div class="chart-map-wrap">
      <div class="chart-map-item">
        <xx-map :area="area" :series-data="seriesData || mockSeriesData"></xx-map>
      </div>
    </div>
  </div>
</template>

<script>
import AreaCode from '@/data/area/area-code';
import XxMap from '@/components/e-charts/map';

export default {
  name: 'chart-map',
  components: {
    XxMap
  },
  props: {},
  data() {
    return {
      area: {
        code: '100000'
      },
      seriesData: null
    };
  },
  computed: {
    mockSeriesData() {
      const mockData = list => {
        return list.map(item => {
          // 不够6位的末尾补0
          for (let i = 0; i < 6; i++) {
            if (item.code && item.code.length < 6) {
              item.code += '0';
            }
          }
          return Object.assign(item, {
            value: Math.round(Math.random() * 1000),
            children: item.children && item.children.length ? mockData(item.children) : null
          });
        });
      };

      return mockData(AreaCode);
    }
  },
  watch: {
    area: {
      handler() {
        this._getSeriesData();
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    _getSeriesData() {
      let level;
      let areaCode = this.area.code;

      if (areaCode / 10000 === parseInt(areaCode / 10000)) {
        level = 1; // 省
      } else if (areaCode / 100 === parseInt(areaCode / 100)) {
        level = 2; // 市
      } else {
        level = 3; // 区
      }

      if (areaCode === '100000') {
        this.seriesData = this.mockSeriesData;
      } else {
        this.mockSeriesData.forEach(item => {
          if (level === 1 && item.code === areaCode) {
            this.seriesData = item.children;
          }
          if (level === 2 && item.code.slice(0, 2) === areaCode.slice(0, 2) && item.children) {
            item.children.forEach(item1 => {
              if (item1.code === areaCode) {
                this.seriesData = item1.children;
              }
            });
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.chart-map {
  .chart-map-wrap {
    height: 100%;
    .chart-map-item {
      height: 100%;
      background-color: #3074da;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
