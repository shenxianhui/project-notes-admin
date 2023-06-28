<!--
 * @Description: 导航
 * @Author: shenxh
 * @Date: 2023-06-27 17:22:00
 * @LastEditors: shenxh
 * @LastEditTime: 2023-06-28 13:41:36
-->

<template>
  <div class="map">
    <div
      v-for="item in tabList"
      :key="item.value"
      :class="{ active: value === item.value }"
      @click="handleTab(item)"
      class="map-item"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-bar',
  components: {},
  model: {
    prop: 'value',
    event: 'set-value',
  },
  props: {
    value: String,
  },
  data() {
    return {
      tabList: [
        {
          label: '水厂监控',
          value: 'station',
        },
        {
          label: '供水总览',
          value: 'overview',
        },
        {
          label: '管网管理',
          value: 'pipeline',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleTab(itm) {
      this.$emit('set-value', itm.value)
      this.$emit('change', itm.value, itm)
    },
  },
}
</script>

<style lang="less" scoped>
.map {
  display: flex;
  align-items: center;
  .map-item {
    cursor: pointer;
    font-weight: 400;
    font-size: 20px;
    text-align: center;
    width: 90px;
    height: 40px;
    line-height: 40px;
    color: #b2d9ef;
    font-weight: 700;
    margin: 0 10px;
    transition: all 0.1s;
    &:hover {
      color: #fff;
    }
    &.active {
      color: #2cb2ff;
      transform: scale(1.2);
      transition: all 0.2s;
    }
  }
}
</style>
