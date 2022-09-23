/*
 * @Description: AxesHelper 坐标轴
 * @Author: shenxh
 * @Date: 2022-08-03 15:58:04
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-23 15:52:11
 */

import * as THREE from 'three';

export default {
  /**
   * @description: 初始化
   * @return {*}
   */
  initAxesHelper() {
    this.createAxesHelper(20);
    this.scene.add(this.axesHelper);
  },

  /**
   * @description: 创建坐标轴
   * @param {*} size 表示代表轴的线段长度. 默认为 1.
   * @return {*}
   */
  createAxesHelper(size) {
    this.axesHelper = new THREE.AxesHelper(size);
  },
};
