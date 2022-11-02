/*
 * @Description: AmbientLight 环境光
 * @Author: shenxh
 * @Date: 2022-08-03 16:41:02
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-02 14:46:07
 */

import * as THREE from 'three'

export default that => {
  return {
    /**
     * @description: 初始化
     * @return {*}
     */
    init() {
      this.create(0xffffff)
    },

    /**
     * @description: 创建环境光
     * @param {*} color  十六进制光照颜色。 缺省值 0xffffff (白色)
     * @param {*} intensity 光照强度。 缺省值 1
     * @return {*}
     */
    create(color, intensity) {
      that.ambientLight = new THREE.AmbientLight(color, intensity)
      that.scene.add(that.ambientLight)
    },
  }
}
