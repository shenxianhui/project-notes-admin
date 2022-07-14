<!--
 * @Description: [组件]柱线图
 * @Author: shenxh
 * @Date: 2022-07-11 09:26:09
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-14 17:32:12
-->

<template>
  <div :id="id || uuid" class="xx-line" :style="{ width, height }"></div>
</template>

<script>
import * as Echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { uuid } from '@/utils/utils';
import option from '../option';

Echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export default {
  name: 'xx-line',
  components: {},
  props: {
    // id (非必填)
    id: [String, Number],
    // 数据改变时自动更新图表
    // autoUpdate: Boolean,
    // 宽度
    width: {
      type: String,
      default: '100%',
    },
    // 高度
    height: {
      type: String,
      default: '100%',
    },
    // 图表配置项 (除 series.data 单独写, 其他与官方文档一致)
    option: {
      type: Object,
      default() {
        return {};
      },
    },
    // [必填]图表数据
    // 例: [[{ name: '折线a', value: 100 }], [{ name: '折线b', value: 200 }]]
    // data: {
    //   type: Array,
    //   required: true,
    // },
    // name 的 key 值
    nameKey: {
      type: String,
      default: 'name',
    },
    // value 的 key 值
    valueKey: {
      type: String,
      default: 'value',
    },
  },
  data() {
    return {
      uuid: uuid(),
      chart: null,
    };
  },
  computed: {
    // 设置默认配置项
    optionData() {
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>优化: 使用 Object.entries(option) 自动给设置配置项
      const { title, legend, grid, xAxis, yAxis, tooltip, series } = option;

      return {
        title: this.getOptionParam(title, 'title'),
        legend: this.getOptionParam(legend, 'legend'),
        grid: this.getOptionParam(grid, 'grid'),
        xAxis: this.getOptionParam(
          {
            ...xAxis,
            boundaryGap: false,
            data: this.xAxisData,
          },
          'xAxis',
        ),
        yAxis: this.getOptionParam(yAxis, 'yAxis'),
        tooltip: this.getOptionParam(tooltip, 'tooltip'),
        series: this.getOptionParam(
          this.option.series.map(item => {
            return {
              ...series,
              type: 'line',
              data: item.data.map(item1 => {
                return {
                  name: item1[this.nameKey],
                  value: item1[this.valueKey],
                };
              }),
            };
          }),
          'series',
        ),
      };
    },

    // xAxis.data
    xAxisData() {
      let data;

      for (let i = 0; i < this.option.series.length; i++) {
        const seriesData = this.option.series[i].data;

        if (seriesData && seriesData.length) {
          data = seriesData.map(item => {
            return item[this.nameKey];
          });

          break;
        }
      }

      return data;
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.init();
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    this.dispose();
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    // 实例初始化
    init() {
      this.dispose();

      const id = this.id || this.uuid;

      this.chart = Echarts.init(document.getElementById(id));

      // this.setOption();
      this.click();
    },

    // 设置配置项, 刷新图表 (需父组件主动调用)
    setOption() {
      Object.entries(this.optionData).forEach(item => {
        const isArray = Array.isArray(item[1]);

        if (isArray) {
          let arr = [];

          this.option[item[0]].forEach((item1, index1) => {
            arr[index1] = {
              ...item[1][index1],
              ...item1,
            };
          });

          this.option[item[0]] = arr;
        } else {
          this.option[item[0]] = {
            ...item[1],
            ...this.option[item[0]],
          };
        }
      });

      this.chart && this.chart.setOption(this.option);
    },

    // 点击事件
    click() {
      this.chart.off('click');
      this.chart.on('click', evt => {
        this.$emit('click', evt);
      });
    },

    // 销毁图表实例
    dispose() {
      if (this.chart && !this.chart.isDisposed()) {
        this.chart.clear(); // 释放图形资源
        this.chart.dispose(); // 销毁实例对象
        this.chart = null;
      }
    },

    // 窗口尺寸变化
    resize() {
      this.init();
      this.setOption();
    },

    // 获取 option 参数的对应类型
    getOptionParam(param, key) {
      if (Array.isArray(this.option[key]) && !Array.isArray(param)) {
        return [param];
      } else {
        return param;
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
