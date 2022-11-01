/*
 * @Description: WebGLRenderer 渲染器
 * @Author: shenxh
 * @Date: 2022-08-03 14:44:27
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-01 10:28:10
 */

import * as THREE from 'three'

export default that => {
  return {
    /**
     * @description: 初始化
     * @return {*}
     */
    init() {
      this.create({
        antialias: true, // 抗锯齿
      })
      this.setSize()
      this.setShadowMap({
        type: THREE.PCFSoftShadowMap, // 定义阴影贴图类型
      })
    },

    /**
     * @description: 创建渲染器
     * @param {object} params 参数
     * @return {*}
     */
    create(params) {
      that.renderer = new THREE.WebGLRenderer(params)
    },

    /**
     * @description: 设置 canvas 大小
     * @param {number} width 宽度
     * @param {number} height 高度
     * @return {*}
     */
    setSize(width, height) {
      that.renderer.setSize(
        width || that.container.clientWidth,
        height || that.container.clientHeight,
      )
    },

    /**
     * @description: 设置 shadowMap
     * @param {object} params 参数
     * @return {*}
     */
    setShadowMap(params = {}) {
      Object.entries(params).forEach(item => {
        that.renderer.shadowMap[item[0]] = item[1]
      })
    },
  }
}
