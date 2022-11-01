/*
 * @Description: AxesHelper 坐标轴
 * @Author: shenxh
 * @Date: 2022-08-03 15:58:04
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-01 09:55:54
 */

import * as THREE from 'three'

export default that => {
  return {
    /**
     * @description: 初始化
     * @return {*}
     */
    init() {
      this.create(20)
      that.scene.add(that.axesHelper)
    },

    /**
     * @description: 创建坐标轴
     * @param {*} size 表示代表轴的线段长度. 默认为 1.
     * @return {*}
     */
    create(size) {
      that.axesHelper = new THREE.AxesHelper(size)
    },
  }
}
