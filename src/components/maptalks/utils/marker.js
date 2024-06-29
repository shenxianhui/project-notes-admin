import * as maptalks from 'maptalks'
import MT from '.'

export default {
  // Marker 初始化
  init(data = {}) {
    const { id, coordinate, legend = {} } = data
    const { map = {}, icon } = legend
    const { marker: legMarker = {} } = map
    const options = {
      id,
      cursor: 'pointer',
      symbol: {
        markerFile: legMarker.icon || icon,
        markerWidth: legMarker.width || 32,
        markerHeight: legMarker.height || 49,
        markerDx: 0,
        markerDy: 0,
        markerOpacity: 1,
      },
      zIndex: 5,
    }
    const marker = MT.marker.init(coordinate, options)

    marker.geometryType = 'Marker'
    marker.data = data

    return marker
  },

  // 闪烁点初始化
  initFlashingPoint(data = {}) {
    const { id, coordinate } = data
    const options = {
      id: 'point-' + id,
      cursor: 'pointer',
      symbol: {
        markerFile: require('@/assets/img/map/flashing_point.png'),
        markerWidth: 55,
        markerHeight: 20,
        markerDx: 0,
        markerDy: 10,
        markerOpacity: 1,
      },
      zIndex: 1,
    }
    const marker = MT.marker.init(coordinate, options)

    marker.geometryType = 'FlashingPoint'

    const animate = this.animate(marker)

    marker.animate = animate

    return marker
  },

  // 运动, 不需要时记得清除
  animate(marker) {
    const targetStyles = {
      symbol: {
        markerWidth: 55,
        markerHeight: 20,
        markerDx: 0,
        markerDy: 10,
      },
    }
    const player = new maptalks.animation.Animation.animate(
      targetStyles,
      {
        duration: 2000,
        easing: 'out',
      },
      // callback of each frame
      frame => {
        if (frame.state.playState === 'running') {
          marker.updateSymbol(frame.styles.symbol)
        } else if (frame.state.playState === 'finished') {
          player.cancel()
          player.play()
        }
      },
    )

    player.play()

    return player
  },

  // 创建点位弹窗
  initInfoWindow(marker, data = {}) {
    marker.setInfoWindow({
      single: false, // 弹窗只允许弹出一个
      custom: true, // 自定义信息窗口
      autoPan: false, // 地图进行平移动画以适应打开的窗口
      animation: 'fade',
      animationDuration: 150,
      dy: -5, // y轴偏移
      content: this.getInfoWindowContent(data),
    })
  },

  setInfoWindowContent(marker, dataList = []) {
    const { _id } = marker
    const data = dataList.find(item => item.id === _id) || {}
    const content = this.getInfoWindowContent(data)

    marker.getInfoWindow() && marker.getInfoWindow().setContent(content)
  },

  getInfoWindowContent(data = {}) {
    const { name = '-', infoWindow = [], alarm, code } = data
    let infoStrDom = ''

    infoWindow.forEach(item => {
      const { label, value, unit = '', alarm } = item
      const dom = `
				<div class="marker-popup-body-row">
					<div class="marker-popup-body-row-label">${label}</div>
					<div class="marker-popup-body-row-value
						${alarm ? 'danger' : ''}
						${code === 'yljcd' ? 'only-value' : ''}"
					>
						${(value || '-') + unit}
					</div>
				</div>
			`

      infoStrDom += dom
    })
    const jsonData = JSON.stringify(data)
    const queryJsonData = JSON.stringify(jsonData).replace(/\"/g, '&quot;') // 转义
    const content = `
		<div class="marker-popup ${alarm ? 'danger' : ''}">
			<div class="marker-popup-header" onclick="handleMarkerPopup('header', ${queryJsonData})">
				<div class="marker-popup-header-title">${name}</div>
				<img
					class="marker-popup-header-icon"
					src="https://eslink-iot.oss-cn-beijing.aliyuncs.com/arrow-right-s-line.svg",
					width="16",
					height="16" />
			</div>
			<div class="marker-popup-body">
				${infoStrDom}
			</div>
		</div>
	`

    return content
  },
}
