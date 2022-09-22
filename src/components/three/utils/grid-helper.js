/*
 * @Description: GridHelper 坐标格
 * @Author: shenxh
 * @Date: 2022-08-03 16:05:02
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-19 16:00:58
 */

import * as THREE from 'three';

export default {
  /**
   * @description: 坐标格初始化
   * @param {number} size 坐标格尺寸. 默认为 10.
   * @param {number} divisions 坐标格细分次数. 默认为 10.
   * @param {Color} colorCenterLine 中线颜色. 值可以为 Color 类型, 16进制 和 CSS 颜色名. 默认为 0x444444
   * @param {Color} colorGrid 坐标格网格线颜色. 值可以为 Color 类型, 16进制 和 CSS 颜色名. 默认为 0x888888
   * @return {*}
   */
  initGridHelper(size, divisions, colorCenterLine, colorGrid) {
    this.gridHelper = new THREE.GridHelper(
      size,
      divisions,
      colorCenterLine,
      colorGrid,
    );
  },
};
