/*
 * @Description: AmbientLight 环境光
 * @Author: shenxh
 * @Date: 2022-08-03 16:41:02
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-23 15:50:14
 */

import * as THREE from 'three';

export default {
  /**
   * @description: 初始化
   * @return {*}
   */
  initAmbientLight() {
    this.createAmbientLight(0x404040);
    this.scene.add(this.ambientLight);
  },

  /**
   * @description: 创建环境光
   * @param {*} color  十六进制光照颜色。 缺省值 0xffffff (白色)
   * @param {*} intensity 光照强度。 缺省值 1
   * @return {*}
   */
  createAmbientLight(color, intensity) {
    this.ambientLight = new THREE.AmbientLight(color, intensity);
  },
};
