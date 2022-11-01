<!--
 * @Author: shenxh
 * @Date: 2020-08-04 17:08:10
 * @LastEditors: shenxh
 * @LastEditTime: 2021-07-09 10:53:28
 * @Description: 树形控件
-->

<template>
  <div class="xx-tree">
    <div v-if="showSearch" class="xx-tree-search">
      <el-input placeholder="输入关键字查询" v-model="searchVal"> </el-input>
    </div>
    <el-tree
      ref="xx-tree"
      :data="treeData"
      :node-key="nodeKey"
      accordion
      highlight-current
      :draggable="draggable"
      :default-expand-all="defaultExpandAll"
      :default-expanded-keys="defaultExpandedKeys"
      :current-node-key="currentNodeKey"
      :filter-node-method="filterNode"
      :allow-drop="allowDrop"
      :indent="indent"
      @node-drop="handleDrop"
      @node-click="nodeClick"
      @node-contextmenu="nodeContextmenu"
      @check-change="checkChange"
      @current-change="currentChange"
      @node-expand="nodeExpand"
      @node-collapse="nodeCollapse"
      @node-drag-start="nodeDragStart"
      @node-drag-enter="nodeDragEnter"
      @node-drag-leave="nodeDragLeave"
      @node-drag-over="nodeDragOver"
      @node-drag-end="nodeDragEnd"
    >
      <div class="xx-tree-node" slot-scope="{ data, node }">
        <div class="xx-tree-node-left">
          <!-- 必须为 label 才能正常显示 -->
          <div class="label">{{ data.label }}</div>
          <slot :node="node" :data="data"></slot>
        </div>
        <div class="xx-tree-node-right" @click.stop>
          <slot name="right" :node="node" :data="data"></slot>
        </div>
      </div>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'xx-tree',
  components: {},
  props: {
    // 节点唯一标识
    nodeKey: {
      type: String,
      default: 'id',
    },
    showSearch: Boolean, // 搜索框
    indent: Number, // 相邻级节点间的水平缩进，单位为像素
    draggable: Boolean, // 允许拖拽
    // 只能同级拖拽
    sameDrag: {
      type: Boolean,
      default: true,
    },
    defaultExpandedKeys: Array, // 默认展开的节点的 key 的数组
    currentNodeKey: [String, Number], // 当前选中的节点
    defaultExpandAll: Boolean, // 默认展开所有节点
    foldSwitch: Boolean, // 动态展开与折叠
    treeData: Array, // 数据
  },
  data() {
    return {
      searchVal: '',
      nodeStartClientY: 0,
      nodeEndClientY: 0,
    }
  },
  computed: {},
  watch: {
    // 数据筛选
    searchVal(val) {
      this.$refs['xx-tree'].filter(val)
    },
    foldSwitch(val) {
      // 注: treeData 要有 id 字段
      let nodes = this.$refs['xx-tree'].store.nodesMap

      for (let i in nodes) {
        nodes[i].expanded = val
      }
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 对树节点进行筛选时执行的方法
    // 返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // (key) 待被选节点的 key，若为 null 则取消当前高亮的节点, 父组件通过 ref 直接调用此方法即可
    setCurrentKey(data) {
      this.$refs['xx-tree'].setCurrentKey(data)
    },
    // 拖拽时判定目标节点能否被放置
    allowDrop(draggingNode, dropNode, type) {
      // 拖拽方法
      const dropFn = () => {
        // aboveId 是父节点 id
        if (draggingNode.aboveId === dropNode.aboveId) {
          // return type === 'prev' || type === 'next';

          // 从下到上拖拽
          if (this.nodeEndClientY - this.nodeStartClientY < 0) {
            return type === 'prev'
          } else {
            return type === 'next'
          }
        }
      }

      // 只能同级拖拽
      if (this.sameDrag) {
        if (draggingNode.level === dropNode.level) {
          return dropFn()
        } else {
          // 不同级进行处理
          return false
        }
      } else {
        return dropFn()
      }
    },
    // 节点被点击时触发
    nodeClick(data, node) {
      this.$emit('node-click', data, node)
    },
    // 当某一节点被鼠标右键点击时触发
    nodeContextmenu(evt, data, node, nodeCom) {
      this.$emit('node-contextmenu', evt, data, node, nodeCom)
    },
    // 节点选中状态发生变化时触发
    checkChange(data, checked, indeterminate) {
      this.$emit('check-change', data, checked, indeterminate)
    },
    // 当前选中节点变化时触发
    currentChange(data, node) {
      this.$emit('current-change', data, node)
    },
    // 节点被展开时触发
    nodeExpand(data, node, nodeCom) {
      this.$emit('node-expand', data, node, nodeCom)
    },
    // 节点被关闭时触发
    nodeCollapse(data, node, nodeCom) {
      this.$emit('node-collapse', data, node, nodeCom)
    },
    // 节点开始拖拽时触发
    nodeDragStart(node, ev) {
      this.nodeStartClientY = ev.clientY
      this.$emit('node-drag-start', node, ev)
    },
    // 拖拽进入其他节点时触发
    nodeDragEnter(draggingNode, dropNode, ev) {
      this.$emit('node-drag-enter', draggingNode, dropNode, ev)
    },
    // 拖拽离开某个节点时触发
    nodeDragLeave(draggingNode, dropNode, ev) {
      this.$emit('node-drag-leave', draggingNode, dropNode, ev)
    },
    // 在拖拽节点时触发
    nodeDragOver(draggingNode, dropNode, ev) {
      this.nodeEndClientY = ev.clientY
      this.$emit('node-drag-over', draggingNode, dropNode, ev)
    },
    // 拖拽结束时（可能未成功）触发
    nodeDragEnd(draggingNode, dropNode, dropType, ev) {
      this.nodeEndClientY = ev.clientY
      this.$emit('node-drag-end', draggingNode, dropNode, dropType, ev)
    },
    // 拖拽成功完成时触发
    handleDrop(draggingNode, dropNode, dropType, ev) {
      this.$emit('node-drop', draggingNode, dropNode, dropType, ev)
    },
  },
}
</script>

<style scoped lang="less">
.xx-tree {
  .xx-tree-search {
    margin-bottom: 10px;
  }
  .xx-tree-node {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 14px;
    padding-right: 8px;
    .xx-tree-node-left {
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }
  }
}
</style>
