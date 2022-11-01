/*
 * @Description: PointLight 点光源
 * @Author: shenxh
 * @Date: 2022-08-03 16:28:59
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-01 10:24:34
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
      this.setPosition(500, 300, 400)
      that.scene.add(that.pointLight)
    },

    /**
     * @description: 创建点光源
     * @param {*} color  十六进制光照颜色。 缺省值 0xffffff (白色)
     * @param {*} intensity 光照强度。 缺省值 1
     * @param {*} distance 这个距离表示从光源到光照强度为0的位置。 当设置为0时，光永远不会消失(距离无穷大)。缺省值 0
     * @param {*} decay 沿着光照距离的衰退量。缺省值 1
     * @return {*}
     */
    create(color, intensity, distance, decay) {
      that.pointLight = new THREE.PointLight(color, intensity, distance, decay)
    },

    /**
     * @description: 点光源位置
     * @param {number} x x 坐标
     * @param {number} y y 坐标
     * @param {number} z z 坐标
     * @return {*}
     */
    setPosition(x, y, z) {
      that.pointLight.position.set(x, y, z) // 点光源位置
    },
  }
}
