/*
 * @Author: ShenXianhui 
 * @Date: 2019-03-25 10:44:12 
 * @Last Modified by: ShenXianhui
 * @Last Modified time: 2019-03-26 10:38:43
 */
<!-- 上海出租车路线 -->
<template>
    <div class="lines3d-shanghai" id="lines-3d-shanghai">123</div>
</template>

<script>
import Lines from '@/assets/data/lines/shanghai/result_105.json';

export default {
    name: 'lines3DShanghai',
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    mounted() {
        this.getLines();
    },
    methods: {
        getLines() {}
    }
};
</script>

<style scoped lang='less'>
.lines3d-shanghai {
    width: 100%;
    height: 100%;
}
</style>
