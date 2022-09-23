/*
 * @Description: WebGLRenderer 渲染器
 * @Author: shenxh
 * @Date: 2022-08-03 14:44:27
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-23 16:00:08
 */

import * as THREE from 'three';

export default {
  /**
   * @description: 渲染器初始化
   * @return {*}
   */
  initWebGLRenderer() {
    this.createWebGLRenderer({
      antialias: true, // 抗锯齿
    });
    this.setRendererSize();
    this.setRendererShadowMap({
      type: THREE.PCFSoftShadowMap, // 定义阴影贴图类型
    });
  },

  /**
   * @description: 创建渲染器
   * @param {object} params 参数
   * @return {*}
   */
  createWebGLRenderer(params) {
    this.renderer = new THREE.WebGLRenderer(params);
  },

  /**
   * @description: 设置 canvas 大小
   * @param {number} width 宽度
   * @param {number} height 高度
   * @return {*}
   */
  setRendererSize(width, height) {
    this.renderer.setSize(
      width || this.container.clientWidth,
      height || this.container.clientHeight,
    );
  },

  /**
   * @description: 设置 shadowMap
   * @param {object} params 参数
   * @return {*}
   */
  setRendererShadowMap(params = {}) {
    Object.entries(params).forEach(item => {
      this.renderer.shadowMap[item[0]] = item[1];
    });
  },
};
