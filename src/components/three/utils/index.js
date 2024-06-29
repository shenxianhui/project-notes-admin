/*
 * @Description: three 封装
 * @Author: shenxh
 * @Date: 2022-08-03 14:14:01
 * @LastEditors: shenxh
 * @LastEditTime: 2023-05-26 09:52:33
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
    this.Css2dRenderer.createRenderer()

    /* 相机 */
    this.PerspectiveCamera.init()

    /* 时间 */
    this.Clock.init()

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
    this.ColladaLoader.init()

    /* 解码器 */
    this.DracoLoader.init()

    /* 性能监测 */
    statsId && this.Stats.init(statsId)

    /* 动画 */
    this.Animate.init()

    /* 辅助对象 */
    this.Helper.init()

    this.container.appendChild(this.renderer.domElement)
  }

  /**
   * @description: 清空 Three
   * @return {*}
   */
  clearThree() {
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
