<!--
 * @Author: shenxh
 * @Date: 2020-09-11 11:31:30
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-14 09:51:13
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
        code: '000000'
      },
      seriesData: []
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
  created() {
    this._getSeriesData();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    _getSeriesData() {
      // level: 0世界 1中国 2省 3市 4区
      const { code, level } = this.area;

      if (level === 0) return;
      if (level === 1) {
        this.seriesData = this.mockSeriesData;
      } else {
        this.mockSeriesData.forEach(item => {
          if (level === 2 && item.code === code) {
            this.seriesData = item.children;
          }
          if (level === 3 && item.code.slice(0, 2) === code.slice(0, 2) && item.children) {
            item.children.forEach(item1 => {
              if (item1.code === code) {
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
