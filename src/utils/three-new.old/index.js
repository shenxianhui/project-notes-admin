/*
 * @Description: three 封装
 * @Author: shenxh
 * @Date: 2022-08-03 14:14:01
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-04 16:06:42
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
import GLTFLoader from './resource/gltf-loader'
import DRACOLoader from './resource/draco-loader'

class Three {
  /**
   * @description: three 初始化
   * @param {string} 元素id
   * @return {*}
   */
  initThree(id) {
    this.container = document.getElementById(id)

    /* 场景 */
    this.initScene()

    /* 渲染器 */
    this.initWebGLRenderer({
      antialias: true, // 抗锯齿
    })
    this.setRendererSize()
    this.setRendererShadowMap({
      type: THREE.PCFSoftShadowMap, // 定义阴影贴图类型
    })

    /* 相机 */
    const { clientWidth, clientHeight } = this.container
    const clientScale = clientWidth / clientHeight

    this.initPerspectiveCamera(75, clientScale, 0.1, 1000)
    this.setPerspectiveCameraPosition(10, 20, 40)
    this.setPerspectiveCameraLookAt(this.scene.position)

    /* 时间 */
    this.initClock()

    /* 坐标轴 */
    this.initAxesHelper(20)
    this.scene.add(this.axesHelper)

    /* 坐标格 */
    this.initGridHelper(200, 40, 0xf0f, 0xff000020)
    this.scene.add(this.gridHelper)

    /* 轨道控制器 */
    this.initOrbitControls(this.camera, this.container)

    /* 光 */
    this.initLight()

    /* 加载器 */
    this.initGLTFLoader()
    this.initDRACOLoader()

    /* 其他 */
    this.animate()
  }

  /**
   * @description: 光源初始化
   * @return {*}
   */
  initLight() {
    // 点光源
    this.initPointLight(0xffffff)
    this.setPointLightPosition(500, 300, 400)
    this.scene.add(this.pointLight)

    // 环境光
    this.initAmbientLight(0x404040)
    this.scene.add(this.ambientLight)

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
    this.scene.add(this.directionalLight)
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

  /**
   * @description: 将场景渲染至目标元素
   * @return {*}
   */
  getRendererDom() {
    this.container.appendChild(this.renderer.domElement)
  }

  /**
   * @description: 模型批量加载
   * @param {string[]} urlList 文件路径列表
   * @return {*}
   */
  initLoader(urlList = []) {
    urlList.forEach(item => {
      const arr = item.split('.')
      const type = arr[arr.length - 1].toLocaleLowerCase()

      if (type === 'glb' || type === 'gltf') {
        this.setDRACOLoaderDecoderPath()
        this.loader.setDRACOLoader(this.dracoLoader)

        this.getGLTFLoaderLoad(
          item,
          gltf => {
            this.scene.add(gltf.scene)
          },
          undefined,
          error => {
            console.error(error)
          },
        )
      }
    })
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
Object.assign(Three.prototype, GLTFLoader)
Object.assign(Three.prototype, DRACOLoader)

export default Three
