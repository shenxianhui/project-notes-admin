<!--
 * @Author: shenxh
 * @Date: 2021-07-08 13:51:54
 * @LastEditors: shenxh
 * @LastEditTime: 2021-07-09 10:53:38
 * @Description: 树形控件-模板
-->

<template>
  <div class="tree-demo admin-content">
    <div class="title">
      <div class="title-left">
        <h2>分类列表</h2>
        <div class="switch">
          <el-button
            type="text"
            :disabled="expandAll"
            @click="expandAll = true"
          >
            展开
          </el-button>
          <el-button
            type="text"
            :disabled="!expandAll"
            @click="expandAll = false"
          >
            收起
          </el-button>
        </div>
      </div>
      <div class="title-right">
        <el-button
          :disabled="!currentNodeData.id && currentNodeData.id !== 0"
          type="primary"
          size="small"
          @click="handleBtn('add')"
        >
          增加
        </el-button>
        <el-button
          :disabled="!currentNodeData.id && currentNodeData.id !== 0"
          type="primary"
          size="small"
          @click="handleBtn('upd')"
        >
          修改
        </el-button>
        <el-button
          :disabled="!currentNodeData.id && currentNodeData.id !== 0"
          type="danger"
          size="small"
          @click="handleBtn('del')"
        >
          删除
        </el-button>
      </div>
    </div>
    <xx-tree
      ref="tree"
      :tree-data="treeData"
      draggable
      show-search
      :indent="30"
      :default-expanded-keys="defaultExpandedKeys"
      :current-node-key="currentNodeKey"
      :default-expand-all="expandAll"
      :fold-switch="expandAll"
      :same-drag="false"
      @node-drag-start="handleDragStart"
      @node-drop="handleDrop"
      @node-click="handleNode"
    >
      <template class="slot-wrap" v-slot="{ data }">
        <div class="content-wrap">
          <img
            v-if="data.isVip"
            class="icon-vip"
            src="@/assets/img/icon/vip_act.png"
            alt="Vip"
          />
          <img
            v-else
            class="icon-vip"
            src="@/assets/img/icon/vip.png"
            alt="Vip"
          />
        </div>
      </template>
      <template v-slot:right="{ data }">
        <div v-show="currentNodeData.id === data.id" class="content-wrap-right">
          <el-button type="text" @click="handleBtn('add')">
            增加
          </el-button>
          <el-button type="text" @click="handleBtn('upd')">修改</el-button>
          <el-button
            type="text"
            :style="{ color: '#F56C6C' }"
            @click="handleBtn('del')"
          >
            删除
          </el-button>
        </div>
      </template>
    </xx-tree>
  </div>
</template>

<script>
import XxTree from '@/components/tree/Tree';

export default {
  name: 'tree-demo',
  components: {
    XxTree
  },
  props: {},
  data() {
    return {
      nodeStartClientY: 0,
      currentNode: {},
      currentNodeData: {},
      defaultExpandedKeys: [],
      currentNodeKey: null,
      expandAll: false,
      treeData: [
        {
          label: '一级 1',
          id: '一级 1',
          isVip: true,
          children: [
            {
              label: '二级 1-1',
              id: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                  id: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          id: '一级 2',
          children: [
            {
              label: '二级 2-1',
              id: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                  id: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              id: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                  id: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          id: '一级 3',
          children: [
            {
              label: '二级 3-1',
              id: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                  id: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              id: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                  id: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleNode(data, node) {
      this.currentNode = node;
      this.currentNodeData = { ...data };
    },
    handleDragStart(node, ev) {
      this.nodeStartClientY = ev.clientY;
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      this.expandNode = draggingNode;
      this.draggingNode = draggingNode;
      this.draggingNode.data.index = dropNode.data.index;
      // 从下到上拖拽
      if (ev.clientY - this.nodeStartClientY < 0) {
        Object.assign(this.draggingNode.data, {
          index: this.draggingNode.data.index - 1
        });
      } else {
        Object.assign(this.draggingNode.data, {
          index: this.draggingNode.data.index + 1
        });
      }
    },
    handleBtn(type) {
      console.log(type, this.currentNode);
    }
  }
};
</script>

<style lang="less" scoped>
.tree-demo {
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .title-left {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      h2 {
        font-size: 18px;
      }
      .switch {
        margin-left: 40px;
      }
    }
  }
  /deep/ .xx-tree {
    height: calc(100% - 50px);
    .xx-tree-search {
      .el-input {
        .el-input__inner {
          width: 200px;
          height: 30px;
          border-radius: 2px;
          border-color: #ccc;
        }
        .el-input__suffix {
          .el-input__suffix-inner {
            .el-input__icon {
              line-height: 0;
            }
          }
        }
      }
    }
    .el-tree {
      height: calc(100% - 40px);
      overflow: auto;
      .el-tree-node {
        .el-tree-node__content {
          height: 50px;
          margin-bottom: 4px;
          background-color: #f5f7f9;
          cursor: default;
        }
        &.is-current > .el-tree-node__content {
          background-color: #efefef;
        }
      }
      .content-wrap {
        margin-left: 10px;
        .icon-vip {
          width: 15px;
        }
      }
    }
  }
}
</style>
