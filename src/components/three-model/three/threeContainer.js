import * as THREE from 'three'
// import Stats from 'three/examples/jsm/libs/stats.module.js';
import TWEEN from '@tweenjs/tween.js'

const EventEmitter = require('events')
import events from '../enum/events'
import ObjectUtil from './objectUtil'
import EditObject from './editObject'
import Controls from './control'
import Light from './light'
import Load from './load'
import Bounding from './bounding'
import Interactive from './interactive'
import Effects from './effects'
import Label from './label'
import GLTF from './gltfData'
import ObjData from './objData'
import ExportData from './exportData'
import GuandaoData from './guandaoData'
let upAxis, resizeHandler
// let stats;
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

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true,
      alpha: true,
    })
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight,
    )
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap

    this.container.appendChild(this.renderer.domElement)
    this.clock = new THREE.Clock()
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000000,
    )
    if (upAxis === 'Z' || upAxis === 'z') {
      this.camera.up.set(0, 0, 1)
    } else {
      this.camera.up.set(0, 1, 0)
    }
    this.camera.position.set(481, 441, 201)
    this.initControls()
    this.focusControls(new THREE.Vector3(300, 260, 19))
    this.initContent()
    this.initEffects()
    this.autoRender = true
    this.animate()

    resizeHandler = this.resize.bind(this)
    window.addEventListener('resize', resizeHandler)
  }
  initContent() {
    this.initLight()
    this.initRoot()
    this.initInteractive()
    this.initLabelRenderer(this.container)
  }
  removeContent() {
    this.removeLabelRenderer()
    this.removeInteractive()
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
Object.assign(ThreeContainer.prototype, Load)
Object.assign(ThreeContainer.prototype, Bounding)
Object.assign(ThreeContainer.prototype, Interactive)
Object.assign(ThreeContainer.prototype, Effects)
Object.assign(ThreeContainer.prototype, ObjectUtil)
Object.assign(ThreeContainer.prototype, EditObject)
Object.assign(ThreeContainer.prototype, Label)
Object.assign(ThreeContainer.prototype, ObjData)
Object.assign(ThreeContainer.prototype, GuandaoData)
Object.assign(ThreeContainer.prototype, GLTF)
Object.assign(ThreeContainer.prototype, ExportData)
export default ThreeContainer
