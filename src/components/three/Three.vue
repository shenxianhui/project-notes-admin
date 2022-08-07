<!--
 * @Description: [组件]Three
 * @Author: shenxh
 * @Date: 2022-08-06 11:09:14
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-07 10:49:59
-->

<template>
  <div
    class="three"
    id="three"
    ref="three"
    :style="{ width: width, height: height }"
  >
    <div class="stats" id="stats"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import three from '@/utils/three-new'

export default {
  name: 'three',
  components: {},
  props: {
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
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initThree()
  },
  beforeDestroy() {
    this.clearThree()
  },
  methods: {
    /**
     * @description: three 初始化
     * @param {string} 元素id
     * @return {*}
     */
    initThree() {
      three.container = document.getElementById('three')
      three.statsContainer = document.getElementById('stats')

      /* 场景 */
      three.initScene()

      /* 渲染器 */
      three.initWebGLRenderer({
        antialias: true, // 抗锯齿
      })
      three.setRendererSize()
      three.setRendererShadowMap({
        type: THREE.PCFSoftShadowMap, // 定义阴影贴图类型
      })

      /* 相机 */
      const { clientWidth, clientHeight } = three.container
      const clientScale = clientWidth / clientHeight

      three.initPerspectiveCamera(75, clientScale, 0.1, 1000)
      three.setPerspectiveCameraPosition(10, 20, 40)
      three.setPerspectiveCameraLookAt(three.scene.position)

      /* 时间 */
      three.initClock()

      /* 坐标轴 */
      three.initAxesHelper(20)
      three.scene.add(three.axesHelper)

      /* 坐标格 */
      three.initGridHelper(200, 40, 0xf0f, 0xff000020)
      three.scene.add(three.gridHelper)

      /* 轨道控制器 */
      three.initOrbitControls(three.camera, three.container)

      /* 光 */
      this.initLight()

      /* 加载器 */
      three.initGLTFLoader()
      three.initDRACOLoader()

      /* 性能监测 */
      three.initStats()
      three.setStatsStyle()
      console.log(three.statsContainer, three.stats)
      three.statsContainer.appendChild(three.stats.domElement)

      /* 动画 */
      this.animate()

      /* 模型加载 */
      this.initLoader()

      three.container.appendChild(three.renderer.domElement)
    },

    /**
     * @description: 光源初始化
     * @return {*}
     */
    initLight() {
      // 点光源
      three.initPointLight(0xffffff)
      three.setPointLightPosition(500, 300, 400)
      three.scene.add(three.pointLight)

      // 环境光
      three.initAmbientLight(0x404040)
      three.scene.add(three.ambientLight)

      // 平行光 (阳光)
      three.initDirectionalLight(0xffffff, 0.5)
      three.setDirectionalLightShadowCamera({
        near: 1,
        far: 400,
        left: -50,
        right: -50,
        top: 20,
        bottom: -50,
      })
      three.setDirectionalLightShadowMapSize({
        width: 1024,
        height: 1024,
      })
      three.scene.add(three.directionalLight)
    },

    /**
     * @description: 启用动画
     * @return {*}
     */
    animate() {
      three.animationFrame = requestAnimationFrame(this.animate.bind(three))

      this.render()
    },

    /**
     * @description: 渲染
     * @return {*}
     */
    render() {
      three.stats.update()
      three.renderer.render(three.scene, three.camera)
    },

    /**
     * @description: 模型批量加载
     * @param {string[]} urlList 文件路径列表
     * @return {*}
     */
    initLoader() {
      const context = require.context(
        '../../../public/modules/water-model',
        true,
        /\.glb$/,
      )
      const urlList = context.keys().map(item => {
        return item.replace(/^./, '/modules/water-model')
      })

      urlList.forEach(item => {
        const arr = item.split('.')
        const type = arr[arr.length - 1].toLocaleLowerCase()

        if (type === 'glb' || type === 'gltf') {
          three.setDRACOLoaderDecoderPath()
          three.loader.setDRACOLoader(three.dracoLoader)

          three.getGLTFLoaderLoad(
            item,
            gltf => {
              three.scene.add(gltf.scene)
            },
            undefined,
            error => {
              console.error(error)
            },
          )
        }
      })
    },

    /**
     * @description: 清空 three
     * @return {*}
     */
    clearThree() {
      cancelAnimationFrame(three.animationFrame) // 停止动画

      three.container = null // three 容器
      three.statsContainer = null // 性能监测容器
      three.stats = null // 性能监测
      three.scene = null // 场景
      three.renderer = null // 渲染器
      three.clock = null // 时间
      three.camera = null // 相机
      three.axesHelper = null // 坐标轴
      three.gridHelper = null // 坐标格
      three.controls = null // 轨道控制器
      three.pointLight = null // 点光源
      three.ambientLight = null // 环境光
      three.directionalLight = null // 平行光
      three.Vector3 = null // 三维向量
      three.dracoLoader = null // 已压缩模型加载器
      three.loader = null // 加载器
      three.animationFrame = null // 动画
    },
  },
}
</script>

<style lang="less" scoped>
.three {
  position: relative;
}
</style>
