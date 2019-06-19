/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-07 16:48:54
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-19 10:37:31
 */
<!-- 模板-表格页 (element-ui 2.9+) -->
<template>
    <div class="table-page">
        <div class="table-page-inner">
            <!-- 搜索 -->
            <div class="table-search" ref="tableSearch">
                <div class="table-search-form">
                    <el-form :model="form" :rules="rules" ref="form">
                        <el-form-item label="文本输入框" prop="text">
                            <el-input v-model="form.text" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="选择下拉框" prop="select">
                            <el-select v-model="form.select" clearable>
                                <el-option label="选项一" value="1"></el-option>
                                <el-option label="选项二" value="2"></el-option>
                                <el-option label="选项三" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="带标签输入框" prop="tag">
                            <el-input v-model.number="form.tag" clearable>
                                <template slot="append">单位</template>
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
                        <div class="table-search-buttons">
                            <Button label="重置" color="primary-plain" @click="resetForm('form')"></Button>
                            <Button label="查询" @click="submitForm('form')"></Button>
                        </div>
                    </el-form>
                </div>
            </div>

            <!-- 表格 -->
            <div class="table-content" ref="tableContent">
                <!-- 表格-头部 (按钮) -->
                <div class="table-content-header" ref="tableContentHeader">
                    <h2>标题</h2>
                    <div class="table-content-buttons">
                        <Button label="添加" color="success-plain" @click="handleAddBatch()"></Button>
                        <Button label="删除" color="danger-plain" @click="handleDelBatch()"></Button>
                        <Button label="上传" color="primary-plain" @click="handleUploadBatch()"></Button>
                        <Button label="下载" color="info-plain" @click="handleDownloadBatch()"></Button>
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
                        <el-table-column align="center" label="序号" width="60">
                            <template slot-scope="scope">
                                {{ (form.page - 1) * form.pageSize + scope.$index + 1 }}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="value" label="A"></el-table-column>
                        <el-table-column align="center" prop="value" label="B"></el-table-column>
                        <el-table-column align="center" prop="value" label="C"></el-table-column>
                        <el-table-column align="center" prop="value" label="D"></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="handleDet(scope.row)">详情</el-button>
                                <el-button type="text" size="small" @click="handleDload(scope.row)">下载</el-button>
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
                        :total="1000">
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
                <div v-if="dialog.message" class="message">
                    <h3>标题 (不需要删掉即可)</h3>
                    <p v-loading="isLoadingDialog">{{ dialog.message }}</p>
                </div>
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
                        <!-- 注: 此方法最多上传 1 个 -->
                        <el-upload
                            :auto-upload="true"
                            :http-request="handleFile"
                            :limit="dialog.limit"
                            :accept="dialog.accept"
                            :on-remove="handleRemove"
                            action
                            class="upload"
                            ref="upload">
                            <Button label="选取文件"></Button>
                            <div class="el-upload__tip" slot="tip">
                                {{ `最多上传 ${dialog.limit} 个文件, 且不超过 ${dialog.fileSize / 1024} KB` }}
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialog-footer">
                <Button label="确定" @click="submitFormDialog('dialogForm')"></Button>
                <Button label="取消" color="primary-plain" @click="dialog.dialogVisible = false"></Button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Button from '@/components/common/Button';
