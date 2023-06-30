export default [
  {
    label: '点',
    value: 'point',
    data: [
      {
        label: '基础',
        value: 'base',
        selected: true,
        switched: false,
        showSwitch: true,
        legendIcon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_水质检测.svg',
        pointIcon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_水质监测点.svg',
      },
      {
        // code: 'gsfw',
        label: '聚合',
        value: 'cluster',
        selected: false,
        legendIcon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_流量.svg',
        pointIcon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_流量监测点.svg',
      },
    ],
  },
  {
    label: '线',
    value: 'line',
    data: [
      {
        label: '基础',
        value: 'base',
        selected: true,
        legendIcon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_车辆.svg',
        pointIcon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_车辆.svg',
      },
    ],
  },
  {
    label: '面',
    value: 'surface',
    data: [
      {
        label: '基础',
        value: 'base',
        selected: true,
        legendIcon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_供水范围.svg',
      },
      {
        label: '下钻',
        value: 'drill',
        selected: false,
        legendIcon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_分区.svg',
      },
    ],
  },
]
