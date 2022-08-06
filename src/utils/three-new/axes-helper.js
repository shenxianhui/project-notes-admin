/*
 * @Description: AxesHelper 坐标轴
 * @Author: shenxh
 * @Date: 2022-08-03 15:58:04
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-03 16:43:17
 */

import * as THREE from 'three'

export default {
  /**
   * @description: 坐标轴初始化
   * @param {*} size 表示代表轴的线段长度. 默认为 1.
   * @return {*}
   */
  initAxesHelper(size) {
    this.axesHelper = new THREE.AxesHelper(size)
  },
}
