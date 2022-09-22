<!--
 * @Description: 水厂-乐清
 * @Author: shenxh
 * @Date: 2022-09-19 15:10:58
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-22 09:47:26
-->

<template>
  <div class="water-works-yq admin-content">
    <three width="100%" height="100%" @loader-modules="loaderModules"></three>
  </div>
</template>

<script>
import Three from '@/components/three';

export default {
  name: 'water-works-yq',
  components: {
    Three,
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 加载模型
    loaderModules(three) {
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
              // if (item.indexOf('build1YNSCYQ') !== -1) {
              //   three.scene.add(gltf.scene);
              // }
            },
            undefined,
            error => {
              console.error(error);
            },
          );
        }
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
