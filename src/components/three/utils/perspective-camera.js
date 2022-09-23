/*
 * @Description: PerspectiveCamera 透视相机
 * @Author: shenxh
 * @Date: 2022-08-03 15:19:58
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-23 15:56:33
 */

import * as THREE from 'three';

export default {
  /**
   * @description: 透视相机初始化
   * @return {*}
   */
  initPerspectiveCamera() {
    const { clientWidth, clientHeight } = this.container;
    const clientScale = clientWidth / clientHeight;

    this.createPerspectiveCamera(75, clientScale, 0.1, 1000);
    this.setPerspectiveCameraPosition(10, 20, 40);
    this.setPerspectiveCameraLookAt(this.scene.position);
  },

  /**
   * @description: 创建透视相机
   * @param {number} fov 摄像机视锥体垂直视野角度
   * @param {number} aspect 摄像机视锥体长宽比
   * @param {number} near 摄像机视锥体近端面
   * @param {number} far 摄像机视锥体远端面
   * @return {*}
   */
  createPerspectiveCamera(fov, aspect, near, far) {
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  },

  /**
   * @description: 设置相机位置
   * @param {number} x x 坐标
   * @param {number} y y 坐标
   * @param {number} z z 坐标
   * @return {*}
   */
  setPerspectiveCameraPosition(x, y, z) {
    this.camera.position.set(x, y, z);
  },

  /**
   * @description: 相机视线位置
   * @param {object} vector3 三维向量
   * @return {*}
   */
  setPerspectiveCameraLookAt(vector3) {
    this.camera.lookAt(vector3);
  },
};
