/*
 * @Author: ShenXianhui 
 * @Date: 2019-03-25 10:44:12 
 * @Last Modified by: ShenXianhui
 * @Last Modified time: 2019-03-25 14:34:23
 */
<!-- 全球路线 -->
<template>
    <div class="lines3d-world" id="lines-3d-world"></div>
</template>

<script>
import Lines from '@/assets/data/lines_3d/world.json';

export default {
    name: 'lines3DWorld',
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
            var myChart = this.$echarts.init(document.getElementById('lines-3d-world'));
            var airports = Lines.airports.map(function (item) {
                return {
                    coord: [item[3], item[4]]
                }
            });
            function getAirportCoord(idx) {
                return [Lines.airports[idx][3], Lines.airports[idx][4]];
            }

            // Route: [airlineIndex, sourceAirportIndex, destinationAirportIndex]
            var routesGroupByAirline = {};
            Lines.routes.forEach(function (route) {
                var airline = Lines.airlines[route[0]];
                var airlineName = airline[0];
                if (!routesGroupByAirline[airlineName]) {
                    routesGroupByAirline[airlineName] = [];
                }
                routesGroupByAirline[airlineName].push(route);
            });

            var pointsData = [];
            Lines.routes.forEach(function (airline) {
                pointsData.push(getAirportCoord(airline[1]));
                pointsData.push(getAirportCoord(airline[2]));
            });

            var series = Lines.airlines.map(function (airline) {
                var airlineName = airline[0];
                var routes = routesGroupByAirline[airlineName];

                if (!routes) {
                    return null;
                }
                return {
                    type: 'lines3D',
                    name: airlineName,

                    effect: {
                        show: true,
                        trailWidth: 2,
                        trailLength: 0.15,
                        trailOpacity: 1,
                        trailColor: 'rgb(30, 30, 60)'
                    },

                    lineStyle: {
                        width: 1,
                        color: 'rgb(50, 50, 150)',
                        // color: 'rgb(118, 233, 241)',
                        opacity: 0.1
                    },
                    blendMode: 'lighter',

                    data: routes.map(function (item) {
                        return [airports[item[1]].coord, airports[item[2]].coord];
                    })
                };
            }).filter(function (series) {
                return !!series;
            });
            series.push({
                type: 'scatter3D',
                coordinateSystem: 'globe',
                blendMode: 'lighter',
                symbolSize: 2,
                itemStyle: {
                    color: 'rgb(50, 50, 150)',
                    opacity: 0.2
                },
                data: pointsData
            });

            myChart.setOption({
                legend: {
                    selectedMode: 'single',
                    left: 'left',
                    data: Object.keys(routesGroupByAirline),
                    orient: 'vertical',
                    textStyle: {
                        color: '#fff'
                    }
                },
                globe: {

                    environment: '../../../assets/img/echarts/starfield.jpg',

                    // baseTexture: "../../../assets/img/echarts/world.jpg",

                    // heightTexture: '../../../assets/img/echarts/world.jpg',

                    displacementScale: 0.1,
                    displacementQuality: 'high',

                    baseColor: '#000',

                    shading: 'realistic',
                    realisticMaterial: {
                        roughness: 0.2,
                        metalness: 0
                    },

                    postEffect: {
                        enable: true,
                        depthOfField: {
                            enable: false,
                            focalDistance: 150
                        }
                    },
                    temporalSuperSampling: {
                        enable: true
                    },
                    light: {
                        ambient: {
                            intensity: 0
                        },
                        main: {
                            intensity: 0.1,
                            shadow: false
                        },
                        ambientCubemap: {
                            texture: '../../../assets/echarts/lake.hdr',
                            exposure: 1,
                            diffuseIntensity: 0.5,
                            specularIntensity: 2
                        }
                    },
                    viewControl: {
                        autoRotate: false
                    },
                    silent: true
                },
                series: series
            });
            window.addEventListener('keydown', function () {
                series.forEach(function (series, idx) {
                    myChart.dispatchAction({
                        type: 'lines3DToggleEffect',
                        seriesIndex: idx
                    });
                })
            });
        }
    }
};
</script>

<style scoped lang='less'>
.lines3d-world {
    width: 100%;
    height: 100%;
}
</style>
