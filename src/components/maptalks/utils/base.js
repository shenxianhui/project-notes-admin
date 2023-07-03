/*
 * @Description: maptalks 常用方法封装
 * @Author: shenxh
 * @Date: 2022-08-28 13:45:32
 * @LastEditors: shenxh
 * @LastEditTime: 2023-07-03 11:00:02
 */

import * as Maptalks from 'maptalks'
import MapboxGL from 'mapbox-gl'
import { MapboxglLayer } from 'maptalks.mapboxgl/dist/maptalks.mapboxgl.js'
import { ClusterLayer } from 'maptalks.markercluster'

import MARKER from './marker'

let map = null // 地图

export default {
  // 地图
  map: {
    /**
     * @description: 初始化
     * @param {string} container dom 容器
     * @param {object} options 构造选项
     * @return {*} Map 地图
     */
    init(container, options) {
      const baseLayer = new MapboxglLayer('tile', {
        glOptions: {
          style: 'mapbox://styles/shenxh0928/cljgibp4c002r01prdnwn4o5r',
        },
      })

      MapboxGL.accessToken =
        'pk.eyJ1Ijoic2hlbnhoMDkyOCIsImEiOiJjbGpnZmhqMmowM3hkM29xbWk1aWY0eHJ6In0.xwShSuiFuLRxRd0eKVtu6g'

      map = new Maptalks.Map(container, {
        ...options,
        baseLayer,
      })

      map.on('baselayerload', () => {
        console.log('基础层加载完成')
      })

      return map
    },

    /**
     * @description: 销毁地图实例
     * @return {*}
     */
    remove() {
      map && map.remove()
    },

    /**
     * @description: 用动画更新地图的视图
     * @param {*} view 地图参数
     * @param {*} options 构造选项
     * @param {*} step 回调函数
     * @return {*}
     */
    animateTo(view, options, step) {
      map.animateTo(
        view,
        {
          duration: 800,
          easing: 'out',
          ...options,
        },
        frame => {
          step && step(frame)
        },
      )
    },
  },
  // 点位
  marker: {
    /**
     * @description: 初始化
     * @param {array} coordinates 坐标
     * @param {object} options 构造选项
     * @return {*} Marker 标记
     */
    init(coordinates, options) {
      const marker = new Maptalks.Marker(coordinates, {
        ...options,
      })

      return marker
    },

    /**
     * @description: 显示图层内的所有 InfoWindow
     * @param {*} id 图层 id
     * @return {*}
     */
    showAllInfoWindow(id) {
      const layer = map.getLayer(id)
      const markers = layer.getGeometries()

      // markers.forEach(marker => {
      //   marker && marker.openInfoWindow()
      // })

      markers.forEach(marker => {
        const hasInfoWindow = marker.getInfoWindow()

        // 判断当前弹窗状态
        if (hasInfoWindow) {
          marker.openInfoWindow()
        } else {
          MARKER.initInfoWindow(marker, marker.data)
          marker.openInfoWindow()
        }
      })
    },

    /**
     * @description: 隐藏图层内的所有 InfoWindow
     * @param {*} id 图层 id
     * @return {*}
     */
    hideAllInfoWindow(id) {
      const layer = map.getLayer(id)

      if (!layer) return

      const markers = layer.getGeometries()

      markers.forEach(marker => {
        marker && marker.getInfoWindow() && marker.closeInfoWindow()
      })
    },

    /**
     * @description: 根据 id 获取图层内的指定 Marker
     * @param {*} layerId
     * @param {*} markerId
     * @return {*} marker
     */
    getMarker(layerId, markerId) {
      const layer = map.getLayer(layerId)
      const markers = layer.getGeometries(marker => {
        return marker._id === markerId
      })

      return markers && markers.length ? markers[0] : null
    },
  },
  // 标签
  label: {
    /**
     * @description: 初始化
     * @param {string} content 内容
     * @param {array} coordinates 坐标
     * @param {object} options 构造选项
     * @return {*} Marker 标记
     */
    init(content, coordinates, options) {
      const label = new Maptalks.Label(content, coordinates, {
        ...options,
      })

      return label
    },
  },
  // 线
  lineString: {
    /**
     * @description: 初始化
     * @param {array} coordinates 坐标数组
     * @param {*} options 构造选项
     * @return {*}
     */
    init(coordinates, options) {
      const line = new Maptalks.LineString(coordinates, options)

      return line
    },
  },
  // 多边形
  polygon: {
    /**
     * @description: 初始化
     * @param {array} coordinates 坐标数组
     * @param {*} options 构造选项
     * @return {*}
     */
    init(coordinates, options) {
      const polygon = new Maptalks.Polygon(coordinates, options)

      return polygon
    },
  },
  // 图层
  layer: {
    /**
     * @description: 初始化
     * @param {string|number} id 图层id
     * @param {Geometry|array} geometries 几何图形
     * @param {object} options 构造选项
     * @return {*} Layer 图层
     */
    init(id, geometries, options) {
      let layer = map.getLayer(id)

      layer && map.removeLayer(layer)
      layer = new Maptalks.VectorLayer(id, geometries, options).addTo(map)

      return layer
    },

    /**
     * @description: 隐藏图层
     * @param {array} id 图层id
     * @return {*}
     */
    hide(id) {
      const layer = map.getLayer(id)

      layer && layer.hide()
    },

    /**
     * @description: 隐藏全部图层
     * @param {array} ignoreLayerIds 忽略的图层id
     * @return {*}
     */
    hideAll(ignoreLayerIds = []) {
      const vectorLayers = map.getLayers()

      vectorLayers.forEach(layer => {
        const ignore = ignoreLayerIds.includes(layer._id)

        if (!ignore) {
          layer && layer.hide()
        }
      })
    },

    /**
     * @description: 显示图层
     * @param {array} id 图层id
     * @return {*}
     */
    show(id) {
      const layer = map.getLayer(id)

      layer && layer.show()
    },

    /**
     * @description: 显示全部图层
     * @param {array} ignoreLayerIds 忽略的图层id
     * @return {*}
     */
    showAll(ignoreLayerIds = []) {
      const vectorLayers = map.getLayers()

      vectorLayers.forEach(layer => {
        const ignore = ignoreLayerIds.includes(layer._id)

        if (!ignore) {
          layer && layer.show()
        }
      })
    },

    /**
     * @description: 获取所有几何图形或过滤的几何图形
     * @param {*} layerId
     * @param {*} filter
     * @param {*} context
     * @return {*}
     */
    getGeometries(layerId, filter, context) {
      const layer = map.getLayer(layerId)

      if (!layer) return []

      const polygon = layer.getGeometries(filter, context)

      return polygon
    },

    /**
     * @description: 判断图层是否可见
     * @param {*} layerId
     * @return {*}
     */
    isVisible(layerId) {
      const layer = map.getLayer(layerId)

      return layer && layer.isVisible()
    },

    /**
     * @description: 获取图层内所有marker
     * @param {*} layerId
     * @return {*} marker
     */
    getMarkers(layerId) {
      const layer = map.getLayer(layerId)
      let markers = []

      if (layer) {
        markers = layer.getGeometries()
      }

      return markers
    },
  },
  // 点位聚合
  clusterLayer: {
    /**
     * @description: 初始化
     * @param {string|number} id 图层id
     * @param {Geometry|array} markers 点位
     * @param {object} options 构造选项
     * @return {*} Layer 图层
     */
    init(id, markers, options = {}) {
      let layer = map.getLayer(id)

      layer && map.removeLayer(layer)
      layer = new ClusterLayer(id, markers, {
        noClusterWithOneMarker: true,
        noClusterWithHowMany: 2, // 聚合的最小个数
        maxClusterZoom: 15,
        // "count" is an internal variable: marker count in the cluster.
        symbol: {
          markerType: 'ellipse',
          markerFill: {
            property: 'count',
            type: 'interval',
            stops: [
              [0, 'rgb(135, 196, 240)'],
              [9, '#1bbc9b'],
              [50, 'rgb(116, 115, 149)'],
              [99, 'rgb(216, 115, 149)'],
            ],
          },
          markerFillOpacity: 0.7,
          markerLineOpacity: 1,
          markerLineWidth: 3,
          markerLineColor: '#fff',
          markerWidth: {
            property: 'count',
            type: 'interval',
            stops: [
              [0, 40],
              [9, 60],
              [50, 70],
              [99, 80],
            ],
          },
          markerHeight: {
            property: 'count',
            type: 'interval',
            stops: [
              [0, 40],
              [9, 60],
              [50, 70],
              [99, 80],
            ],
          },
        },
        drawClusterText: true,
        geometryEvents: true,
        single: false,
        ...options,
      })

      map.addLayer(layer)

      return layer
    },
  },
}
