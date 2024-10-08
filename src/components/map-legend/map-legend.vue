<!--
 * @Description: 地图图例
 * @Author: shenxh
 * @Date: 2023-06-28 09:37:44
 * @LastEditors: shenxh
 * @LastEditTime: 2023-09-06 14:26:35
-->

<template>
  <div class="map-legend">
    <div class="map-legend-list">
      <div
        class="map-legend-item"
        v-for="(item, index) in legendList"
        :key="index"
        :class="{ active: item.selected }"
        @click="handleLegendItem(item, index)"
      >
        <div class="map-legend-item-group">
          <img class="map-legend-item-icon" :src="item.icon" />
          <div class="map-legend-item-label text-ellipsis">
            {{ item.label }}
          </div>
        </div>
        <el-switch
          v-if="item.switch && item.switch.show"
          v-model="item.switch.checked"
          :disabled="!item.selected"
          class="switch"
          @click.native.stop
          @change="changeSwitch(item, index)"
        ></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
import legend from '@/data/maptalks/legend'

export default {
  name: 'map-legend',
  components: {},
  props: {},
  data() {
    return {
      legend,
    }
  },
  computed: {
    currentLegend() {
      return this.legend[this.$route.name] || {}
    },

    legendList() {
      return this.currentLegend.data || []
    },
  },
  watch: {
    legendList(val) {
      this.setDefEvt()
    },
  },
  created() {},
  mounted() {
    this.setDefEvt()
  },
  beforeDestroy() {},
  methods: {
    // 触发默认事件
    setDefEvt() {
      this.legendList.forEach(item => {
        item.selected && this.$emit('change-legend', item)
        item.switch && item.switch.checked && this.$emit('change-switch', item)
      })
    },

    // 点击图例项
    handleLegendItem(itm, idx) {
      itm.selected = !itm.selected
      itm.switch && (itm.switch.checked = false)

      this.$emit('change-legend', itm)
    },

    // 切换右侧开关状态
    changeSwitch(itm, idx) {
      this.$emit('change-switch', itm)
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
