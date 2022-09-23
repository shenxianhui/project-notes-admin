/*
 * @Description: Clock 时间
 * @Author: shenxh
 * @Date: 2022-08-03 15:14:18
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-23 15:52:36
 */

import * as THREE from 'three';

export default {
  /**
   * @description: 时间初始化
   * @return {*}
   */
  initClock() {
    this.createClock();
  },

  /**
   * @description: 创建时间
   * @param {object} params 参数
   * @return {*}
   */
  createClock(params = {}) {
    this.clock = new THREE.Clock(params);
  },
};
