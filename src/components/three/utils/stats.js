/*
 * @Description: Stats 性能监测
 * @Author: shenxh
 * @Date: 2022-08-07 10:07:07
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-01 10:25:32
 */

import Stats from 'three/examples/jsm/libs/stats.module'

export default that => {
  return {
    /**
     * @description: 初始化
     * @param {*} id 容器id
     * @return {*}
     */
    init(id) {
      this.create(id)
      that.statsContainer.appendChild(that.stats.domElement)
      this.setStyle()
    },

    /**
     * @description: 创建性能监测器
     * @return {*}
     */
    create(id) {
      that.statsContainer = document.getElementById(id)
      that.stats = new Stats()
    },

    /**
     * @description: 默认显示状态
     * @param {*} type  0: fps, 1: ms, 2: mb, 3+: custom
     * @return {*}
     */
    showPanel(type = 0) {
      that.stats.showPanel(type)
    },

    /**
     * @description: 设置样式
     * @param {object} params 参数
     * @return {*}
     */
    setStyle(
      params = {
        position: 'absolute',
      },
    ) {
      Object.entries(params).forEach(item => {
        that.stats.domElement.style[item[0]] = item[1]
      })
    },
  }
}
