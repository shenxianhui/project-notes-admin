/*
 * @Description: Clock 时间
 * @Author: shenxh
 * @Date: 2022-08-03 15:14:18
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-01 09:53:27
 */

import * as THREE from 'three'

export default that => {
  return {
    /**
     * @description: 初始化
     * @return {*}
     */
    init() {
      this.create()
    },

    /**
     * @description: 创建时间
     * @param {object} params 参数
     * @return {*}
     */
    create(params = {}) {
      that.clock = new THREE.Clock(params)
    },
  }
}
