<!--
 * @Author: shenxh
 * @Date: 2020-12-08 15:00:48
 * @LastEditors: shenxh
 * @LastEditTime: 2021-04-20 09:52:58
 * @Description: 组件-表单-项
-->

<template>
  <div
    class="xx-form-item-wrap"
    :class="{ inline }"
    :style="{ width: setWidth }"
  >
    <el-form-item
      ref="xx-form-item"
      :label="label"
      :prop="prop"
      :style="{ maxWidth: setItemWidth }"
    >
      <!-- Input 输入框 -->
      <el-input
        v-if="itemType === 'input'"
        :name="name"
        :value="value"
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
        :value="value"
        :name="name"
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
        :value="value"
        :name="name"
        :loading="loading"
        :clearable="clearable"
        :disabled="disabled"
        :size="size"
        :multiple="multiple"
        :multiple-limit="multipleLimit"
        :collapse-tags="collapseTags"
        :filterable="filterable"
        :remote="remote"
        :placeholder="placeholder || `请选择${label || ''}`"
        :filter-method="filterMethod"
        :remote-method="remoteMethod"
        @change="handleChange"
      >
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
          <template>
            <slot :item="item" :index="index"></slot>
          </template>
        </el-option>
      </el-select>

      <!-- Cascader 级联选择器 -->
      <el-cascader
        v-if="itemType === 'cascader'"
        popper-class="xx-cascader-popper"
        :value="value"
        :clearable="clearable"
        :disabled="disabled"
        :size="size"
        :filterable="filterable"
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
        :name="name"
        :type="type"
        :clearable="clearable"
        :disabled="disabled"
        :size="size"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        :default-time="defaultTime"
        :value-format="valueFormat"
        :placeholder="placeholder || `请选择${label || ''}`"
        @change="handleChange"
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
        :value="value"
        :name="name"
        :label="label"
        :disabled="disabled"
        :size="size"
        :min="min"
        :max="max"
        :step="step"
        :step-strictly="stepStrictly"
        :precision="precision"
        :controls-position="controlsPosition"
        @change="handleChange"
      ></el-input-number>

      <!-- Switch 开关 -->
      <el-switch
        v-if="itemType === 'switch'"
        :value="value"
        :name="name"
        :disabled="disabled"
        :width="width"
        :active-color="activeColor"
        :inactive-color="inactiveColor"
        :active-text="activeText"
        :inactive-text="inactiveText"
        @change="handleChange"
      >
      </el-switch>

      <!-- Slider 滑块 -->
      <el-slider
        v-if="itemType === 'slider'"
        :value="value"
        :disabled="disabled"
        :step="step"
        :range="range"
        :vertical="vertical"
        :height="height"
        :marks="marks"
        :show-stops="showStops"
        :show-tooltip="showTooltip"
        :format-tooltip="formatTooltip"
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
  model: {
    prop: 'value',
    event: 'set-value'
  },
  props: {
    // 指定类型
    itemType: {
      type: String,
      required: true
    },
    // 绑定值
    value: {},
    // 栅格布局
    col: {
      type: Number,
      default: 24
    },
    // 宽度
    itemWidth: {
      type: String,
      // default: '100%'
      default: '300px'
    },
    // 行内模式, 打开时 col/itemWidth 会失效
    inline: Boolean,
    options: Array,

    /* https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes */
    /* 公共 start */
    // 标签文本
    label: String,
    // 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
    prop: String,
    name: String,
    // 占位符
    placeholder: String,
    // 类型
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
    // 步长 (计数器/滑块)
    step: Number,
    /* 公共 end */

    /* Input 输入框 start */
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
    /* Input 输入框 end */

    /* Select 选择器 start */
    // 加载中
    loading: Boolean,
    // 多选
    multiple: Boolean,
    // 多选时用户最多可以选择的项目数，为 0 则不限制
    multipleLimit: Number,
    // 多选时是否将选中值按文字的形式展示
    collapseTags: Boolean,
    // 可搜索
    filterable: {
      type: Boolean,
      default: true
    },
    // 自定义搜索方法
    filterMethod: Function,
    // 是否为远程搜索
    remote: Boolean,
    // 远程搜索方法
    remoteMethod: Function,
    /* Select 选择器 end */

    /* Cascader 级联选择器 start */
    props: Object,
    // 输入框中是否显示选中值的完整路径
    showAllLevels: Boolean,
    /* Cascader 级联选择器 end */

    /* Checkbox 多选框 start */
    // 开启全选功能
    showCheckAll: Boolean,
    checkAll: Boolean,
    // 已选且非全选状态
    indeterminate: Boolean,
    /* Checkbox 多选框 end */

    /* DateTimePicker 日期时间选择器 start */
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
    defaultTime: [Array, String],
    // 绑定值的格式
    // https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi
    valueFormat: {
      type: String,
      default: 'timestamp'
    },
    /* DateTimePicker 日期时间选择器 end */

    /* InputNumber 计数器 start */
    // 计数器允许的最小值
    min: Number,
    // 计数器允许的最大值
    max: Number,
    // 只能输入 step 的倍数
    stepStrictly: Boolean,
    // 数值精度
    precision: Number,
    // 	控制按钮位置
    controlsPosition: String,
    /* InputNumber 计数器 end */

    /* Switch 开关 start */
    // switch 的宽度（像素）
    width: Number,
    // switch 打开时的背景色
    activeColor: String,
    // switch 关闭时的背景色
    inactiveColor: String,
    // switch 打开时的文字描述
    activeText: String,
    // switch 关闭时的文字描述
    inactiveText: String,
    /* Switch 开关 end */

    /* Slider 滑块 start */
    // 是否显示 tooltip
    showTooltip: {
      type: Boolean,
      default: true
    },
    // 格式化 tooltip message
    formatTooltip: Function,
    // 显示间断点
    showStops: Boolean,
    // 范围选择
    range: Boolean,
    // 竖向模式 (需设置 height)
    vertical: Boolean,
    // Slider 高度，竖向模式时必填
    height: String,
    // 标记
    marks: Object
    /* Slider 滑块 end */
  },
  data() {
    return {
      vModel: this.value,
      isCheckAll: this.checkAll
    };
  },
  computed: {
    setWidth() {
      return this.inline
        ? 'inherit'
        : parseInt((this.col / 24) * 10000) / 100 + '%';
    },
    setItemWidth() {
      return this.inline ? 'inherit' : this.itemWidth;
    }
  },
  watch: {
    value(val) {
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
    // input 事件
    handleInput(val) {
      this.$emit('set-value', val);
      this.$emit('input', val);
    },
    // change 事件
    handleChange(val) {
      this.$emit('set-value', val);
      this.$emit('change', val);
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
    },

    /* 表单项内置方法 */
    // 对该表单项进行重置，将其值重置为初始值并移除校验结果
    resetField() {
      this.$refs['xx-form-item'].resetField();
    },
    // 移除该表单项的校验结果
    clearValidate() {
      this.$refs['xx-form-item'].clearValidate();
    }
  }
};
</script>

<style lang="less" scoped>
.xx-form-item-wrap {
  flex-shrink: 0;
  &.inline {
    .el-form-item {
      margin-bottom: 0;
    }
  }
  /* 多选框 */
  .xx-checkbox-wrap {
    display: flex;
    flex-wrap: wrap;
    .xx-select-all {
      margin-right: 30px;
    }
  }
  /* 日期 */
  .el-form-item__content {
    .el-date-editor {
      width: 100%;
    }
  }
}
</style>
