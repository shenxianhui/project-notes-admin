import MT from './base'

export default {
  // Marker 初始化
  init(data = {}) {
    const {
      id,
      name,
      coordinate,
      markerFile,

      /* 样式 */
      markerWidth = 40,
      markerHeight = 60,
      markerDx = 0,
      markerDy = 0,
      markerOpacity = 1,
    } = data

    const options = {
      id,
      cursor: 'pointer',
      symbol: [
        {
          markerFile,
          markerWidth,
          markerHeight,
          markerDx,
          markerDy,
          markerOpacity,
        },
        {
          markerType: 'square',
          markerWidth: this.getLabelWidth(name),
          markerHeight: 34,
          markerLineWidth: 1,
          markerDy: -93,
          ...this.getLabelColor(data),
        },
        {
          textFaceName: 'PingFang SC',
          textName: name, //value from name in geometry's properties
          textWeight: 600, //'bold', 'bolder'
          textStyle: 'normal', //'italic', 'oblique'
          textSize: 16,
          textFont: null, //same as CanvasRenderingContext2D.font, override textName, textWeight and textStyle
          textFill: '#fff',
          textOpacity: 1,
          textDy: -100,
          textHorizontalAlignment: 'middle', //left | middle | right | auto
          textVerticalAlignment: 'bottom', // top | middle | bottom | auto
          textAlign: 'center', //left | right | center | auto
        },
      ],
    }
    const marker = MT.marker.init(coordinate, options)

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
      // dy: -8, // y轴偏移
      dy: 40, // y轴偏移
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

  // 获取标签颜色
  getLabelColor(data = {}) {
    const { code, alarm, online } = data
    let obj = {
      markerFill: '#000000', // 背景色
      markerLineColor: '#6D708A', // 边框颜色
    }

    if (code === 'sc') {
      obj = {
        markerFill: '#009DE0',
        markerLineColor: '#85DBFF',
      }
    } else if (code === 'cl') {
      if (online) {
        obj = {
          markerFill: '#0FE2BC',
          markerLineColor: '#44FFDD',
        }
      } else {
        obj = {
          markerFill: '#5F627D',
          markerLineColor: '#BABBCA',
        }
      }
    }
    if (alarm) {
      obj = {
        markerFill: '#A83F3F',
        markerLineColor: '#E5615B',
      }
    }

    return obj
  },

  // 获取标签名长度
  getLabelWidth(label = '') {
    let len = 20

    for (let i = 0; i < label.length; i++) {
      const reg = /^[\u2E80-\u9FFF]+$/

      if (reg.test(label[i])) {
        len += 20
      } else {
        len += 12
      }
    }

    return len
  },
}
