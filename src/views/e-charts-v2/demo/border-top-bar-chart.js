/*
 * @Description: 顶部边框柱状图 (自定义图例icon纯色)
 * @Author: shenxh
 * @Date: 2024-09-06 14:53:54
 * @LastEditors: shenxh
 * @LastEditTime: 2024-09-06 16:57:23
 */

function getBorderHeight(list = []) {
  const sum = list.reduce((acc, curr) => acc + curr, 0)
  const average = sum / list.length / 40
  const arr = Array(list.length).fill(average)

  return arr
}

const seriesData1 = [120, 200, 150, 80, 70, 110, 130]
const seriesData2 = [125, 150, 220, 120, 80, 60, 110]

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
      data: getBorderHeight(seriesData1),
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
      data: getBorderHeight(seriesData2),
    },
    {
      name: '线1',
      type: 'line',
      data: [40, 150, 80, 120, 160, 220, 80],
    },
  ],
}
