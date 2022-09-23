<!--
 * @Description: [组件]Three
 * @Author: shenxh
 * @Date: 2022-08-06 11:09:14
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-23 16:18:38
-->

<template>
  <div
    class="three"
    :id="threeId"
    ref="three"
    :style="{ width: width, height: height }"
  >
    <div class="stats" :id="statsId"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import Three from './utils';

let three = null;

export default {
  name: 'three',
  components: {},
  props: {
    threeId: {
      type: String,
      default: '$_three',
    },
    statsId: {
      type: String,
      default: '$_stats',
    },
    width: {
      type: String,
      default: '500px',
    },
    height: {
      type: String,
      default: '300px',
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initThree();
  },
  beforeDestroy() {
    this.clearThree();
  },
  methods: {
    // three 初始化
    initThree() {
      if (!three) three = new Three(this.threeId, this.statsId);

      /* 模型加载 */
      // this.initLoader();
      this.$emit('loader-modules', three);
    },

    // 模型批量加载
    initLoader() {
      const context = require.context(
        '../../../public/modules/water-model',
        true,
        /\.glb$/,
      );
      const urlList = context.keys().map(item => {
        return item.replace(/^./, '/modules/water-model');
      });

      urlList.forEach(item => {
        const arr = item.split('.');
        const type = arr[arr.length - 1].toLocaleLowerCase();

        if (type === 'glb' || type === 'gltf') {
          three.setDRACOLoaderDecoderPath();
          three.loader.setDRACOLoader(three.dracoLoader);

          three.getGLTFLoaderLoad(
            item,
            gltf => {
              gltf.scene.scale.set(0.01, 0.01, 0.01);
              three.scene.add(gltf.scene);
            },
            undefined,
            error => {
              console.error(error);
            },
          );
        }
      });
    },

    // 清空 three
    clearThree() {
      three.clearThree();

      three = null;
    },
  },
};
</script>

<style lang="less" scoped>
.three {
  position: relative;
}
</style>
