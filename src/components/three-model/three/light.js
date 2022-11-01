/*
 * @Descripttion:
 * @version:
 * @Author: heliping
 * @Date: 2021-08-24 15:28:46
 * @LastEditors: heliping
 * @LastEditTime: 2021-11-04 16:42:54
 */
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
// import { createBackground } from "../lib/three-vignette.js";
/**
 * @module
 * @description 该模块内容将通过 Object.assign 方法合并入 ThreeContainer和MapContainer<br>
 * @see ThreeContainer
 */
let lights = []
export default {
  /**
   * 初始化灯光
   * @private
   * */
  initLight() {
    const amLight = new THREE.AmbientLight(0xaaaaaa)
    // const amLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(amLight)
    // lights.push(amLight);

    const dirLight = new THREE.DirectionalLight(0x555555)

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
  //
  updateEnvironment() {
    const environment = {
      id: 'venice-sunset',
      name: 'Venice Sunset',
      path: '/hdr/venice_sunset_1k.hdr',
      format: '.hdr',
    }
    this.getCubeMapTexture(environment).then(({ envMap }) => {
      // const vignette = createBackground({
      // 	aspect: 1.5,
      // 	grainScale: 0.001, // mattdesl/three-vignette-background#1
      // 	colors: ['#ffffff', '#353535'],
      // });
      // if (
      // 	(!envMap || !this.state.background) &&
      // 	this.activeCamera === this.defaultCamera
      // ) {
      // this.scene.add(vignette);
      // } else {
      // 	this.scene.remove(this.vignette);
      // }；
      this.scene.environment = envMap
      // this.scene.background =  envMap;
    })
  },

  getCubeMapTexture(environment) {
    const { path } = environment

    // no envmap
    if (!path) return Promise.resolve({ envMap: null })
    console.log('+++++++', THREE.PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
    return new Promise((resolve, reject) => {
      new RGBELoader().setDataType(THREE.UnsignedByteType).load(
        path,
        texture => {
          const envMap = pmremGenerator.fromEquirectangular(texture).texture
          pmremGenerator.dispose()

          resolve({ envMap })
        },
        undefined,
        reject,
      )
    })
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
