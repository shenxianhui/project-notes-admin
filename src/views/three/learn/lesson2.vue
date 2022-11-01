<!--
 * @Description: 画线
 * @Author: shenxh
 * @Date: 2022-07-21 15:03:21
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-22 09:34:47
-->

<template>
  <div class="admin-content">
    <div class="three" id="three"></div>
  </div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initThree()
  },
  beforeDestroy() {},
  methods: {
    initThree() {
      const threeDom = document.getElementById('three')
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(threeDom.offsetWidth, threeDom.offsetHeight)
      threeDom.appendChild(renderer.domElement)

      const camera = new THREE.PerspectiveCamera(
        45,
        threeDom.offsetWidth / threeDom.offsetHeight,
        1,
        500,
      )
      camera.position.set(0, 0, 100)
      camera.lookAt(0, 0, 0)

      const scene = new THREE.Scene()
      // 定义一个材质
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff })

      // 创建几何体
      const points = []
      points.push(new THREE.Vector3(-10, 0, 0))
      points.push(new THREE.Vector3(0, 10, 0))
      points.push(new THREE.Vector3(10, 0, 0))

      const geometry = new THREE.BufferGeometry().setFromPoints(points)

      // 既然我们已经有了能够画两条线的点和一个材质，那我们现在就可以将他们组合在一起，形成一条线
      const line = new THREE.Line(geometry, material)

      // 添加到场景中，并调用render（渲染）函数。
      scene.add(line)
      renderer.render(scene, camera)
    },
  },
}
</script>

<style lang="less" scoped>
.three {
  width: 100%;
  height: 100%;
}
</style>
