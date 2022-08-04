/*
 * @Description: DRACOLoader 解码库加载器
 * @Author: shenxh
 * @Date: 2022-08-04 14:34:17
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-04 15:51:25
 */

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default {
  /**
   * @description: 加载器初始化
   * @param {*} manager 该加载器将要使用的 loadingManager 。默认为 THREE.DefaultLoadingManager
   * @return {*}
   */
  initDRACOLoader() {
    this.dracoLoader = new DRACOLoader()
  },

  /**
   * @description: 到包含 JS 和 WASM 解码器库的文件夹的路径
   * @param {*} url 解压库文件路径
   * @return {*}
   */
  setDRACOLoaderDecoderPath(url = '/static/draco/') {
    this.dracoLoader.setDecoderPath(url)
  },
}
