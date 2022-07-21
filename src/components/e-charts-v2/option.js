// 直角坐标系
export const cartesianCoordinateSystemOption = {
  // [标题](https://echarts.apache.org/zh/option.html#title)
  title: {
    show: false,
    textStyle: {
      color: '#333',
      fontSize: 18,
    },
  },

  // [图例](https://echarts.apache.org/zh/option.html#legend)
  legend: {
    top: 10,
    textStyle: {
      fontSize: 12,
      color: '#000',
    },
  },

  // [直角坐标系内绘图网格](https://echarts.apache.org/zh/option.html#grid)
  grid: {
    left: 10,
    top: 60,
    right: 20,
    bottom: 20,
    containLabel: true,
  },

  // [直角坐标系 grid 中的 x 轴](https://echarts.apache.org/zh/option.html#xAxis)
  xAxis: {
    name: '',
    type: 'category',
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: '#000',
      },
    },
    axisLabel: {
      color: '#000',
      fontSize: 12,
    },
  },

  // [直角坐标系 grid 中的 y 轴](https://echarts.apache.org/zh/option.html#yAxis)
  yAxis: {
    type: 'value',
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: '#000',
      },
    },
    axisLabel: {
      color: '#000',
      fontSize: 12,
    },
    splitLine: {
      color: '#eee',
      lineStyle: {
        opacity: 0.2,
      },
    },
  },

  // [提示框](https://echarts.apache.org/zh/option.html#tooltip)
  tooltip: {
    trigger: 'axis',
  },

  // [坐标轴指示器](https://echarts.apache.org/zh/option.html#axisPointer)
  axisPointer: {
    type: 'line',
  },

  // [图表配置](https://echarts.apache.org/zh/option.html#series)
  series: {
    smooth: true,
  },
};

// 饼图
export const pieOption = {
  // [标题](https://echarts.apache.org/zh/option.html#title)
  title: {
    show: false,
    textStyle: {
      color: '#333',
      fontSize: 18,
    },
  },

  // [图例](https://echarts.apache.org/zh/option.html#legend)
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 20,
    top: 20,
    bottom: 20,
  },

  // [提示框](https://echarts.apache.org/zh/option.html#tooltip)
  tooltip: {
    trigger: 'item',
  },

  // [图表配置](https://echarts.apache.org/zh/option.html#series)
  series: {
    center: ['40%', '50%'],
    radius: [0, '75%'],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
};

// 雷达图
export const radarOption = {
  // [标题](https://echarts.apache.org/zh/option.html#title)
  title: {
    show: false,
    textStyle: {
      color: '#333',
      fontSize: 18,
    },
  },

  // [图例](https://echarts.apache.org/zh/option.html#legend)
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 20,
    top: 20,
    bottom: 20,
  },

  // [雷达图坐标系](https://echarts.apache.org/zh/option.html#radar)
  radar: {
    center: ['40%', '50%'],
    radius: '75%',
    startAngle: 90,
  },

  // [提示框](https://echarts.apache.org/zh/option.html#tooltip)
  tooltip: {
    trigger: 'item',
  },

  // [图表配置](https://echarts.apache.org/zh/option.html#series)
  series: {},
};
