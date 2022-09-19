/*
 * @Description: Scene 场景
 * @Author: shenxh
 * @Date: 2022-08-03 14:33:30
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-03 15:17:09
 */

import * as THREE from 'three';

export default {
  /**
   * @description: 场景初始化
   * @param {object} params 参数
   * @return {*}
   */
  initScene(params = {}) {
    this.scene = new THREE.Scene(params);
  },
};
