/*
 * @Description: OrbitControls 轨道控制器
 * @Author: shenxh
 * @Date: 2022-08-03 16:10:31
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-01 10:28:44
 */

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default that => {
  return {
    /**
     * @description: 初始化
     * @return {*}
     */
    init() {
      this.create(that.camera, that.container)
    },

    /**
     * @description: 创建轨道控制器
     * @param {Camera} object 将要被控制的相机。该相机不允许是其他任何对象的子级，除非该对象是场景自身。
     * @param {HTMLDOMElement} domElement 用于事件监听的HTML元素。
     * @return {*}
     */
    create(object, domElement) {
      that.controls = new OrbitControls(object, domElement)
    },

    /**
     * @description: 相机可缩放的范围
     * @param {*} min 最小值, 默认值为 0
     * @param {*} max 最大值, 默认值为 Math.PI
     * @return {*}
     */
    setZoom(min, max) {
      min && (that.controls.minZoom = min)
      max && (that.controls.maxZoom = max)
    },

    /**
     * @description: 能够垂直旋转的角度范围
     * @param {*} min 最小值, 默认值为 0
     * @param {*} max 最大值, 默认值为 Math.PI
     * @return {*}
     */
    setPolarAngle(min, max) {
      min && (that.controls.minPolarAngle = min)
      max && (that.controls.maxPolarAngle = max)
    },
  }
}
