<!--
 * @Description: 地球自转
 * @Author: shenxh
 * @Date: 2023-06-06 15:20:46
 * @LastEditors: shenxh
 * @LastEditTime: 2023-06-06 17:28:36
-->

<template>
  <div class="earth-rotation admin-content">
    <div ref="three" class="three">
      <div ref="stats" class="stats"></div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'earth-rotation',
  components: {},
  props: {},
  data() {
    return {
      threeContainer: null, // three 容器
      statsContainer: null, // 性能监测容器
      stats: null, // 性能监测
      scene: null, // 场景
      renderer: null, // 渲染器
      camera: null, // 相机
      controls: null, // 控制器
      directionalLight: null, // 平行光
      css2DRenderer: null, // CSS 2D渲染器
      gltfLoader: null, // GLTF加载器
      dracoLoader: null, // 解码库加载器
      animationFrame: null, // 动画帧
      earthMesh: null, // 地球网格
      satelliteMesh: null, // 卫星网格

      isMouseOver: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.dispose()
  },
  methods: {
    init() {
      this.threeContainer = this.$refs.three
      this.statsContainer = this.$refs.stats

      this.initStats()
      this.initScene()
      this.initAxesHelper()
      this.initWebGLRenderer()
      this.initPerspectiveCamera()
      this.initOrbitControls()
      this.initDirectionalLight()
      this.initEarth()
      this.animate()
    },

    // 初始化-性能监测
    initStats() {
      this.stats = new Stats()
      this.stats.domElement.style.position = 'absolute'
      this.statsContainer.appendChild(this.stats.domElement)
    },

    // 初始化-场景
    initScene() {
      this.scene = new THREE.Scene()

      // 创建天球背景纹理
      // const textureLoader = new THREE.TextureLoader()
      // const textureUrls = [
      //   'right.jpg',
      //   'left.jpg',
      //   'top.jpg',
      //   'bottom.jpg',
      //   'front.jpg',
      //   'back.jpg',
      // ]
      // const cubeTexture = textureLoader.load(textureUrls)
      // this.scene.background = cubeTexture

      // 创建天球背景纹理
      const textureLoader = new THREE.TextureLoader()
      const texture = textureLoader.load('/image/starry_sky.png')
      texture.mapping = THREE.EquirectangularReflectionMapping

      const sphereGeometry = new THREE.SphereGeometry(1000, 32, 32)
      const sphereMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
      })
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)

      // 反转球体的面，使其内部可见
      sphereMesh.scale.x = -1

      this.scene.add(sphereMesh)
    },

    // 初始化-坐标轴
    initAxesHelper() {
      const axesHelper = new THREE.AxesHelper(100)

      this.scene.add(axesHelper)
    },

    // 初始化-WebGL渲染器
    initWebGLRenderer() {
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(
        this.threeContainer.clientWidth,
        this.threeContainer.clientHeight,
      )
      this.threeContainer.appendChild(this.renderer.domElement)

      this.renderer.domElement.addEventListener('mousemove', event => {
        this.onMouseMove(event) // 监听鼠标移动事件
      })
    },

    // 初始化-透视相机
    initPerspectiveCamera() {
      const { clientWidth, clientHeight } = this.threeContainer
      const clientScale = clientWidth / clientHeight

      this.camera = new THREE.PerspectiveCamera(75, clientScale, 0.1, 10000)
      this.camera.position.set(100, 100, 100)
    },

    // 初始化-轨道控制器
    initOrbitControls() {
      this.controls = new OrbitControls(this.camera, this.threeContainer)
      this.controls.enablePan = false // 禁用平移操作
    },

    // 初始化-平行光
    initDirectionalLight() {
      this.directionalLight = new THREE.DirectionalLight(0xffffff)
      this.directionalLight.position.set(10000, 10000, -10000)
      this.scene.add(this.directionalLight)
    },

    // 初始化-动画
    animate() {
      this.renderer.render(this.scene, this.camera) // 最先调用
      this.stats.update()

      // 只有在鼠标不在场景中时才进行旋转
      if (!this.isMouseOver) {
        // 使地球自转
        this.earthMesh.rotation.y += 0.01

        // 使卫星跟随地球的旋转
        this.satelliteMesh.rotation.y -= 0.01
      }

      this.animationFrame = requestAnimationFrame(this.animate) // 最后调用
    },

    // 清空 three
    dispose() {
      // 停止动画
      cancelAnimationFrame(this.animationFrame)

      // 从场景中删除所有对象
      this.scene && this.scene.remove(...this.scene.children)

      // 从内存中删除所有纹理
      this.renderer && this.renderer.dispose()

      // 从内存中删除所有几何体
      this.geometry && this.geometry.dispose()

      // 从内存中删除所有材质
      this.material && this.material.dispose()

      // 从内存中删除所有渲染目标
      this.renderTarget && this.renderTarget.dispose()
    },

    onMouseMove(e) {
      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()

      mouse.x =
        ((e.clientX - this.threeContainer.getBoundingClientRect().left) /
          this.threeContainer.offsetWidth) *
          2 -
        1
      mouse.y =
        -(
          (e.clientY - this.threeContainer.getBoundingClientRect().top) /
          this.threeContainer.offsetHeight
        ) *
          2 +
        1

      raycaster.setFromCamera(mouse, this.camera)

      const intersects = raycaster.intersectObject(this.earthMesh)

      if (intersects.length > 0) {
        this.isMouseOver = true
      } else {
        this.isMouseOver = false
      }
    },

    // 地球初始化
    initEarth() {
      // 创建地球几何体
      const earthGeometry = new THREE.SphereGeometry(80, 64, 32)

      // 创建地球纹理
      const earthTexture = new THREE.TextureLoader().load(
        '/image/earth_texture.png',
      )

      // 创建地球材质
      const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture })

      // 创建地球网格
      this.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)

      // 将地球添加到场景中
      this.scene.add(this.earthMesh)

      // 创建卫星几何体
      const satelliteGeometry = new THREE.SphereGeometry(10, 32, 16)

      // 创建卫星材质
      const satelliteMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })

      // 创建卫星网格
      this.satelliteMesh = new THREE.Mesh(satelliteGeometry, satelliteMaterial)

      // 设置卫星的初始位置
      this.satelliteMesh.position.set(110, 0, 0)

      // 将卫星添加到地球上
      this.earthMesh.add(this.satelliteMesh)
    },
  },
}
</script>

<style lang="less" scoped>
.earth-rotation {
  .three {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
