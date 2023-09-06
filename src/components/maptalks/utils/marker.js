import MT from '.'

export default {
  // Marker 初始化
  init(data = {}) {
    const { id, coordinate, markerFile } = data
    const options = {
      id,
      cursor: 'pointer',
      symbol: {
        markerFile,
        markerWidth: 32,
        markerHeight: 49,
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
