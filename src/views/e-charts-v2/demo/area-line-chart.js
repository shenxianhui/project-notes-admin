/*
 * @Description: 用 line 实现顶部边框的柱图效果 (tooltip 有问题, 因为线是端点触发, 柱是中间触发)
 * @Author: shenxh
 * @Date: 2024-12-16 14:40:44
 * @LastEditors: shenxh
 * @LastEditTime: 2024-12-17 09:47:58
 */

const xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// 自动计算 markArea.data
function getMarkAreaData(seriesData = []) {
  const result = []
  let tempGroup = []
  let currentValue = null

  for (let i = 0; i < xAxisData.length; i++) {
    const name = xAxisData[i]
    const value = seriesData[i]

    if (value !== null) {
      if (currentValue === null) {
        tempGroup = [{ name: `${value}`, xAxis: name, yAxis: value }]
        currentValue = value
      }
      tempGroup[1] = { xAxis: name, yAxis: value }
    } else {
      if (currentValue !== null) {
        result.push(tempGroup)
        tempGroup = []
        currentValue = null
      }
    }
  }

  // 检查最后一组是否需要加入
  if (tempGroup.length > 0) {
    result.push(tempGroup)
  }

  return result
}

const option = {
  legend: {
    show: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: xAxisData,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '线1',
      data: [100, 100, null, null, null, null, null],
      type: 'line',
      symbol: 'none',
      lineStyle: {
        width: 10,
      },
      markArea: {
        data: getMarkAreaData([100, 100, null, null, null, null, null]),
      },
      areaStyle: {},
    },
    {
      name: '线2',
      data: [null, 200, 200, 200, null, null, null],
      type: 'line',
      symbol: 'none',
      lineStyle: {
        width: 10,
      },
      markArea: {
        data: getMarkAreaData([null, 200, 200, 200, null, null, null]),
      },
      areaStyle: {},
    },
    {
      name: '线3',
      data: [null, null, null, 150, 150, null, null],
      type: 'line',
      symbol: 'none',
      lineStyle: {
        width: 10,
      },
      markArea: {
        data: [
          [
            {
              name: '150',
              xAxis: 'Thu',
              yAxis: 150,
            },
            {
              xAxis: 'Fri',
              yAxis: 150,
            },
          ],
        ],
      },
      areaStyle: {},
    },
    {
      name: '线4',
      data: [null, null, null, null, 250, 250, 250],
      type: 'line',
      symbol: 'none',
      lineStyle: {
        width: 10,
      },
      markArea: {
        data: [
          [
            {
              name: '250',
              xAxis: 'Fri',
              yAxis: 250,
            },
            {
              xAxis: 'Sun',
              yAxis: 250,
            },
          ],
        ],
      },
      areaStyle: {},
    },
  ],
}
