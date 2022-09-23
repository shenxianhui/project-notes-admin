/*
 * @Description: DirectionalLight 平行光
 * @Author: shenxh
 * @Date: 2022-08-03 16:50:26
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-23 15:53:03
 */

import * as THREE from 'three';

export default {
  /**
   * @description: 初始化
   * @return {*}
   */
  initDirectionalLight() {
    this.createDirectionalLight(0xffffff, 0.5);
    this.setDirectionalLightShadowCamera({
      near: 1,
      far: 400,
      left: -50,
      right: -50,
      top: 20,
      bottom: -50,
    });
    this.setDirectionalLightShadowMapSize({
      width: 1024,
      height: 1024,
    });
    this.scene.add(this.directionalLight);
  },

  /**
   * @description: 创建环境光
   * @param {*} color  十六进制光照颜色。 缺省值 0xffffff (白色)
   * @param {*} intensity 光照强度。 缺省值 1
   * @return {*}
   */
  createDirectionalLight(color, intensity) {
    this.directionalLight = new THREE.DirectionalLight(color, intensity);
  },

  /**
   * @description: 设置环境光下物体的影子
   * @param {object} params 参数
   * @return {*}
   */
  setDirectionalLightShadowCamera(params = {}) {
    Object.assign(this.directionalLight.shadow, params);
  },

  /**
   * @description: 设置环境光下物体影子的模糊值
   * @param {object} params 参数
   * @return {*}
   */
  setDirectionalLightShadowMapSize(params = {}) {
    Object.entries(params).forEach(item => {
      this.directionalLight.shadow.mapSize[item[0]] = item[1];
    });
  },

  /**
   * @description: 设置光线方向
   * @param {number} x x 坐标
   * @param {number} y y 坐标
   * @param {number} z z 坐标
   * @return {*}
   */
  setDirectionalLightPosition(x, y, z) {
    this.directionalLight.position.set(x, y, z);
  },
};
