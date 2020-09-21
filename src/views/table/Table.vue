<!--
 * @Author: shenxh
 * @Date: 2020-08-25 09:48:08
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-21 11:30:39
 * @Description: 表格
-->

<template>
  <div class="base-table admin-content">
    <xx-table
      :loading="loading"
      :columns="columns"
      :data="tableData"
      :current-page="tableForm.pageNo"
      :page-size="tableForm.pageSize"
      :total="tableForm.pageTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template v-slot:sex="{ row }">
        {{ row.sex == 1 ? '男' : '女' }}
      </template>
      <template v-slot:birthday="{ row }">
        {{ formatDate(row.birthday) }}
      </template>
      <template v-slot:money="{ row }">￥{{ row.money.toLocaleString() }}</template>
      <template v-slot:set="{ row }">
        <el-popconfirm title="是否确认删除？" @onConfirm="handleDel(row)">
          <el-button slot="reference" type="text">删除</el-button>
        </el-popconfirm>
      </template>
    </xx-table>
  </div>
</template>

<script>
import XxTable from '@/components/table';
import { formatDate } from '@/utils/date';

export default {
  name: 'base-table',
  components: {
    XxTable
  },
  props: {},
  data() {
    return {
      formatDate,
      loading: false,
      currentPage: 1,
      columns: [
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '性别',
          prop: 'sex',
          slot: true
        },
        {
          label: '生日',
          prop: 'birthday',
          slot: true
        },
        {
          label: '资产',
          prop: 'money',
          slot: true
        },
        {
          label: '地址',
          prop: 'address'
        },
        {
          label: '操作',
          prop: 'set',
          width: 150,
          slot: true
        }
      ],
      tableForm: {
        pageNo: 1,
        pageSize: 20,
        pageTotal: 1000
      },
      tableData: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this._getTableData();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleDel(data) {
      console.log(data);
      this.$message.success('删除成功');
    },
    handleSizeChange(data) {
      this.tableForm.pageSize = data;
      this._getTableData();
    },
    handleCurrentChange(data) {
      this.tableForm.pageNo = data;
      this._getTableData();
    },

    _getTableData() {
      let arr = [];

      for (let i = 1; i <= this.tableForm.pageSize; i++) {
        arr.push({
          name: `用户${(this.tableForm.pageNo - 1) * this.tableForm.pageSize + i}`,
          sex: Math.round(Math.random() * 10) % 2,
          birthday: Math.round(Math.random() * 1000000000000 + 600000000000),
          money: Math.round(Math.random() * 100000 + 5000),
          address: '浙江省杭州市'
        });
      }

      this.loading = true;
      setTimeout(() => {
        this.tableData = arr;
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style scoped lang="less"></style>
