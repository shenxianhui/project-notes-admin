<!--
 * @Description: 虚拟化选择器-Demo
 * @Author: shenxh
 * @Date: 2023-02-24 10:46:10
 * @LastEditors: shenxh
 * @LastEditTime: 2023-02-24 14:22:21
-->

<template>
  <div class="virtualized-select admin-content">
    <virtualized-select
      :width="250"
      size="small"
      placeholder="请选择"
      :options="dataList"
      :keeps="20"
      :estimateSize="32"
      :virtualInputCall="virtualInputCall"
      :virtualClickItemCall="virtualClickItemCall"
    ></virtualized-select>
  </div>
</template>

<script>
import VirtualizedSelect from '@/components/element/virtualized-select/virtualized-select'

export default {
  name: 'virtualized-select-demo',
  components: {
    VirtualizedSelect,
  },
  props: {},
  data() {
    return {
      dataList: [],
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getMockData()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 输入回调
    virtualInputCall(val) {
      console.log('virtualInputCall---->', val)
      // ...
    },
    // 点击项目回调
    virtualClickItemCall(item) {
      console.log('virtualClickItemCall---->', item)
      // ...
    },

    // mock 数据
    getMockData(count = 10000, time = 1000) {
      setTimeout(() => {
        const arr = []

        for (let i = 0; i < count; i++) {
          const obj = {
            id: i + '',
            index: i,
            name: `选项${i}`,
            value: i,
          }

          arr.push(obj)
        }

        this.dataList = arr
      }, time)
    },
  },
}
</script>

<style lang="less" scoped></style>
