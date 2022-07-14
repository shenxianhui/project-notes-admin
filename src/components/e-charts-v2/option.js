export default {
  // [标题](https://echarts.apache.org/zh/option.html#title)
  title: {
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
    top: 50,
    right: 10,
    bottom: 20,
    containLabel: true,
  },

  // [直角坐标系 grid 中的 x 轴](https://echarts.apache.org/zh/option.html#xAxis)
  xAxis: {
    name: '',
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

  // [图表内部配置](https://echarts.apache.org/zh/option.html#series)
  series: {
    smooth: true,
    itemStyle: {
      color: '#a1c4fd',
    },
    lineStyle: {
      color: '#a1c4fd',
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#00C1DE99',
          },
          {
            offset: 1,
            color: '#0080DE0D',
          },
        ],
      },
    },
  },
};
