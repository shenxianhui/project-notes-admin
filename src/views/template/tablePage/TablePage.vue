/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-07 16:48:54
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-08 10:42:22
 */
<!-- 模板-表格页 -->
<template>
    <div class='table-page'>
        <div class="table-page-inner">
            <!-- 搜索 -->
            <div class="table-search" ref="tableSearch">
                <div class="table-search-form">
                    <el-form :model="form" :rules="rules" ref="form">
                        <el-form-item label="文本输入框" prop="text">
                            <el-input v-model="form.text" clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="选择框" prop="select">
                            <el-select v-model="form.select" clearable>
                                <el-option label="选项一" value="1"></el-option>
                                <el-option label="选项二" value="2"></el-option>
                                <el-option label="选项三" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="带标签输入框" prop="tag">
                            <el-input v-model.number="form.tag" clearable>
                                <template slot="append">岁</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="年" prop="year">
                            <el-date-picker
                                v-model="form.year"
                                type="year"
                                format="yyyy"
                                value-format="yyyy"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="月" prop="month">
                            <el-date-picker
                                v-model="form.month"
                                type="month"
                                format="yyyy-MM"
                                value-format="yyyyMM"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="日" prop="date">
                            <el-date-picker
                                v-model="form.date"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyyMMdd"
                                placeholder="选择日期">
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
                                clearable>
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="单选" prop="radio">
                            <el-radio-group v-model="form.radio">
                                <el-radio label="1">选项一</el-radio>
                                <el-radio label="2">选项二</el-radio>
                                <el-radio label="3">选项三</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="多选" prop="checkbox">
                            <el-checkbox-group v-model="form.checkbox">
                                <el-checkbox label="1">选项一</el-checkbox>
                                <el-checkbox label="2">选项二</el-checkbox>
                                <el-checkbox label="3">选项三</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="table-search-buttons">
                    <Button label="重置" color="primary-plain" @click="resetForm('form')"></Button>
                    <Button label="查询" @click="submitForm('form')"></Button>
                </div>
            </div>

            <!-- 表格 -->
            <div class="table-content" ref="tableContent">
                <!-- 表格-头部 (按钮) -->
                <div class="table-content-header">
                    <h2>标题</h2>
                    <div class="table-content-buttons">
                        <Button label="删除" color="danger-plain" @click="handleDelBatch()"></Button>
                        <Button label="上传" color="primary-plain" @click="handleUploadBatch()"></Button>
                        <Button label="下载" @click="handleDownloadBatch()"></Button>
                        <Button type="dropdown" label="更多" :dropdownList="dropdownList" @click="handleMore"></Button>
                    </div>
                </div>
                <!-- 表格-内容 -->
                <div class="table-content-body" ref="tableContentBody">
                    <el-table
                        v-loading="isLoading"
                        :data="tableData"
                        stripe
                        border
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="35"></el-table-column>
                        <el-table-column align="center" type="index" label="序号" width="55"></el-table-column>
                        <el-table-column align="center" prop="value" label="A"></el-table-column>
                        <el-table-column align="center" prop="value" label="B"></el-table-column>
                        <el-table-column align="center" prop="value" label="C"></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="handleDet(scope.row)">详情</el-button>
                                <el-button type="text" size="small" @click="handleRev(scope.row)">编辑</el-button>
                                <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <!-- 表格-尾部 (分页) -->
                <div class="table-content-footer">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="form.page"
                        :page-size="form.pageSize"
                        :page-sizes="[10, 20, 50, 100]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="520">
                    </el-pagination>
                </div>
            </div>
        </div>

        <!-- 弹出框 -->
        <el-dialog
            :title="dialog.title"
            :visible.sync="dialog.dialogVisible"
            @closed="closedDialog"
            top="0"
            width="35%">
            <div class="content">
                <p v-if="dialog.message" v-loading="isLoadingDialog">{{ dialog.message }}</p>
                <el-form
                    v-loading="isLoadingDialog"
                    v-else
                    :model="dialogForm"
                    label-position="left"
                    label-width="100px"
                    :rules="dialogRules"
                    ref="dialogForm">
                    <el-form-item label="文本输入框" prop="text">
                        <el-input v-model="dialogForm.text" clearable style="width: 60%">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="选择框" prop="select">
                        <el-select v-model="dialogForm.select" clearable style="width: 60%">
                            <el-option label="选项一" value="1"></el-option>
                            <el-option label="选项二" value="2"></el-option>
                            <el-option label="选项三" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="添加文件" prop="file">
                        <el-upload
                            :auto-upload="true"
                            :http-request="handleFile"
                            :limit="dialog.limit"
                            :accept="dialog.accept"
                            action
                            class="upload"
                            ref="upload">
                            <Button label="选取文件"></Button>
                            <div class="el-upload__tip" slot="tip">
                                {{ `只能上传 ${dialog.accept} 文件, 最多上传${dialog.limit} 个` }}
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialog-footer">
                <Button label="取消" color="primary-plain" @click="dialog.dialogVisible = false"></Button>
                <Button label="确定" @click="submitFormDialog('dialogForm')"></Button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Button from '@/components/common/Button';
