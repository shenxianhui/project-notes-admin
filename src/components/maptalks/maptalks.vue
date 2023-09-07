<!--
 * @Description: Maptalks
 * @Author: shenxh
 * @Date: 2023-06-28 14:15:00
 * @LastEditors: shenxh
 * @LastEditTime: 2023-09-07 17:10:11
-->

<template>
  <div class="maptalks" id="map-maptalks"></div>
</template>

<script>
import MT from './utils'
import MARKER from './utils/marker'
import LABEL from './utils/label'
import LINE from './utils/line'
import POLYGON from './utils/polygon'

let map = null

// 待整理:
// 1. 手动定位
// 2. 图例相关项
export default {
  name: 'maptalks',
  components: {},
  props: {
    center: {
      type: Array,
      default() {
        return [116.39133827116365, 39.90468692443804]
      },
    },
    zoom: {
      type: Number,
      default: 12,
    },
    minZoom: {
      type: Number,
      default: 11,
    },
    maxZoom: {
      type: Number,
      default: 18,
    },
    // 设置地图可视范围的经纬度范围 [西经，南纬，东经，北纬]
    maxExtent: {
      type: Array, // [114.5, 31.6, 115.1, 32.2]
    },
    // 可以通过右键单击或 ctrl + 左键单击拖动地图进行旋转
    dragRotate: {
      type: Boolean,
      default: true,
    },
    // 可以通过右键单击或 ctrl + 左键将地图拖动俯仰
    dragPitch: {
      type: Boolean,
      default: true,
    },
    // 俯仰角度
    pitch: {
      type: Number,
      default: 50,
    },
    // 旋转
    bearing: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.init()

    window.handleMarkerPopup = this.handleMarkerPopup
  },
  beforeDestroy() {
    MT.map.cancelFlashingPoint()
    MT.map.remove()
  },
  methods: {
    // 地图初始化
    init() {
      map = MT.map.init('map-maptalks', {
        ...this.$props,
      })
    },

    // 点击图例
    selectedMapLegend(legend = {}) {
      const { selected } = legend

      if (selected) {
        const layer = map.getLayer(legend.value)

        if (layer) {
          MT.map.showLayer(legend.value)
          MT.layer.playFlashingPoint(legend.value)

          return
        }
      } else {
        MT.map.hideLayer(legend.value)
        MT.layer.cancelFlashingPoint(legend.value)

        return
      }

      switch (legend.value) {
        case 'point-base':
          this.initBasePoint(legend)
          break
        case 'point-cluster':
          this.initClusterPoint(legend)
          break
        case 'line-base':
          this.initBaseLine(legend)
          break
        case 'line-animate':
          this.initAnimateLine(legend)
          break
        case 'surface-base':
          this.initBaseSurface(legend)
          break
      }
    },

    // 点击地图Tab之前
    beforeChangeMapTab() {
      MT.map.hideLayers()
      // MT.map.removeAllLayers()
    },

    // 点击图例开关
    switchedMapLegend(legend = {}) {
      if (legend.switch?.checked) {
        MT.layer.showAllInfoWindow(legend.value)
      } else {
        MT.layer.hideAllInfoWindow(legend.value)
      }
    },

    // 基础点
    initBasePoint(legend = {}) {
      const mockData = [
        {
          id: 'marker-0',
          name: '天安门',
          coordinate: [116.39103647015702, 39.912311286085355],
          alarm: true,
          infoWindow: [
            {
              alarm: true,
              label: '朝代',
              value: '明清',
              unit: '',
            },
            {
              label: '面积',
              value: '4800',
              unit: '㎡',
            },
          ],
        },
        {
          id: 'marker-1',
          name: '北京大学',
          coordinate: [116.30976921553298, 39.989304628302506],
          infoWindow: [
            {
              label: '面积',
              value: '4127',
              unit: '亩',
            },
          ],
        },
      ]
      const markers = []
      const labels = []
      const points = []

      mockData.forEach(item => {
        const data = {
          ...item,
          markerFile: legend.map?.marker?.icon,
          hasInfoWindow: true,
        }
        const marker = MARKER.init(data)
        const label = LABEL.init(data)
        const point = MARKER.initFlashingPoint(data)

        markers.push(marker)
        labels.push(label)
        points.push(point)

        marker.on('click', e => {
          const infoWindow = marker.getInfoWindow()

          // 判断当前弹窗状态
          if (infoWindow) {
            if (infoWindow.isVisible()) {
              setTimeout(() => {
                marker.closeInfoWindow()
              }, 30)
            } else {
              marker.openInfoWindow()
            }
          } else {
            MARKER.initInfoWindow(marker, marker.data)
            marker.openInfoWindow()
          }
        })
      })

      MT.layer.init(legend.value, [...markers, ...labels, ...points], {
        zIndex: 15,
      })
    },

    // 聚合点
    initClusterPoint(legend = {}) {
      const mockData = [
        {
          id: 'cluster-0',
          name: '点位0',
          coordinate: [116.42327258286122, 39.921218242921924],
        },
        {
          id: 'cluster-1',
          name: '点位1',
          coordinate: [116.41672662318155, 39.91841479974909],
        },
        {
          id: 'cluster-2',
          name: '点位2',
          coordinate: [116.4102017274933, 39.91229350120264],
        },
        {
          id: 'cluster-3',
          name: '点位3',
          coordinate: [116.45187329128277, 39.90531229467916],
        },
      ]
      const markers = mockData.map(item => {
        const data = {
          ...item,
          markerFile: legend.map?.marker?.icon,
          hasInfoWindow: true,
        }
        const marker = MARKER.init(data)

        return marker
      })

      MT.clusterLayer.init(legend.value, markers, {
        zIndex: 10,
      })
    },

    // 基础线
    initBaseLine(legend) {
      const coordinates = [
        [116.30226095422518, 39.959316978780095],
        [116.3030257917261, 39.95563523939501],
        [116.30391455387092, 39.9409936171395],
        [116.3042996216459, 39.88333017409812],
        [116.30688832984401, 39.86316842442176],
        [116.30736772025114, 39.86110776588967],
        [116.31695554800041, 39.84984663547138],
        [116.32002364660565, 39.848521676361855],
        [116.32491342875994, 39.84763835608268],
        [116.33776109167076, 39.84778557691811],
        [116.36594924761096, 39.855440625331795],
        [116.3678669470961, 39.855734943698764],
        [116.41398430426284, 39.85577876897557],
        [116.42062310637209, 39.85685907744872],
        [116.43252397788677, 39.857563624927366],
        [116.43959104201457, 39.85746969178885],
        [116.44154902601662, 39.8576575701515],
        [116.443384636019, 39.85817423299892],
        [116.44540380702193, 39.859066641481064],
        [116.45399402242379, 39.86597067171016],
        [116.45466707942353, 39.86709779452622],
        [116.4548812339246, 39.86855363409114],
        [116.45562632334202, 39.95031111112476],
        [116.4552340473287, 39.951280089059],
        [116.45423156418536, 39.952466233016395],
        [116.43088254153122, 39.96773846601701],
        [116.4296454248248, 39.968073100721426],
        [116.42829915076055, 39.96815675914175],
        [116.31595549040384, 39.965745336770965],
        [116.31509120423732, 39.965624897821726],
        [116.31406977513154, 39.96532379952026],
        [116.30357339570907, 39.96155391411628],
        [116.3025833951915, 39.96067465100654],
        [116.30225339501959, 39.96020490306793],
        [116.30226095422518, 39.959316978780095],
      ]

      const line = LINE.init(coordinates)
      MT.layer.init(legend.value, line, {
        zIndex: 5,
      })
    },

    // 动画线
    initAnimateLine(legend) {
      const coordinates = [
        [116.34930297481338, 39.9407553844043],
        [116.35067070450128, 39.90969555240531],
        [116.35031760204572, 39.908646185549514],
        [116.35056293516351, 39.898830200003204],
        [116.35019356661576, 39.89801550205465],
        [116.34947791505459, 39.89741332778058],
        [116.3485083226181, 39.897076816322425],
        [116.34467612393695, 39.89675801446958],
        [116.34372961703355, 39.89651005644794],
        [116.34285236673367, 39.89587244598627],
        [116.34256463574218, 39.89522239205098],
        [116.3424923675405, 39.894626200937324],
        [116.34272062370684, 39.88078453760215],
        [116.3431995555137, 39.87458887336291],
        [116.34264779015535, 39.86963956955614],
        [116.34278332497723, 39.868755362881615],
        [116.34356265019278, 39.867767118405055],
        [116.34478246357548, 39.867194970359435],
        [116.34722209033868, 39.86706493604723],
        [116.35118648383178, 39.866986915341414],
        [116.35247406462327, 39.867012922252684],
        [116.35467650545235, 39.86727299082787],
        [116.36124992267025, 39.86828727043394],
        [116.36511266504687, 39.868651359399564],
        [116.38161833881122, 39.86981089247709],
        [116.39569768720077, 39.8704444627254],
        [116.40179720946827, 39.87069084957545],
        [116.40863050884985, 39.870831641663216],
        [116.4097039454503, 39.87049957207071],
        [116.41123232912253, 39.869822044328316],
        [116.41158807359807, 39.8697108077906],
        [116.41215462961378, 39.86966024566843],
        [116.41526409984078, 39.869832156732],
        [116.41830985592463, 39.87000136675667],
        [116.4347330836639, 39.86919241860656],
        [116.43557030343464, 39.86917233815086],
        [116.43645984944169, 39.86943338362144],
        [116.43714009050643, 39.86979482955556],
        [116.43766335286375, 39.870397235214426],
        [116.43800347339692, 39.871340993443624],
        [116.43852673575424, 39.87367021350303],
        [116.44005859078527, 39.87710937999606],
        [116.44013708013989, 39.877490863509365],
        [116.43912291043353, 39.88315265908477],
        [116.43791670091673, 39.89231108808684],
        [116.43778565507, 39.896198721166485],
        [116.43753774744312, 39.89665808059257],
        [116.43704306194275, 39.897091820917524],
        [116.43647770708253, 39.89736290722672],
        [116.43300213403069, 39.898138991095124],
        [116.43134794960349, 39.89855540247552],
        [116.43031408433637, 39.89936838883136],
        [116.43013315791387, 39.90037965108104],
        [116.4301848511779, 39.90212453908748],
        [116.42968964056496, 39.904696534713196],
        [116.42940532761617, 39.909494567498086],
        [116.42891424161456, 39.91195293342892],
        [116.42871244216656, 39.91381763072346],
        [116.42753194576295, 39.946389955982],
        [116.42685273498347, 39.94740737457374],
        [116.42566133300119, 39.94806345369963],
        [116.42452027194935, 39.948320737914],
        [116.4021184535975, 39.94763452565985],
        [116.36573084982945, 39.94724638502777],
        [116.36455160655987, 39.94705265969307],
        [116.35878170754677, 39.94485703405823],
        [116.35094816297266, 39.94269366112641],
        [116.35002233855158, 39.94218875241313],
        [116.34945516181222, 39.94155936103826],
        [116.34930297481338, 39.9407553844043],
      ]
      const line = LINE.init(coordinates, true)

      MT.layer.init(legend.value, line, {
        zIndex: 5,
      })
    },

    // 基础面
    initBaseSurface(legend) {
      const coordinates = [
        [
          [116.30554439841819, 39.96156221274745],
          [116.30554439841819, 39.86245160931375],
          [116.45137577530619, 39.86245160931375],
          [116.45137577530619, 39.96156221274745],
          [116.30554439841819, 39.96156221274745],
        ],
      ]
      const polygon = POLYGON.init(coordinates)

      MT.layer.init(legend.value, polygon, {
        zIndex: 5,
      })
    },

    // 点击点位弹窗
    handleMarkerPopup(type, jsonData) {
      console.log(type, jsonData)
    },
  },
}
</script>

<style lang="less" scoped></style>
