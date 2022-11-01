/*
 * @Description: Vector3 三维向量
 * @Author: shenxh
 * @Date: 2022-08-03 17:09:42
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-01 10:33:34
 */

import * as THREE from 'three'

export default that => {
  return {
    /**
     * @description: 初始化
     * @return {*}
     */
    init() {
      this.create()
    },

    /**
     * @description: 创建三维向量
     * @param {number} x 向量的x值，默认为0
     * @param {number} y 向量的y值，默认为0
     * @param {number} z 向量的z值，默认为0
     * @return {*}
     */
    create() {
      that.vector3 = new THREE.Vector3()
    },
  }
}