import { setTimeout } from 'timers';

export default {
    name: 'TablePage',
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
                if (value < 150) {
                    callback();
                } else {
                    callback(new Error('小于150'));
                }
            }
        };
        let checkFile = (rule, value, callback) => {
            // if (!value) {
            //     callback(new Error('请选择文件'));
            // }
        };

        return {
            isLoading: true, // 表格-加载
            isLoadingDialog: false, // 弹出框-加载
            tableData: [], // 表格-数据
            form: { // 表单提交 (注: 所有选项都要加入校验, 否则无法重置)
                text: '',
                select: '',
                tag: '',
                year: '',
                month: '',
                date: '',
                interval: [],
                radio: '',
                checkbox: [],
                page: 1,
                pageSize: 50
            },
            rules: { // 表单校验规则
                text: [
                    { min: 5, max: 20, message: '长度在 5 到 20 个字符' }
                ],
                select: [],
                tag: [
                    { validator: checkTag }
                ],
                year: '',
                month: '',
                date: '',
                interval: [],
                radio: [],
                checkbox: []
            },
            dropdownList: [ // 下拉按钮内容
                {
                    label: '选项一',
                    value: '1'
                },
                {
                    label: '选项二',
                    value: '2'
                }
            ],
            dialog: { // 弹出框-编辑
                dialogVisible: false,
                title: '提示',
                message: '', // 仅作为信息提示框
                source: '',
                limit: 1,
                accept: '.pdf, .doc, .docx, .xls, .xlsx'
            },
            dialogForm: { // 弹出框-提交
                text: '',
                select: '',
                file: {}
            },
            dialogRules: { // 弹出框-表单验证规则
                text: [
                    { required: true, message: '请输入内容' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符' }
                ],
                select: [
                    { required: true, message: '请选择' }
                ],
                file: [
                    { validator: checkFile }
                ]
            }
        };
    },
    computed: {},
    watch: {},
    created() {
        this.mockData();
    },
    mounted() {
        this.setStyle();
    },
    methods: {
        // 表单-重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // 表单-提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.page = 1;

                    this.mockData();
                }
            });
        },

        // 表格-删除
        handleDelBatch() {
            this.dialog.source = 'handleDelBatch';
            this.dialog.title = '提示';
            this.dialog.message = '是否删除已选内容?';
            this.dialog.dialogVisible = true;
        },

        // 表格-上传
        handleUploadBatch() {
            this.dialog.source = 'handleUploadBatch';
            this.dialog.title = '上传文件';
            this.dialog.dialogVisible = true;
        },

        // 表格-下载
        handleDownloadBatch() {
            this.dialog.source = 'handleDownloadBatch';
            this.dialog.title = '提示';
            this.dialog.message = '是否下载已选内容?';
            this.dialog.dialogVisible = true;
        },

        // 表格-更多
        handleMore(params) {
            console.log(params);
        },

        // 表格-已选
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        // 表格-操作-详情
        handleDet(data) {
            console.log(data);
        },

        // 表格-操作-编辑
        handleRev(data) {
            console.log(data);
        },

        // 表格-操作-删除
        handleDel(data) {
            this.$message.success('操作成功!');
            
            this.mockData();
        },

        // 分页-每页/条
        handleSizeChange(val) {
            this.form.pageSize = val;

            this.mockData();
        },

        // 分页-当前页
        handleCurrentChange(val) {
            this.form.page = val;

            this.mockData();
        },

        // 弹出框-选择文件
        handleFile(file) {
            this.dialogForm.file = file;
        },

        // 弹出框-确定
        submitFormDialog(formName) {
            switch (this.dialog.source) {
                case 'handleDelBatch': // 删除
                    this.submitDelBatch();
                    break;
                case 'handleUploadBatch': // 上传
                    this.submitUploadBatch(formName);
                    break;
                case 'handleDownloadBatch': // 下载
                    this.submitDownloadBatch();
                    break;
            }
        },

        // 弹出框-提交-删除
        submitDelBatch() {
            this.isLoadingDialog = true;
            setTimeout(() => { // 定时器用来测试效果, 开发请删除
                // do something...
                this.dialog.dialogVisible = false;
                this.$message.success('操作成功!');
            }, 500);
        },

        // 弹出框-提交-上传
        submitUploadBatch(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.isLoadingDialog = true;
                    setTimeout(() => { // 定时器用来测试效果, 开发请删除
                        this.dialog.dialogVisible = false;
                        this.$message.success('操作成功!');
                    }, 500);
                }
            });
        },

        // 弹出框-提交-下载
        submitDownloadBatch() {
            this.isLoadingDialog = true;
            setTimeout(() => { // 定时器用来测试效果, 开发请删除
                // do something...
                this.dialog.dialogVisible = false;
                this.$message.success('操作成功!');
            }, 500);
        },

        // 弹出框-关闭后
        closedDialog() {
            this.dialog = {
                dialogVisible: false,
                title: '提示',
                message: '',
                source: '',
                limit: 1,
                accept: '.pdf, .doc, .docx, .xls, .xlsx'
            }
            this.isLoadingDialog = false;
        },

        // 样式修改
        setStyle() {
            let tableSearch = this.$refs.tableSearch;
            let tableContent = this.$refs.tableContent;
            let tableContentBody = this.$refs.tableContentBody;

            // 根据搜索区高度自适应
            tableContent.style.height = `calc(100% - ${tableSearch.offsetHeight + 40}px)`;
            // 表格宽度必须设置, 否则布局会出现问题
            tableContentBody.style.width = `${tableContentBody.offsetWidth}px`;
        },

        // mock 数据
        mockData() {
            this.isLoading = true;
            setTimeout(() => { // 定时器用来测试效果, 开发请删除
                for (let i = 0; i < 50; i++) {
                    let tmp = {
                        value: Math.round(Math.random() * 1000 + 100)
                    }

                    this.tableData.push(tmp);
                }

                this.isLoading = false;
            }, 500);
        }
    }
};
</script>

