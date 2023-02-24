<!--
 * @Description: 虚拟化选择器选项
 * @Author: shenxh
 * @Date: 2023-02-24 10:35:01
 * @LastEditors: shenxh
 * @LastEditTime: 2023-02-24 14:21:51
-->

<template>
  <div
    class="xx-virtualized-option"
    :class="{ selected: curId === source.id }"
    @click="handleClick"
  >
    <span>{{ source.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'xx-virtualized-option',
  components: {},
  props: {
    curId: {
      type: String,
      default: '',
    },
    source: {
      type: Object,
      default() {
        return {}
      },
    },
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
    // 点击选项
    handleClick() {
      this.dispatch('xx-virtualized-select', 'clickVirtualItem', this.source)
    },

    // 组件传值
    dispatch(componentName, eventName, ...rest) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(rest))
      }
    },
  },
}
</script>

<style lang="less" scoped>
.xx-virtualized-option {
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 32px;
  line-height: 32px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
  &.selected {
    color: #409eff;
    background-color: #dbeeff;
  }
}
</style>
