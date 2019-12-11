/* * @Author: Shen Xianhui * @Date: 2019-04-01 20:42:50 * @Last Modified by: ShenXianhui * @Last Modified time:
2019-04-02 08:52:14 */
<!-- 表格 -->
<template>
  <div class="table">
    <!-- 首行固定 -->
    <div class="container">
      <TableBase></TableBase>
    </div>
  </div>
</template>

<script>
import TableBase from '@/components/table/TableBase';

export default {
  name: 'Table',
  components: {
    TableBase
  },
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
.table {
  display: flex;

  width: 100%;
  height: 100%;
  .container {
    width: 25%;
    height: 25%;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    &:not(:nth-child(2n)) {
      border-right: 1px solid #ddd;
    }
  }
}
</style>
