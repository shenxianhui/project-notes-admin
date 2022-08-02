/*
 * @Description: 灯光
 * @Author: shenxh
 * @Date: 2022-07-31 10:54:43
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-02 18:21:24
 */

import * as THREE from 'three'

let lights = []

export default {
  /**
   * 初始化灯光
   * @private
   * */
  initLight() {
    // 点光源
    let point = new THREE.PointLight(0xffffff)
    point.position.set(500, 300, 400) // 点光源位置
    this.scene.add(point) // 点光源添加到场景中

    // 环境光
    const amLight = new THREE.AmbientLight(0x404040)
    // const amLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(amLight)
    // lights.push(amLight);

    // 阳光
    const dirLight = new THREE.DirectionalLight('#ffffff', 0.5)
    dirLight.shadow.camera.near = 1 //产生阴影的最近距离
    dirLight.shadow.camera.far = 400 //产生阴影的最远距离
    dirLight.shadow.camera.left = -50 //产生阴影距离位置的最左边位置
    dirLight.shadow.camera.right = -50 //最右边
    dirLight.shadow.camera.top = 20 //最上边
    dirLight.shadow.camera.bottom = -50 //最下面
    //这两个值决定生成阴影密度 默认512
    dirLight.shadow.mapSize.height = 1024
    dirLight.shadow.mapSize.width = 1024
    //告诉平行光需要开启阴影投射
    dirLight.castShadow = true

    const dirPos = new THREE.Vector3(-51, 0, 472).normalize()
    dirLight.position.set(dirPos.x, dirPos.y, dirPos.z)
    this.scene.add(dirLight)
    lights.push(dirLight)
    this.lights = [dirLight]
  },

  // 删除场景中所有的光
  removeLight() {
    for (let i = lights.length - 1; i >= 0; i--) {
      this.scene.remove(lights[i])
    }

    lights = []
  },

  // 添加新的环境光
  addAmLight({ color = 0xffffff, intensity = 1 }) {
    const amLight = new THREE.AmbientLight(color, intensity)
    this.scene.add(amLight)
    lights.push(amLight)
  },
  addDirLight({
    position = new THREE.Vector3(1, 1, 1).normalize(),
    color = 0xffffff,
    intensity = 1,
  }) {
    const dirLight = new THREE.DirectionalLight(
      new THREE.Color(color),
      intensity,
    )
    dirLight.position.copy(
      new THREE.Vector3(position.x, position.y, position.z),
    )
    this.scene.add(dirLight)
    lights.push(dirLight)
  },

  addPointLight({
    position = new THREE.Vector3(0, 0, 0),
    color = 0xffffff,
    intensity = 1,
    distance = 1000,
    decay = 1.0,
  }) {
    const plight = new THREE.PointLight(
      new THREE.Color(color),
      intensity,
      distance,
      decay,
    )
    plight.position.copy(new THREE.Vector3(position.x, position.y, position.z))
    plight.castShadow = true
    this.scene.add(plight)
    lights.push(plight)
  },
}
