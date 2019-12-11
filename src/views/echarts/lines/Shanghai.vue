/* * @Author: Shen Xianhui * @Date: 2019-03-24 09:42:15 * @Last Modified by: ShenXianhui * @Last Modified time:
2019-03-29 10:52:43 */ /* 摘自: https://echarts.baidu.com/examples/editor.html?c=lines-bmap-effect */

<!-- 上海出租车路线 -->
<template>
  <div class="lines-shanghai" id="lines-shanghai"></div>
</template>

<script>
import * as Lines from '@/data/echarts/lines/shanghai/index.js'; // 接口全部引用

export default {
  name: 'LinesShanghai',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {
    this.getLines();
  },
  methods: {
    getLines() {
      let myChart = this.$echarts.init(document.getElementById('lines-shanghai'));
      let _this = this;
      let busLines = [];

      Object.values(Lines).forEach(item => {
        let points = []; // 偶数项为经度, 奇数项为纬度
        item.forEach(item1 => {
          if (!item1.id) {
            return false;
          }
          let _tmp = [];
          _tmp[0] = Number(item1.longitude); // 经度
          _tmp[1] = Number(item1.latitude); // 纬度

          points.push([_tmp[0], _tmp[1]]);
        });
        let _obj = {
          // 路线
          coords: points,
          lineStyle: {
            normal: {
              color: _this.$echarts.color.modifyHSL('#5A94DF', Math.round(Math.random() * 300))
            }
          }
        };
        busLines.push(_obj);
      });

      myChart.setOption({
        bmap: {
          center: [121.46, 31.22],
          zoom: 10,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: 'water',
                elementType: 'all',
                stylers: {
                  color: '#031628'
                }
              },
              {
                featureType: 'land',
                elementType: 'geometry',
                stylers: {
                  color: '#000102'
                }
              },
              {
                featureType: 'highway',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#000000'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry.stroke',
                stylers: {
                  color: '#0b3d51'
                }
              },
              {
                featureType: 'local',
                elementType: 'geometry',
                stylers: {
                  color: '#000000'
                }
              },
              {
                featureType: 'railway',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#000000'
                }
              },
              {
                featureType: 'railway',
                elementType: 'geometry.stroke',
                stylers: {
                  color: '#08304b'
                }
              },
              {
                featureType: 'subway',
                elementType: 'geometry',
                stylers: {
                  lightness: -70
                }
              },
              {
                featureType: 'building',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#000000'
                }
              },
              {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: {
                  color: '#857f7f'
                }
              },
              {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: {
                  color: '#000000'
                }
              },
              {
                featureType: 'building',
                elementType: 'geometry',
                stylers: {
                  color: '#022338'
                }
              },
              {
                featureType: 'green',
                elementType: 'geometry',
                stylers: {
                  color: '#062032'
                }
              },
              {
                featureType: 'boundary',
                elementType: 'all',
                stylers: {
                  color: '#465b6c'
                }
              },
              {
                featureType: 'manmade',
                elementType: 'all',
                stylers: {
                  color: '#022338'
                }
              },
              {
                featureType: 'label',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              }
            ]
          }
        },
        series: [
          {
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: busLines,
            silent: true,
            lineStyle: {
              normal: {
                // color: '#c23531',
                // color: 'rgb(200, 35, 45)',
                opacity: 0.2,
                width: 1
              }
            },
            progressiveThreshold: 500,
            progressive: 200
          },
          {
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: busLines,
            lineStyle: {
              normal: {
                width: 0
              }
            },
            effect: {
              constantSpeed: 20,
              show: true,
              trailLength: 0.1,
              symbolSize: 1.5
            },
            zlevel: 1
          }
        ]
      });
    }
  }
};
</script>

<style scoped lang="less">
.lines-shanghai {
  width: 100%;
  height: 100%;
}
</style>
