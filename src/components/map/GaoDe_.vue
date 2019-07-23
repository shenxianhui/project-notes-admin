/*
 * @Author: Shen Xianhui
 * @Date: 2019-07-21 10:52:50
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-07-22 08:58:19
 */
<!-- 高德地图 -->
<template>
    <div class="gd-map" id="gd-map" v-loading="loading"></div>
</template>

<script>
import {GDMap} from '@/utils/loadMap';

export default {
    name: 'Gaode',
    components: {},
    props: {},
    data() {
        return {
            map: null, // 地图实例
            key: '978325712b6606bf1c6a9b2818cc953d',
            plugins: [ // 插件
                'AMap.Geolocation'
            ],
            loading: true
        };
    },
    computed: {},
    watch: {},
    // created() {},
    beforeDestroy() {
        this.map.destroy();
        this.map = null;
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            GDMap(this.key, this.plugins).then(AMap => { // 成功
                this.map = new AMap.Map('gd-map', {
                    zoom: 11,
                    center: [116.397428, 39.90923]
                });
                this.map.on('complete', () => { // 地图加载完成
                    this.loading = false;
                });
            }).catch(() => { // 失败
                this.loading = false;
            });
        }
    }
};
</script>

<style scoped lang='less'>
.gd-map {
    width: 100%;
    height: 100%;
}
</style>
