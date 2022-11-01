/*
 * @Description: PerspectiveCamera 透视相机
 * @Author: shenxh
 * @Date: 2022-08-03 15:19:58
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-01 10:28:32
 */

import * as THREE from 'three'

export default that => {
  return {
    /**
     * @description: 初始化
     * @return {*}
     */
    init() {
      const { clientWidth, clientHeight } = that.container
      const clientScale = clientWidth / clientHeight

      this.create(75, clientScale, 0.1, 1000)
      this.setPosition(10, 20, 40)
      this.lookAt(that.scene.position)
    },

    /**
     * @description: 创建透视相机
     * @param {number} fov 摄像机视锥体垂直视野角度
     * @param {number} aspect 摄像机视锥体长宽比
     * @param {number} near 摄像机视锥体近端面
     * @param {number} far 摄像机视锥体远端面
     * @return {*}
     */
    create(fov, aspect, near, far) {
      that.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    },

    /**
     * @description: 设置相机位置
     * @param {number} x x 坐标
     * @param {number} y y 坐标
     * @param {number} z z 坐标
     * @return {*}
     */
    setPosition(x, y, z) {
      that.camera.position.set(x, y, z)
    },

    /**
     * @description: 相机视线位置
     * @param {object} vector3 三维向量
     * @return {*}
     */
    lookAt(vector3) {
      that.camera.lookAt(vector3)
    },
  }
}
