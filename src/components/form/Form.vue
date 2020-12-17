<!--
 * @Author: shenxh
 * @Date: 2020-12-03 20:43:12
 * @LastEditors: shenxh
 * @LastEditTime: 2020-12-17 11:09:04
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

      <div class="xx-buttons">
        <div class="xx-btn-left">
          <slot name="button-inline-left"></slot>
        </div>
        <div class="xx-btn-right">
          <slot name="button-inline-right"></slot>
        </div>
      </div>
    </el-form>

    <div class="xx-buttons">
      <div class="xx-btn-left">
        <slot name="button-left"></slot>
      </div>
      <div class="xx-btn-center">
        <slot name="button-center"></slot>
      </div>
      <div class="xx-btn-right">
        <slot name="button-right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'xx-form',
  components: {},
  props: {
    /* https://element.eleme.cn/#/zh-CN/component/form#form-attributes */
    // 表单数据对象
    model: {
      type: Object,
      required: true
    },
    // 表单验证规则
    rules: Object,
    // 行内表单模式
    inline: Boolean,
    // 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
    labelPosition: String,
    // 表单域标签的宽度
    labelWidth: String,
    // 禁用表单内的所有组件
    disabled: Boolean,
    // 按钮位置
    buttonPosition: {
      type: String,
      default: 'right' // left center right
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

<style lang="less" scoped>
.xx-form-wrap {
  .xx-form {
    display: flex;
    flex-wrap: wrap;
  }
  .xx-buttons {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
