/*
 * @Description: Scene 场景
 * @Author: shenxh
 * @Date: 2022-08-03 14:33:30
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-02 14:49:53
 */

import * as THREE from 'three'

export default that => {
  return {
    /**
     * @description: 初始化
     * @param {object} params 参数
     * @return {*}
     */
    init() {
      this.create()
    },

    /**
     * @description: 创建场景
     * @param {*} params
     * @return {*}
     */
    create(params = {}) {
      that.scene = new THREE.Scene(params)
      that.scene.background = new THREE.Color(0xf1f9fb)
    },

    /**
     * @description: 添加至场景
     * @param {*} obj 添加的对象
     * @return {*}
     */
    add(obj) {
      that.scene.add(obj)
    },
  }
}
