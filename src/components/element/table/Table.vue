<!--
 * @Author: shenxh
 * @Date: 2020-09-16 17:35:09
 * @LastEditors: shenxh
 * @LastEditTime: 2021-04-20 09:22:12
 * @Description: 组件-表格
-->

<template>
  <div class="xx-table">
    <!-- 表格 -->
    <el-table
      class="el-table"
      ref="el-table"
      row-key="id"
      v-loading="loading"
      :data="data"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
    >
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :column-key="index + ''"
        :type="item.type"
        :prop="item.prop"
        :label="item.label"
        :fixed="item.fixed || false"
        :width="item.width + ''"
        :align="item.align || 'center'"
        :header-align="item.headerAlign || item.align || 'center'"
        :reserve-selection="reserveSelection"
        :sortable="item.sortable"
      >
        <template
          v-if="item.type !== 'selection' && item.type !== 'index'"
          v-slot="{ row, $index }"
        >
          <xx-slot
            v-if="item.render"
            :render="item.render"
            :row="row"
            :index="$index"
            :column="item"
          />
          <div v-else class="slot-wrap">
            <slot v-if="item.slot" :name="item.prop" :row="row"></slot>
            <slot v-else-if="item.type === 'expand'" :row="row"></slot>
            <span v-else>{{ row[item.prop] }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div v-if="showPage" class="xx-page">
      <el-pagination
        :current-page="currentPage"
        :background="background"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :layout="layout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 自定义组件
let XxSlot = {
  functional: true,
  props: {
    row: Object,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
    render: Function,
  },
  render: (h, data) => {
    let params = {
      row: data.props.row,
      index: data.props.index,
    }

    if (data.props.column) {
      params.column = data.props.column
    }

    return data.props.render(h, params)
  },
}
export default {
  name: 'xx-table',
  components: { XxSlot },
  props: {
    /* 表格: https://element.eleme.cn/#/zh-CN/component/table#table-attributes */
    columns: {
      type: Array,
      required: true,
    },
    loading: Boolean,
    data: {
      type: Array,
      required: true,
    },
    height: {
      type: [String, Number],
      default: 'calc(100% - 60px)',
      // default: '100%'
    },
    maxHeight: [String, Number],
    stripe: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: true,
    },
    size: String,
    fit: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    highlightCurrentRow: Boolean,
    currentRowKey: [String, Number],

    /* 分页: https://element.eleme.cn/#/zh-CN/component/pagination#attributes */
    showPage: {
      type: Boolean,
      default: true,
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    currentPage: Number,
    pageSizes: Array,
    pageSize: Number,
    total: Number,
    background: {
      type: Boolean,
      default: true,
    },
    hideOnSinglePage: Boolean,
    reserveSelection: Boolean,
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
    // pageSize 改变时触发
    handleSizeChange(data) {
      this.$emit('size-change', data)
    },
    // currentPage 改变时触发
    handleCurrentChange(data) {
      this.$emit('current-change', data)
    },
    // 当选择项发生变化时触发
    handleSelectionChange(data) {
      this.$emit('selection-change', data)
    },
    // 用于多选表格，清空用户的选择
    clearSelection() {
      this.$refs['el-table'].clearSelection()
    },
    // 当表格的排序条件发生变化的时候触发
    sortChange({ column, prop, order }) {
      this.$emit('sort-change', { column, prop, order })
    },
  },
}
</script>

<style scoped lang="less">
.xx-table {
  height: 100%;
  /deep/ .el-table {
    width: 100%;
    .el-table__header-wrapper {
      table {
        thead {
          tr {
            th {
              padding: 5px 0;
              background-color: #f6f6f6;
            }
          }
        }
      }
    }
    .el-button--text {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  .xx-page {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
