<!--
 * @Author: shenxh
 * @Date: 2020-09-11 11:36:48
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-11 18:37:39
 * @Description: 组件-雷达图
-->

<template>
  <div :id="id || myId" class="xx-radar" :style="{ width, height }"></div>
</template>

<script>
import { uuid } from '@/utils/utils';

export default {
  name: 'xx-radar',
  components: {},
  props: {
    id: [String, Number],
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },

    title: Object,
    titleText: String,
    legend: Object,
    tooltip: Object,
    radar: Object,
    radarIndicator: Array, // 雷达图的指示器，用来指定雷达图中的多个变量（维度）
    series: [Array, Object],
    seriesData: Array
  },
  data() {
    return {
      myId: uuid()
    };
  },
  computed: {
    option() {
      return {
        title: this._title,
        legend: this._legend,
        tooltip: this._tooltip,
        radar: this._radar,
        series: this._series
      };
    },
    _title() {
      let title = Object.assign(
        {
          show: this.titleText ? true : false,
          text: this.titleText
        },
        this.title
      );

      return title;
    },
    _legend() {
      let legend = Object.assign(
        {
          show: false,
          top: '2%',
          textStyle: {
            fontSize: 14,
            color: '#000'
          },
          data: (() => {
            this.seriesData.map(item => {
              return {
                name: item.name
              };
            });
          })()
        },
        this.legend
      );

      return legend;
    },
    _tooltip() {
      let tooltip = Object.assign(
        {
          confine: true
        },
        this.tooltip
      );

      return tooltip;
    },
    _radar() {
      let radar = Object.assign(
        {
          indicator: this.radarIndicator
        },
        this.radar
      );

      return radar;
    },
    _series() {
      let series =
        this.series && Array.isArray(this.series)
          ? this.series
          : [
              Object.assign(
                {
                  type: 'radar',
                  itemStyle: {
                    opacity: 0
                  },
                  lineStyle: {
                    opacity: 0
                  },
                  areaStyle: {
                    color: '#c00',
                    opacity: 0.5
                  },
                  data: this.seriesData
                },
                this.series
              )
            ];

      return series;
    }
  },
  watch: {
    seriesData() {
      this.initChart();
    }
  },
  created() {},
  mounted() {
    if (this.seriesData && this.seriesData.length) {
      this.initChart();
    }
  },
  beforeDestroy() {},
  methods: {
    initChart() {
      this.destroyChart();

      let id = this.id || this.myId;
      let myChart = this.$echarts.init(document.getElementById(id));

      // 设置配置项, 刷新图表
      myChart.setOption(this.option, true);

      // 点击事件
      myChart.off('click');
      myChart.on('click', evt => {
        this.$emit('click', evt);

        myChart.setOption(this.option, true);
      });
    },
    // 销毁图表实例
    destroyChart() {
      let id = this.id || this.myId;
      let chart = this.$echarts.getInstanceByDom(document.getElementById(id));

      if (chart) {
        chart.clear(); // 释放图形资源
        chart.dispose(); // 销毁实例对象
      }
    }
  }
};
</script>

<style scoped lang="less"></style>
