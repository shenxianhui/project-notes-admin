import MT from '.'

export default {
  init(coordinates, options) {
    const opt = {
      visible: true,
      editable: true,
      cursor: 'pointer',
      draggable: false,
      dragShadow: false, // 拖动阴影
      drawOnAxis: null, // 轴上的拖动杆，可以是：x，y
      symbol: {
        lineColor: '#4DFFD4',
        lineWidth: 2,
        polygonFill: '#4DFFD4',
        polygonOpacity: 0.5,
      },
      ...options,
    }
    const polygon = MT.polygon.init(coordinates, opt)

    return polygon
  },
}
