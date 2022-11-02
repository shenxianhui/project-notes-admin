/*
 * @Description: DirectionalLight 平行光
 * @Author: shenxh
 * @Date: 2022-08-03 16:50:26
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-02 15:22:47
 */

import * as THREE from 'three'

export default that => {
  return {
    /**
     * @description: 初始化
     * @return {*}
     */
    init() {
      this.create(0xffffff, 1)
      this.setPosition(500, 500, 500)
      this.setShadowCamera({
        near: 1,
        far: 400,
        left: -50,
        right: -50,
        top: 20,
        bottom: -50,
      })
      this.setShadowMapSize({
        width: 1024,
        height: 1024,
      })
    },

    /**
     * @description: 创建环境光
     * @param {*} color  十六进制光照颜色。 缺省值 0xffffff (白色)
     * @param {*} intensity 光照强度。 缺省值 1
     * @return {*}
     */
    create(color, intensity) {
      that.directionalLight = new THREE.DirectionalLight(color, intensity)
      that.scene.add(that.directionalLight)
    },

    /**
     * @description: 设置环境光下物体的影子
     * @param {object} params 参数
     * @return {*}
     */
    setShadowCamera(params = {}) {
      Object.assign(that.directionalLight.shadow, params)
    },

    /**
     * @description: 设置环境光下物体影子的模糊值
     * @param {object} params 参数
     * @return {*}
     */
    setShadowMapSize(params = {}) {
      Object.entries(params).forEach(item => {
        that.directionalLight.shadow.mapSize[item[0]] = item[1]
      })
    },

    /**
     * @description: 设置光线方向
     * @param {number} x x 坐标
     * @param {number} y y 坐标
     * @param {number} z z 坐标
     * @return {*}
     */
    setPosition(x, y, z) {
      that.directionalLight.position.set(x, y, z)
    },
  }
}
