/*
 * @Description: ColladaLoader GLTF加载器
 * @Author: shenxh
 * @Date: 2022-08-04 09:15:01
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-16 09:36:17
 */

import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'

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
     * @description: 创建Collada加载器
     * @return {*}
     */
    create(manager) {
      that.colladaLoader = new ColladaLoader()
    },

    /**
     * @description: 加载模型文件
     * @param {*} url 包含有.gltf/.glb文件路径/URL的字符串
     * @param {*} onLoad 加载成功完成后将会被调用的函数。该函数接收parse所返回的已加载的JSON响应
     * @param {*} onProgress （可选）加载正在进行过程中会被调用的函数。其参数将会是XMLHttpRequest实例，包含有总字节数.total与已加载的字节数.loaded
     * @param {*} onError （可选）若在加载过程发生错误，将被调用的函数。该函数接收error来作为参数
     * @return {*}
     */
    load(url, onLoad, onProgress, onError) {
      that.colladaLoader.load(url, onLoad, onProgress, onError)
    },
  }
}
