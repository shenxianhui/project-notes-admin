import MT from '.'

export default {
  // Label 初始化
  init(data = {}) {
    const { name, coordinate } = data
    const options = {
      cursor: 'default',
      boxStyle: {
        padding: [10, 6],
        symbol: {
          markerFill: '#0E161F',
          textWeight: 400,
          markerFillOpacity: 1,
          markerLineWidth: 1,
          markerLineColor: '#7491AE',
          textDy: -70,
        },
      },
      textSymbol: {
        textName: name,
        textWeight: 400,
        textSize: 14,
        textFill: '#fff',
      },
    }
    const label = MT.label.init(name, coordinate, options)

    label.geometryType = 'Label'
    label.data = data

    return label
  },
}
