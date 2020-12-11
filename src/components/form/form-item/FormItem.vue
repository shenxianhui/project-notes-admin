<!--
 * @Author: shenxh
 * @Date: 2020-12-08 15:00:48
 * @LastEditors: shenxh
 * @LastEditTime: 2020-12-11 14:58:17
 * @Description: 组件-表单-项
-->

<template>
  <div class="xx-form-item" :style="{ width }">
    <el-form-item :label="label" :prop="prop" :style="{ width: setItemWidth }">
      <!-- Input 输入框 -->
      <el-input
        v-if="itemType === 'input'"
        v-model="vModel"
        :type="type"
        :disabled="disabled"
        :clearable="clearable"
        :show-password="showPassword"
        :rows="rows"
        :size="size"
        :minlength="minlength"
        :maxlength="maxlength"
        :show-word-limit="showWordLimit"
        :placeholder="placeholder || `请输入${label || ''}`"
        @input="handleInput"
      >
        <!-- 输入框头部内容 -->
        <template v-if="$slots.prefix" slot="prefix">
          <slot name="prefix"> </slot>
        </template>
        <!-- 输入框尾部内容 -->
        <template v-if="$slots.suffix" slot="suffix">
          <slot name="suffix"> </slot>
        </template>
        <!-- 输入框前置内容 -->
        <template v-if="$slots.prepend" slot="prepend">
          <slot name="prepend"> </slot>
        </template>
        <!-- 输入框后置内容 -->
        <template v-if="$slots.append" slot="append">
          <slot name="append"> </slot>
        </template>
      </el-input>

      <!-- 远程搜索 -->
      <el-autocomplete
        v-if="itemType === 'autocomplete'"
        v-model="vModel"
        :disabled="disabled"
        :clearable="clearable"
        :show-password="showPassword"
        :rows="rows"
        :size="size"
        :fetch-suggestions="fetchSuggestions"
        value-key="label"
        :placeholder="placeholder || `请输入${label || ''}`"
        @select="handleSelect"
      >
      </el-autocomplete>

      <!-- Select 选择器 -->
      <el-select
        v-if="itemType === 'select'"
        v-model="vModel"
        :placeholder="placeholder || `请选择${label || ''}`"
        @change="handleChange"
      >
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <!-- Cascader 级联选择器 -->
      <el-cascader
        v-if="itemType === 'cascader'"
        popper-class="xx-cascader-popper"
        v-model="vModel"
        :options="options"
        :props="props"
        :show-all-levels="showAllLevels"
        :placeholder="placeholder || `请选择${label || ''}`"
        @change="handleChange"
      ></el-cascader>

      <!-- DateTimePicker 日期时间选择器 -->
      <el-date-picker
        v-if="itemType === 'date-picker'"
        v-model="vModel"
        :type="type"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        :default-time="defaultTime"
        :placeholder="placeholder || `请选择${label || ''}`"
      >
      </el-date-picker>

      <!-- Radio 单选框 -->
      <el-radio-group
        v-if="itemType === 'radio'"
        v-model="vModel"
        @change="handleChange"
      >
        <el-radio
          v-for="(item, index) in options"
          :key="index"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>

      <!-- Checkbox 多选框 -->
      <div v-if="itemType === 'checkbox'" class="xx-checkbox-wrap">
        <el-checkbox
          v-if="showCheckAll"
          class="xx-select-all"
          v-model="isCheckAll"
          :indeterminate="indeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox-group v-model="vModel" @change="handleChange">
          <el-checkbox
            v-for="(item, index) in options"
            :key="index"
            :label="item.value"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <!-- InputNumber 计数器 -->
      <el-input-number
        v-if="itemType === 'input-number'"
        v-model="vModel"
        @change="handleChange"
        :min="min"
        :max="max"
        :label="label"
      ></el-input-number>

      <!-- Switch 开关 -->
      <el-switch
        v-if="itemType === 'switch'"
        v-model="vModel"
        :active-color="activeColor"
        :inactive-color="inactiveColor"
        @change="handleChange"
      >
      </el-switch>

      <!-- Slider 滑块 -->
      <el-slider
        v-if="itemType === 'slider'"
        v-model="vModel"
        @input="handleInput"
        @change="handleChange"
      ></el-slider>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'xx-form-item',
  components: {},
  props: {
    // 指定类型
    itemType: {
      type: String,
      required: true
    },
    // v-model
    model: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol]
    },
    // 栅格布局
    col: {
      type: Number,
      default: 24
    },
    // 宽度
    itemWidth: {
      type: String,
      default: '100%'
    },
    // 行内模式, 打开时 col/itemWidth 会失效
    inline: Boolean,
    options: Array,

    /* https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes */
    label: String,
    prop: String,
    placeholder: String,
    type: String,
    // 禁用状态
    disabled: Boolean,
    // 可清空
    clearable: {
      type: Boolean,
      default: true
    },
    // 输入框尺寸，只在 type!="textarea" 时有效
    size: {
      type: String,
      default: 'small' // large/medium/small/mini
    },

    /* Input 输入框 */
    // 显示切换密码图标
    showPassword: Boolean,
    // 输入框行数，只对 type="textarea" 有效
    rows: Number,
    // 最小输入长度
    minlength: Number,
    // 最大输入长度
    maxlength: Number,
    // 显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效
    showWordLimit: Boolean,

    /* Checkbox 多选框 */
    // 开启全选功能
    showCheckAll: Boolean,
    checkAll: Boolean,
    // 已选且非全选状态
    indeterminate: Boolean,

    /* Cascader 级联选择器 */
    props: Object,
    // 仅显示最后一级
    showAllLevels: Boolean,

    /* DateTimePicker 日期时间选择器 */
    // 范围选择时开始日期的占位内容
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    // 范围选择时结束日期的占位内容
    endPlaceholder: {
      type: String,
      default: '结束日期'
    },
    // 选中日期后的默认具体时刻
    defaultTime: {
      type: Array,
      default() {
        return ['00:00:00', '23:59:59'];
      }
    },

    /* InputNumber 计数器 */
    min: Number,
    max: Number,

    /* Switch 开关 */
    activeColor: String,
    inactiveColor: String
  },
  data() {
    return {
      vModel: this.model,
      isCheckAll: this.checkAll
    };
  },
  computed: {
    width() {
      return this.inline
        ? 'inherit'
        : parseInt((this.col / 24) * 10000) / 100 + '%';
    },
    setItemWidth() {
      return this.inline ? 'inherit' : this.itemWidth;
    }
  },
  watch: {
    model(val) {
      this.vModel = val;
    },
    checkAll(val) {
      this.isCheckAll = val;
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    // change 事件
    handleChange(val) {
      this.$emit('change', val);
    },
    // input 事件
    handleInput(val) {
      this.$emit('input', val);
    },

    /* Input 输入框 */
    // 模糊搜索 (节流)
    fetchSuggestions(val, cb) {
      this.$emit('fetch-suggestions', val, cb);
    },
    // 选中 input 中的文字
    handleSelect(val) {
      this.$emit('select', val);
    },

    /* Checkbox 多选框 */
    // 全选
    handleCheckAllChange(val) {
      this.$emit('check-all', val);
    }
  }
};
</script>

<style lang="less" scoped>
.xx-form-item {
  flex-shrink: 0;
  /* 多选框 */
  .xx-checkbox-wrap {
    display: flex;
    flex-wrap: wrap;
    .xx-select-all {
      margin-right: 30px;
    }
  }
}
</style>
