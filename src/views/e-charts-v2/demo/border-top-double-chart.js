/*
 * @Description: 上下双柱 + 顶部边框
 * @Author: shenxh
 * @Date: 2024-09-06 14:35:32
 * @LastEditors: shenxh
 * @LastEditTime: 2024-09-26 13:52:15
 */

function getBorderHeight(list1 = [], list2 = []) {
  const max = Math.max(Math.max.apply(null, list1), Math.max.apply(null, list2))
  let min = Math.min(Math.min.apply(null, list1), Math.min.apply(null, list2))
  const cmax = Math.max.apply(null, list1)
  let scale = 1

  if (cmax < max) {
    scale = max / cmax
  }

  // 防止除零错误
  if (min === 0) {
    min = 1
  }

  // 计算高度比例的系数
  const heightRatio = 0.05

  // 计算边框高度
  let borderHeight = (max - min) * heightRatio

  if (cmax < max) {
    borderHeight = ((max - min) * heightRatio) / scale
  }

  return Array(list1.length).fill(borderHeight)
}

const seriesData1 = [300, 332, 301, 334, 390, 330, 320]
const seriesData2 = [10, 23, 21, 15, 10, 30, 40]

const containerHeight = document.getElementById('chart-container').offsetHeight
const gridHeight = (containerHeight - 108) / 2

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
    ],
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: [
    {
      left: 50,
      top: 40,
      right: 20,
      bottom: null,
      containLabel: false,
      height: gridHeight,
    },
    {
      left: 50,
      top: null,
      right: 20,
      bottom: 40,
      containLabel: false,
      height: gridHeight,
    },
  ],
  xAxis: [
    {
      type: 'category',
      gridIndex: 0,
      data: ['A', 'B', 'C', 'D'],
    },
    {
      type: 'category',
      gridIndex: 1,
      data: ['A', 'B', 'C', 'D'],
    },
  ],
  yAxis: [
    {
      gridIndex: 0,
    },
    {
      gridIndex: 1,
      inverse: true,
    },
  ],
  series: [
    {
      name: '柱1',
      type: 'bar',
      stack: 1,
      itemStyle: {
        color: '#76bd85',
        opacity: 0.3,
      },
      xAxisIndex: 0,
      yAxisIndex: 0,
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
      xAxisIndex: 0,
      yAxisIndex: 0,
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
      xAxisIndex: 1,
      yAxisIndex: 1,
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
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: getBorderHeight(seriesData2, seriesData1),
    },
  ],
}
