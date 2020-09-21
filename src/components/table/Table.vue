<!--
 * @Author: shenxh
 * @Date: 2020-09-16 17:35:09
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-21 15:38:53
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
        :header-align="item.headerAlign || 'center'"
        :reserve-selection="reserveSelection"
      >
        <template v-if="item.type !== 'selection' && item.type !== 'index'" v-slot="{ row }">
          <slot v-if="item.slot" :name="item.prop" :row="row"></slot>
          <slot v-else-if="item.type === 'expand'" :row="row"></slot>
          <span v-else>{{ row[item.prop] }}</span>
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
export default {
  name: 'xx-table',
  components: {},
  props: {
    /* 表格: https://element.eleme.cn/#/zh-CN/component/table#table-attributes */
    columns: {
      type: Array,
      required: true
    },
    loading: Boolean,
    data: {
      type: Array,
      required: true
    },
    height: {
      type: [String, Number],
      default: 'calc(100% - 60px)'
    },
    maxHeight: [String, Number],
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    size: String,
    fit: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: Boolean,
    currentRowKey: [String, Number],

    /* 分页: https://element.eleme.cn/#/zh-CN/component/pagination#attributes */
    showPage: {
      type: Boolean,
      default: true
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    currentPage: Number,
    pageSizes: Array,
    pageSize: Number,
    total: Number,
    background: {
      type: Boolean,
      default: true
    },
    hideOnSinglePage: Boolean,
    reserveSelection: Boolean
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    // pageSize 改变时触发
    handleSizeChange(data) {
      this.$emit('size-change', data);
    },
    // currentPage 改变时触发
    handleCurrentChange(data) {
      this.$emit('current-change', data);
    },
    // 当选择项发生变化时触发
    handleSelectionChange(data) {
      this.$emit('selection-change', data);
    },
    // 用于多选表格，清空用户的选择
    clearSelection() {
      this.$refs['el-table'].clearSelection();
    }
  }
};
</script>

<style scoped lang="less">
.xx-table {
  height: 100%;
  .el-table {
    width: 100%;
  }
  .xx-page {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
