/*
 * @Description: GridHelper 坐标格
 * @Author: shenxh
 * @Date: 2022-08-03 16:05:02
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-01 10:21:50
 */

import * as THREE from 'three'

export default that => {
  return {
    /**
     * @description: 初始化
     * @return {*}
     */
    init() {
      this.create(200, 40, 0xf0f, 0xff000020)
      that.scene.add(that.gridHelper)
    },

    /**
     * @description: 创建坐标格
     * @param {number} size 坐标格尺寸. 默认为 10.
     * @param {number} divisions 坐标格细分次数. 默认为 10.
     * @param {Color} colorCenterLine 中线颜色. 值可以为 Color 类型, 16进制 和 CSS 颜色名. 默认为 0x444444
     * @param {Color} colorGrid 坐标格网格线颜色. 值可以为 Color 类型, 16进制 和 CSS 颜色名. 默认为 0x888888
     * @return {*}
     */
    create(size, divisions, colorCenterLine, colorGrid) {
      that.gridHelper = new THREE.GridHelper(
        size,
        divisions,
        colorCenterLine,
        colorGrid,
      )
    },
  }
}
