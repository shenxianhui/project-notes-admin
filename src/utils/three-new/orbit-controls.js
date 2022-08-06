/*
 * @Description: OrbitControls 轨道控制器
 * @Author: shenxh
 * @Date: 2022-08-03 16:10:31
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-03 16:22:58
 */

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  /**
   * @description: 轨道控制器初始化
   * @param {Camera} object 将要被控制的相机。该相机不允许是其他任何对象的子级，除非该对象是场景自身。
   * @param {HTMLDOMElement} domElement 用于事件监听的HTML元素。
   * @return {*}
   */
  initOrbitControls(object, domElement) {
    this.controls = new OrbitControls(object, domElement)
  },

  /**
   * @description: 相机可缩放的范围
   * @param {*} min 最小值, 默认值为 0
   * @param {*} max 最大值, 默认值为 Math.PI
   * @return {*}
   */
  setOrbitControlsZoom(min, max) {
    min && (this.controls.minZoom = min)
    max && (this.controls.maxZoom = max)
  },

  /**
   * @description: 能够垂直旋转的角度范围
   * @param {*} min 最小值, 默认值为 0
   * @param {*} max 最大值, 默认值为 Math.PI
   * @return {*}
   */
  setOrbitControlsPolarAngle(min, max) {
    min && (this.controls.minPolarAngle = min)
    max && (this.controls.maxPolarAngle = max)
  },
}
