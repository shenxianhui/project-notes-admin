/*
 * @Author: Shen Xianhui
 * @Date: 2019-06-14 09:34:37
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-06-16 18:04:45
 */
<!-- 图表 -->
<template>
    <div class="chart">
        <!-- 柱状折线图 -->
        <div class="group">
            <BarLine id="bar-line"></BarLine>
        </div>
        <div class="select">
            <el-select v-model="selectVal.date" @change="handleDate" size="mini" style="width: 80px">
                <el-option
                    v-for="item in dateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="selectVal.type" @change="handleType" size="mini" style="width: 80px">
                <el-option label="总计" value="total"></el-option>
                <el-option label="平均" value="average"></el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
import BarLine from '@/components/echarts/BarLine';

export default {
    name: 'Chart',
    components: {
        BarLine
    },
    props: {},
    data() {
        return {
            selectVal: {
                date: 'date',
                type: 'total'
            },
            dateOptions: [
                {
                    label: '日',
                    value: 'date'
                },
                {
                    label: '月',
                    value: 'month'
                },
                {
                    label: '年',
                    value: 'year'
                },
                {
                    label: '总计',
                    value: 'total'
                }
            ]
        };
    },
    computed: {},
    watch: {},
    // created() {},
    // mounted() {},
    methods: {
        handleDate(v) {
            switch (v) {
                case 'date':
                    break;
                case 'month':
                    break;
                case 'year':
                    break;
                case 'total':
                    break;
            }
        },

        handleType(v) {
            switch (v) {
                case 'total':
                    break;
                case 'average':
                    break;
            }
        }
    }
};
</script>

<style scoped lang='less'>
.chart {
    position: relative;
    display: flex;
    flex-wrap: wrap;

    width: 100%;
    height: 100%;
    .group {
        width: 50%;
        height: 50%;
        border-bottom: 1px solid #ddd;
        &:not(:nth-child(2n)) {
            border-right: 1px solid #ddd;
        }
    }
    .select {
        position: absolute;
        top: 0;
        right: 0;
    }
}
</style>
