/*
 * @Description: DRACOLoader 解码库加载器
 * @Author: shenxh
 * @Date: 2022-08-04 14:34:17
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-01 09:56:09
 */

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

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
     * @description: 加载器初始化
     * @param {*} manager 该加载器将要使用的 loadingManager 。默认为 THREE.DefaultLoadingManager
     * @return {*}
     */
    create() {
      that.dracoLoader = new DRACOLoader()
    },

    /**
     * @description: 到包含 JS 和 WASM 解码器库的文件夹的路径
     * @param {*} url 解压库文件路径 (注: 复制 three/examples/js/libs/draco/gltf 至 public 目录内)
     * @return {*}
     */
    setDecoderPath(url = '/utils/gltf/') {
      that.dracoLoader.setDecoderPath(url)
    },
  }
}
