<!--
 * @Description: 线
 * @Author: shenxh
 * @Date: 2022-09-19 14:09:46
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-19 14:47:28
-->

<template>
  <div class="line admin-content">
    <!-- SVG -->
    <div class="line-item">
      <div class="line-item-content">
        <svg class="flow-svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline
            class="polyline"
            points="20,20 70,20 70,70 20,70 20,120 70,120"
          />
          <polyline
            class="polyline"
            points="100,20 100,120 150,120 150,20 100,20"
          />
        </svg>
      </div>
      <div class="line-item-name">svg</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lines',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.line {
  .line-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    &:not(:last-child) {
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #000;
    }
    .line-item-content {
      .flow-svg {
        width: 170px;
        height: 140px;
        background: #000;
        .polyline {
          fill: transparent;
          stroke: #3ce8ff;
          stroke-width: 4; // 线宽
          stroke-dasharray: 15 5; // 虚线
          stroke-dashoffset: 99999; // 偏移 (配合运动时间来修改速度)
          animation: run 3600s linear infinite;
          @keyframes run {
            from {
              stroke-dasharray: 15, 5;
            }
            to {
              stroke-dasharray: 25, 5;
            }
          }
        }
      }
    }
    .line-item-name {
      margin-top: 10px;
      font-size: 18px;
    }
  }
}
</style>
