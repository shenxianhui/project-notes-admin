export default [
  {
    label: '点',
    value: 'point',
    data: [
      {
        label: '基础',
        value: 'basePoint',
        selected: true,
        switched: false,
        showSwitch: true,
        legendIcon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_水厂.svg',
        pointIcon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_水厂点.svg',
      },
      {
        label: '聚合',
        value: 'clusterPoint',
        selected: false,
        legendIcon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_压力.svg',
        pointIcon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_压力监测点.svg',
      },
    ],
  },
  {
    label: '线',
    value: 'line',
    data: [
      {
        label: '基础',
        value: 'baseLine',
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
        value: 'baseSurface',
        selected: true,
        legendIcon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_供水范围.svg',
      },
      {
        label: '下钻',
        value: 'drillSurface',
        selected: false,
        legendIcon:
          'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_分区.svg',
      },
    ],
  },
]
