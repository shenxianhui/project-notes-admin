<!--
 * @Author: ShenXianhui
 * @LastEditors: ShenXianhui
 * @Date: 2019-04-23 15:02:52
 * @LastEditTime: 2019-04-24 15:34:57
 -->
<!-- 星系 -->
<template>
    <div class="galaxy">
        <div class="trajectory">
            <div class="earth">
                <img src="@/assets/img/animation/globe_1.png" alt="地球">
            </div>
            <div class="globe globe1">
                <img src="@/assets/img/animation/globe_2.png" alt="星球">
            </div>
            <div class="globe globe2">
                <img src="@/assets/img/animation/globe_3.png" alt="星球">
            </div>
            <div class="globe globe3">
                <img src="@/assets/img/animation/globe_4.png" alt="星球">
            </div>
            <div class="globe globe4">
                <img src="@/assets/img/animation/globe_5.png" alt="星球">
            </div>
            <div class="globe globe5">
                <img src="@/assets/img/animation/globe_6.png" alt="星球">
            </div>
            <div class="globe globe6">
                <img src="@/assets/img/animation/globe_7.png" alt="星球">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Galaxy',
    components: {},
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
.galaxy {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    background: url('../../../assets/img/animation/globe_bg.png') no-repeat center center;
    background-size: cover;
    overflow: hidden;
    .trajectory {
        position: relative;

        width: 100%;
        height: 95%;
        background: url('../../../assets/img/animation/globe_trajectory.png') no-repeat center center;
        background-size: contain;
        .earth {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 100%;
            height: 100%;
            img {
                width: 25%;
                // height: 35%;
                // margin-bottom: 7.3%;
                z-index: 10;
            }
        }
        /* 地球自传 */
        // .earth {
        //     position: absolute;
        //     top: 20%;
        //     left: 40%;
        //     margin-left: -90px;
        //     margin-top: -40px;

        //     width: 450px;
        //     height: 450px;
        //     // height: 18vw; /* vw是相对于视口宽度百分比的单位，1vw = 1% viewport width */
        //     background: url('../../../assets/img/animation/globe.jpg') repeat-x 0 0;
        //     box-shadow:
        //         -8px 0 25px rgba(256,256,256,0.3),
        //         -1px -2px 14px rgba(256,256,256,0.5) inset;
        //     border: 1px solid rgba(26,18,101,0.3);
        //     border-radius: 50%;
        //     transform: scale(0.5, 0.5);
        //     z-index: 10;
        //     &::before {
        //         position: absolute;
        //         top: 0;
        //         left: 0;

        //         width: 450px;
        //         height: 450px;
        //         border-radius: 50%;
        //         content: "";
        //         box-shadow:  -150px -6px 25px rgba(0,0,0,0.7) inset;
        //     }
        //     @keyframes revolve {
        //         0% {
        //             background-position: 0 0;
        //         }
        //         100% {
        //             background-position: -900px 0;
        //         }
        //     }
        //     animation: revolve 10s linear infinite;
        // }
        .globe {
            position: absolute;
            
            display: flex;
            align-items: center;
            justify-content: center;

            width: 8%;
            height: 15%;
            img {
                width: 80px;
                height: 80px;
            }
        }
        .globe1 {
            @keyframes animX1 {
                0% {left: -5%;}
                100% {left: 96%;}
            }
            @keyframes animY1 {
                0% {top: 17%;}
                100% {top: 68%;}
            }
            @keyframes scale1 {
                0% {
                    transform: scale(1);
                    z-index: 0;
                }
                50% {
                    transform: scale(1.5);
                    z-index: 20;
                }
                100% {
                    transform: scale(1);
                    z-index: 0;
                }
            }
            animation:
                /* 周期 速度曲线 延迟 播放次数 反向播放 */
                animX1 15s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
                animY1 15s cubic-bezier(0.36, 0, 0.64, 1) -7.5s infinite alternate,
                scale1 30s cubic-bezier(0.36, 0, 0.64, 1) -7.5s infinite alternate;
        }
        .globe2 {
            @keyframes animX2 {
                0% {left: 5%;}
                100% {left: 86%;}
            }
            @keyframes animY2 {
                0% {top: 21%;}
                100% {top: 63%;}
            }
            @keyframes scale2 {
                0% {
                    transform: scale(0.6);
                    z-index: 1;
                }
                50% {
                    transform: scale(0.8);
                    z-index: 19;
                }
                100% {
                    transform: scale(0.6);
                    z-index: 1;
                }
            }
            animation:
                /* 周期 速度曲线 延迟 播放次数 反向播放 */
                animX2 12s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
                animY2 12s cubic-bezier(0.36, 0, 0.64, 1) -6s infinite alternate,
                scale2 24s cubic-bezier(0.36, 0, 0.64, 1) -6s infinite alternate;
        }
        .globe3 {
            @keyframes animX3 {
                0% {left: 14%;}
                100% {left: 78%;}
            }
            @keyframes animY3 {
                0% {top: 26%;}
                100% {top: 59%;}
            }
            @keyframes scale3 {
                0% {
                    transform: scale(0.5);
                    z-index: 2;
                }
                50% {
                    transform: scale(0.7);
                    z-index: 18;
                }
                100% {
                    transform: scale(0.5);
                    z-index: 2;
                }
            }
            animation:
                /* 周期 速度曲线 延迟 播放次数 反向播放 */
                animX3 10s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
                animY3 10s cubic-bezier(0.36, 0, 0.64, 1) -5s infinite alternate,
                scale3 20s cubic-bezier(0.36, 0, 0.64, 1) -5s infinite alternate;
        }
        .globe4 {
            @keyframes animX4 {
                0% {left: 22%;}
                100% {left: 70%;}
            }
            @keyframes animY4 {
                0% {top: 30%;}
                100% {top: 55%;}
            }
            @keyframes scale4 {
                0% {
                    transform: scale(0.3);
                    z-index: 3;
                }
                50% {
                    transform: scale(0.5);
                    z-index: 16;
                }
                100% {
                    transform: scale(0.3);
                    z-index: 3;
                }
            }
            animation:
                /* 周期 速度曲线 延迟 播放次数 反向播放 */
                animX4 6s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
                animY4 6s cubic-bezier(0.36, 0, 0.64, 1) -3s infinite alternate,
                scale4 12s cubic-bezier(0.36, 0, 0.64, 1) -3s infinite alternate;
        }
        .globe5 {
            @keyframes animX5 {
                0% {left: 29%;}
                100% {left: 62%;}
            }
            @keyframes animY5 {
                0% {top: 34%;}
                100% {top: 51%;}
            }
            @keyframes scale5 {
                0% {
                    transform: scale(0.2);
                    z-index: 4;
                }
                50% {
                    transform: scale(0.4);
                    z-index: 15;
                }
                100% {
                    transform: scale(0.2);
                    z-index: 4;
                }
            }
            animation:
                /* 周期 速度曲线 延迟 播放次数 反向播放 */
                animX5 3s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
                animY5 3s cubic-bezier(0.36, 0, 0.64, 1) -1.5s infinite alternate,
                scale5 6s cubic-bezier(0.36, 0, 0.64, 1) -1.5s infinite alternate;
        }
        .globe6 {
            @keyframes animX6 {
                0% {left: 34.5%;}
                100% {left: 57.5%;}
            }
            @keyframes animY6 {
                0% {top: 36.5%;}
                100% {top: 48.5%;}
            }
            @keyframes scale6 {
                0% {
                    transform: scale(0.1);
                    z-index: 5;
                }
                50% {
                    transform: scale(0.15);
                    z-index: 14;
                }
                100% {
                    transform: scale(0.1);
                    z-index: 5;
                }
            }
            animation:
                /* 周期 速度曲线 延迟 播放次数 反向播放 */
                animX6 2s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
                animY6 2s cubic-bezier(0.36, 0, 0.64, 1) -1s infinite alternate,
                scale6 4s cubic-bezier(0.36, 0, 0.64, 1) -1s infinite alternate;
        }
    }
}
</style>
