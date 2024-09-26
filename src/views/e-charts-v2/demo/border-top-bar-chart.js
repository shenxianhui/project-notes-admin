function getBorderHeight(list1 = [], list2 = []) {
  const max = Math.max(Math.max.apply(null, list1), Math.max.apply(null, list2))
  let min = Math.min(Math.min.apply(null, list1), Math.min.apply(null, list2))

  // 防止除零错误
  if (min === 0) {
    min = 1
  }

  // 计算高度比例的系数
  const heightRatio = 0.02 // 设定比例，例如 2%

  // 计算边框高度
  const borderHeight = (max - min) * heightRatio

  return Array(list1.length).fill(borderHeight)
}

const seriesData1 = [300, 332, 301, 334, 390, 330, 320]
const seriesData2 = [10, 23, 21, 15, 10, 30, 40]

const option = {
  legend: {
    itemWidth: 15,
    itemGap: 18,
    data: [
      {
        name: '柱1',
        icon: 'path://M 0 0 H 8 V 8 H 0 Z',
        itemStyle: {
          color: '#76bd85',
          opacity: 1,
        },
      },
      {
        name: '柱2',
        icon: 'path://M 0 0 H 8 V 8 H 0 Z',
        itemStyle: {
          color: '#fc9c3c',
          opacity: 1,
        },
      },
      {
        name: '线1',
        icon: 'path://M 0 0 H 6 V 1 H 0 Z',
      },
    ],
    selected: {
      柱1: true,
      柱2: true,
      线1: true,
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '柱1',
      type: 'bar',
      stack: 1,
      itemStyle: {
        color: '#76bd85',
        opacity: 0.3,
      },
      data: seriesData1,
    },
    {
      name: '柱1',
      type: 'bar',
      stack: 1,
      itemStyle: {
        color: '#76bd85',
      },
      tooltip: {
        show: false,
      },
      data: getBorderHeight(seriesData1, seriesData2),
    },
    {
      name: '柱2',
      type: 'bar',
      stack: 2,
      itemStyle: {
        color: '#fc9c3c',
        opacity: 0.3,
      },
      data: seriesData2,
    },
    {
      name: '柱2',
      type: 'bar',
      stack: 2,
      itemStyle: {
        color: '#fc9c3c',
      },
      tooltip: {
        show: false,
      },
      data: getBorderHeight(seriesData1, seriesData2),
    },
    {
      name: '线1',
      type: 'line',
      data: [40, 150, 80, 120, 160, 220, 80],
    },
  ],
}
