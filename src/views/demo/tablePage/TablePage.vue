/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-07 16:48:54
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-07-08 17:34:41
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
                            <el-input v-model="form.text" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="选择下拉框" prop="select">
                            <el-select v-model="form.select" clearable placeholder="请输入">
                                <el-option label="选项一" value="1"></el-option>
                                <el-option label="选项二" value="2"></el-option>
                                <el-option label="选项三" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="带标签输入框" prop="tag">
                            <el-input v-model.number="form.tag" clearable placeholder="请输入">
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
                <div class="table-content-header">
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
                        id="el-table"
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
                        <el-input v-model="dialogForm.text" clearable style="width: 60%"></el-input>
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
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
import {tablePageMixin} from '@/mixins/tablePageMixin';

export default {
    name: 'TablePage',
    components: {
        Button
    },
    mixins: [tablePageMixin],
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
                message: '是否下载当前内容?'
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

            setTimeout(() => { // 定时器用来测试效果, 开发时请删除
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

                    setTimeout(() => { // 定时器用来测试效果, 开发时请删除
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
            if (this.isClick) {
                this.$message.warning('请勿重复点击');
                return;
            }

            this.isLoadingDialog = true;
            this.isClick = true;

            setTimeout(() => { // 定时器用来测试效果, 开发时请删除
                this.dialog.dialogVisible = false;
                this.exportExcel();
                this.$message.success('操作成功!');

                // this.mockData();
            }, 500);
        },

        // 弹出框-单个-删除
        submitDel() {
            this.isLoadingDialog = true;

            setTimeout(() => { // 定时器用来测试效果, 开发时请删除
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

        // 导出表格
        exportExcel() {
            let time = new Date();
            let wb = XLSX.utils.table_to_book(document.querySelector('#el-table'));
            let wbout = XLSX.write(wb, {
                bookType: 'xlsx',
                bookSST: true,
                type: 'array'
            });

            try {
                FileSaver.saveAs(
                    new Blob([wbout], { type: 'application/octet-stream' }),
                    `名字-${time.getTime()}.xlsx` // 文件名
                );
            } catch (e) {
                if (typeof console !== 'undefined') {
                    this.$message.error('导出失败');
                    console.log(e, wbout);
                }
            }

            return wbout;
        },

        // mock 数据
        mockData() {
            let data = [];

            this.isLoading = true;

            setTimeout(() => { // 定时器用来测试效果, 开发时请删除
                for (let i = 0; i < this.form.pageSize; i++) {
                    let tmp = {
                        value: Math.round(Math.random() * 1000 + 100)
                    };

                    data.push(tmp);
                }

                this.tableData = data;
                this.isLoading = false;
            }, 500);
        }
    }
};
</script>

<style scoped lang='less'>
@import '../../../style/tablePage.less';
</style>
