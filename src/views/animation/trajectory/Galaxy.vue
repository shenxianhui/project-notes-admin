/* * @Author: Shen Xianhui * @Date: 2019-04-23 15:02:52 * @Last Modified by: Shen Xianhui * @Last Modified time:
2019-06-07 16:52:03 */
<!-- 星系 -->
<template>
  <div class="galaxy">
    <div class="trajectory">
      <div class="sun">
        <img src="@/assets/img/galaxy/sun.png" alt="太阳" />
      </div>
      <div class="globe mercury">
        <img src="@/assets/img/galaxy/mercury.png" alt="水星" />
      </div>
      <div class="globe venus">
        <img src="@/assets/img/galaxy/venus.png" alt="金星" />
      </div>
      <div class="globe earth">
        <img src="@/assets/img/galaxy/earth.png" alt="地球" />
      </div>
      <div class="globe mars">
        <img src="@/assets/img/galaxy/mars.png" alt="火星" />
      </div>
      <div class="globe jupiter">
        <img src="@/assets/img/galaxy/jupiter.png" alt="木星" />
      </div>
      <div class="globe saturn">
        <img src="@/assets/img/galaxy/saturn.png" alt="土星" />
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
  // mounted() {},
  // created() {},
  methods: {}
};
</script>

<style scoped lang="less">
.galaxy {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background: url('../../../assets/img/galaxy/globe_bg.png') no-repeat center center;
  background-size: cover;
  overflow: hidden;
  .trajectory {
    position: relative;

    width: 100%;
    height: 95%;
    background: url('../../../assets/img/galaxy/globe_trajectory.png') no-repeat center center;
    background-size: contain;
    /* 太阳 */
    .sun {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;
      img {
        width: 20%;
        // height: 35%;
        // margin-bottom: 7.3%;
        z-index: 10;
      }
    }
    /* 所有行星 */
    .globe {
      position: absolute;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 8%;
      height: 15%;
      img {
        width: 50px;
        height: 50px;
      }
    }
    /* 水星 */
    .mercury {
      @keyframes mercuryL {
        0% {
          left: 34.5%;
        }
        100% {
          left: 57.5%;
        }
      }
      @keyframes mercuryT {
        0% {
          top: 37%;
        }
        100% {
          top: 48%;
        }
      }
      @keyframes mercuryS {
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
                /* 周期 速度曲线 延迟 播放次数 反向播放 */ mercuryL 2s cubic-bezier(0.36, 0, 0.64, 1) 0s
          infinite alternate,
        mercuryT 2s cubic-bezier(0.36, 0, 0.64, 1) -1s infinite alternate,
        mercuryS 4s cubic-bezier(0.36, 0, 0.64, 1) -1s infinite alternate;
    }
    /* 金星 */
    .venus {
      @keyframes venusL {
        0% {
          left: 29%;
        }
        100% {
          left: 63%;
        }
      }
      @keyframes venusT {
        0% {
          top: 34%;
        }
        100% {
          top: 50%;
        }
      }
      @keyframes venusS {
        // 0% {
        //     transform: scale(0.5);
        //     z-index: 2;
        // }
        // 50% {
        //     transform: scale(0.7);
        //     z-index: 18;
        // }
        // 100% {
        //     transform: scale(0.5);
        //     z-index: 2;
        // }
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
                /* 周期 速度曲线 延迟 播放次数 反向播放 */ venusL 3s cubic-bezier(0.36, 0, 0.64, 1) 0s
          infinite alternate,
        venusT 3s cubic-bezier(0.36, 0, 0.64, 1) -1.5s infinite alternate,
        venusS 6s cubic-bezier(0.36, 0, 0.64, 1) -1.5s infinite alternate;
    }
    /* 地球 */
    .earth {
      @keyframes earthL {
        0% {
          left: 22%;
        }
        100% {
          left: 70%;
        }
      }
      @keyframes earthT {
        0% {
          top: 30%;
        }
        100% {
          top: 54%;
        }
      }
      @keyframes earthS {
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
                /* 周期 速度曲线 延迟 播放次数 反向播放 */ earthL 6s cubic-bezier(0.36, 0, 0.64, 1) 0s
          infinite alternate,
        earthT 6s cubic-bezier(0.36, 0, 0.64, 1) -3s infinite alternate,
        earthS 12s cubic-bezier(0.36, 0, 0.64, 1) -3s infinite alternate;
    }
    /* 火星 */
    .mars {
      @keyframes marsL {
        0% {
          left: 14%;
        }
        100% {
          left: 78%;
        }
      }
      @keyframes marsT {
        0% {
          top: 27%;
        }
        100% {
          top: 58%;
        }
      }
      @keyframes marsS {
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
                /* 周期 速度曲线 延迟 播放次数 反向播放 */ marsL 10s cubic-bezier(0.36, 0, 0.64, 1) 0s
          infinite alternate,
        marsT 10s cubic-bezier(0.36, 0, 0.64, 1) -5s infinite alternate,
        marsS 20s cubic-bezier(0.36, 0, 0.64, 1) -5s infinite alternate;
    }
    /* 木星 */
    .jupiter {
      @keyframes jupiterL {
        0% {
          left: 6%;
        }
        100% {
          left: 86%;
        }
      }
      @keyframes jupiterT {
        0% {
          top: 22%;
        }
        100% {
          top: 62%;
        }
      }
      @keyframes jupiterS {
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
                /* 周期 速度曲线 延迟 播放次数 反向播放 */ jupiterL 12s cubic-bezier(0.36, 0, 0.64, 1)
          0s infinite alternate,
        jupiterT 12s cubic-bezier(0.36, 0, 0.64, 1) -6s infinite alternate,
        jupiterS 24s cubic-bezier(0.36, 0, 0.64, 1) -6s infinite alternate;
    }
    /* 土星 */
    .saturn {
      @keyframes saturnL {
        0% {
          left: -4%;
        }
        100% {
          left: 96%;
        }
      }
      @keyframes saturnT {
        0% {
          top: 19%;
        }
        100% {
          top: 66%;
        }
      }
      @keyframes saturnS {
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
                /* 周期 速度曲线 延迟 播放次数 反向播放 */ saturnL 15s cubic-bezier(0.36, 0, 0.64, 1) 0s
          infinite alternate,
        saturnT 15s cubic-bezier(0.36, 0, 0.64, 1) -7.5s infinite alternate,
        saturnS 30s cubic-bezier(0.36, 0, 0.64, 1) -7.5s infinite alternate;
    }
  }
}
</style>
