<!--
 * @Description: 虚拟化选择器
 * @Author: shenxh
 * @Date: 2023-02-24 10:33:17
 * @LastEditors: shenxh
 * @LastEditTime: 2023-02-24 14:18:38
-->

<template>
  <el-popover
    v-model="showPopover"
    popper-class="xx-virtualized-select"
    trigger="click"
    placement="bottom-start"
    :width="width"
  >
    <virtual-scroll-list
      v-if="showPopover"
      ref="virtualListRef"
      class="virtual-list"
      :data-key="'id'"
      :keeps="keeps"
      :data-sources="dataList"
      :data-component="itemComponent"
      :extra-props="{ curId }"
      :estimate-size="estimateSize"
      :item-class="'list-item-custom-class'"
    ></virtual-scroll-list>
    <el-input
      slot="reference"
      v-model="curValue"
      :style="`width:${width}px;`"
      :size="size"
      :placeholder="placeholder"
      @input="handleInput"
    ></el-input>
  </el-popover>
</template>

<script>
import VirtualScrollList from 'vue-virtual-scroll-list'
import VirtualizedOption from './virtualized-option'

export default {
  name: 'xx-virtualized-select',
  components: {
    VirtualScrollList,
  },
  props: {
    width: {
      type: Number,
      default: 250,
    },
    size: {
      type: String,
      default: 'small',
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    options: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 虚拟列表在真实 dom 中保持渲染的项目数量
    keeps: {
      type: Number,
      default: 20,
    },
    // 每个项目的估计大小，如果更接近平均大小，则滚动条长度看起来更准确。 建议分配自己计算的平均值。
    estimateSize: {
      type: Number,
      default: 32,
    },
    // input输入触发方法
    virtualInputCall: Function,
    // 点击每个项目触发方法
    virtualClickItemCall: Function,
  },
  data() {
    return {
      dataList: this.options,
      curId: '', // 当前选择的 id
      curValue: '', // 当前选择的值
      curValueTmp: '', // 当前选择的值
      curIndex: null, // 当前选择的索引
      showPopover: false, // 显示下拉弹窗
      itemComponent: VirtualizedOption, // 由 vue 创建/声明的渲染项组件，它将使用 data-sources 中的数据对象作为渲染道具并命名为：source。
    }
  },
  computed: {},
  watch: {
    options: {
      handler(val) {
        this.dataList = val
      },
      deep: true,
    },

    showPopover(n) {
      if (n) {
        // 当展示虚拟列表时，需要定位到选择的位置
        this.$nextTick(() => {
          let temp = this.curIndex ? this.curIndex : 0
          // 方法一：手动设置滚动位置到指定索引。
          this.$refs.virtualListRef.scrollToIndex(temp - 1)
          // 方法二：手动将滚动位置设置为指定的偏移量。
          // this.$refs.virtualListRef.scrollToOffset(this.estimateSize * (temp - 1));
        })
      } else {
        if (this.curValue !== this.curValueTmp) {
          this.curValue = this.curValueTmp
          this.dataList = this.options
        }
      }
    },
  },
  created() {
    // 监听点击子组件
    this.$on('clickVirtualItem', item => {
      this.curId = item.id
      this.curValue = item.name
      this.curValueTmp = item.name
      this.curIndex = item.index
      this.showPopover = false
      console.log('item--->', item)
      this.virtualClickItemCall && this.virtualClickItemCall(item)
    })
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 输入框改变
    handleInput(val) {
      console.log('val--->', val, this.dataList)
      if (!val) {
        this.curId = ''
        this.curIndex = null
      }
      this.dataList = this.options.filter(item => item.name.includes(val))

      this.virtualInputCall && this.virtualInputCall(val)
    },
  },
}
</script>

<style lang="less">
.xx-virtualized-select {
  height: 300px;
  padding: 0;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  .virtual-list {
    width: 100%;
    height: 100%;
    padding: 10px 0;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-track-piece {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      min-width: 150px;
      border-radius: 10px;
      background: rgba(144, 147, 153, 0.3);
    }
    &::-webkit-scrollbar-thumb:vertical:hover {
      background: rgba(144, 147, 153, 0.5);
    }
    &::-webkit-scrollbar-thumb:horizontal:hover {
      background: rgba(144, 147, 153, 0.5);
    }
  }
}
</style>
