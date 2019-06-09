/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-08 08:35:09
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-08 09:57:36
 */
<!-- 按钮公共组件 -->
<template>
    <div class="button">
        <!-- 普通按钮 -->
        <div class="button-common"
            v-if="type === 'common'"
            :class="[color, isDisabled ? 'disabled' : '']"
            :isDisabled="isDisabled"
            @click="click">
            {{ label }}
        </div>

        <!-- 下拉按钮 -->
        <el-dropdown v-if="type === 'dropdown'" slot="dropdown" :trigger="trigger" szie="mini" @command="click">
            <el-button type="primary">
                {{ label }}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu>
                <el-dropdown-item
                    v-for="item in dropdownList"
                    :key="item.value"
                    :command="item.value">
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
        type: { // 类型
            type: String,
            default: 'common'
        },
        label: { // 标签
            type: String,
            default: '按钮'
        },
        color: { // 颜色
            type: String,
            default: 'primary'
        },
        isDisabled: {// 是否不可选
            type: Boolean,
            default: false
        },

        /* 下拉菜单配置 */
        trigger: { // 触发类型
            type: String,
            default: 'click'
        },
        dropdownList: { // 列表内容 [{ label: xx, value: xx }]
            type: Array
        }
    },
    data() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {
        click(v) {
            // console.log(v);
            this.$emit('click', {
                value: v
            });
        }
    }
};
</script>

<style scoped lang='less'>
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
    background-color: #67C23A;
    border-color: #67C23A;
    &:hover {
        opacity: 0.8;
    }
}
.success-plain {
    color: #67C23A;
    border-color: #67C23A;
    &:hover {
        color: #fff;
        background-color: #67C23A;
        border-color: #67C23A;
    }
}
.primary {
    color: #fff;
    background-color: #006EEC;
    border-color: #006EEC;
    &:hover {
        opacity: 0.8;
    }
}
.primary-plain {
    color: #006EEC;
    border-color: #006EEC;
    &:hover {
        color: #fff;
        background-color: #006EEC;
        border-color: #006EEC;
    }
}
.danger {
    color: #fff;
    background-color: #FF3E3E;
    border-color: #FF3E3E;
    &:hover {
        opacity: 0.8;
    }
}
.danger-plain {
    color: #FF3E3E;
    border-color: #FF3E3E;
    &:hover {
        color: #fff;
        background-color: #FF3E3E;
        border-color: #FF3E3E;
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
