/*
 * @Description: AmbientLight 环境光
 * @Author: shenxh
 * @Date: 2022-08-03 16:41:02
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-06 11:07:33
 */

import * as THREE from 'three'

export default {
  /**
   * @description: 环境光初始化
   * @param {*} color  十六进制光照颜色。 缺省值 0xffffff (白色)
   * @param {*} intensity 光照强度。 缺省值 1
   * @return {*}
   */
  initAmbientLight(color, intensity) {
    this.ambientLight = new THREE.AmbientLight(color, intensity)
  },
}
