<!--
 * @Author: shenxh
 * @Date: 2020-12-03 20:43:12
 * @LastEditors: shenxh
 * @LastEditTime: 2020-12-10 16:20:07
 * @Description: 组件-表单
-->

<template>
  <div class="xx-form-wrap">
    <el-form
      class="xx-form"
      ref="xx-form"
      :model="model"
      :inline="inline"
      :rules="rules"
      :label-position="labelPosition"
      :label-width="labelWidth"
      :disabled="disabled"
    >
      <slot></slot>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'xx-form',
  components: {},
  props: {
    /* https://element.eleme.cn/#/zh-CN/component/form#form-attributes */
    model: {
      type: Object,
      required: true
    },
    rules: Object,
    inline: Boolean,
    labelPosition: String,
    labelWidth: String,
    disabled: Boolean
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

<style lang="less" scoped>
.xx-form-wrap {
  .xx-form {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