<style scoped lang='less'>
.table-page {
    height: 100%;
    background-color: #F6F6F6;
    overflow: hidden;
    .table-page-inner {
        height: 100%;
        /* 搜索 */
        .table-search {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;

            margin: 0 40px;
            .table-search-form {
                /deep/ .el-form {
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    .el-form-item {
                        display: flex;

                        margin: 20px 0 0;
                        &:not(:last-child) {
                            margin-right: 30px;
                        }
                        .el-form-item__label {
                            color: #333;
                            line-height: 30px;
                        }
                        .el-form-item__content {
                            line-height: 0;
                            /* 普通 input */
                            .el-input {
                                .el-input__inner {
                                    width: 140px;
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
                                .el-input__inner {
                                    border-top-right-radius: 0;
                                    border-bottom-right-radius: 0;
                                }
                                .el-input-group__append {
                                    border-top-right-radius: 2px;
                                    border-bottom-right-radius: 2px;
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
                                width: 240px;
                                .el-range-separator {
                                    width: 10%;
                                    line-height: 23px;
                                }
                            }
                            /* 单选 */
                            .el-radio-group {
                                display: flex;
                                align-items: center;
                                flex-wrap: wrap;

                                height: 100%;
                            }
                            /* 多选 */
                            .el-checkbox-group {
                                display: flex;
                                align-items: center;
                                flex-wrap: wrap;

                                height: 100%;
                            }
                        }
                    }
                }
            }
            .table-search-buttons {
                display: flex;
                align-items: center;
                .button {
                    &:not(:last-child) {
                        margin-right: 20px;
                    }
                }
            }
        }

        /* 表格 */
        .table-content {
            padding: 20px;
            margin: 20px;
            border-radius: 5px;
            background-color: #fff;
            /* 表格-头部 (按钮) */
            .table-content-header {
                display: flex;
                justify-content: space-between;
                align-items: center;

                margin-bottom: 20px;
                h2 {
                    font-size: 18px;
                }
                .table-content-buttons {
                    display: flex;
                    align-items: center;
                    .button {
                        &:not(:last-child) {
                            margin-right: 20px;
                        }
                        /* 下拉按钮 */
                        /deep/ .el-dropdown {
                            .el-button {
                                width: 90px;
                                height: 30px;
                                line-height: 28px;
                                border-radius: 2px;
                                font-size: 14px;
                                border: 1px solid;
                                padding: 0;
                                color: #fff;
                                background-color: #006EEC;
                                border-color: #006EEC;
                                &:hover {
                                    opacity: 0.8;
                                }
                            }
                        }
                    }
                }
            }
            /* 表格-内容 */
            .table-content-body {
                height: calc(100% - 100px);
                /deep/ .el-table {
                    width: 100%;
                    height: 100%;
                    .el-table__header-wrapper {
                        .el-table__header {
                            thead {
                                tr {
                                    th {
                                        padding: 8px 0;
                                        background-color: #ddd;
                                        .cell {
                                            font-size: 14px;
                                            color: #333;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .el-table__body-wrapper {
                        height: calc(100% - 40px);
                        overflow-y: auto;
                        .el-table__body {
                            tbody {
                                tr {
                                    td {
                                        padding: 4px 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            /* 表格-尾部 (分页) */
            .table-content-footer {
                float: right;

                margin-top: 15px;
                /deep/ .el-pagination {
                    .el-pager {
                        .number {
                            width: 30px;
                            height: 30px;
                            min-width: 30px;
                            padding: 0;
                            border: 1px solid #ccc;
                            border-radius: 4px;
                            &.active {
                                border-color: #006EEC;
                                color: #1467C5;
                            }
                            &:hover {
                                border-color: #006EEC;
                                color: #1467C5;
                            }
                            &:not(:last-child) {
                                margin-right: 6px;
                            }
                        }
                        .btn-quicknext {
                            margin-right: 6px;
                        }
                    }
                }
            }
        }
    }

    /* 弹出框 */
    /deep/ .el-dialog__wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        .el-dialog {
            margin: 0;
            .el-dialog__body {
                padding: 30px;
                .content {
                    margin-bottom: 20px;
                    p {
                        font-size: 16px;
                    }
                    .el-form {
                        .el-form-item {
                            .el-form-item__content {
                                .upload {
                                    ul {
                                        max-height: 70px;
                                        overflow: auto;
                                    }
                                }
                            }
                        }
                    }
                }
                .dialog-footer {
                    display: flex;
                    justify-content: flex-end;
                    .button {
                        &:not(:last-child) {
                            margin-right: 20px;
                        }
                    }
                }
            }
        }
    }
}
</style>
