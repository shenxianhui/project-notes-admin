export default {
  point: {
    name: '点',
    data: [
      {
        label: '基础',
        value: 'point-base',
        selected: true,
        switch: {
          show: true,
          checked: false,
        },
        icon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_水厂.svg',
        map: {
          marker: {
            icon:
              'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_水厂点.svg',
            // active: {
            //   icon: 'xxx',
            // },
            // alarm: {
            //   icon: 'xxx',
            // },
          },
        },
      },
      {
        label: '聚合',
        value: 'point-cluster',
        selected: false,
        icon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_压力.svg',
        map: {
          marker: {
            icon:
              'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_压力监测点.svg',
          },
        },
      },
    ],
  },
  line: {
    name: '线',
    data: [
      {
        label: '基础',
        value: 'line-base',
        selected: true,
        icon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_车辆.svg',
      },
      {
        label: '动画',
        value: 'line-animate',
        selected: true,
        icon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_压力.svg',
      },
    ],
  },
  surface: {
    name: '面',
    data: [
      {
        label: '基础',
        value: 'surface-base',
        selected: true,
        icon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_供水范围.svg',
      },
      // {
      //   label: '下钻',
      //   value: 'surface-drill',
      //   selected: false,
      //   icon:
      //     'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_分区.svg',
      // },
    ],
  },
}
