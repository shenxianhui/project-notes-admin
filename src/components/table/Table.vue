<!--
 * @Author: shenxh
 * @Date: 2020-09-16 17:35:09
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-16 18:35:33
 * @Description: 组件-表格
-->

<template>
  <div class="xx-table">
    <el-table :data="data" border style="width: 100%">
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :fixed="item.fixed || false"
        :width="item.width + ''"
      >
        <template slot-scope="scope">
          {{ scope.row[item.prop] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'xx-table',
  components: {},
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
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
