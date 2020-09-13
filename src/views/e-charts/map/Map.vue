<!--
 * @Author: shenxh
 * @Date: 2020-09-11 11:31:30
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-13 10:33:13
 * @Description: 地图
-->

<template>
  <div class="chart-map admin-content">
    <div class="chart-map-wrap">
      <div class="chart-map-item">
        <xx-map :area="area" :series-data="getSeriesData"></xx-map>
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
      }
    };
  },
  computed: {
    getSeriesData() {
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
      handler(val) {
        console.log(val);
        console.log(this.getSeriesData);
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    // _getSeriesData(code) {
    //   let list = [];
    //   if (!code) {
    //     AreaCode.forEach(item => {
    //       list.push(
    //         Object.assign(item, {
    //           value: Math.round(Math.random() * 1000)
    //         })
    //       );
    //     });
    //   } else {
    //   }
    //   this.seriesData = list;
    //   return mockData(AreaCode);
    // }
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
