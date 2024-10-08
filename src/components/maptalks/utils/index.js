/*
 * @Description: maptalks 常用方法封装
 * @Author: shenxh
 * @Date: 2022-08-28 13:45:32
 * @LastEditors: shenxh
 * @LastEditTime: 2023-09-07 17:10:49
 */

import * as maptalks from 'maptalks'
import mapboxgl from 'mapbox-gl'
import { MapboxglLayer } from 'maptalks.mapboxgl/dist/maptalks.mapboxgl.js'
import { ClusterLayer } from 'maptalks.markercluster'

import MARKER from './marker'

let map = null // 地图

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2hlbnhoMDkyOCIsImEiOiJjbGpnZmhqMmowM3hkM29xbWk1aWY0eHJ6In0.xwShSuiFuLRxRd0eKVtu6g'

const utils = {
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

      map = new maptalks.Map(container, {
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

    /**
     * @description: 显示图层
     * @param {string} id 图层id
     * @return {*}
     */
    showLayer(id) {
      const layer = map.getLayer(id)

      layer && layer.show()
    },

    /**
     * @description: 显示多个图层
     * @param {function} filter 过滤函数
     * @return {*}
     */
    showLayers(filter) {
      const layers = map.getLayers(filter)

      layers.forEach(layer => {
        layer && layer.show()
      })
    },

    /**
     * @description: 隐藏图层
     * @param {string} id 图层id
     * @return {*}
     */
    hideLayer(id) {
      const layer = map.getLayer(id)

      layer && layer.hide()
    },

    /**
     * @description: 隐藏多个图层
     * @param {function} filter 过滤函数
     * @return {*}
     */
    hideLayers(filter) {
      const layers = map.getLayers(filter)

      layers.forEach(layer => {
        layer && layer.hide()
      })
    },

    /**
     * @description: 销毁图层
     * @return {*}
     */
    removeAllLayers() {
      const layers = map.getLayers()

      layers.forEach(layer => {
        layer && layer.remove()
      })
    },

    /**
     * @description: 停止所有发光点
     * @param {*} layerId 图层id
     * @return {*}
     */
    cancelFlashingPoint() {
      const layers = map.getLayers()

      layers.forEach(layer => {
        const markers = layer
          .getGeometries()
          .filter(geometry => geometry.geometryType === 'FlashingPoint')

        markers &&
          markers.forEach(item => {
            item.animate.cancel()
          })
      })
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
      layer = new maptalks.VectorLayer(id, geometries, options).addTo(map)

      return layer
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

    /**
     * @description: 获取图层内多个marker
     * @param {*} layerId
     * @param {function} filter 过滤函数
     * @return {*} marker
     */
    getMarkers(layerId, filter) {
      const layer = map.getLayer(layerId)
      let markers = []

      if (layer) {
        markers = layer.getGeometries(filter)
      }

      return markers
    },

    /**
     * @description: 获取图层内指定类型的所有的图形
     * @param {*} layerId
     * @param {function} jsonType 图形类型
     * @return {*} marker
     */
    getAllGeometry(layerId, jsonType) {
      const layer = map.getLayer(layerId)
      let markers = []

      if (layer) {
        markers = layer
          .getGeometries()
          .filter(geometry => geometry.geometryType === jsonType)
      }

      return markers
    },

    /**
     * @description: 显示图层内的所有 InfoWindow
     * @param {*} layerId 图层 id
     * @return {*}
     */
    showAllInfoWindow(layerId) {
      const markers = utils.layer.getAllGeometry(layerId, 'Marker')

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
     * @param {*} layerId 图层 id
     * @return {*}
     */
    hideAllInfoWindow(layerId) {
      const markers = utils.layer.getAllGeometry(layerId, 'Marker')

      markers.forEach(marker => {
        marker && marker.getInfoWindow() && marker.closeInfoWindow()
      })
    },

    /**
     * @description: 启动图层内所有发光点
     * @param {*} layerId 图层id
     * @return {*}
     */
    playFlashingPoint(layerId) {
      const markers = utils.layer.getAllGeometry(layerId, 'FlashingPoint')

      markers &&
        markers.forEach(item => {
          item.animate.play()
        })
    },

    /**
     * @description: 停止图层内所有发光点
     * @param {*} layerId 图层id
     * @return {*}
     */
    cancelFlashingPoint(layerId) {
      const markers = utils.layer.getAllGeometry(layerId, 'FlashingPoint')

      markers &&
        markers.forEach(item => {
          item.animate.cancel()
        })
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
      const marker = new maptalks.Marker(coordinates, {
        ...options,
      })

      return marker
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
      const label = new maptalks.Label(content, coordinates, {
        ...options,
      })

      return label
    },
  },
  // 点
  point: {
    /**
     * @description: 初始化
     * @param {object|number[]} coordinate 坐标
     * @param {object} options 构造选项
     * @return {*} Point
     */
    init(coordinate, options) {
      const point = new maptalks.Point(coordinate, options)

      return point
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
      const line = new maptalks.LineString(coordinates, options)

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
      const polygon = new maptalks.Polygon(coordinates, options)

      return polygon
    },
  },
  // 聚合图层
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
            // 颜色
            stops: [
              [0, 'rgb(135, 196, 240)'],
              [9, 'rgb(27, 188, 155)'],
              [50, 'rgb(116, 115, 149)'],
              [99, 'rgb(216, 115, 149)'],
            ],
          },
          markerFillOpacity: 0.7, // 透明度
          markerWidth: {
            property: 'count',
            type: 'interval',
            stops: [
              [0, 30],
              [9, 40],
              [50, 50],
              [99, 60],
            ],
          },
          markerHeight: {
            property: 'count',
            type: 'interval',
            stops: [
              [0, 30],
              [9, 40],
              [50, 50],
              [99, 60],
            ],
          },
          markerLineWidth: 1, // 边框尺寸
          markerLineColor: '#fff', // 边框颜色
          markerLineOpacity: 1, // 边框透明度
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
export default utils
