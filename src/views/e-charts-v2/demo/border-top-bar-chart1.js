/*
 * @Description: 顶部边框柱状图 (label实现, 但宽度不能自适应)
 * @Author: shenxh
 * @Date: 2024-10-11 14:40:09
 * @LastEditors: shenxh
 * @LastEditTime: 2024-10-11 14:40:37
 */

const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      label: {
        show: true,
        color: '#00000000',
        distance: 0,
        position: 'top',
        backgroundColor: '#f00',
        width: 72,
        height: 8,
      },
    },
  ],
}
