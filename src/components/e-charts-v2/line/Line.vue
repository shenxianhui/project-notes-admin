<!--
 * @Description: [组件]柱线图
 * @Author: shenxh
 * @Date: 2022-07-11 09:26:09
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-12 17:35:05
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
      console.log(this.xAxisData);
      return {
        legend: {
          top: 10,
          textStyle: {
            fontSize: 16,
            color: '#000',
          },
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        xAxis: {
          type: 'category',
          data: this.xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        series: this.option.series.map(item => {
          return {
            type: 'line',
            data: item.data.map(item1 => {
              return {
                name: item1[this.nameKey],
                value: item1[this.valueKey],
              };
            }),
          };
        }),
      };
    },

    // xAxis.data
    xAxisData() {
      let data = [];

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
    window.addEventListener('resize', this.init);
  },
  beforeDestroy() {
    this.dispose();
    window.removeEventListener('resize', this.init);
  },
  methods: {
    // 实例初始化
    init() {
      this.dispose();

      const id = this.id || this.uuid;

      this.chart = Echarts.init(document.getElementById(id));

      // this.setOption(); // 开启后首次渲染 xAxisData 获取不到
      this.click();
    },

    // 设置配置项, 刷新图表
    setOption() {
      Object.entries(this.optionData).forEach(item => {
        const isArray = Array.isArray(item[1]);

        if (isArray) {
          let arr = [];

          item[1].forEach((item1, index1) => {
            arr[index1] = {
              ...item1,
            };
          });

          this.option[item[0]] = arr;
        } else {
          this.option[item[0]] = {
            ...item[1],
            ...(this.option[item[0]] || {}),
          };
        }
      });

      console.log(this.option);

      this.chart && this.chart.setOption(this.option);
    },

    // 点击事件
    click() {
      this.chart.off('click');
      this.chart.on('click', evt => {
        this.$emit('click', evt);

        this.setOption();
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
  },
};
</script>

<style lang="less" scoped></style>
