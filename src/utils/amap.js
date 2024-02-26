import AMapLoader from '@amap/amap-jsapi-loader'

class Map {
  constructor(options = {}) {
    // 实例数据
    this.mapInstance = {}
    this.dep = []
    this.plugins = {}
    this.extraTools = {}
    this.controlPlugins = [
      'AMap.Scale',
      'AMap.ToolBar',
      'AMap.OverView',
      'AMap.ControlBar',
      'AMap.MapType',
    ]
    // 内置配置
    const defaultTools = [
      'AMap.DistrictSearch',
      'AMap.ToolBar',
      'AMap.Scale',
      'AMap.PolygonEditor',
      'AMap.Geocoder',
      'AMap.AutoComplete',
      'AMap.PlaceSearch',
      'AMap.MouseTool',
      'AMap.PolylineEditor',
      'AMap.Geolocation',
    ]
    const defaultInitData = {
      zoom: 16,
      resizeEnable: true,
    }
    // 地图基础配置
    const key = options.key || '2c4b265f2b9e6dee4aedf21cbc3401e9'

    window._AMapSecurityConfig = {
      securityJsCode: '0df1471044a801daba8cd99429b23ec6',
    }

    // const tools = options.tools ? options.tools : defaultTools

    const initData = options.initData ? options.initData : {}
    // 相关初始化配置
    options.initData = {
      ...defaultInitData,
      ...initData,
    }
    if (options.initNow === undefined || options.initNow === true) {
      AMapLoader.load({
        key,
        version: '2.0',
        plugins: defaultTools,
      })
        .then(AMap => {
          window.AMap = AMap
          this.init(options)
        })
        .catch(err => {
          throw new Error('加载地图失败:' + err)
        })
    }
  }

  // 实例化地图
  init(options) {
    this.mapInstance = new window.AMap.Map(
      options.id || 'container',
      options.initData,
    )
    this.mapInstance.on('complete', () => {
      console.log('地图绘制完成')
      console.log('开始初始化插件')
      const pluginArray = [
        {
          name: 'ToolBar',
          isNeedInstance: false,
        },
        {
          name: 'Geocoder',
          isNeedInstance: false,
        },
        {
          name: 'AutoComplete',
          isNeedInstance: false,
        },
        {
          name: 'MouseTool',
          isNeedInstance: true,
        },
        {
          name: 'Geolocation',
          isNeedInstance: false,
          options: {},
        },
        {
          name: 'DistrictSearch',
          isNeedInstance: false,
          options: {
            subdistrict: 1, // 返回下一级行政区
            extensions: 'all',
            showbiz: true, // 最后一级返回街道信息
          },
        },
      ]
      this.loadingDefaultPlugins(pluginArray)
    })
    //获取经纬度
    this.mapInstance.on('click', e => {
      this.emit('click', e)
    })
    // 监听zooms
    this.mapInstance.on('zoomend', () => {
      const zIndex = parseInt(this.getZoom())
      this.emit('getZoom', zIndex)
    })
  }

  // 初始化插件
  loadingDefaultPlugins(pluginArray) {
    pluginArray.forEach(pluginItem => {
      let name = pluginItem.name
      if (pluginItem.isNeedInstance === true) {
        this.plugins[name] = new window.AMap[name](this.mapInstance)
      } else {
        this.plugins[name] = pluginItem.options
          ? new window.AMap[name](pluginItem.options)
          : new window.AMap[name]()
      }
    })
    console.log('插件实例化完成...')
    this.emit('complete', this.mapInstance)
  }

  // 使用插件或者服务
  usePlugins(name, plugin, type, options = {}) {
    // 控件类
    if (this.controlPlugins.indexOf(name) > -1 || type === 'control') {
      this.mapInstance.addControl(plugin, {
        ...options,
      })
    }
    // 服务类
    else if (type === 'service') {
      this.mapInstance.plugin(plugin, {
        ...options,
      })
    }
  }

