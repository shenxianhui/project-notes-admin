<!--
 * @Author: shenxh
 * @Date: 2020-12-03 20:43:12
 * @LastEditors: shenxh
 * @LastEditTime: 2021-04-20 13:59:15
 * @Description: 组件-表单
-->

<template>
  <div class="xx-form-wrap">
    <!-- 按钮组-上 -->
    <div class="xx-buttons xx-buttons-top">
      <div class="xx-btn-left">
        <slot name="button-top-left"></slot>
      </div>
      <div class="xx-btn-center">
        <slot name="button-top-center"></slot>
      </div>
      <div class="xx-btn-right">
        <slot name="button-top-right"></slot>
      </div>
    </div>

    <!-- 表单 -->
    <el-form
      class="xx-form"
      ref="xx-form"
      :model="model"
      :inline="inline"
      :rules="rules"
      :label-position="labelPosition"
      :label-width="labelWidth"
      :disabled="disabled"
      @validate="getValidate"
    >
      <slot></slot>

      <!-- 按钮组-行内 -->
      <div class="xx-buttons">
        <div class="xx-btn-left">
          <slot name="button-inline-left"></slot>
        </div>
        <div class="xx-btn-right">
          <slot name="button-inline-right"></slot>
        </div>
      </div>
    </el-form>

    <!-- 按钮组-下 -->
    <div class="xx-buttons xx-buttons-bottom">
      <div class="xx-btn-left">
        <slot name="button-bottom-left"></slot>
      </div>
      <div class="xx-btn-center">
        <slot name="button-bottom-center"></slot>
      </div>
      <div class="xx-btn-right">
        <slot name="button-bottom-right"></slot>
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
  methods: {
    // 任一表单项被校验后触发
    getValidate(name, checkPassed, errMsg) {
      this.$emit('validate', name, checkPassed, errMsg);
    },
    /* 表单内置方法 */
    // 对整个表单进行校验
    validate(callback) {
      this.$refs['xx-form'].validate(valid => {
        callback(valid);
      });
    },
    // 对部分表单字段进行校验
    validateField(props, callback) {
      this.$refs['xx-form'].validateField(props, errorMessage => {
        callback(errorMessage);
      });
    },
    // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    resetFields() {
      this.$refs['xx-form'].resetFields();
    }
  }
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
    flex-wrap: wrap;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
    // &.xx-buttons-top {
    //   margin-bottom: 20px;
    // }
    // &.xx-buttons-bottom {
    //   margin-top: 20px;
    // }
  }
}
</style>
