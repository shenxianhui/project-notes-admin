/*
 * @Author: Shen Xianhui
 * @Date: 2019-07-21 10:03:53
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-07-21 11:05:49
 */
<!-- 高德地图 -->
<template>
    <div class="gaode-map">
        <Gaode></Gaode>
    </div>
</template>

<script>
import Gaode from '@/components/map/Gaode'

export default {
    name: 'GaodeMap',
    components: {
        Gaode
    },
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    // created() {},
    // mounted() {},
    methods: {}
};
</script>

<style scoped lang='less'>
.gaode-map {
    width: 100%;
    height: 100%;
}
</style>
