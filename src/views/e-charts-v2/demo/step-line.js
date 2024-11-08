/*
 * @Description: 阶梯图 (与bar一起时, 两侧必须留白, 所以要特殊处理)
 * @Author: shenxh
 * @Date: 2024-11-08 17:15:01
 * @LastEditors: shenxh
 * @LastEditTime: 2024-11-08 17:16:05
 */

const xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const xAxisData1 = []

for (var i = 0; i < 1000; i++) {
  xAxisData1.push(i)
}

function getSeriesData1(value) {
  const num = (xAxisData1.length / xAxisData.length).toFixed(0) - 0
  console.log(num)
  const arr = new Array(num).fill(value)

  console.log(arr)
  return arr
}

const option = {
  legend: {},
  grid: [
    {
      left: 50,
      right: 50,
      bottom: 50,
    },
    {
      left: 50,
      right: 50,
      bottom: 50,
    },
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  xAxis: [
    {
      gridIndex: 0,
      type: 'category',
      data: xAxisData,
    },
    {
      gridIndex: 1,
      type: 'category',
      // boundaryGap: false,
      data: xAxisData1,
    },
  ],
  yAxis: [
    {
      gridIndex: 0,
      type: 'value',
    },
    {
      gridIndex: 1,
      type: 'value',
    },
  ],
  series: [
    {
      name: '柱',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    },
    {
      name: '线',
      xAxisIndex: 1,
      yAxisIndex: 1,
      type: 'line',
      step: 'start',
      data: [
        ...getSeriesData1(120),
        ...getSeriesData1(200),
        ...getSeriesData1(150),
        ...getSeriesData1(80),
        ...getSeriesData1(70),
        ...getSeriesData1(110),
        ...getSeriesData1(130),
      ],
    },
  ],
}
