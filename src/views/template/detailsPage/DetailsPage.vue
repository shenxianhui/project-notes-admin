/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-10 10:49:31
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-11 14:46:22
 */
<!-- 模板-详情页 (element-ui 2.9+) -->
<template>
    <div class="details-page">
        <div class="details-page-inner">
            <!-- 头部 -->
            <div class="details-header">
                <h2>{{ title }}</h2>
                <div class="buttons">
                    <Button v-show="isDisabled" label="编辑" color="primary" @click="handleEdit('form')"></Button>
                    <Button label="返回" color="primary-plain" @click="handleBack('form')"></Button>
                </div>
            </div>

            <!-- 内容 -->
            <div class="details-body">
                <div class="details-body-content" v-loading="isLoading">
                    <div class="module">
                        <div class="module-title">
                            <h3>信息</h3>
                        </div>
                        <div class="module-content">
                            <el-form :model="form" label-position="top" :rules="rules" ref="form">
                                <el-form-item label="文本输入框" prop="text">
                                    <el-input v-model="form.text" clearable :disabled="isDisabled"></el-input>
                                </el-form-item>
                                <el-form-item label="文本输入框" prop="text">
                                    <el-input v-model="form.text" clearable :disabled="isDisabled"></el-input>
                                </el-form-item>
                                <el-form-item label="文本输入框" prop="text">
                                    <el-input v-model="form.text" clearable :disabled="isDisabled"></el-input>
                                </el-form-item>
                                <el-form-item label="选择下拉框" prop="select">
                                    <el-select v-model="form.select" clearable :disabled="isDisabled">
                                        <el-option label="选项一" value="1"></el-option>
                                        <el-option label="选项二" value="2"></el-option>
                                        <el-option label="选项三" value="3"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="选择下拉框" prop="select">
                                    <el-select v-model="form.select" clearable :disabled="isDisabled">
                                        <el-option label="选项一" value="1"></el-option>
                                        <el-option label="选项二" value="2"></el-option>
                                        <el-option label="选项三" value="3"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="选择下拉框" prop="select">
                                    <el-select v-model="form.select" clearable :disabled="isDisabled">
                                        <el-option label="选项一" value="1"></el-option>
                                        <el-option label="选项二" value="2"></el-option>
                                        <el-option label="选项三" value="3"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="带标签输入框" prop="tag">
                                    <el-input v-model.number="form.tag" clearable :disabled="isDisabled">
                                        <template slot="append">单位</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="带标签输入框" prop="tag">
                                    <el-input v-model.number="form.tag" clearable :disabled="isDisabled">
                                        <template slot="append">单位</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="带标签输入框" prop="tag">
                                    <el-input v-model.number="form.tag" clearable :disabled="isDisabled">
                                        <template slot="append">单位</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="日期区间" prop="interval">
                                    <el-date-picker
                                        v-model="form.interval"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        format="yyyy-MM-dd"
                                        value-format="yyyyMMdd"
                                        clearable
                                        :disabled="isDisabled">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="日期区间" prop="interval">
                                    <el-date-picker
                                        v-model="form.interval"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        format="yyyy-MM-dd"
                                        value-format="yyyyMMdd"
                                        clearable
                                        :disabled="isDisabled">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="日期区间" prop="interval">
                                    <el-date-picker
                                        v-model="form.interval"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        format="yyyy-MM-dd"
                                        value-format="yyyyMMdd"
                                        clearable
                                        :disabled="isDisabled">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="年" prop="year">
                                    <el-date-picker
                                        v-model="form.year"
                                        type="year"
                                        format="yyyy"
                                        value-format="yyyy"
                                        placeholder="选择日期"
                                        :disabled="isDisabled">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="月" prop="month">
                                    <el-date-picker
                                        v-model="form.month"
                                        type="month"
                                        format="yyyy-MM"
                                        value-format="yyyyMM"
                                        placeholder="选择日期"
                                        :disabled="isDisabled">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="日" prop="date">
                                    <el-date-picker
                                        v-model="form.date"
                                        type="date"
                                        format="yyyy-MM-dd"
                                        value-format="yyyyMMdd"
                                        placeholder="选择日期"
                                        :disabled="isDisabled">
                                    </el-date-picker>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
                <div v-show="!isDisabled" class="buttons">
                    <Button label="提交" @click="submitForm('form')"></Button>
                    <Button label="重置" color="info-plain" @click="resetForm('form')"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '@/components/common/Button';

