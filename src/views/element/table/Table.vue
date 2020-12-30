<!--
 * @Author: shenxh
 * @Date: 2020-08-25 09:48:08
 * @LastEditors: shenxh
 * @LastEditTime: 2020-12-30 14:09:44
 * @Description: 表格-模板
-->

<template>
  <div class="base-table admin-content table-page">
    <xx-form :model="form" ref="form" class="form" inline>
      <xx-form-item
        item-type="input"
        v-model="form.name"
        prop="name"
        label="姓名"
        inline
        @keydown.enter.native="submitForm()"
      ></xx-form-item>
      <xx-form-item
        item-type="select"
        v-model="form.sex"
        prop="sex"
        :col="8"
        label="性别"
        :options="options"
        inline
        @keydown.enter.native="submitForm()"
      ></xx-form-item>

      <template v-slot:button-inline-right>
        <el-button size="small" @click="resetForm('form')">重置</el-button>
        <el-button type="primary" size="small" @click="submitForm()">
          查询
        </el-button>
      </template>
    </xx-form>

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
      <template v-slot:money="{ row }">
        ￥{{ row.money.toLocaleString() }}
      </template>
      <template v-slot:set="{ row }">
        <el-popconfirm title="确认删除？" @confirm="handleDel(row)">
          <el-button slot="reference" type="text">删除</el-button>
        </el-popconfirm>
      </template>

      <template v-slot="{ row }">
        {{ row.name }}
      </template>
    </xx-table>
  </div>
</template>

<script>
import XxTable from '@/components/table';
import XxForm from '@/components/form';
import XxFormItem from '@/components/form/form-item';

import { formatDate } from '@/utils/date';

export default {
  name: 'base-table',
  components: {
    XxTable,
    XxForm,
    XxFormItem
  },
  props: {},
  data() {
    return {
      formatDate,
      loading: false,
      currentPage: 1,
      form: {},
      options: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 2
        }
      ],
      columns: [
        {
          type: 'expand'
        },
        {
          type: 'selection'
        },
        {
          label: '序号',
          type: 'index',
          width: 60
        },
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
          sortable: true,
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
          label: '操作 (slot)',
          prop: 'set',
          width: 150,
          slot: true
        },
        {
          label: '操作 (render)',
          prop: 'set',
          width: 150,
          render: (h, params) => {
            return h(
              'el-button',
              {
                class: {
                  'btn-del': true
                },
                style: {
                  color: '#f00',
                  cursor: 'pointer'
                },
                props: {
                  slot: 'reference',
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.$confirm('确认删除？', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.handleDel(params.row);
                    });
                  }
                }
              },
              '删除'
            );
          }
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
      this.$message.success(`"${data.name}" 删除成功`);
      this.tableForm.pageNo = 1;

      this._getTableData();
    },
    handleSizeChange(data) {
      this.tableForm.pageSize = data;

      this._getTableData();
    },
    handleCurrentChange(data) {
      this.tableForm.pageNo = data;

      this._getTableData();
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.tableForm.pageNo = 1;
      this._getTableData();
    },
    // 表单提交
    submitForm() {
      this.tableForm.pageNo = 1;
      this._getTableData();
    },

    // 获取 mock 数据
    _getTableData() {
      let arr = [];

      for (
        let i = (this.tableForm.pageNo - 1) * this.tableForm.pageSize;
        i < this.tableForm.pageNo * this.tableForm.pageSize;
        ++i
      ) {
        arr.push({
          id: i,
          name: `用户${i + 1}`,
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
