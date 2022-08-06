/*
 * @Description: Vector3 三维向量
 * @Author: shenxh
 * @Date: 2022-08-03 17:09:42
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-03 17:11:08
 */

import * as THREE from 'three'

export default {
  /**
   * @description: 三维向量初始化
   * @param {number} x 向量的x值，默认为0
   * @param {number} y 向量的y值，默认为0
   * @param {number} z 向量的z值，默认为0
   * @return {*}
   */
  initVector3() {
    this.Vector3 = new THREE.Vector3()
  },
}
