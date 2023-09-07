import MT from '.'

export default {
  init(coordinates, animate) {
    let options = {
      symbol: {
        lineColor: '#4DFFD4',
        lineWidth: 2,
      },
    }

    if (animate) {
      options = {
        symbol: {
          linePatternFile: require('@/assets/img/map/line.svg'),
          linePatternDx: 0,
          lineWidth: 6, // linePatternFile 高度
        },
      }
    }
    const line = MT.lineString.init(coordinates, options)

    if (animate) {
      line.animate(
        {
          symbol: {
            linePatternDx: 30, // symbol.linePatternFile 宽度
          },
        },
        {
          repeat: true,
          // easing: 'linear',
        },
      )
    }

    return line
  },
}
