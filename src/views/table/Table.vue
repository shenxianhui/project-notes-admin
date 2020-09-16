<!--
 * @Author: shenxh
 * @Date: 2020-08-25 09:48:08
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-16 18:36:31
 * @Description: 表格
-->

<template>
  <div class="base-table admin-content">
    <xx-table :columns="columns" :data="tableData"></xx-table>
  </div>
</template>

<script>
import XxTable from '@/components/table';

export default {
  name: 'base-table',
  components: {
    XxTable
  },
  props: {},
  data() {
    return {
      columns: [
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '性别',
          prop: 'sex'
        },
        {
          label: '生日',
          prop: 'date'
        },
        {
          label: '地址',
          prop: 'address',
          width: 500
        },
        {
          label: '操作',
          fixed: 'right',
          width: 100,
          render: () => <a>编辑</a>
        }
      ],
      tableData: [
        {
          name: '用户1',
          sex: 1,
          date: 816870605000,
          address: '山东省聊城市冠县'
        },
        {
          name: '用户2',
          sex: 2,
          date: 842869125000,
          address: '浙江省杭州市余杭区'
        },
        {
          name: '用户3',
          sex: 1,
          date: 1763288455000,
          address: '山东省青岛市黄岛区'
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style scoped lang="less"></style>
