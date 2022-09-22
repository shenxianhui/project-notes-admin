/*
 * @Description: Clock 时间
 * @Author: shenxh
 * @Date: 2022-08-03 15:14:18
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-03 15:15:26
 */

import * as THREE from 'three';

export default {
  /**
   * @description: 时间初始化
   * @param {object} params 参数
   * @return {*}
   */
  initClock(params = {}) {
    this.clock = new THREE.Clock(params);
  },
};
