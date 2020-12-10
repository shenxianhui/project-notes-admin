<!--
 * @Author: shenxh
 * @Date: 2020-12-08 15:00:48
 * @LastEditors: shenxh
 * @LastEditTime: 2020-12-10 16:15:40
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
        :placeholder="placeholder || setPlaceholder('input')"
        @input="handleInput"
      ></el-input>

      <!-- Select 选择器 -->
      <el-select
        v-if="itemType === 'select'"
        v-model="vModel"
        :placeholder="placeholder || setPlaceholder('select')"
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

    /* Checkbox 多选框 */
    // 开启全选功能
    showCheckAll: Boolean,
    checkAll: Boolean,
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
      console.log(val);
    },
    // 选择器: 全选 change 事件
    handleCheckAllChange(val) {
      this.$emit('check-all', val);
    },
    // 自定义 placeholder
    setPlaceholder(type) {
      let str = '';

      if (type === 'input') {
        str = `请输入${this.label || ''}`;
      }
      if (type === 'select') {
        str = `请选择${this.label || ''}`;
      }

      return str;
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