import { setTimeout, clearTimeout } from 'timers';

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
                if (value < 99) {
                    callback();
                } else {
                    callback(new Error('小于99'));
                }
            }
        };
        let checkFile = (rule, value, callback) => {
            if (!this.dialogForm.file.name) {
                callback(new Error('请选择文件'));
            } else {
                if (this.dialogForm.file.size > this.dialog.fileSize) {
                    callback(new Error(`文件大小不能超过 ${this.dialog.fileSize / 1024} KB`));
                } else {
                    callback();
                }
            }
        };

        return {
            isClick: false, // 重复点击判定
            isLoading: true, // 表格-加载
            isLoadingDialog: false, // 弹出框-加载
            tableData: [], // 表格-数据
            multipleSelection: [], // 表格-选中项
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
                pageSize: 20
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
                message: '', // 信息提示框
                source: '', // 来源
                limit: 1,
                accept: '.pdf, .doc, .docx, .xls, .xlsx',
                fileSize: 500 * 1024 // 单位: Bytes
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
        window.onresize = () => {
            this.setStyle();
        };
    },
    beforeRouteLeave(to, from, next) {
        window.removeEventListener('resize', this.setStyle());
        next();
    },
    methods: {
        // 表单-重置 (所有表单都要加入校验规则, 否则无法重置)
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

        // 批量-添加
        handleAddBatch() {
            // this.$router.push(`/demo/add-page`);
        },

        // 批量-删除
        handleDelBatch() {
            let myDialog = {
                dialogVisible: true,
                source: 'handleDelBatch',
                title: '提示',
                message: '是否删除已选内容?'
            };

            Object.assign(this.dialog, myDialog);
        },

        // 批量-上传
        handleUploadBatch() {
            let myDialog = {
                dialogVisible: true,
                source: 'handleUploadBatch',
                title: '上传文件'
            };

            Object.assign(this.dialog, myDialog);
        },

        // 批量-下载
        handleDownloadBatch() {
            let myDialog = {
                dialogVisible: true,
                source: 'handleDownloadBatch',
                title: '提示',
                message: '是否下载已选内容?'
            };

            Object.assign(this.dialog, myDialog);
        },

        // 批量-更多
        handleMore(params) {
            console.log(params);
        },

        // 批量-选中
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        // 操作-详情
        handleDet(data) {
            // this.$router.push(`/demo/details-page/${data.value}`);
        },

        // 操作-下载
        handleDload(data) {
            console.log(data);
        },

        // 操作-删除
        handleDel(data) {
            let myDialog = {
                dialogVisible: true,
                source: 'handleDel',
                title: '提示',
                message: '是否删除该条数据'
            };

            Object.assign(this.dialog, myDialog);
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
            this.dialogForm.file = file.file;
        },

        // 弹出框-文件列表-移除
        handleRemove(file, fileList) {
            this.dialogForm.file = {};
        },

        // 弹出框-提交
        submitFormDialog(formName) {
            switch (this.dialog.source) {
                case 'handleDelBatch': // 批量-删除
                    this.submitDelBatch();
                    break;
                case 'handleUploadBatch': // 上传
                    this.submitUploadBatch(formName);
                    break;
                case 'handleDownloadBatch': // 批量-下载
                    this.submitDownloadBatch();
                    break;
                case 'handleDel': // 操作-删除
                    this.submitDel();
                    break;
            }
        },

        // 弹出框-批量-删除
        submitDelBatch() {
            if (!this.multipleSelection.length) {
                this.$message.warning('请先勾选需要删除的内容');
                return;
            }
            this.isLoadingDialog = true;

            let timer; // 定时器用来测试效果, 开发时请删除
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.dialog.dialogVisible = false;
                this.$message.success('操作成功!');

                this.mockData();
            }, 500);
        },

        // 弹出框-上传
        submitUploadBatch(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.isClick) {
                        this.$message.warning('请勿重复点击');
                        return;
                    }

                    this.isLoadingDialog = true;
                    this.isClick = true;

                    let timer; // 定时器用来测试效果, 开发时请删除
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        this.dialog.dialogVisible = false;
                        this.$message.success('操作成功!');

                        this.closedDialog();
                        this.mockData();
                    }, 1000);
                }
            });
        },

        // 弹出框-批量-下载
        submitDownloadBatch() {
            if (!this.multipleSelection.length) {
                this.$message.warning('请先勾选需要下载的内容');
                return;
            }
            this.isLoadingDialog = true;

            let timer; // 定时器用来测试效果, 开发时请删除
            clearTimeout(timer);
            timer = setTimeout(() => {
                // do something...
                this.dialog.dialogVisible = false;
                this.$message.success('操作成功!');

                this.mockData();
            }, 500);
        },

        // 弹出框-单个-删除
        submitDel() {
            this.isLoadingDialog = true;

            let timer; // 定时器用来测试效果, 开发时请删除
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.dialog.dialogVisible = false;
                this.$message.success('操作成功!');

                this.mockData();
            }, 500);
        },

        // 弹出框-关闭后回调
        closedDialog() {
            this.isClick = false;
            this.isLoadingDialog = false;
            this.dialog = {
                dialogVisible: false,
                title: '提示',
                message: '',
                source: '',
                limit: 1,
                accept: '.pdf, .doc, .docx, .xls, .xlsx',
                fileSize: 500 * 1024 // 单位: Bytes
            };

            if (this.$refs.dialogForm) {
                this.$refs.dialogForm.resetFields(); // 清空表单
                this.$refs.upload.clearFiles(); // 清空文件列表
            }
        },

        // 样式修改
        setStyle() {
            let tableSearch = this.$refs.tableSearch;
            let tableContent = this.$refs.tableContent;
            let tableContentHeader = this.$refs.tableContentHeader;
            let tableContentBody = this.$refs.tableContentBody;

            // 根据搜索区高度自适应
            tableContent.style.height = `calc(100% - ${tableSearch.offsetHeight + 20}px)`;
            // 表格宽度必须设置, 否则布局会出现问题
            tableContentBody.style.width = `${tableContentHeader.offsetWidth}px`;
        },

        // mock 数据
        mockData() {
            this.tableData = [];
            this.isLoading = true;

            let timer; // 定时器用来测试效果, 开发时请删除
            clearTimeout(timer);
            timer = setTimeout(() => {
                for (let i = 0; i < this.form.pageSize; i++) {
                    let tmp = {
                        value: Math.round(Math.random() * 1000 + 100)
                    };

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
            padding-top: 20px;
            .table-search-form {
                width: 100%;
                /deep/ .el-form {
                    width: 100%;
                    &::after {
                        display: block;
                        height: 0;
                        content: '';
                        clear: both;
                    }
                    .el-form-item {
                        float: left;
                        display: flex;

                        margin: 0 30px 20px 0;
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
                                width: 140px;
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
                                width: 240px;
                                border-color: #ccc;
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
                    .table-search-buttons {
                        float: right;
                        display: flex;

                        margin-bottom: 20px;
                        .button {
                            &:not(:last-child) {
                                margin-right: 20px;
                            }
                        }
                    }
                }
            }
        }

        /* 表格 */
        .table-content {
            padding: 20px;
            margin: 0 20px 20px;
            border-radius: 4px;
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
                                background-color: #008AFF;
                                border-color: #008AFF;
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
                    border: 1px solid #bbb;
                    .el-table__header-wrapper {
                        .el-table__header {
                            thead {
                                tr {
                                    th {
                                        padding: 8px 0;
                                        border-bottom: 0;
                                        border-right-color: #bbb;
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
                                        border-bottom: 0;
                                        border-right-color: #bbb;
                                    }
                                    &:hover {
                                        td {
                                            background-color: #E2F0FF;
                                        }
                                    }
                                }
                                .el-table__row--striped {
                                    td {
                                        background-color: #f2f2f2;
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

                margin-top: 20px;
                /deep/ .el-pagination {
                    .el-pager {
                        .number {
                            width: 30px;
                            height: 30px;
                            min-width: 30px;
                            padding: 0;
                            border-radius: 4px;
                            color: #666;
                            border: 1px solid #ccc;
                            &.active {
                                border-color: #008AFF;
                                color: #008AFF;
                            }
                            &:hover {
                                border-color: #999;
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
            .el-dialog__header {
                display: flex;
                align-items: center;

                height: 40px;
                padding: 0;
                padding-left: 20px;
                background-color: #F2F2F2;
                border-bottom: 1px solid #ccc;
                .el-dialog__title {
                    font-size: 14px;
                    color: #222;
                }
                .el-dialog__headerbtn {
                    top: 12px;
                }
            }
            .el-dialog__body {
                padding: 0;
                .content {
                    padding: 30px 40px;
                    .message {
                        h3 {
                            font-size: 14px;
                            color: #000;
                            margin-bottom: 10px;
                        }
                        p {
                            font-size: 14px;
                            color: #666;
                        }
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
                    align-items: center;

                    height: 56px;
                    border-top: 1px solid #ccc;
                    padding: 0 20px;
                    .button {
                        &:not(:last-child) {
                            margin-right: 20px;
                        }
                        .button-common {
                            width: 80px;
                            height: 36px;
                            line-height: 34px;
                        }
                        .primary-plain {
                            color: #333;
                            background-color: #f2f2f2;
                            border-color: #ccc;
                            &:hover {
                                opacity: 0.8;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
