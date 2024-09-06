/*
 * @Description: 上下双柱堆叠
 * @Author: shenxh
 * @Date: 2024-09-06 14:35:32
 * @LastEditors: shenxh
 * @LastEditTime: 2024-09-06 14:57:05
 */

const containerHeight = document.getElementById('chart-container').offsetHeight
const gridHeight = (containerHeight - 108) / 2

const option = {
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
      name: 'Series 1',
      type: 'bar',
      stack: 'stack1',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: [120, 132, 101, 134],
    },
    {
      name: 'Series 2',
      type: 'bar',
      stack: 'stack1',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: [220, 182, 191, 234],
    },
    {
      name: 'Series 3',
      type: 'bar',
      stack: 'stack2',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: [150, 232, 201, 154],
    },
    {
      name: 'Series 4',
      type: 'bar',
      stack: 'stack2',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: [98, 77, 101, 99],
    },
  ],
}
