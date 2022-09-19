/*
 * @Description: Stats 性能监测
 * @Author: shenxh
 * @Date: 2022-08-07 10:07:07
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-19 16:12:13
 */

import Stats from 'three/examples/jsm/libs/stats.module';

export default {
  /**
   * @description: 初始化
   * @return {*}
   */
  initStats(id, fn) {
    this.statsContainer = document.getElementById(id);
    this.stats = new Stats();

    fn && fn(this.stats, this.statsContainer);
  },

  /**
   * @description: 默认显示状态
   * @param {*} type  0: fps, 1: ms, 2: mb, 3+: custom
   * @return {*}
   */
  setStatsShowPanel(type = 0) {
    this.stats.showPanel(type);
  },

  /**
   * @description: 设置样式
   * @param {object} params 参数
   * @return {*}
   */
  setStatsStyle(
    params = {
      position: 'absolute',
    },
  ) {
    Object.entries(params).forEach(item => {
      this.stats.domElement.style[item[0]] = item[1];
    });
  },
};
