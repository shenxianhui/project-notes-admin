/*
 * @Description: 辅助对象
 * @Author: shenxh
 * @Date: 2022-11-02 14:59:17
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-03 11:09:11
 */

import * as THREE from 'three'

export default that => {
  return {
    init() {
      this.createAxesHelper(35000)
      this.createGridHelper(30000, 40, 0xffff00, 0xffffff)
      this.createDirectionalLightHelper(that.directionalLight, 5)
      this.createPointLightHelper(that.pointLight)
      this.createCameraHelper(that.camera)
    },

    /**
     * @description: 创建坐标轴
     * @param {number} size 表示代表轴的线段长度. 默认为 1
     * @return {*}
     */
    createAxesHelper(size) {
      that.axesHelper = new THREE.AxesHelper(size)
      that.scene.add(that.axesHelper)
    },

    /**
     * @description: 创建坐标格
     * @param {number} size 坐标格尺寸. 默认为 10.
     * @param {number} divisions 坐标格细分次数. 默认为 10.
     * @param {Color} colorCenterLine 中线颜色. 值可以为 Color 类型, 16进制 和 CSS 颜色名. 默认为 0x444444
     * @param {Color} colorGrid 坐标格网格线颜色. 值可以为 Color 类型, 16进制 和 CSS 颜色名. 默认为 0x888888
     * @return {*}
     */
    createGridHelper(size, divisions, colorCenterLine, colorGrid) {
      that.gridHelper = new THREE.GridHelper(
        size,
        divisions,
        colorCenterLine,
        colorGrid,
      )
      that.scene.add(that.gridHelper)
    },

    /**
     * @description: 创建平行光 DirectionalLight 的辅助对象
     * @param {*} light 被模拟的光源
     * @param {number} size (可选的) 平面的尺寸. 默认为 1
     * @param {Color} color (可选的) 如果没有设置颜色将使用光源的颜色
     * @return {*}
     */
    createDirectionalLightHelper(light, size, color) {
      that.directionalLightHelper = new THREE.DirectionalLightHelper(
        light,
        size,
        color,
      )
      that.scene.add(that.directionalLightHelper)
    },

    /**
     * @description: 创建点光源 PointLight 的辅助对象
     * @param {*} light 被模拟的光源
     * @param {number} sphereSize (可选的) 球形辅助对象的尺寸. 默认为 1
     * @param {Color} color (可选的) 如果没有设置颜色将使用光源的颜色
     * @return {*}
     */
    createPointLightHelper(light, sphereSize, color) {
      that.pointLightHelper = new THREE.PointLightHelper(
        light,
        sphereSize,
        color,
      )
      that.scene.add(that.pointLightHelper)
    },

    /**
     * @description: 创建相机 PerspectiveCamera 的辅助对象
     * @param {*} camera 被模拟的相机
     * @return {*}
     */
    createCameraHelper(camera) {
      that.cameratHelper = new THREE.CameraHelper(camera)
      that.scene.add(that.cameratHelper)
    },
  }
}
