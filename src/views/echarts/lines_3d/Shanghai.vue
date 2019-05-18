/*
 * @Author: ShenXianhui 
 * @Date: 2019-03-25 10:44:12 
 * @Last Modified by: Shen Xianhui
 * @Last Modified time: 2019-05-19 07:41:20
 */

/* 摘自: https://gallery.echartsjs.com/editor.html?c=xTz93GGXbm */

<!-- 上海出租车路线 -->
<template>
    <div class="lines-3d-shanghai" id="lines-3d-shanghai"></div>
</template>

<script>
import * as Lines from '@/data/echarts/lines/shanghai/index.js'; // 接口全部引用
// import data from '@/data/echarts/lines_3d/chengdu.json';

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
        getLines() {
            var myChart = this.$echarts.init(document.getElementById('lines-3d-shanghai'));

            var taxiRoutes = [];

            Object.values(Lines).forEach(item => {
                var lnglats = [];
                item.forEach(item1 => {
                    if (!item1.id) {
                        return false;
                    }
                    lnglats.push([item1.longitude, item1.latitude]);
                });
                taxiRoutes.push({
                    coords: lnglats,
                    lineStyle: {}
                });
            });

            function rotateCamera(timestamp) {
                map.rotateTo((timestamp / 100) % 360, {
                    duration: 5
                });
                requestAnimationFrame(rotateCamera);
            }

            var option = {
                mapbox: {
                    style: 'mapbox://styles/mapbox/dark-v9',
                    center: [121.46, 31.22],
                    // center: [104.070, 30.650],
                    zoom: 9,
                    pitch: 60,
                    bearing: -17.6,
                    postEffect: {
                        enable: true,
                        FXAA: {
                            enable: true
                        }
                    },
                    light: {
                        main: {
                            intensity: 1,
                            shadow: true,
                            shadowQuality: 'high'
                        },
                        ambient: {
                            intensity: 0
                        },
                        ambientCubemap: {
                            texture: '/asset/get/s/data-1491838644249-ry33I7YTe.hdr',
                            exposure: 1,
                            diffuseIntensity: 0.5,
                            specularIntensity: 2
                        }
                    },
                    // container: 'map',
                    localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif"
                },
                series: [{
                    type: 'lines3D',

                    coordinateSystem: 'mapbox',

                    effect: {
                        show: true,
                        constantSpeed: 1,
                        trailWidth: 3,
                        trailLength: 0.4,
                        trailOpacity: 1,
                        spotIntensity: 10
                    },

                    blendMode: 'lighter',

                    polyline: true,

                    lineStyle: {
                        width: 0.1,
                        color: 'rgb(200, 40, 0)',
                        opacity: 0
                    },

                    data: taxiRoutes
                }]
            };
            myChart.setOption(option);
        }
    }
};
</script>

<style scoped lang='less'>
.lines-3d-shanghai {
    width: 100%;
    height: 100%;
}
</style>
