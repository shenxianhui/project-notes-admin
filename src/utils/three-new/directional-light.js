/*
 * @Description: DirectionalLight 平行光
 * @Author: shenxh
 * @Date: 2022-08-03 16:50:26
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-07 10:40:32
 */

import * as THREE from 'three'

export default {
  /**
   * @description: 环境光初始化
   * @param {*} color  十六进制光照颜色。 缺省值 0xffffff (白色)
   * @param {*} intensity 光照强度。 缺省值 1
   * @return {*}
   */
  initDirectionalLight(color, intensity) {
    this.directionalLight = new THREE.DirectionalLight(color, intensity)
  },

  /**
   * @description: 设置环境光下物体的影子
   * @param {object} params 参数
   * @return {*}
   */
  setDirectionalLightShadowCamera(params = {}) {
    Object.assign(this.directionalLight.shadow, params)
  },

  /**
   * @description: 设置环境光下物体影子的模糊值
   * @param {object} params 参数
   * @return {*}
   */
  setDirectionalLightShadowMapSize(params = {}) {
    Object.entries(params).forEach(item => {
      this.directionalLight.shadow.mapSize[item[0]] = item[1]
    })
  },

  /**
   * @description: 设置光线方向
   * @param {number} x x 坐标
   * @param {number} y y 坐标
   * @param {number} z z 坐标
   * @return {*}
   */
  setDirectionalLightPosition(x, y, z) {
    this.directionalLight.position.set(x, y, z)
  },
}
