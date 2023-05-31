import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

export default {
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    init() {
      this.threeContainer = this.$refs.three
      this.statsContainer = this.$refs.stats

      this.initStats()
      this.initScene()
      this.initAxesHelper()
      this.initGridHelper()
      this.initWebGLRenderer()
      this.initPerspectiveCamera()
      this.initOrbitControls()
      this.initDirectionalLight()
      this.initCSS2DRenderer()
      this.initGLTFLoader()
      this.initDRACOLoader()
      this.initAnimate()
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
      this.scene.background = new THREE.Color(0xcaf3ff)
    },

    // 初始化-坐标轴
    initAxesHelper() {
      const axesHelper = new THREE.AxesHelper(35000)

      this.scene.add(axesHelper)
    },

    // 初始化-坐标格
    initGridHelper() {
      const gridHelper = new THREE.GridHelper(50000, 30, 0xffff00, 0xffffff)

      this.scene.add(gridHelper)
    },

    // 初始化-WebGL渲染器
    initWebGLRenderer() {
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(
        this.threeContainer.clientWidth,
        this.threeContainer.clientHeight,
      )
      this.threeContainer.appendChild(this.renderer.domElement)
    },

    // 初始化-透视相机
    initPerspectiveCamera() {
      const { clientWidth, clientHeight } = this.threeContainer
      const clientScale = clientWidth / clientHeight

      this.camera = new THREE.PerspectiveCamera(75, clientScale, 1, 100000)
      this.camera.position.set(-5000, 5000, -5000)
      this.camera.lookAt(this.scene.position)
    },

    // 初始化-轨道控制器
    initOrbitControls() {
      this.controls = new OrbitControls(this.camera, this.threeContainer)
      this.controls.target.set(0, 0, 0)
    },

    // 初始化-平行光
    initDirectionalLight() {
      this.directionalLight = new THREE.DirectionalLight(0xffffff, 3)
      this.directionalLight.position.set(1, 1, -1)
      this.scene.add(this.directionalLight)
    },

    // 初始化-CSS 2D渲染器
    initCSS2DRenderer() {
      this.css2DRenderer = new CSS2DRenderer()
      this.css2DRenderer.setSize(
        this.threeContainer.clientWidth,
        this.threeContainer.clientHeight,
      )
      this.css2DRenderer.domElement.id = 'css2d-renderer'
      this.css2DRenderer.domElement.style.position = 'absolute'
      this.css2DRenderer.domElement.style.top = '0px'
      this.threeContainer.appendChild(this.css2DRenderer.domElement)
    },

    // 初始化-GLTF加载器
    initGLTFLoader() {
      this.gltfLoader = new GLTFLoader()
    },

    // 初始化-解码库加载器
    initDRACOLoader() {
      this.dracoLoader = new DRACOLoader()
    },

    // 初始化-动画
    initAnimate() {
      this.animationFrame = requestAnimationFrame(this.initAnimate)

      this.render()
    },

    // 渲染
    render() {
      this.stats.update()
      this.renderer.render(this.scene, this.camera)
      this.css2DRenderer.render(this.scene, this.camera)
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
  },
}
