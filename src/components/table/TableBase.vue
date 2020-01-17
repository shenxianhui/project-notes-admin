<!--
 * @Author: ShenXianhui
 * @Date: 2019-04-02 08:22:47
 * @LastEditors  : Wells
 * @LastEditTime : 2020-01-17 09:52:56
 * @Description: 表格-首行固定
 -->
<template>
  <div class="table-base">
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>申贤慧</td>
          <td>男</td>
          <td>24</td>
        </tr>
        <tr>
          <td>申贤慧</td>
          <td>男</td>
          <td>24</td>
        </tr>
        <tr>
          <td>申贤慧</td>
          <td>男</td>
          <td>24</td>
        </tr>
        <tr>
          <td>申贤慧</td>
          <td>男</td>
          <td>24</td>
        </tr>
        <tr>
          <td>申贤慧</td>
          <td>男</td>
          <td>24</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TableBase',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {}
};
</script>

<style scoped lang="less">
.table-base {
  width: 100%;
  height: 100%;
  table {
    width: 100%;
    height: 100%;
    border-collapse: collapse; /* 合并边框 */
    text-align: center;
    font-size: 14px;
    tr {
      width: 100%;
      height: 55px;
      td,
      th {
        width: 150px;
      }
    }
    td {
      border-right: 1px solid rgba(81, 159, 241, 0.2);
      &:first-child {
        border-left: 1px solid rgba(81, 159, 241, 0.2);
      }
    }
    th {
      border-right: 1px solid rgba(160, 216, 226, 0.5);
      &:first-child {
        border-right: 1px solid rgba(160, 216, 226, 0.5);
      }
    }
    thead {
      display: block;

      width: 100%;
      tr {
        background: #519ff1;
        color: #ffffff;
        th {
          font-weight: normal;
        }
      }
    }
    tbody {
      display: block;

      width: 100%;
      height: calc(100% - 51px);
      overflow: auto;
      &::-webkit-scrollbar {
        display: none; /* 隐藏滚动条 */
      }
      tr:nth-child(odd) {
        background: #ffffff;
      }
      tr:nth-child(even) {
        background: #dcecfc;
      }
    }
  }
}
</style>
