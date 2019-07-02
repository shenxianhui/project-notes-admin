/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-10 10:49:31
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-07-02 13:37:04
 */
<!-- 模板-编辑页 (element-ui 2.9+) -->
<template>
    <div class="edit-page">
        <div class="edit-page-inner">
            <!-- 头部 -->
            <div class="edit-header">
                <h2>{{ title }}</h2>
                <div class="buttons">
                    <Button v-show="isDisabled" label="编辑" color="primary" @click="handleEdit('form')"></Button>
                    <Button label="返回" color="primary-plain" @click="handleBack('form')"></Button>
                </div>
            </div>

            <!-- 内容 -->
            <div class="edit-body">
                <div class="edit-body-inner">
                    <div class="edit-body-content" v-loading="isLoading">
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
@import '../../../style/tablePage.less';
</style>
