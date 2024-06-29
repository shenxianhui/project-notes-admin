<!--
 * @Description: 虚拟化选择器
 * @Author: shenxh
 * @Date: 2023-02-24 10:33:17
 * @LastEditors: shenxh
 * @LastEditTime: 2023-02-24 17:02:49
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
      :data-key="'value'"
      :keeps="keeps"
      :data-sources="dataList"
      :data-component="dataComponent"
      :extra-props="{ value: currentData.value }"
      :estimate-size="estimateSize"
      :item-class="'list-item-custom-class'"
    ></virtual-scroll-list>
    <el-input
      v-model="currentData.label"
      slot="reference"
      :style="`width: ${width}px;`"
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
    // 输入框宽度
    width: {
      type: Number,
      default: 250,
    },
    // 占位符
    placeholder: {
      type: String,
      default: '请选择',
    },
    // 选项列表
    options: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 虚拟列表在真实 dom 中保持渲染的数量
    keeps: {
      type: Number,
      default: 20,
    },
    // 每个选项的估计大小，如果更接近平均大小，则滚动条长度看起来更准确。 建议分配自己计算的平均值
    estimateSize: {
      type: Number,
      default: 32,
    },
    // input输入触发方法
    virtualInputCall: Function,
    // 点击每个选项触发方法
    virtualClickItemCall: Function,
  },
  data() {
    return {
      dataList: this.options,
      currentData: {}, // 当前已选项
      currentDataTmp: {}, // 当前已选项-临时
      showPopover: false, // 显示下拉弹窗
      dataComponent: VirtualizedOption, // 由 vue 创建/声明的渲染项组件, 它将使用 data-sources 中的数据对象作为渲染道具并命名为: source
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

    showPopover(val) {
      if (val) {
        this.$nextTick(() => {
          // 方法一：手动设置滚动位置到指定索引
          // this.$refs.virtualListRef.scrollToIndex(this.currentData.index || 0)
          this.$refs.virtualListRef.scrollToIndex(this.getCurrentIndex())
          // 方法二：手动将滚动位置设置为指定的偏移量
          // this.$refs.virtualListRef.scrollToOffset(this.estimateSize * (index));
        })
      } else {
        if (this.currentData.label !== this.currentDataTmp.label) {
          this.currentData.label = this.currentDataTmp.label
        }
        console.log(this.currentData.index)
        this.dataList = this.getFilterData()
      }
    },
  },
  created() {
    // 监听点击子组件
    this.$on('clickVirtualItem', item => {
      this.currentData = { ...item }
      this.currentDataTmp = { ...item }
      this.showPopover = false
      this.virtualClickItemCall && this.virtualClickItemCall(item)
    })
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 输入框改变
    handleInput(val) {
      if (!val) {
        this.currentData = {}
      }

      this.dataList = this.getFilterData()
      this.virtualInputCall && this.virtualInputCall(val)
    },

    // 模糊搜索
    getFilterData() {
      return this.options.filter(item =>
        item.label.includes(this.currentData.label || ''),
      )
    },

    // 获取当前选项index
    getCurrentIndex() {
      let index = 0

      if (
        this.dataList &&
        this.dataList.length &&
        (this.currentData.value || this.currentData.value === 0)
      ) {
        for (let i = 0; i < this.dataList.length; i++) {
          if (this.dataList[i].value === this.currentData.value) {
            index = i

            return
          }
        }
      }

      return index
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
