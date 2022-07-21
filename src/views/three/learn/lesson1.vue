<!--
 * @Description: 创建一个场景
 * @Author: shenxh
 * @Date: 2022-07-21 14:06:32
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-21 14:58:04
-->
<template>
  <div class="admin-content">
    <div class="three" id="three"></div>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'lesson1',
  components: {},
  props: {},
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      width: '',
      height: '',
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initThree();
  },
  beforeDestroy() {},
  methods: {
    initThree() {
      const threeDom = document.getElementById('three');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        threeDom.offsetWidth / threeDom.offsetHeight,
        0.1,
        1000,
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(threeDom.offsetWidth, threeDom.offsetHeight);
      threeDom.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      }

      animate();
    },
  },
};
</script>

<style lang="less" scoped>
.three {
  width: 100%;
  height: 100%;
}
</style>
