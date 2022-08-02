/*
 * @Description: 控制
 * @Author: shenxh
 * @Date: 2022-07-31 10:54:43
 * @LastEditors: shenxh
 * @LastEditTime: 2022-07-31 11:31:56
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import events from '../enum/events'

let transformHelper

export default {
  /**
   * @summary 初始化 controls
   * @private
   */
  initControls() {
    this.controls = new OrbitControls(this.camera, this.container)
    this.controls.maxPolarAngle = Math.PI / 2.0
  },

  onTransform(event) {
    this.controls.enabled = !event.value
  },

  initTransformControls(object) {
    if (!this.transformControls) {
      transformHelper = this.onTransform.bind(this)
      this.transformControls = new TransformControls(
        this.camera,
        this.renderer.domElement,
      )
      this.scene.add(this.transformControls)
      this.transformControls.setSize(2)
      this.transformControls.showX = true
      this.transformControls.showY = false
      this.transformControls.showZ = false
      this.transformControls.addEventListener(
        'dragging-changed',
        transformHelper,
      )
    }
    this.transformControls.attach(object)
  },

  stopTransform() {
    if (this.transformControls) {
      this.scene.remove(this.transformControls)
      this.transformControls.removeEventListener(
        'dragging-changed',
        transformHelper,
      )
      this.transformControls.detach()
      this.transformControls.dispose()
      this.transformControls = null
    }
  },

  /**
   * 使 controls 朝向目标
   * @param {THREE.Vector3|THREE.Object3D} object 注视目标
   * @private
   */
  focusControls(object) {
    let target

    if (object instanceof THREE.Vector3) {
      target = object
    } else {
      const box = new THREE.BoxHelper(object)

      box.update()
      if (box.geometry.boundingSphere) {
        target = box.geometry.boundingSphere.center
      } else {
        target = object.position.clone()
      }
    }
    this.controls.target = target
    this.controls.update()
  },

  getViewAngle() {
    const info = {}

    info.position = this.camera.position.clone()
    info.up = this.camera.up.clone()
    info.target = this.controls.target.clone()

    return info
  },

  setViewAngle(location) {
    if (location.position) this.camera.position.copy(location.position)
    if (location.target) this.focusControls(location.target)
    if (location.up) this.camera.up.copy(location.up)
    this.emit(events.mousemove)
  },
}