export default {
    name: 'DetailsPage',
    components: {
        Button
    },
    props: {},
    data() {
        // 自定义校验规则
        let checkTag = (rule, value, callback) => {
            if (!value) { // 允许为空
                callback();
            }
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                if (value < 99) {
                    callback();
                } else {
                    callback(new Error('小于99'));
                }
            }
        };
        return {
            isClick: false, // 重复点击判定
            isDisabled: true, // 禁用
            isLoading: false, // 加载
            title: '标题',
            form: { // 表单提交 (注: 所有选项都要加入校验, 否则无法重置)
                text: '',
                select: '',
                tag: '',
                year: '',
                month: '',
                date: '',
                interval: []
            },
            rules: { // 表单校验规则
                text: [
                    { required: true, message: '请输入内容' },
                    { min: 5, max: 20, message: '长度在 5 到 20 个字符' }
                ],
                select: [],
                tag: [
                    { validator: checkTag }
                ],
                year: '',
                month: '',
                date: '',
                interval: []
            }
        };
    },
    computed: {},
    watch: {},
    // created() {},
    // mounted() {},
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 详情与编辑页切换时组件不会销毁所以created中的方法不会重复执行
            vm.getPageType(to.name);
        });
    },
    methods: {
        // 获取页面类型 (新增/查看)
        getPageType(name) {
            console.log(name);
        },

        // 编辑
        handleEdit() {
            this.isDisabled = !this.isDisabled;
        },

        // 返回
        handleBack() {
            if (!this.isDisabled) {
                this.$confirm('是否放弃修改?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.go(-1);
                });
            } else {
                this.$router.go(-1);
            }
        },

        // 表单-提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.isClick) {
                        this.$message.warning('请勿重复点击');
                        return;
                    }

                    this.isLoading = true;
                    this.isClick = true;
                    let timer; // 定时器用来测试效果, 开发时请删除
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        this.$message.success('提交成功!');
                        this.isLoading = false;
                        this.isClick = false;
                        this.isDisabled = true;
                    }, 500);
                }
            });
        },

        // 表单-重置
        resetForm(formName) {
            this.$confirm('是否重置所有内容?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$refs[formName].resetFields();
            });
        }
    }
};
</script>

<style scoped lang='less'>
.details-page {
    width: 100%;
    height: 100%;
    background-color: #F6F6F6;
    overflow: hidden;
    .details-page-inner {
        height: calc(100% - 40px);
        margin: 20px;
        border-radius: 4px;
        background-color: #fff;
        /* 头部 */
        .details-header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            height: 70px;
            padding: 0 25px;
            border-bottom: 1px solid #B8B8B8;
            h2 {
                font-size: 14px;
                color: #333;
            }
            .buttons {
                display: flex;
                .button {
                    &:not(:last-child) {
                        margin-right: 20px;
                    }
                }
            }
        }

        /* 内容 */
        .details-body {
            height: calc(100% - 70px);
            overflow: auto;
            .details-body-content {
                width: 940px;
                margin: 60px auto 0;
                .module {
                    .module-title {
                        display: flex;
                        align-items: center;

                        height: 40px;
                        padding: 0 20px;
                        background-color: #ddd;
                        h3 {
                            font-size: 14px;
                            color: #333;
                        }
                    }
                    .module-content {
                        padding: 20px;
                        /deep/ .el-form {
                            display: flex;
                            flex-wrap: wrap;
                            .el-form-item {
                                width: 260px;
                                margin-bottom: 30px;
                                &:not(:nth-of-type(3n)) {
                                    margin-right: 60px;
                                }
                                .el-form-item__content {
                                    line-height: 0;
                                    /* 普通 input */
                                    .el-input {
                                        .el-input__inner {
                                            width: 260px;
                                            height: 30px;
                                            border-radius: 2px;
                                            border-color: #ccc;
                                        }
                                        .el-input__suffix {
                                            .el-input__suffix-inner {
                                                .el-input__icon {
                                                    line-height: 0;
                                                }
                                            }
                                        }
                                    }
                                    /* 右侧有单位的 input */
                                    .el-input-group--append {
                                        width: 260px;
                                        .el-input__inner {
                                            width: 100%;
                                            border-top-right-radius: 0;
                                            border-bottom-right-radius: 0;
                                        }
                                        .el-input-group__append {
                                            padding: 0 10px;
                                            border-top-right-radius: 2px;
                                            border-bottom-right-radius: 2px;
                                            border-color: #ccc;
                                        }
                                    }
                                    /* 日期选择框 */
                                    .el-date-editor {
                                        width: 140px;
                                        height: 30px;
                                        border-radius: 2px;
                                        i {
                                            line-height: 0;
                                        }
                                    }
                                    /* 日期选择框-范围 */
                                    .el-range-editor {
                                        width: 260px;
                                        border-color: #ccc;
                                        .el-range-separator {
                                            width: 10%;
                                            line-height: 23px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .buttons {
                display: flex;
                justify-content: center;
                align-items: center;

                padding-bottom: 50px;
                /deep/ .button {
                    &:not(:last-child) {
                        margin-right: 20px;
                    }
                    .button-common {
                        width: 120px;
                        height: 36px;
                        line-height: 34px;
                    }
                    .info-plain {
                        color: #333;
                        border-color: #ccc;
                        background-color: #F2F2F2;
                        &:hover {
                            opacity: 0.8;
                        }
                    }
                }
            }
        }
    }
}
</style>
