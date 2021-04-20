<!--
 * @Author: shenxh
 * @Date: 2020-12-04 17:45:43
 * @LastEditors: shenxh
 * @LastEditTime: 2021-04-20 14:00:28
 * @Description: 表单-模板
-->

<template>
  <div class="base-form admin-content">
    <xx-form
      :model="form"
      class="form"
      ref="form"
      :rules="rules"
      label-width="110px"
    >
      <xx-form-item
        item-type="input"
        v-model="form.input"
        prop="input"
        :col="8"
        label="输入框"
        @input="handleInput($event, 'input')"
      ></xx-form-item>

      <xx-form-item
        item-type="autocomplete"
        v-model="form.autocompleteLabel"
        prop="autocompleteLabel"
        type="textarea"
        :col="8"
        label="远程搜索"
        @fetch-suggestions="fetchSuggestions"
        @select="handleSelect"
      >
      </xx-form-item>

      <xx-form-item
        item-type="select"
        v-model="form.select"
        prop="select"
        :col="8"
        label="选择器"
        :options="options"
        @filter-method="filterMethod"
        @change="handleChange($event, 'select')"
      ></xx-form-item>

      <xx-form-item
        item-type="select"
        v-model="form.selectSearch"
        prop="selectSearch"
        :col="8"
        label="远程搜索"
        :options="selectOptions"
        :multiple="true"
        :remote="true"
        :loading="searchLoading"
        @remote-method="remoteMethod"
        @change="handleChange($event, 'selectSearch')"
      ></xx-form-item>

      <xx-form-item
        item-type="cascader"
        v-model="form.cascader"
        prop="cascader"
        :col="8"
        label="级联选择器"
        :options="options"
        :props="{ checkStrictly: true }"
        :show-all-levels="false"
        @change="handleChange($event, 'cascader')"
      ></xx-form-item>

      <xx-form-item
        item-type="date-picker"
        v-model="form.datePicker"
        prop="datePicker"
        :col="8"
        label="日期选择器"
        type="datetime"
        :options="options"
        :props="{ checkStrictly: true }"
        :show-all-levels="false"
        @change="handleChange($event, 'datePicker')"
      ></xx-form-item>

      <xx-form-item
        item-type="date-picker"
        v-model="form.datePickerRange"
        prop="datePickerRange"
        :col="16"
        item-width="450px"
        label="日期范围选择"
        type="datetimerange"
        :default-time="['00:00:00', '23:59:59']"
        :options="options"
        :props="{ checkStrictly: true }"
        :show-all-levels="false"
        @change="handleChange($event, 'datePickerRange')"
      ></xx-form-item>

      <xx-form-item
        item-type="radio"
        v-model="form.radio"
        prop="radio"
        :col="8"
        label="单选框"
        :options="options"
        item-width="100%"
        @change="handleChange($event, 'radio')"
      ></xx-form-item>

      <xx-form-item
        item-type="checkbox"
        v-model="form.checkbox"
        prop="checkbox"
        :col="8"
        label="多选框"
        :options="options"
        :show-check-all="true"
        :check-all="isCheckAll"
        :indeterminate="isIndeterminate"
        item-width="100%"
        @check-all="handleCheckAll"
        @change="changeCheckbox"
      ></xx-form-item>

      <xx-form-item
        item-type="input-number"
        v-model="form.inputNumber"
        prop="inputNumber"
        :col="8"
        label="计数器"
        @change="handleChange($event, 'inputNumber')"
      ></xx-form-item>

      <xx-form-item
        item-type="switch"
        v-model="form.switch"
        prop="switch"
        :col="8"
        label="开关"
        @change="handleChange($event, 'switch')"
      ></xx-form-item>

      <xx-form-item
        item-type="slider"
        v-model="form.slider"
        prop="slider"
        :col="8"
        label="滑块"
        @change="handleChange($event, 'slider')"
      ></xx-form-item>

      <template v-slot:button-top-right>
        <el-button
          size="small"
          :style="{ 'margin-bottom': '20px' }"
          @click="$router.go(-1)"
        >
          返回
        </el-button>
      </template>
      <template v-slot:button-bottom-center>
        <el-button
          size="small"
          :style="{ 'margin-top': '20px' }"
          @click="resetForm('form')"
        >
          重置
        </el-button>
        <el-button
          type="primary"
          size="small"
          :loading="formLoading"
          :style="{ 'margin-top': '20px' }"
          @click="submitForm('form')"
        >
          提交
        </el-button>
      </template>
    </xx-form>
  </div>
