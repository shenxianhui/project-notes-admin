/*
 * @Description: 加载
 * @Author: shenxh
 * @Date: 2022-08-02 16:35:19
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-04 13:42:05
 */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

let models = []

export default {
  // 加载
  load(url = '') {
    const arr = url.split('.')
    const type = arr[arr.length - 1]

    if (type === 'glb' || type === 'gltf') {
      this.GLTFLoader(url)
    }
    if (type === 'fbx') {
      this.FBXLoader(url)
    }
  },

  // 加载 glb、gltf模型
  GLTFLoader(url) {
    const loader = new GLTFLoader()
    loader.load(
      url,
      gltf => {
        // gltf.scene.traverse(function(child) {
        //   if (child.isMesh) {
        //     child.material.emissive = child.material.color;
        //     child.material.emissiveMap = child.material.map;
        //   }
        // });
        gltf.scene.position.set(-30, -13, -3)
        this.scene.add(gltf.scene)
      },
      undefined,
      error => {
        console.error(error)
      },
    )
  },

  // 加载 FBX 模型
  FBXLoader(url) {
    const loader = new FBXLoader()

    loader.load(url, object => {
      // 加载路径fbx文件
      console.log(object, 'object----->>>')
      object.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
      this.scene.add(object) //模型
    })
  },
}
