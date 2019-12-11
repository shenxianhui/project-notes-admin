/* * @Author: Shen Xianhui * @Date: 2019-06-08 08:35:09 * @Last Modified by: Shen Xianhui * @Last Modified time:
2019-06-19 15:26:20 */
<!-- 按钮公共组件 -->
<template>
  <div class="button">
    <!-- 普通按钮 -->
    <div
      class="button-common"
      v-if="type === 'common'"
      :class="[color, isDisabled ? 'disabled' : '']"
      :isDisabled="isDisabled"
      @click="click"
    >
      {{ label }}
    </div>

    <!-- 下拉按钮 -->
    <el-dropdown v-if="type === 'dropdown'" slot="dropdown" :trigger="trigger" szie="mini" @command="click">
      <el-button type="primary">
        {{ label }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in dropdownList" :key="item.value" :command="item.value">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Button',
  components: {},
  props: {
    type: {
      // 类型
      type: String,
      default: 'common'
    },
    label: {
      // 标签
      type: String,
      default: '按钮'
    },
    color: {
      // 颜色
      type: String,
      default: 'primary'
    },
    isDisabled: {
      // 是否不可选
      type: Boolean,
      default: false
    },

    /* 下拉菜单配置 */
    trigger: {
      // 触发类型
      type: String,
      default: 'click'
    },
    dropdownList: {
      // 列表内容 [{ label: xx, value: xx }]
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    click(v) {
      this.$emit('click', {
        value: v
      });
    }
  }
};
</script>

<style scoped lang="less">
.button-common {
  width: 90px;
  height: 30px;
  text-align: center;
  line-height: 28px;
  border-radius: 2px;
  font-size: 14px;
  border: 1px solid;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 20px;
  }
}

/* 颜色 */
.success {
  color: #fff;
  background-color: #12b800;
  border-color: #12b800;
  &:hover {
    opacity: 0.8;
  }
}
.success-plain {
  color: #12b800;
  border-color: #12b800;
  &:hover {
    color: #fff;
    background-color: #12b800;
    border-color: #12b800;
  }
}
.primary {
  color: #fff;
  background-color: #008aff;
  border-color: #008aff;
  &:hover {
    opacity: 0.8;
  }
}
.primary-plain {
  color: #008aff;
  border-color: #008aff;
  &:hover {
    color: #fff;
    background-color: #008aff;
    border-color: #008aff;
  }
}
.danger {
  color: #fff;
  background-color: #ff3e3e;
  border-color: #ff3e3e;
  &:hover {
    opacity: 0.8;
  }
}
.danger-plain {
  color: #ff3e3e;
  border-color: #ff3e3e;
  &:hover {
    color: #fff;
    background-color: #ff3e3e;
    border-color: #ff3e3e;
  }
}
.info {
  color: #fff;
  background-color: #333;
  border-color: #333;
  &:hover {
    opacity: 0.8;
  }
}
.info-plain {
  color: #333;
  border-color: #333;
  &:hover {
    color: #fff;
    background-color: #333;
    border-color: #333;
  }
}

/* 禁用 */
.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