  // 获取当前地图边界经纬度
  getCurrentBounds(options) {
    const bounds = this.mapInstance.getBounds()
    if (options.needCollect) {
      const collectBounds = {
        maxLon: bounds.northeast.lng,
        minLon: bounds.southwest.lng,
        maxLat: bounds.northeast.lat,
        minLat: bounds.southwest.lat,
      }
      return collectBounds
    } else {
      return bounds
    }
  }
  // 确定地图返回
  setBounds(minLon, minLat, maxLon, maxLat) {
    this.mapInstance.setBounds(
      new window.AMap.Bounds([minLon, minLat], [maxLon, maxLat]),
    )
  }

  // 创建坐标系
  createPixel(offsetX = 0, offsetY = 0) {
    return new window.AMap.Pixel(offsetX, offsetY)
  }
  // 创建坐标系
  lnglatTocontainer(lnglat) {
    return this.mapInstance.lnglatTocontainer(lnglat)
  }
  containerToLngLat(lnglat) {
    return this.mapInstance.containerToLngLat(lnglat)
  }
  // 创建坐标系
  createPolyEditor(polygon) {
    // this.mapInstance.add(polygon);
    return new window.AMap.PolyEditor(this.mapInstance, polygon)
  }

  // 创建文字 label 图层
  createLabelLayer(options = {}) {
    const zooms = options.zooms || [3, 20]
    const zIndex = options.zIndex || 10
    const collision = options.collision || false
    const animation = options.animation || true
    const visible = options.visible || true

    const layer = new window.AMap.LabelsLayer({
      zooms,
      zIndex,
      collision,
      animation,
      visible,
    })

    return layer
  }

  // 创建文字 label marker
  createLabelMarker(options = {}) {
    const labelMarker = new window.AMap.LabelMarker(options)
    return labelMarker
  }

  // 创建定位信息
  createLnglat(lng, lat) {
    return new window.AMap.LngLat(lng, lat)
  }

  // 创建尺寸信息
  createSize(width, height) {
    return new window.AMap.Size(width, height)
  }

  // 创建 Icon
  createIcon(img, width, height, offsetX = 0, offsetY = 0) {
    const icon = new window.AMap.Icon({
      size: new window.AMap.Size(width, height),
      image: img,
      imageOffset: new window.AMap.Pixel(offsetX, offsetY),
      imageSize: new window.AMap.Size(width, height),
    })
    return icon
  }

  // 绘制线段
  drawLine(options) {
    const polyLine = this.install('Polyline', options)
    this.mapInstance.add(polyLine)
    return polyLine
  }

  // 新增某个图层
  addLayer(layer) {
    this.mapInstance.add(layer)
  }

  // 设置线段属性
  setLineOptions(lineObject, options) {
    lineObject.setOptions(options)
  }

  // 创建 Marker
  createMarker(options = {}) {
    const {
      title = '',
      lng,
      lat,
      icon = '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
      offsetX = 0,
      offsetY = 0,
    } = options
    const marker = new window.AMap.Marker({
      // map: this.mapInstance,
      title,
      icon,
      position: new window.AMap.LngLat(lng, lat),
      offset: new window.AMap.Pixel(offsetX, offsetY),
      anchor: 'bottom-center',
      ...options,
    })

    return marker
  }

  /**
   * @param {number} zIndex 海量点图层叠加的顺序
   * @param {array} zooms 在指定地图缩放级别范围内展示海量点图层
   * @param {array} style 设置样式对象
   */
  createMassMarkerObject(option) {
    const massMakers = new window.AMap.MassMarks([], {
      zIndex: 111,
      zooms: [3, 20],
      ...option,
    })
    return massMakers
  }
  // 创建海量点样式对象-多图标
  createMassStyleArray(url, size = [20, 20], offset = [10, 10]) {
    return {
      url: url,
      size: new window.AMap.Size(size[0], size[1]),
      anchor: new window.AMap.Pixel(offset[0], offset[1]),
    }
  }

