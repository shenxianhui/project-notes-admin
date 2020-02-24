<!--
 * @Author: Shen Xianhui
 * @Date: 2019-06-14 09:34:37
 * @LastEditors: Wells
 * @LastEditTime: 2020-02-23 10:11:50
 * @Description: 图表
 -->
<template>
  <div class="chart">
    <div class="wrap">
      <div class="chart-inner">
        <!-- 柱状折线图 -->
        <xx-bar-line
          id="bar-line"
          ref="bar-line"
          :legend-data="barOption.legendData"
          :series-color="barOption.seriesColor"
          :series-type="barOption.seriesType"
          :series-data-bar="mapData"
          :series-data-line="mapData"
          :series-data-line-a="mapData"
          @click="handleClickBar"
        >
        </xx-bar-line>
      </div>
      <div class="chart-inner">
        <!-- 饼图 -->
        <xx-pie id="pie" ref="pie" :series-data="mapData" @click="handleClickPie"> </xx-pie>
      </div>
    </div>
    <div class="wrap">
      <!-- 地图 -->
      <xx-map
        id="map"
        ref="map"
        :area-code="mapOption.areaCode"
        :area-level="mapOption.areaLevel"
        :area-name="mapOption.areaName"
        :geo-regions="geoRegions"
        :map-data="mapData"
        @click="handleClickMap"
        @back="handleBackMap"
      >
      </xx-map>
    </div>
    <div class="select">
      <el-select v-model="selectVal.seriesType" @change="handleDate" size="mini" style="width: 100px">
        <el-option v-for="item in dateOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <span>{{ selectVal.name }}</span>
    </div>
  </div>
</template>

<script>
import AreaCode from '@/data/map/area-code';
import XxBarLine from '@/components/echarts/BarLine';
import XxPie from '@/components/echarts/Pie';
import XxMap from '@/components/echarts/Map';

let seriesColor = {
  bar: ['#00C1DE99', '#0080DE0D'],
  line: ['#00C1DE99', '#0080DE0D', '#67C23A'],
  line1: ['#F56C6C99', '#F56C6C00', '#F56C6C']
};

