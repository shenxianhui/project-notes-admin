/*
 * @Description: Scene 场景
 * @Author: shenxh
 * @Date: 2022-08-03 14:33:30
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-23 16:03:33
 */

import * as THREE from 'three';

export default {
  /**
   * @description: 场景初始化
   * @param {object} params 参数
   * @return {*}
   */
  initScene() {
    this.createScene();
    this.scene.background = new THREE.Color(0xf0f0f0);
  },

  /**
   * @description: 创建场景
   * @param {*} params
   * @return {*}
   */
  createScene(params = {}) {
    this.scene = new THREE.Scene(params);
  },

  /**
   * @description: 添加至场景
   * @param {*} obj 添加的对象
   * @return {*}
   */
  add(obj) {
    this.scene.add(obj);
  },
};
