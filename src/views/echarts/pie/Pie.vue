/*
 * @Author: ShenXianhui
 * @Date: 2019-03-28 13:50:46
 * @Last Modified by: ShenXianhui
 * @Last Modified time: 2019-04-02 08:52:48
 */
<!-- 饼图 -->
<template>
    <div class="pie">
        <!-- 饼图-渐变 -->
        <div class="container">
            <PieGradient id="pie-gradient"></PieGradient>
        </div>
    </div>
</template>

<script>
import PieGradient from '@/components/echarts/PieGradient';

export default {
    name: 'Pie',
    components: {
        PieGradient
    },
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    mounted() {},
    created() {},
    methods: {}
};
</script>

<style scoped lang='less'>
.pie {
    display: flex;

    width: 100%;
    height: 100%;
    .container {
        width: 50%;
        height: 50%;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        &:not(:nth-child(2n)) {
            border-right: 1px solid #ddd;
        }
    }
}
</style>
