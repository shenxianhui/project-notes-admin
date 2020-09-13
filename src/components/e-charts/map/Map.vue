<!--
 * @Author: shenxh
 * @Date: 2020-09-12 08:52:18
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-13 18:04:10
 * @Description: 组件-地图
-->

<template>
  <div :id="id || myId" class="xx-map" :style="{ width, height }"></div>
</template>

<script>
import { uuid } from '@/utils/utils';
import { getAreaCode } from '@/utils/map';

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
    // 当前区域 (父组件只需传入编号 code 即可)
    area: {
      type: Object,
      default() {
        return {
          code: '100000'
        };
      }
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
      let areaCode = getAreaCode(this.currentArea.name, '100000');

      if (this.currentArea.name === 'China') {
        mapData = require('./data/100000');
      } else {
        mapData = require(`./data/${areaCode}`);
      }

      return mapData;
    },
    getMaxVisualMap() {
      let maxNum = 0;

      this.seriesData.forEach(item => {
        if (maxNum < item.value) {
          maxNum = item.value;
        }
      });
      if (String(maxNum).length <= 1) {
        maxNum = 10;
      } else {
        let powNum = Math.pow(10, String(maxNum).length - 2);
        maxNum = Math.ceil(maxNum / powNum) * powNum;
      }

      return maxNum;
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
          formatter(data) {
            if (!data) return;

            let str = '';

            if (data.seriesType === 'map') {
              str = `${data.name || data.data.name}: ${
                data.value || data.data ? data.data.value : '无数据'
              }`;
            }
            if (data.seriesType === 'scatter') {
              str = `${data.name || data.data.name}: ${data.value ? data.value[2] : '无数据'}`;
            }

            return str;
          }
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
          max: this.getMaxVisualMap,
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
          map: this.area.code === '100000' ? 'china' : '',
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
              type: 'radial',
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
                geoIndex: 0,
                data: this.seriesData.map(item => {
                  return {
                    caode: item.id,
                    name: item.properties ? item.properties.name : item.name || '', // 优先显示地图 name
                    value: item.value
                  };
                })
              },
              // 气泡
              {
                type: 'scatter',
                geoIndex: 0,
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: [70, 60],
                zlevel: 1,
                label: {
                  show: true,
                  color: '#00E0FF',
                  fontSize: 14,
                  formatter(data) {
                    return data.data.value[2];
                  }
                },
                itemStyle: {
                  color: '#fff',
                  opacity: 1
                },
                data: this.seriesData.map(item => {
                  return {
                    caode: item.id,
                    name: item.name || '', // 优先显示地图 name
                    value: item.cp ? [...item.cp, item.value] : [0, 0, 0],
                    label: {
                      color: item.value >= 500 ? '#FE5B5B' : '#00E0FF'
                    }
                  };
                })
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
      this._setOption();
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
        let areaCode = getAreaCode(evt.name);
        // this.area.code = areaCode;
        this.currentArea = evt;

        Object.assign(this.area, {
          code: areaCode,
          name: evt.name,
          data: evt.data || null
        });

        this.$emit('handle-area', { evt, areaCode });

        this.initChart();
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
    _setOption() {
      // 把地图数据坐标导入至 seriesData
      this.getMap.features.forEach(item => {
        this.seriesData.map(item1 => {
          if (
            item.id == getAreaCode(item1.name) ||
            item.properties.adcode == getAreaCode(item1.name)
          ) {
            return Object.assign(item1, {
              cp: item.properties.cp || item.properties.center,
              name: item.properties ? item.properties.name : item.name // 注: seriesData 的 name 必须与 地图中的 name 保持一致才会显示数据
            });
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="less"></style>
