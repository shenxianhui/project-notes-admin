<!--
 * @Author: shenxh
 * @Date: 2020-12-04 17:45:43
 * @LastEditors: shenxh
 * @LastEditTime: 2020-12-15 18:48:53
 * @Description: 表单
-->

<template>
  <div class="base-form admin-content">
    <xx-form :model="form" :rules="rules" ref="xx-form" class="xx-form" inline>
      <xx-form-item
        item-type="input"
        v-model="form.input"
        label="姓名"
        inline
      ></xx-form-item>
      <xx-form-item
        item-type="input"
        v-model="form.input"
        label="姓名"
        inline
      ></xx-form-item>
      <xx-form-item
        item-type="input"
        v-model="form.input"
        label="姓名"
        inline
      ></xx-form-item>
      <xx-form-item
        item-type="input"
        v-model="form.input"
        label="姓名"
        inline
      ></xx-form-item>
      <xx-form-item
        item-type="input"
        v-model="form.input"
        label="姓名"
        inline
      ></xx-form-item>
    </xx-form>
    <br />
    <br />
    <br />
    <xx-form
      :model="form"
      class="xx-form"
      ref="xx-form"
      :rules="rules"
      label-width="100px"
    >
      <xx-form-item
        item-type="input"
        v-model="form.input"
        :col="8"
        label="输入框"
        @input="handleInput"
      ></xx-form-item>

      <xx-form-item
        item-type="autocomplete"
        v-model="form.autocompleteLabel"
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
        :col="8"
        label="选择器"
        :options="options"
        @filter-method="filterMethod"
        @change="handleChange"
      ></xx-form-item>

      <xx-form-item
        item-type="select"
        v-model="form.selectSearch"
        :col="8"
        label="远程搜索"
        :options="selectOptions"
        :multiple="true"
        :remote="true"
        :loading="loading"
        @remote-method="remoteMethod"
        @change="handleChange"
      ></xx-form-item>

      <xx-form-item
        item-type="cascader"
        v-model="form.cascader"
        :col="8"
        label="级联选择器"
        :options="options"
        :props="{ checkStrictly: true }"
        :show-all-levels="false"
        @change="handleChange"
      ></xx-form-item>

      <xx-form-item
        item-type="date-picker"
        v-model="form.datePicker"
        :col="8"
        label="日期选择器"
        type="datetime"
        :options="options"
        :props="{ checkStrictly: true }"
        :show-all-levels="false"
        @change="handleChange"
      ></xx-form-item>

      <xx-form-item
        item-type="date-picker"
        v-model="form.datePickerRange"
        :col="16"
        item-width="450px"
        label="日期范围选择"
        type="datetimerange"
        :default-time="['00:00:00', '23:59:59']"
        :options="options"
        :props="{ checkStrictly: true }"
        :show-all-levels="false"
        @change="handleChange"
      ></xx-form-item>

      <xx-form-item
        item-type="radio"
        v-model="form.radio"
        :col="8"
        label="单选框"
        :options="options"
        item-width="100%"
        @change="handleChange"
      ></xx-form-item>

      <xx-form-item
        item-type="checkbox"
        v-model="form.checkbox"
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
        :col="8"
        label="计数器"
        @change="handleChange"
      ></xx-form-item>

      <xx-form-item
        item-type="switch"
        v-model="form.switch"
        :col="8"
        label="开关"
        @change="handleChange"
      ></xx-form-item>

      <xx-form-item
        item-type="slider"
        v-model="form.slider"
        :col="8"
        label="滑块"
        @change="handleChange"
      ></xx-form-item>
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
    return {
      loading: false,
      form: {
        input: '',
        autocompleteLabel: '',
        autocomplete: '',
        select: '',
        selectSearch: '',
        cascader: [],
        datePicker: '',
        datePickerRange: '',
        radio: '',
        checkbox: [],
        inputNumber: '',
        switch: true,
        slider: 50
      },
      rules: {},
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
    handleChange(val) {
      console.log(val, this.form);
    },
    handleInput(val) {
      console.log(val, this.form);
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
      this.loading = true;
      this.getData(val).then(res => {
        this.selectOptions = res;
        this.loading = false;
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
