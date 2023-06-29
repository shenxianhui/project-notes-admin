export default {
  // 水厂监控
  station: [
    {
      // code: 'gsfw',
      label: '供水范围',
      value: 'SUPPLY_SCOPE',
      selected: true,
      switched: true,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_供水范围.svg',
    },
    {
      // code: 'ysbz',
      label: '原水泵站',
      value: 'SOURCE_PUMP',
      selected: true,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_源水泵站.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_源水泵站点.svg',
    },
    {
      // code: 'sc',
      label: '水厂',
      value: 'WATER_WORKS',
      selected: true,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_水厂.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_水厂点.svg',
    },
    {
      // code: 'jybz',
      label: '加压泵站',
      value: 'PRESSURE_STATION',
      selected: true,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_泵站.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_加压泵站点.svg',
    },
    {
      // code: 'yljcd',
      label: '压力监测点',
      value: 'PRESSURE_MONITOR_POINT',
      selected: false,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_压力.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_压力监测点.svg',
    },
    {
      // code: 'szjcd',
      label: '水质监测点',
      value: 'WATER_MONITOR_POINT',
      selected: false,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_水质检测.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_水质监测点.svg',
    },
    {
      // code: 'lljcd',
      label: '流量监测点',
      value: 'FLOW_MONITOR_POINT',
      selected: false,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_流量.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_流量监测点.svg',
    },
    {
      // code: 'cl',
      label: '车辆',
      value: 'CAR',
      selected: true,
      switched: false,
      showSwitch: false,
      noSwitch: true,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_车辆.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_车辆.svg',
    },
  ],
  // 供水总览
  overview: [
    {
      // code: 'ysbz',
      label: '原水泵站',
      value: 'SOURCE_PUMP',
      selected: false,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_源水泵站.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_源水泵站点.svg',
    },
    {
      // code: 'sc',
      label: '水厂',
      value: 'WATER_WORKS',
      selected: true,
      switched: true,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_水厂.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_水厂点.svg',
    },
    {
      // code: 'jybz',
      label: '加压泵站',
      value: 'PRESSURE_STATION',
      selected: false,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_泵站.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_加压泵站点.svg',
    },
    {
      // code: 'yljcd',
      label: '压力监测点',
      value: 'PRESSURE_MONITOR_POINT',
      selected: false,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_压力.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_压力监测点.svg',
    },
    {
      // code: 'szjcd',
      label: '水质监测点',
      value: 'WATER_MONITOR_POINT',
      selected: false,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_水质检测.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_水质监测点.svg',
    },
    {
      // code: 'lljcd',
      label: '流量监测点',
      value: 'FLOW_MONITOR_POINT',
      selected: false,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_流量.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_流量监测点.svg',
    },
    {
      // code: 'cl',
      label: '车辆',
      value: 'CAR',
      selected: false,
      switched: false,
      showSwitch: false,
      noSwitch: true,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_车辆.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_车辆.svg',
    },
  ],
  // 管网管理
  pipeline: [
    {
      // code: 'dmafq',
      label: 'DMA分区',
      value: 'DMA',
      selected: true,
      switched: true,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_分区.svg',
    },
    {
      // code: 'ysbz',
      label: '原水泵站',
      value: 'SOURCE_PUMP',
      selected: false,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_源水泵站.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_源水泵站点.svg',
    },
    {
      // code: 'sc',
      label: '水厂',
      value: 'WATER_WORKS',
      selected: false,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_水厂.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_水厂点.svg',
    },
    {
      // code: 'jybz',
      label: '加压泵站',
      value: 'PRESSURE_STATION',
      selected: false,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_泵站.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_加压泵站点.svg',
    },
    {
      // code: 'yljcd',
      label: '压力监测点',
      value: 'PRESSURE_MONITOR_POINT',
      selected: false,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_压力.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_压力监测点.svg',
    },
    {
      // code: 'szjcd',
      label: '水质监测点',
      value: 'WATER_MONITOR_POINT',
      selected: false,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_水质检测.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_水质监测点.svg',
    },
    {
      // code: 'lljcd',
      label: '流量监测点',
      value: 'FLOW_MONITOR_POINT',
      selected: false,
      switched: false,
      showSwitch: false,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_流量.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_流量监测点.svg',
    },
    {
      // code: 'cl',
      label: '车辆',
      value: 'CAR',
      selected: false,
      switched: false,
      showSwitch: false,
      noSwitch: true,
      legendIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113240943_车辆.svg',
      pointIcon:
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/20220905113744400_车辆.svg',
    },
  ],
}
