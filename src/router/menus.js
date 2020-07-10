/*
 * @Author: Wells
 * @Date: 2020-02-21 11:01:43
 * @LastEditors: shenxh
 * @LastEditTime: 2020-07-10 16:17:56
 * @Description: 导航列表
 */

// 顶部导航列表
const menus = [
  {
    label: 'ECharts',
    value: 'echarts',
    url: 'echarts',
    list: 'echartsList'
  },
  {
    label: '地图',
    value: 'map',
    url: 'map',
    list: 'mapList'
  },
  {
    label: '动画',
    value: 'animation',
    url: 'animation',
    list: 'animationList'
  },
  {
    label: '游戏',
    value: 'game',
    url: 'game',
    list: 'gameList'
  },
  {
    label: '模板',
    value: 'template',
    url: 'template',
    list: 'templateList'
  },
  {
    label: 'Swiper',
    value: 'swiper',
    url: 'swiper',
    list: 'swiperList'
  }
  // {
  //   label: '算法',
  //   value: 'algorithm',
  //   url: 'algorithm',
  //   list: 'algorithmList'
  // }
];

// 侧边导航列表
const submenus = {
  // Echarts
  echartsList: [
    {
      label: '图表',
      value: 'chart',
      type: 'echarts',
      children: [
        {
          label: '联动',
          value: 'chart',
          url: 'chart'
        }
      ]
    },
    {
      label: '地图',
      value: 'map',
      type: 'echarts',
      children: [
        {
          label: '散点&映射',
          value: 'mapScatter',
          url: 'map-scatter'
        }
      ]
    },
    {
      label: '路径图',
      value: 'lines',
      type: 'echarts',
      children: [
        {
          label: '北京',
          value: 'linesBeijing',
          url: 'lines-beijing'
        },
        {
          label: '上海',
          value: 'linesShanghai',
          url: 'lines-shanghai'
        }
      ]
    },
    {
      label: '路径图 - 3D',
      value: 'lines3D',
      type: 'echarts',
      children: [
        {
          label: '成都',
          value: 'lines3DChengdu',
          url: 'lines-3d-chengdu'
        },
        {
          label: '上海',
          value: 'lines3DShanghai',
          url: 'lines-3d-shanghai'
        }
      ]
    }
  ],
  // 地图
  mapList: [
    {
      label: '高德',
      value: 'gaode',
      type: 'map',
      children: [
        {
          label: '高德',
          value: 'gaode',
          url: 'gaode'
        }
      ]
    }
  ],
  // 动画
  animationList: [
    {
      label: '轨迹',
      value: 'trajectory',
      type: 'animation',
      children: [
        {
          label: '星系',
          value: 'galaxy',
          url: 'galaxy'
        }
      ]
    }
  ],
  // 游戏
  gameList: [
    {
      label: '贪吃蛇',
      value: 'snake',
      type: 'game',
      children: [
        {
          label: '贪吃蛇',
          value: 'snake',
          url: 'snake'
        }
      ]
    }
  ],
  // 模板
  templateList: [
    {
      label: '表格页',
      value: 'tablePage',
      type: 'template',
      children: [
        {
          label: '表格页',
          value: 'tablePage',
          url: 'table-page'
        }
      ]
    },
    {
      label: '编辑页',
      value: 'editPage',
      type: 'template',
      children: [
        {
          label: '编辑页',
          value: 'editPage',
          url: 'edit-page/0'
        }
      ]
    },
    {
      label: '详情页',
      value: 'detailsPage',
      type: 'template',
      children: [
        {
          label: '详情页',
          value: 'detailsPage',
          url: 'details-page/0'
        }
      ]
    }
  ],
  // Swiper
  swiperList: [
    {
      label: 'Progress',
      value: 'progress',
      type: 'swiper',
      children: [
        {
          label: '缩放',
          value: 'scale',
          url: 'scale'
        }
      ]
    }
  ]
  // 算法
  // algorithmList: [
  //   {
  //     label: '算法',
  //     value: 'algorithm',
  //     type: 'algorithm',
  //     children: [
  //       {
  //         label: '排序',
  //         value: 'sort',
  //         url: 'sort'
  //       }
  //     ]
  //   }
  // ]
};

export { menus, submenus };
