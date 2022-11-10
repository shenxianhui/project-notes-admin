<!--
 * @Description: [组件]半圆进度条
 * @Author: shenxh
 * @Date: 2022-11-10 09:56:34
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-10 13:32:46
-->

<template>
  <div
    class="semi-circle-progress"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <div class="semi-circle-progress-wrap">
      <div
        class="semi-circle-progress-chart"
        :style="{
          'border-left-color': color,
          'border-top-color': color,
          transform: `translate(-50%, 0) rotate(${getScale}deg)`,
        }"
      ></div>
    </div>
    <div class="semi-circle-progress-label">
      <div class="value">{{ value }}</div>
      <div class="unit">%</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'semi-circle-progress',
  components: {},
  props: {
    // 百分比 0-100
    value: {
      type: Number,
      default: 50.5,
    },
    width: {
      type: Number,
      default: 130,
    },
    height: {
      type: Number,
      default: 70,
    },
    color: {
      type: String,
      default: '#00C2FF',
    },
  },
  data() {
    return {}
  },
  computed: {
    getScale() {
      let num = 0

      if (this.value > 100) {
        num = 100
      } else if (this.value < 0) {
        num = 0
      } else {
        num = this.value
      }

      // -135 - 45
      return (180 / 100) * num - 135
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.semi-circle-progress {
  position: relative;
  width: 200px;
  height: 100px;
  .semi-circle-progress-wrap {
    position: relative;
    width: 100%;
    // height: 100%;
    padding: 100% 0 0;
    margin-top: -50%;
    overflow: hidden;
    .semi-circle-progress-chart {
      position: absolute;
      left: 50%;
      top: calc(50% + 10px);
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      border-left: 8px solid #00c2ff;
      border-top: 8px solid #00c2ff;
      border-right: 8px solid #333750;
      border-bottom: 8px solid #333750;
      border-radius: 50%;
      transform: translate(-50%, 0);
      transition: all ease 0.8s;
      &::before {
        position: absolute;
        display: inline-block;
        content: '';
        left: 75px;
        top: 2.5px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgba(125, 154, 255, 0.5);
      }
      &::after {
        position: absolute;
        display: inline-block;
        content: '';
        left: 79px;
        top: 6.5px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #fff;
      }
    }
  }
  .semi-circle-progress-label {
    position: absolute;
    display: flex;
    align-items: flex-end;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 0);
    font-size: 22px;
    color: #333;
    .value {
      font-weight: 700;
    }
  }
}
</style>
