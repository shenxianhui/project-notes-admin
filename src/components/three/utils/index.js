/*
 * @Description: three 封装
 * @Author: shenxh
 * @Date: 2022-08-03 14:14:01
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-01 10:36:05
 */

import Events from 'events'
import { kebabCaseToCamelCased, camelCasedBigToSmall } from '@/utils/utils.js'

const context = require.context('.', true, /\.js$/)

class Three extends Events {
  constructor(threeId, statsId) {
    super()

    this.loadModules()
    threeId && this.initThree(threeId, statsId)
  }

  /**
   * @description: Three 初始化
   * @param {*} threeId
   * @param {*} statsId
   * @return {*}
   */
  initThree(threeId, statsId) {
    this.container = document.getElementById(threeId)

    /* 场景 */
    this.Scene.init()

    /* 渲染器 */
    this.WebglRenderer.init()

    /* 相机 */
    this.PerspectiveCamera.init()

    /* 时间 */
    this.Clock.init()

    /* 坐标轴 */
    this.AxesHelper.init()

    /* 坐标格 */
    this.GridHelper.init()

    /* 轨道控制器 */
    this.OrbitControls.init()

    /* 光 */
    // 点光源
    this.PointLight.init()
    // 环境光
    this.AmbientLight.init()
    // 平行光 (阳光)
    this.DirectionalLight.init()

    /* 加载器 */
    this.GltfLoader.init()

    /* 解码器 */
    this.DracoLoader.init()

    /* 性能监测 */
    statsId && this.Stats.init(statsId)

    /* 动画 */
    this.Animate.init()

    this.container.appendChild(this.renderer.domElement)
  }

  /**
   * @description: 清空 Three
   * @return {*}
   */
  clearThree() {
    cancelAnimationFrame(this.animationFrame) // 停止动画

    this.container = null // this 容器
    this.statsContainer = null // 性能监测容器
    this.stats = null // 性能监测
    this.scene = null // 场景
    this.renderer = null // 渲染器
    this.clock = null // 时间
    this.camera = null // 相机
    this.axesHelper = null // 坐标轴
    this.gridHelper = null // 坐标格
    this.controls = null // 轨道控制器
    this.pointLight = null // 点光源
    this.ambientLight = null // 环境光
    this.directionalLight = null // 平行光
    this.vector3 = null // 三维向量
    this.dracoLoader = null // 已压缩模型加载器
    this.loader = null // 加载器
    this.animationFrame = null // 动画
  }

  loadModules() {
    context.keys().forEach(key => {
      if (key === './index.js') return

      const obj = context(key).default
      const fileName = key.replace(/(\.\/)|(\.js)/g, '')
      const camelCasedName = camelCasedBigToSmall(
        kebabCaseToCamelCased(fileName),
      )
      let data = {}

      data[camelCasedName] = obj(this)
      Object.assign(Three.prototype, data)
    })
  }
}

export default Three
