/*
 * @Description: 用 line 实现顶部边框的柱图效果 (tooltip 有问题, 因为线是端点触发, 柱是中间触发)
 * @Author: shenxh
 * @Date: 2024-12-16 14:40:44
 * @LastEditors: shenxh
 * @LastEditTime: 2024-12-17 09:01:00
 */

const option = {
  legend: {
    show: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        data: [
          [
            {
              name: '100',
              xAxis: 'Mon',
              yAxis: 100,
            },
            {
              xAxis: 'Tue',
              yAxis: 100,
            },
          ],
        ],
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
        data: [
          [
            {
              name: '200',
              xAxis: 'Tue',
              yAxis: 200,
            },
            {
              xAxis: 'Thu',
              yAxis: 200,
            },
          ],
        ],
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