</template>

<script>
import XxForm from '@/components/form';
import XxFormItem from '@/components/form/form-item';

export default {
  name: 'base-form',
  components: {
    XxForm,
    XxFormItem
  },
  props: {},
  data() {
    const checkRadio = (rule, value, callback) => {
      // 定时器为了使校验发生在赋值之后
      setTimeout(() => {
        const formVal = this.form.radio;

        if (!formVal) {
          return callback(new Error('请选择'));
        }
      }, 0);
    };

    return {
      formLoading: false, // 表单数据加载 loading
      searchLoading: false, // 远程搜索 loading
      form: {
        input: '',
        autocompleteLabel: '',
        autocomplete: '',
        select: '',
        selectSearch: [],
        cascader: [],
        datePicker: '',
        datePickerRange: '',
        radio: '',
        checkbox: [],
        inputNumber: '',
        switch: true,
        slider: 50
      },
      rules: {
        input: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        select: [{ required: true, message: '请选择', trigger: 'change' }],
        datePicker: [
          {
            // type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        radio: [{ validator: checkRadio, required: true, trigger: 'change' }]
      },
      selectOptions: [],
      options: [
        {
          label: '选项1',
          value: 1,
          children: [
            {
              label: '选项1-1',
              value: 11,
              children: [
                {
                  label: '选项1-1-1',
                  value: 111
                },
                {
                  label: '选项1-1-2',
                  value: 112
                },
                {
                  label: '选项1-1-3',
                  value: 113
                }
              ]
            }
          ]
        },
        {
          label: '选项2',
          value: 2,
          children: [
            {
              label: '选项2-1',
              value: 21,
              children: [
                {
                  label: '选项2-1-1',
                  value: 211
                },
                {
                  label: '选项2-1-2',
                  value: 212
                },
                {
                  label: '选项2-1-3',
                  value: 213
                }
              ]
            }
          ]
        },
        {
          label: '选项3',
          value: 3
        }
      ],

      /* checkbox */
      isCheckAll: false,
      isIndeterminate: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 表单重置
    resetForm(formName) {
      this.isCheckAll = this.isIndeterminate = false;
      this.$refs[formName].resetFields();
    },
    // 表单提交
    submitForm(formName) {
      console.log(this.form);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formLoading = true;
          setTimeout(() => {
            this.formLoading = false;
            this.$message.success('提交成功');
          }, 500);
        } else {
          this.$message.warning('必填项不能为空哦~');
        }
      });
    },

    // change 事件
    handleChange(val, name) {
      console.log(val, name);
    },
    // input 事件
    handleInput(val, name) {
      console.log(val, name);
    },

    /* input */
    // 远程搜索
    fetchSuggestions(val, cb) {
      this.getData(val).then(res => {
        cb(res); // 数组中的 value 必须为字符串
      });
    },
    // 选择事件
    handleSelect({ label, value }) {
      this.form.autocompleteLabel = label;
      this.form.autocomplete = value;
    },

    /* select */
    // 搜索事件
    filterMethod(val) {
      console.log(val);
    },
    // 远程搜索
    remoteMethod(val) {
      this.searchLoading = true;
      this.getData(val).then(res => {
        this.selectOptions = res;
        this.searchLoading = false;
      });
    },

    /* checkbox */
    // 全选
    handleCheckAll(isCheckAll) {
      if (isCheckAll) {
        this.form.checkbox = this.options.map(item => {
          return item.value;
        });
      } else {
        this.form.checkbox = [];
      }
      this.isCheckAll = isCheckAll;
      this.isIndeterminate = false;
    },
    changeCheckbox(val) {
      let checkedCount = val.length;

      this.isCheckAll = checkedCount === this.options.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.options.length;
    },

    // 获取 mock 数据 (支持模糊搜索)
    getData(val) {
      return new Promise(resolve => {
        let data = [
          {
            label: '内容1',
            value: '1'
          },
          {
            label: '内容2',
            value: '2'
          },
          {
            label: '内容3',
            value: '3'
          }
        ];
        let arr = data.filter(item => {
          return item.label.includes(val);
        });

        setTimeout(() => {
          resolve(arr);
        }, 200);
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
