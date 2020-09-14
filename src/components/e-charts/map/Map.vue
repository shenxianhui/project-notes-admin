<!--
 * @Author: shenxh
 * @Date: 2020-09-12 08:52:18
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-14 09:51:04
 * @Description: 组件-地图
-->

<template>
  <div class="xx-map" :style="{ width, height }">
    <div :id="id || myId" class="xx-map-wrap" :style="{ width, height }"></div>
    <div class="xx-map-back" @click="handleBack()">返回上级</div>
  </div>
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
          code: '100000', // 区域编码-必填
          level: 1, // 0世界 1中国 2省 3市 4区
          name: 'China',
          data: null
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
      myId: uuid()
    };
  },
  computed: {
    getMap() {
      return require(`./data/${this.area.code}`);
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
        let level = this.area.level;
        let areaCode = getAreaCode(evt.name);

        if (evt.name === 'China') {
          level = 1;
        } else {
          if (areaCode / 10000 === parseInt(areaCode / 10000)) {
            level = 2; // 省
          } else if (areaCode / 100 === parseInt(areaCode / 100)) {
            level = 3; // 市
          } else {
            level = 4; // 区
          }
        }

        Object.assign(this.area, {
          code: areaCode,
          level,
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
    handleBack() {
      const { level } = this.area;

      if (level === 0) return;
      switch (level) {
        case 1:
          this.area.code = '000000';
          break;
        case 2:
          this.area.code = '100000';
          break;
        case 3:
          this.area.code = this.area.code.slice(0, 2) + '0000';
          break;
        case 4:
          this.area.code = this.area.code.slice(0, 4) + '00';
          break;
      }
      this.area.level--;

      this.initChart();
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

<style scoped lang="less">
.xx-map {
  position: relative;
  .xx-map-back {
    position: absolute;
    top: 50px;
    right: 80px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
