/*
 * @Description: three 封装
 * @Author: shenxh
 * @Date: 2022-08-03 14:14:01
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-03 17:21:18
 */

import * as THREE from 'three'

import Scene from './resource/scene'
import WebGLRenderer from './resource/webgl-renderer'
import PerspectiveCamera from './resource/perspective-camera'
import Clock from './resource/clock'
import AxesHelper from './resource/axes-helper'
import GridHelper from './resource/grid-helper'
import OrbitControls from './resource/orbit-controls'
import PointLight from './resource/point-light'
import AmbientLight from './resource/ambient-light'
import DirectionalLight from './resource/directional-light'
import Vector3 from './resource/vector3'

class Three {
  /**
   * @description: three 初始化
   * @param {string} 元素id
   * @return {*}
   */
  initThree(id) {
    this.container = document.getElementById(id)

    this.initScene()
    this.initWebGLRenderer({
      antialias: true, // 抗锯齿
    })
    this.setRendererSize()
    this.setRendererShadowMap({
      type: THREE.PCFSoftShadowMap, // 定义阴影贴图类型
    })
    this.initPerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000,
    )
    this.setPerspectiveCameraPosition(10, 20, 40)
    this.setPerspectiveCameraLookAt(this.scene.position)
    this.initClock()
    this.initAxesHelper(20)
    this.initGridHelper(200, 40, 0xf0f, 0xff000020)
    this.initOrbitControls(this.camera, this.container)
    this.initLight()

    this.animate()

    this.scene.add(this.axesHelper)
    this.scene.add(this.gridHelper)
    this.scene.add(this.pointLight)
    this.scene.add(this.ambientLight)
    this.scene.add(this.directionalLight)

    this.container.appendChild(this.renderer.domElement)
  }

  /**
   * @description: 光源初始化
   * @return {*}
   */
  initLight() {
    // 点光源
    this.initPointLight(0xffffff)
    this.setPointLightPosition(500, 300, 400)

    // 环境光
    this.initAmbientLight(0x404040)

    // 平行光 (阳光)
    this.initDirectionalLight(0xffffff, 0.5)
    this.setDirectionalLightShadowCamera({
      near: 1,
      far: 400,
      left: -50,
      right: -50,
      top: 20,
      bottom: -50,
    })
    this.setDirectionalLightShadowMapSize({
      width: 1024,
      height: 1024,
    })
  }

  /**
   * @description: 启用动画
   * @return {*}
   */
  animate() {
    this.animationFrame = requestAnimationFrame(this.animate.bind(this))

    this.render()
  }

  /**
   * @description: 渲染
   * @return {*}
   */
  render() {
    this.renderer.render(this.scene, this.camera)
  }
}

Object.assign(Three.prototype, Scene)
Object.assign(Three.prototype, WebGLRenderer)
Object.assign(Three.prototype, PerspectiveCamera)
Object.assign(Three.prototype, Clock)
Object.assign(Three.prototype, AxesHelper)
Object.assign(Three.prototype, GridHelper)
Object.assign(Three.prototype, OrbitControls)
Object.assign(Three.prototype, PointLight)
Object.assign(Three.prototype, AmbientLight)
Object.assign(Three.prototype, DirectionalLight)
Object.assign(Three.prototype, Vector3)

export default Three