  // 设置海量点数据
  setMassMarkerDataAndStyle(massMaker, data, style) {
    massMaker.setData(data)
    massMaker.setStyle(style)
  }
  // 设置当前地图显示状态
  setStatus(config) {
    this.mapInstance.setStatus(config)
  }

  // 创建 label
  setLabel(marker, direction = '', content = '', offsetX, offsetY) {
    if (offsetX === undefined || offsetY === undefined) {
      marker.setLabel({
        direction: direction,
        content: content,
      })
    } else {
      marker.setLabel({
        direction: direction,
        content: content,
        offset: new window.AMap.Pixel(offsetX, offsetY),
      })
    }
  }

  // 设置 label 的标题
  setTitle(marker, title) {
    marker.setTitle(title)
  }

  // 创建信息窗
  createInfoWindow(options) {
    this.extraTools.infoWindow = new window.AMap.InfoWindow(options)
    return this.extraTools.infoWindow
  }

  // 获取实例化的信息窗
  getInfoWindow() {
    if (this.extraTools.infoWindow) {
      return this.extraTools.infoWindow
    } else {
      this.createInfoWindow()
    }
  }

  // 设置 Maker 的 ICON
  updateMakerIcon(marker, icon, width = 24, height = 30) {
    let IconObj = this.createIcon(icon, width, height)
    marker.setIcon(IconObj)
  }

  // 更新 infowindow 内容
  updateInfoWindow(content) {
    this.extraTools.infoWindow.setContent(content)
  }

  // 打开 infowindow
  openInfoWindow(lnglat) {
    this.extraTools.infoWindow.open(this.mapInstance, lnglat)
  }

  // 关闭 infoWindow
  closeInfoWindow() {
    this.extraTools.infoWindow.close()
  }

  // 移除覆盖物
  removeMarker(markerList) {
    this.mapInstance.remove(markerList)
  }

  // 获取某个覆盖物
  getAllOverLays(type) {
    const overLays = this.mapInstance.getAllOverlays(type)
    const groups = this.createOverlayGroups(overLays)
    return groups
  }

  // 创建覆盖物群组
  createOverlayGroups(overLays) {
    const groups = new window.AMap.OverlayGroup(overLays)
    return groups
  }

  // 清除图层
  removeLayer(layer) {
    this.mapInstance.removeOverlay(layer)
  }

  // 清除所有覆盖物
  removeAllMarker() {
    this.mapInstance.clearMap()
  }

  // 加载ui库
  loadUiLibary() {
    return window.window.AMapUI
  }

  // 销毁地图
  destory() {
    this.mapInstance && this.mapInstance.destroy()
  }

  // 添加覆盖物
  addMarker(markerList) {
    this.mapInstance.add(markerList)
  }

  // 添加圆形区域
  addCircleMarker(circleConfig) {
    return new window.AMap.Circle(circleConfig)
  }

  // 获取当前层级
  getZoom() {
    const zIndex = this.mapInstance.getZoom()
    return zIndex
  }

  setZoom(index) {
    this.mapInstance.setZoom(index)
  }

  // 设置中心点
  setCenter(lng, lat) {
    let lnglat = this.createLnglat(lng, lat)
    lnglat && this.mapInstance.setCenter(lnglat)
  }

  // 设置层级和中心点
  setZoomAndCenter(zoomLevel, lng, lat) {
    this.mapInstance.setZoomAndCenter(zoomLevel, [lng, lat])
  }

  // 适应所有的覆盖物
  setFitView(markerList) {
    if (markerList && markerList.length !== 0) {
      this.mapInstance.setFitView(markerList)
    } else {
      this.mapInstance.setFitView()
    }
  }

  // 创建多边形
  createPolygon(options) {
    const polyGon = new window.AMap.Polygon({
      map: this.mapInstance,
      ...options,
    })
    return polyGon
  }
  // 创建多边形
  creatPolygon(options) {
    const polyGon = new window.AMap.Polygon({
      ...options,
    })
    return polyGon
  }

