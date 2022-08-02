/*
 * @Description: three 配置
 * @Author: shenxh
 * @Date: 2022-07-31 10:54:43
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-02 18:08:50
 */

import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import events from './enum/events'
import Controls from './resource/control'
import Light from './resource/light'
import Bounding from './resource/bounding'
import EditObject from './resource/editObject'
import Load from './resource/load'

const EventEmitter = require('events')
let upAxis, resizeHandler

class ThreeContainer extends EventEmitter {
  /**
   * @class
   * @param {object} config 配置
   * @param {boolean} config.upAxis 默认向上方向
   */
  constructor(config) {
    super()
    if (config) {
      upAxis = config.upAxis || 'Z'
    }
  }
  /**
   * 初始化
   * @public
   */
  init(divId) {
    this.outlinePass = null
    this.container = document.getElementById(divId)
    this.scene = new THREE.Scene()
    window.scene = this.scene

    // 渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗锯齿
      // logarithmicDepthBuffer: true, // 是否使用对数深度缓存。如果要在单个场景中处理巨大的比例差异，就有必要使用
    })
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight,
    )
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap

    this.container.appendChild(this.renderer.domElement)
    this.clock = new THREE.Clock()
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000,
    )
    if (upAxis === 'Z' || upAxis === 'z') {
      this.camera.up.set(0, 0, 1)
    } else {
      this.camera.up.set(0, 1, 0)
    }
    this.camera.position.set(10, 20, 40)
    // 指向场景中心
    this.camera.lookAt(this.scene.position)

    // 添加坐标轴，辅助判断位置
    let axesHelper = new THREE.AxesHelper(20)
    this.scene.add(axesHelper)

    // 添加网格
    const gridHelper = new THREE.GridHelper(200, 40, 0xf0f, 0xff000020)
    this.scene.add(gridHelper)

    // 设置环境
    // this.renderer.setClearColor(new THREE.Color('#f1f9fb'))

    this.initControls()
    // this.focusControls(new THREE.Vector3(300, 260, 19))
    this.initContent()
    this.autoRender = true
    this.animate()

    resizeHandler = this.resize.bind(this)
    window.addEventListener('resize', resizeHandler)
  }

  initContent() {
    this.initLight()
  }

  removeContent() {
    this.removeLabelRenderer()
    this.removeLight()
    this.removeRoot()
  }

  /**
   * 启用动画
   * @public
   */
  animate() {
    this.animationFrame = requestAnimationFrame(this.animate.bind(this))
    this.render()
  }

  render() {
    // stats.begin();
    TWEEN.update()
    this.emit(events.render)
    if (!this.renderer || !this.renderer.render) return
    this.renderer.render(this.scene, this.camera)
    // stats.end();
    if (this.composer) {
      this.composer.render()
    }
  }

  /**
   * 改变组件大小
   * @public
   */
  resize() {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight,
    )
    this.render()
  }

  /**
   * 释放
   * @public
   */
  deInit() {
    this.clock = null
    window.cancelAnimationFrame(this.animationFrame)
    this.animationFrame = null
    if (this.scene) {
      this.removeContent()
    }
    if (this.renderer) {
      while (this.renderer.domElement.firstChild) {
        this.renderer.domElement.removeChild(
          this.renderer.domElement.firstChild,
        )
      }
      while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild)
      }
      this.renderer.forceContextLoss()
      this.renderer.domElement = null
      this.renderer = null
    }
    window.removeEventListener('resize', resizeHandler)
  }
}

Object.assign(ThreeContainer.prototype, Controls)
Object.assign(ThreeContainer.prototype, Light)
Object.assign(ThreeContainer.prototype, Bounding)
Object.assign(ThreeContainer.prototype, EditObject)
Object.assign(ThreeContainer.prototype, Load)

export default ThreeContainer