export default {
  name: 'Chart',
  components: {
    XxBarLine,
    XxPie,
    XxMap
  },
  props: {},
  data() {
    return {
      // 选择框
      selectVal: {
        name: 'China',
        seriesType: 'bar'
      },
      // 选择框列表
      dateOptions: [
        {
          label: 'bar',
          value: 'bar'
        },
        {
          label: 'line',
          value: 'line'
        },
        {
          label: 'barLineA',
          value: 'barLineA'
        },
        {
          label: 'barLineB',
          value: 'barLineB'
        },
        {
          label: 'barLines',
          value: 'barLines'
        }
      ],
      // 柱状折线图
      barOption: {
        legendData: [],
        seriesColor: seriesColor,
        seriesType: 'bar',
        seriesDataBar: [],
        seriesDataLine: [],
        seriesDataLineA: []
      },
      // 地图
      mapOption: {
        areaName: ['China'], // 当前区域-名称
        areaCode: '0', // 当前区域-编号
        areaLevel: 'country' // 当前区域-层级
      },
      geoRegions: [], // 在地图中对特定的区域配置样式
      mapData: [] // 地图数据
    };
  },
  computed: {},
  watch: {},
  created() {
    this.mockData();
  },
  mounted() {
    this.handleDate();
  },
  methods: {
    // 选择图表类型
    handleDate() {
      // 清空选中的柱状图
      this.barOption.seriesDataBar.forEach(item => {
        if (item.selected) {
          item.selected = false;
          this.selectVal.name = '';
        }
        if (item.itemStyle && item.itemStyle.opacity) {
          item.itemStyle.opacity = 1;
        }
      });

      switch (this.selectVal.seriesType) {
        case 'bar':
          this.barOption.seriesType = 'bar';

          this.barOption.legendData = ['bar'];
          seriesColor.bar = ['#00C1DE99', '#0080DE0D'];
          break;
        case 'line':
          this.barOption.seriesType = 'line';

          this.barOption.legendData = ['line'];
          seriesColor.line = ['#00C1DE99', '#0080DE0D', '#00C1DE'];
          break;
        case 'barLineA':
          this.barOption.seriesType = 'barLine';

          this.barOption.legendData = ['bar', 'line'];
          seriesColor.line = ['#00C1DE99', '#0080DE0D', '#67C23A'];
          break;
        case 'barLineB':
          this.barOption.seriesType = 'barLine';

          this.barOption.legendData = ['bar', 'line2'];
          seriesColor.line = ['#00C1DE99', '#0080DE0D', '#F56C6C'];
          break;
        case 'barLines':
          this.barOption.seriesType = 'barLines';

          this.barOption.legendData = ['bar', 'line1', 'line2'];
          seriesColor.line = ['#00C1DE99', '#0080DE0D', '#67C23A'];
          seriesColor.line1 = ['#00C1DE99', '#0080DE0D', '#F56C6C'];
          break;
      }

      // 解决图表数据没有及时更新BUG
      setTimeout(() => {
        this.$refs['bar-line'].initChart();
      }, 0);
    },

    // 柱状图-点击
    handleClickBar(e) {
      this.handleChar(e);
    },

    // 饼图-点击
    handleClickPie(e) {
      this.handleChar(e);
    },

    // 地图-点击
    handleClickMap(e) {
      this.handleChar(e);
    },

    // 点击图表
    handleChar(e) {
      this.selectVal.name = e.name;
      this.mapOption.areaCode = e.data.code;

      // 当前地区层级
      switch (this.mapOption.areaLevel) {
        // 国
        case 'country':
          this.mapOption.areaName[1] = e.name;
          this.mapOption.areaLevel = 'province';
          break;
        // 省
        case 'province':
          // 只允许加载浙江省
          if (e.data.code.slice(0, 2) !== '33') {
            this.$message.warning('对不起, 仅开放浙江省区域~');
            return;
          }

          this.mapOption.areaName[2] = e.name;
          this.mapOption.areaLevel = 'city';
          break;
        // 市/区
        default:
          this.mapOption.areaName[3] = e.name;
          this.mapOption.areaLevel = 'area';
          break;
      }

      this.mockData();

      // 选中模式
      if (this.mapOption.areaLevel === 'area') {
        let regions = [];

        if (e.data.selected) {
          this.mapOption.areaLevel = 'city';
          --this.mapOption.areaName.length;
          this.selectVal.name = this.mapOption.areaName[this.mapOption.areaName.length - 1];

          this.mapData.forEach(item => {
            Object.assign(item, { selected: false, itemStyle: { opacity: 1 } });
            regions.push({
              name: item.name,
              itemStyle: { opacity: 1 }
            });
          });
        } else {
          this.mapData.forEach(item => {
            if (e.name === item.name) {
              Object.assign(item, { selected: true, itemStyle: { opacity: 1 } });
              regions.push({
                name: item.name,
                itemStyle: { opacity: 1 }
              });
            } else {
              Object.assign(item, { selected: false, itemStyle: { opacity: 0.2 } });
              regions.push({
                name: item.name,
                itemStyle: { opacity: 0.2 }
              });
            }
          });
        }

        this.geoRegions = regions;
      }

      setTimeout(() => {
        this.$refs['map'].initMap();
        this.$refs['pie'].initChart();
        this.$refs['bar-line'].initChart();
      }, 30);
    },

    // 地图-返回
    handleBackMap() {
      --this.mapOption.areaName.length;
      this.geoRegions = [];
      this.selectVal.name = this.mapOption.areaName[this.mapOption.areaName.length - 1];

      // 当前地区层级
      switch (this.mapOption.areaLevel) {
        case 'province': // 省
          this.mapOption.areaLevel = 'country';
          this.mapOption.areaCode = '1';
          break;
        case 'city': // 市
          this.mapOption.areaLevel = 'province';
          this.mapOption.areaCode = `${this.mapOption.areaCode.slice(0, 2)}`;
          break;
        case 'area': // 区
          this.mapOption.areaLevel = 'city';
          this.mapOption.areaCode = `${this.mapOption.areaCode.slice(0, 4)}`;
          break;
      }
      this.mockData();

      setTimeout(() => {
        this.$refs['map'].initMap();
        this.$refs['bar-line'].initChart();
        this.$refs['pie'].initChart();
      }, 0);
    },

    // 模拟数据
    mockData() {
      let areaList = [];

      switch (this.mapOption.areaLevel) {
        case 'country':
          AreaCode.forEach(province => {
            // 使之 name 与地图对应
            let obj = {
              name:
                province.name === '内蒙古自治区' || province.name === '黑龙江省'
                  ? province.name.slice(0, 3)
                  : province.name.slice(0, 2),
              code: province.code,
              value: Math.round(Math.random() * 10000 + 5000)
            };

            areaList.push(obj);
          });
          break;
        case 'province':
          AreaCode.forEach(province => {
            if (province.code === this.mapOption.areaCode) {
              province.children.forEach(city => {
                let obj = {
                  name: city.name,
                  code: city.code,
                  value: Math.round(Math.random() * 1000 + 500)
                };

                areaList.push(obj);
              });
            }
          });
          break;
        default:
          AreaCode.forEach(province => {
            if (province.code === this.mapOption.areaCode.slice(0, 2)) {
              province.children.forEach(city => {
                if (city.code === this.mapOption.areaCode.slice(0, 4)) {
                  city.children.forEach(area => {
                    let obj = {
                      name: area.name,
                      code: area.code,
                      value: Math.round(Math.random() * 100 + 50)
                    };

                    areaList.push(obj);
                  });
                }
              });
            }
          });
          break;
      }

      // areaList.sort((a, b) => b['value'] - a['value']); // 降序
      this.mapData = areaList;
    }
  }
};
</script>

<style scoped lang="less">
.chart {
  position: relative;
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  height: 100%;
  .wrap {
    display: flex;
    flex-direction: column;

    width: 50%;
    height: 100%;
    .chart-inner {
      width: 100%;
      height: 50%;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
  }
  .select {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
  }
}
</style>