  // 创建折现
  createPolyline(options) {
    const polyLine = this.install('Polyline', options)
    return polyLine
  }

  // 创建折现
  creatPolyline(options) {
    const polyLine = new window.AMap.Polyline(options)
    return polyLine
  }

  // 监听事件
  listen(evName, fn) {
    this.mapInstance.on(evName, function() {
      fn()
    })
  }

  // 正向编码（地理位置转换为经纬度）
  toLocation(address) {
    return new Promise((resolve, reject) => {
      this.plugins.Geocoder.getLocation(address, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          if (result.geocodes.length === 0) {
            reject(new Error('没有找到匹配的数据'))
          } else {
            resolve(result)
          }
        } else {
          reject(new Error('没有找到匹配的数据'))
        }
      })
    })
  }

  // 逆向编码（经纬度转换为地理位置）
  toAddress(lnglat) {
    return new Promise((resolve, reject) => {
      this.plugins.Geocoder.getAddress(lnglat, function(status, result) {
        if (status === 'complete' && result.regeocode) {
          resolve(result.regeocode.formattedAddress)
        } else {
          reject(new Error('address has not found...'))
        }
      })
    })
  }
  // 行政区查询
  districtSearch(name) {
    return new Promise(resolve => {
      this.plugins.DistrictSearch.search(name, function(status, result) {
        if (status === 'complete') {
          resolve(result.districtList[0])
          // getData(, obj.id);
        }
      })
    })
  }
  // 模糊搜索
  search(address) {
    return new Promise((resolve, reject) => {
      this.plugins.Autocomplete.search(address, function(status, result) {
        if (result.tips) {
          resolve(result.tips)
        } else {
          reject(new Error('没有找到匹配的数据'))
        }
      })
    })
  }

  // 使用 poi 搜索
  usePoiSearch(address) {
    return new Promise((resolve, reject) => {
      this.plugins.AutoComplete.search(address, function(status, result) {
        if (status === 'complete') {
          resolve(result)
        } else {
          reject(new Error('没有找到匹配的数据'))
        }
      })
    })
  }

  // 使用完整搜索
  fullSearch(address) {
    return new Promise((resolve, reject) => {
      this.plugins.AutoComplete.search(address, function(status, result) {
        if (status === 'complete') {
          if (result[0].location) resolve(result)
          else {
            this.toLocation(address)
          }
        } else {
          reject(new Error('没有找到匹配的数据'))
        }
      })
    })
  }

  // 移除监听事件
  off(eventName, fn) {
    this.mapInstance.off(eventName, fn)
  }

  // 添加监听事件
  add(eventName, fn) {
    this.mapInstance.on(eventName, fn)
  }

  // 事件发布
  pub(name, payload) {
    this.dep.forEach(event => {
      if (event.name === name && event.fn) {
        try {
          event.fn.call(event.fn, payload)
        } catch (error) {
          throw new Error('Missing required parameters')
        }
      }
    })
  }
  //打点

  // 事件触发
  emit(name, payload) {
    this.pub(name, payload)
  }

  // 事件接收
  on(name, fn) {
    this.dep.push({
      name,
      fn,
    })
  }

  // 自定义实例化事件
  install(installerName, options) {
    const model = new window.AMap[installerName]({
      ...options,
    })
    return model
  }

  // 安装插件方法,用于额外实例化插件
  installExtractPlugins(pluginName, fn) {
    window.AMap.plugin('window.AMap' + pluginName, function() {
      fn.apply(fn)
    })
  }

  // 绑定自定义地图事件
  addListener(mapEvent, eventType, fun) {
    window.AMap.Event.addListener(mapEvent, eventType, fun)
  }

  // 返回MouseTool实例
  getMouseToolInstance() {
    return this.plugins.MouseTool
  }
  // 返回地图实例
  getInstance() {
    return this.mapInstance
  }
  getIsPointInRing(point, path) {
    const isPoint = window.AMap.GeometryUtil.isPointInRing(point, path)
    return isPoint
  }
}

export default Map
