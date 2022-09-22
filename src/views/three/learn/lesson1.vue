<!--
 * @Description: 模型加载
 * @Author: shenxh
 * @Date: 2022-07-25 14:36:50
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-02 18:20:58
-->

<template>
  <div class="admin-content">
    <div class="container">
      <!-- 放性能监测的容器 -->
      <div id="stats"></div>
      <!-- 3D模型容器 -->
      <div id="three"></div>
    </div>
  </div>
</template>

<script>
import Three from '@/utils/three';
import events from '@/utils/three/enum/events';

let three = null;

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initThree();
  },
  beforeDestroy() {},
  methods: {
    // 初始化
    initThree() {
      three = new Three();

      // 点击事件
      three.on(events.clicked, evt => {
        console.log('点击事件', evt);
      });

      three.load('/modules/st_happens/scene.gltf');
      three.init('three');
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  #stats {
    position: absolute;
  }
  #three {
    width: 100%;
    height: 100%;
  }
}
</style>
