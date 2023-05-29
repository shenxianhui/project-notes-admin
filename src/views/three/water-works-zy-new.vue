<!--
 * @Description: 状元水厂-新
 * @Author: shenxh
 * @Date: 2022-11-03 15:53:11
 * @LastEditors: shenxh
 * @LastEditTime: 2023-05-29 16:47:13
-->

<template>
  <div class="water-works-zy-new admin-content">
    <div ref="three" class="three">
      <div ref="stats" class="stats"></div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import {
  CSS3DRenderer,
  CSS3DObject,
} from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import coordinateList from '/public/modules/water-model-zy/zuobiao.json'

export default {
  name: 'water-works-zy-new',
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

      // 组
      group: {
        waterWorks: new THREE.Group(), // 水厂
      },

      coordinateList: [...coordinateList],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.init()
    this.loaderModules()
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

    // 加载模型
    loaderModules() {
      const context = require.context(
        '/public/modules/water-model-zy',
        true,
        /\.glb$/,
      )

      context.keys().forEach(item => {
        const filePath = item.replace(/^./, '/modules/water-model-zy')

        this.dracoLoader.setDecoderPath('/utils/gltf/')
        this.gltfLoader.setDRACOLoader(this.dracoLoader)
        this.gltfLoader.load(filePath, gltf => {
          const gltfName = gltf?.scene?.children[0]?.name
          if (gltfName === 'tree1COM' || gltfName === 'tree2COM') {
            this.setModule(gltf)
          } else {
            const model = this.coordinateList.find((item, index) => {
              if (item.name === gltfName) {
                this.coordinateList.splice(index, 1)

                return true
              }
            })
            const { position = {} } = model || {}
            const { x, y, z } = position

            gltf.scene.position.set(x, y, z)
            this.group.waterWorks.add(gltf.scene)
          }
        })
      })

      this.scene.add(this.group.waterWorks)
    },

    setModule(gltf) {
      const gltfName = gltf?.scene?.children[0]?.name

      this.coordinateList.forEach((item, index) => {
        const cloneGltf = gltf.scene.clone()
        const { position = {}, name } = item || {}
        const { x, y, z } = position

        if (name === gltfName) {
          cloneGltf.position.set(x, y, z)
          this.group.waterWorks.add(cloneGltf)
          this.coordinateList.splice(index, 1)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.water-works-zy-new {
  .three {
    position: relative;
    width: 100%;
    height: 100%;
  }
  /deep/ .three-label {
    cursor: default;
    max-width: 200px;
    transform: translate(0, -50%);
    .three-label-inner {
      padding: 5px 10px;
      border-radius: 4px;
      color: #fff;
      background: #00000099;
      .three-label-inner-body {
        display: none;
        font-size: 12px;
        margin-top: 6px;
      }
    }
    .three-label-line {
      position: relative;
      top: -2px;
      left: 50%;
      height: 20px;
      margin-left: -3px;

      width: 1px;
      background: rgb(28, 135, 197);
      &::after {
        position: absolute;
        bottom: -2px;
        margin-left: -3.5px;
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        border: 1px solid rgb(28, 135, 197);
        background-color: #fff;
      }
    }
  }
}
</style>
