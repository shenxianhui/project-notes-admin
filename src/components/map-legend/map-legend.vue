<!--
 * @Description: 地图图例
 * @Author: shenxh
 * @Date: 2023-06-28 09:37:44
 * @LastEditors: shenxh
 * @LastEditTime: 2023-06-29 17:31:18
-->

<template>
  <div class="map-legend">
    <div class="map-legend-list">
      <div
        class="map-legend-item"
        v-for="(item, index) in data"
        :key="index"
        :class="{ active: item.selected }"
        @click="handleLegendItem(item, index)"
      >
        <div class="map-legend-item-group">
          <img class="map-legend-item-icon" :src="item.legendIcon" />
          <div class="map-legend-item-label text-ellipsis">
            {{ item.label }}
          </div>
        </div>
        <el-switch
          v-if="item.showSwitch && item.selected"
          class="switch"
          v-model="item.switched"
          @click.native.stop
          @change="changeSwitch(item, index)"
        ></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-legend',
  components: {},
  props: {
    data: Array,
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 点击图例的某项
    handleLegendItem(itm, idx) {
      itm.selected = !itm.selected

      this.$emit('change-legend', itm, this.legendData)
      this.$emit('change', itm, this.legendData)
    },

    // 切换右侧开关状态
    changeSwitch(itm, idx) {
      this.$emit('change-switch', itm, this.legendData)
      this.$emit('change', itm, this.legendData)
    },
  },
}
</script>

<style lang="less" scoped>
.map-legend {
  width: 182px;
  padding: 8px 8px 8px 14px;
  background: rgba(0, 7, 13, 0.8);
  z-index: 10;
  .map-legend-list {
    .map-legend-item {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 24px;
      padding: 0 8px;
      font-size: 14px;
      color: #b8c7d9;
      border: 1px solid #5c6c8b;
      cursor: pointer;
      &:not(:last-child) {
        margin-bottom: 4px;
      }
      &.active {
        color: #ffffff;
        background: #00396d;
        border: 1px solid #5c6c8b;
        box-shadow: inset 0px 0px 12px #0080f7;
        &::before {
          content: '';
          display: inline-block;
          position: absolute;
          left: -6px;
          width: 2px;
          height: 24px;
          background: #ffffff;
          box-shadow: 0px 0px 4px #0181f8;
        }
      }
      .map-legend-item-group {
        display: flex;
        align-items: center;
        .map-legend-item-icon {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }
        .map-legend-item-label {
          width: 80px;
        }
      }
      :deep(.switch) {
        &.is-checked {
          .el-switch__core {
            .el-switch__action {
              background: #fff;
            }
          }
        }
        .el-switch__core {
          border: 1px solid #0094ff;
          .el-switch__action {
            background: #004d95;
          }
        }
      }
    }
  }
}
</style>
