<!--
 * @Author: shenxh
 * @Date: 2020-09-12 08:52:18
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-12 19:48:49
 * @Description: 组件-地图
-->

<template>
  <div :id="id || myId" class="xx-map" :style="{ width, height }"></div>
</template>

<script>
import { uuid } from '@/utils/utils';
import { formatAreaCode } from '@/utils/map';

export default {
  name: 'xx-map',
  components: {},
  props: {
    id: [String, Number],
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    // 当前区域-编号
    areaCode: {
      type: String,
      default: '100000'
    },

    tooltip: Object,
    visualMap: Object,
    geo: Object,
    series: [Array, Object],
    seriesData: Array
  },
  data() {
    return {
      myId: uuid(),
      currentArea: {}
    };
  },
  computed: {
    getMap() {
      let mapData;
      let areaCode = this.getAreaCode(this.currentArea.name);

      if (this.currentArea.name === 'China') {
        mapData = require('./data/100000');
      } else {
        mapData = require(`./data/${areaCode}`);
      }

      return mapData;
    },
    option() {
      return {
        tooltip: this._tooltip,
        visualMap: this._visualMap,
        geo: this._geo,
        series: this._series
      };
    },
    _tooltip() {
      let tooltip = Object.assign(
        {
          formatter: '{b}: {c}'
        },
        this.tooltip
      );

      return tooltip;
    },
    _visualMap() {
      let visualMap = Object.assign(
        {
          show: true,
          right: 0,
          min: 0,
          max: 100,
          itemWidth: 10,
          itemHeight: 70,
          align: 'left',
          text: ['高', '低'],
          realtime: false,
          calculable: true,
          seriesIndex: 0,
          inRange: {
            color: ['#043E6D', '#00A2FF']
          },
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        this.visualMap
      );

      return visualMap;
    },
    _geo() {
      let geo = Object.assign(
        {
          show: true,
          map: this.areaCode === '100000' ? 'china' : '',
          roam: true, // 鼠标缩放+平移
          selectedMode: 'single', // 选中
          label: {
            show: true,
            fontSize: 12,
            color: '#fff',
            position: 'inside' // 注: 将地图 JSON 文件的 cp 坐标删掉才有效
          },
          itemStyle: {
            areaColor: {
              type: 'radial', // 径向渐变
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                // 0% 处的颜色
                {
                  offset: 0,
                  color: 'rgba(147, 235, 248, 0)'
                },
                // 100% 处的颜色
                {
                  offset: 1,
                  color: 'rgba(147, 235, 248, .2)'
                }
              ]
            },
            borderColor: 'rgba(147, 235, 248, 1)',
            borderWidth: 1,
            shadowColor: 'rgba(128, 217, 248, 1)',
            shadowBlur: 10,
            shadowOffsetX: -2,
            shadowOffsetY: 2
          },
          // 高亮状态
          emphasis: {
            label: {
              color: '#fff'
            },
            itemStyle: {
              areaColor: '#389BB7'
            }
          },
          regions: [] // 在地图中对特定的区域配置样式
        },
        this.geo
      );

      return geo;
    },
    _series() {
      let series =
        this.series && Array.isArray(this.series)
          ? this.series
          : [
              {
                type: 'map',
                // map: 'china',
                geoIndex: 0, // 共享 geo 样式
                data: this.mapData
              },
              // 气泡
              {
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: [70, 60],
                zlevel: 1,
                label: {
                  show: true,
                  color: '#00E0FF',
                  fontSize: 14,
                  formatter(value) {
                    return value.data.value[2];
                  }
                },
                itemStyle: {
                  color: '#fff',
                  opacity: 1
                },
                data: this.seriesData
              }
            ];

      return series;
    }
  },
  watch: {
    seriesData() {
      this.initChart();
    }
  },
  created() {},
  mounted() {
    window.addEventListener('resize', this.initChart);
    this.initChart();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initChart);
  },
  methods: {
    initChart() {
      this.setOption();
      this.destroyChart();

      let id = this.id || this.myId;
      let myChart = this.$echarts.init(document.getElementById(id));

      // 注册地图
      this.$echarts.registerMap(this._geo.map, this.getMap);

      // 设置配置项, 刷新图表
      myChart.setOption(this.option, true);

      // 点击事件
      myChart.off('click');
      myChart.on('click', evt => {
        console.log(evt);
        let areaCode = this.getAreaCode(evt.name);
        this.currentArea = evt;

        this.initChart();

        this.$emit('handle-area', evt);
        this.$emit('set-area-code', areaCode);

        console.log(this.areaCode);
      });
    },
    // 销毁图表实例
    destroyChart() {
      let id = this.id || this.myId;
      let chart = this.$echarts.getInstanceByDom(document.getElementById(id));

      if (chart) {
        chart.clear(); // 释放图形资源
        chart.dispose(); // 销毁实例对象
      }
    },
    // 数据处理
    setOption() {
      // 123
    },
    // 根据区域 name 获取 code
    getAreaCode(areaName) {
      let code = this.areaCode;

      if (areaName) {
        formatAreaCode.forEach(item => {
          if (item.name.includes(areaName.slice(0, 2))) {
            code = item.code;
          }
        });

        for (let i = 0; i < 6; i++) {
          if (code && code.length < 6) {
            code += '0';
          }
        }
      }

      return code;
    }
  }
};
</script>

<style scoped lang="less"></style>
