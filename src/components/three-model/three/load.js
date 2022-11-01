import * as THREE from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2'
import { MtlObjBridge } from 'three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import events from '../enum/events'

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://eslink-iot.oss-cn-beijing.aliyuncs.com/')
let arr = []
/**
 * @module
 * @description 该模块内容将通过 Object.assign 方法合并入 ThreeContainer, MapContainer<br>
 * @see ThreeContainer
 */
export default {
  async load(params) {
    let todo
    if (params.length) {
      // 同时加载多个模型
      todo = params.map(async task => {
        await this.loadObj(task)
      })
    } else {
      // 加载单个模型
      todo = [this.loadObj(params)]
    }

    // 加载完成后，先将进度清空，然后再 resolve
    await Promise.all(todo)
  },
  loadGlb(params) {
    const {
      glb,
      renderType,
      scale,
      rotation,
      position,
      name,
      type,
      id,
      clickColor,
      clickOpacity,
      stateColor,
      nextDiagramId,
      stationId,
      parent,
      showLabelType,
      showMonitorType,
      alarmPrompt,
      labelContent,
      labelScale,
      needRotate,
      needTransparent,
      needBeam,
      moreData,
      hasGlbRotateSet,
    } = params
    const self = this
    const gltfLoader = new GLTFLoader()

    gltfLoader.setDRACOLoader(dracoLoader)
    // localStorage.setItem(glb, JSON.stringify(glb))
    let met = null
    gltfLoader.load(
      glb,
      gltf => {
        gltf.scene.traverse(child => {
          const cm = child.material
          // if ( child.isMesh ) {
          // 	child.frustumCulled = false;
          // 	//模型阴影
          // 	child.castShadow = true;
          // 	//模型自发光
          // 	child.material.emissive =  child.material.color;
          // 	// child.material.emissiveMap = child.material.map ;
          // }
          if (cm) {
            if (cm instanceof Array) {
              cm.forEach(m => {
                const newM = new THREE.MeshStandardMaterial({
                  color: m.color,
                  side: THREE.DoubleSide,
                  map: m.map || m.emissiveMap,
                  name: cm.name,
                })
                m = newM
              })

              // if (glb.indexOf('CNTXGY')>0) {
            } else {
              // 	debugger
              // }
              let option = {
                color: cm.color,
                side: THREE.DoubleSide,
                map: cm.map || cm.emissiveMap,
                name: cm.name,
              }
              if (needTransparent) {
                option = {
                  ...option,
                  transparent: true,
                  opacity: 0.1,
                  depthWrite: false,
                  // depthFunc: THREE.LessEqualDepth,
                  // depthTest: true
                }
              }

              if (needBeam) {
                option = {
                  ...option,
                  alphaMap: new THREE.TextureLoader().load(
                    'https://eslink-iot.oss-cn-beijing.aliyuncs.com/widget-light.png',
                  ),
                  color: 0xdae626,
                  // color: 0x35c7e0,
                }
              }
              if (glb.indexOf('wallCNTXGLB') > 0) {
                option = {
                  ...option,
                  color: 0x5cd9ff,
                  transparent: true,
                  opacity: 0.5,
                  depthWrite: false,
                  // color: 0x35c7e0,
                }
              }

              const newM = new THREE.MeshStandardMaterial(option)
              if (
                glb.indexOf('ZSGY') > 0 ||
                glb.indexOf('CNTXGY') > 0 ||
                glb.indexOf('BXGSGWFY') > 0
              ) {
                // child.material.color = cm.color
                // child.material.map =  cm.map || cm.emissiveMap
                // debugger
              } else {
                child.material = newM
              }
              met = child
            }
          }
        })
        met.material.opacity = 0.3
        const object = gltf.scene

        if (alarmPrompt) {
          // debugger
          // option = {...option,
          // 	alphaMap: new THREE.TextureLoader().load("/images/light.png"),
          // 	color: 0xf53605,
          // 	// color: 0x35c7e0,
          // }
          arr.push(object.children[0])
          self.outlineObj(arr)
        }

        self.scene.add(object)

        if (renderType === 'edges') {
          self.toEdges({ object })
          // loadLayer.userData.renderType = 'edges'
        }
        object.userData.load = true
        if (position) object.position.set(position.x, position.y, position.z)
        if (scale) object.scale.set(scale.x, scale.y, scale.z)

        if (rotation && hasGlbRotateSet) {
          object.rotation.set(rotation.x, rotation.y, rotation.z)
        } else {
          object.rotateX(Math.PI / 2)
        }
        if (name) object.userData.name = name
        if (type) {
          object.children[0].userData.name = type
          object.userData.type = type
        }
        if (id) object.userData.id = id
        if (clickColor) object.userData.clickColor = clickColor
        if (clickOpacity) object.userData.clickOpacity = clickOpacity
        if (stateColor) object.userData.stateColor = stateColor
        if (nextDiagramId) object.userData.nextDiagramId = nextDiagramId
        if (stationId) object.userData.stationId = stationId
        if (parent) parent.add(object)
        else self.root.add(object)
        if (showLabelType) object.userData.showLabelType = showLabelType
        if (labelContent) object.userData.labelContent = labelContent
        if (showLabelType === 1) {
          self.createShuiChuangLabel(
            object,
            labelContent,
            parseFloat(labelScale),
          )
        }
        if (showMonitorType) {
          object.userData.showMonitorType = showMonitorType
        }
        if (showMonitorType === 4) {
          self.createMonitorLabel(object, parseFloat(labelScale))
        }
        if (labelScale) object.userData.labelScale = labelScale
        if (needRotate) object.userData.needRotate = needRotate
        if (moreData)
          moreData.onComplete({
            data: moreData.data,
          })
        self.render()
      },
      null,
      err => {
        console.log(err)
      },
    )
  },
  /**
   * 加载obj文件
   * @param {String} params.obj obj地址
   * @param {String} params.mtl mtl地址
   * @private
   * */
  loadObj(params) {
    const {
      obj,
      mtl,
      renderType,
      scale,
      rotation,
      position,
      name,
      type,
      id,
      clickColor,
      clickOpacity,
      stateColor,
      nextDiagramId,
      stationId,
      parent,
      showLabelType,
      showMonitorType,
      needBeam,
      labelContent,
      labelScale,
      needRotate,
      moreData,
    } = params
    const self = this
    const loadLayer = self.getLayer('load', this.root)
    const mtlLoader = new MTLLoader()
    const loader = new OBJLoader2()
    loader.setLogging(false, false)

    return new Promise(resolve => {
      function onErr(err) {
        console.warn(err)
        resolve()
      }
      console.log('needBeam', needBeam)
      mtlLoader.load(
        mtl,
        function(materials) {
          loader.addMaterials(MtlObjBridge.addMaterialsFromMtlLoader(materials))
          loader.load(
            obj,
            function(object) {
              // if (needBeam) {
              // 	textureLoader.load("/images/light.png", function(texture) {
              // 		object.children[0].material.map = texture
              // 		object.children[1].material.map = texture
              // 		object.children[0].material.needsUpdate = true
              // 		object.children[1].material.needsUpdate = true
              // 	})
              // }
              object.traverse(function(child) {
                const cm = child.material
                if (cm) {
                  if (cm instanceof Array) {
                    cm.forEach(m => {
                      m.side = THREE.DoubleSide
                      m.specular = new THREE.Color(0.1, 0.1, 0.1)
                      // if (needBeam) {
                      // 	m.map = new THREE.TextureLoader().load("/images/light.png");
                      // 	m.needsUpdate = true;
                      // }
                    })
                  } else {
                    cm.side = THREE.DoubleSide
                    cm.specular = new THREE.Color(0.1, 0.1, 0.1)
                    // if (needBeam) {
                    // 	debugger;
                    // 	cm.alphaMap = new THREE.TextureLoader().load("/images/light.png");
                    // 	cm.color = 0x35c7e0;
                    // }
                  }
                }
              })
              if (renderType === 'edges') {
                self.toEdges({ object })
                loadLayer.userData.renderType = 'edges'
              }
              object.userData.load = true
              if (position)
                object.position.set(position.x, position.y, position.z)
              if (scale) object.scale.set(scale.x, scale.y, scale.z)
              if (rotation)
                object.rotation.set(rotation.x, rotation.y, rotation.z)
              if (name) object.userData.name = name
              if (type) object.userData.type = type
              if (id) object.userData.id = id
              if (clickColor) object.userData.clickColor = clickColor
              if (clickOpacity) object.userData.clickOpacity = clickOpacity
              if (stateColor) object.userData.stateColor = stateColor
              if (nextDiagramId) object.userData.nextDiagramId = nextDiagramId
              if (stationId) object.userData.stationId = stationId
              if (parent) parent.add(object)
              else self.root.add(object)
              if (showLabelType) object.userData.showLabelType = showLabelType
              if (labelContent) object.userData.labelContent = labelContent
              if (showLabelType === 1) {
                self.createShuiChuangLabel(
                  object,
                  labelContent,
                  parseFloat(labelScale),
                )
              }
              if (showMonitorType) {
                object.userData.showMonitorType = showMonitorType
              }
              if (showMonitorType === 4) {
                self.createMonitorLabel(object, parseFloat(labelScale))
              }
              if (labelScale) object.userData.labelScale = labelScale
              if (needRotate) object.userData.needRotate = needRotate
              if (moreData)
                moreData.onComplete({
                  data: moreData.data,
                })
              self.render()
            },
            null,
            onErr,
            null,
            true,
          )
        },
        null,
        onErr,
      ) // loadMtl
    }) // Promise
  },
  cloneLoadObj(obj, data) {
    const {
      scale,
      rotation,
      position,
      name,
      type,
      id,
      nextDiagramId,
      stationId,
      clickColor,
      clickOpacity,
      stateColor,
      labelContent,
      labelScale,
      needRotate,
      showLabelType,
      showMonitorType,
      renderType,
      modelType,
      hasGlbRotateSet,
    } = data
    let newObj
    if (
      obj.children.length &&
      obj.children[obj.children.length - 1].userData.type === 'label3d'
    ) {
      const label = obj.children[obj.children.length - 1]
      obj.remove(label)
      newObj = obj.clone()
      obj.add(label)
    } else newObj = obj.clone()
    const oldRenderType = obj.userData.renderType
    newObj.userData = {}
    if (oldRenderType === 'edges' && renderType !== 'edges') {
      this.recoveryEdges({ object: newObj })
    }
    if (oldRenderType !== 'edges' && renderType === 'edges') {
      this.toEdges({ object: newObj })
    }
    newObj.userData.load = true
    if (position) newObj.position.set(position.x, position.y, position.z)
    if (scale) newObj.scale.set(scale.x, scale.y, scale.z)
    if (modelType == 'glb') {
      //重置下旋转
      newObj.rotation.set(0, 0, 0)
      if (hasGlbRotateSet && rotation) {
        newObj.rotation.set(rotation.x, rotation.y, rotation.z)
      } else newObj.rotateX(Math.PI / 2)
    } else if (rotation) newObj.rotation.set(rotation.x, rotation.y, rotation.z)
    if (name) newObj.userData.name = name
    if (type) newObj.userData.type = type
    if (id) newObj.userData.id = id
    if (nextDiagramId) newObj.userData.nextDiagramId = nextDiagramId
    if (stationId) newObj.userData.stationId = stationId
    if (clickColor) newObj.userData.clickColor = clickColor
    if (clickOpacity) newObj.userData.clickOpacity = clickOpacity
    if (stateColor) newObj.userData.stateColor = stateColor
    if (showLabelType) newObj.userData.showLabelType = showLabelType
    if (showMonitorType) newObj.userData.showMonitorType = showMonitorType
    if (labelScale) newObj.userData.labelScale = labelScale
    if (needRotate) newObj.userData.needRotate = needRotate
    if (labelContent) newObj.userData.labelContent = labelContent
    if (showLabelType === 1) {
      this.createShuiChuangLabel(newObj, labelContent, parseFloat(labelScale))
    }
    if (showMonitorType === 4) {
      this.createMonitorLabel(newObj, parseFloat(labelScale))
    }
    return newObj
  },
  loadData({ data }) {
    if (!data || !data.length) {
      this.emit(events.loaded)
      return
    }
    const loadLayer = this.getLayer('load', this.root)
    while (data[0]) {
      const layer = this.getLayer(data[0].type, loadLayer)
      if (layer.children[0]) {
        layer.add(this.cloneLoadObj(layer.children[0], data[0]))
        data.shift()
      } else {
        break
      }
    }
    if (!data[0]) {
      this.emit(events.loaded)
      return
    }
    // 删除不需要加载的load
    if (data[0].disappear) {
      data.shift()
    }

    const data0 = data[0]
    data.shift()
    const parent = this.getLayer(data0.type, loadLayer)
    data0.parent = parent
    data0.moreData = {
      data,
      onComplete: this.loadData.bind(this),
    }
    if (data0.modelType == 'glb') {
      const glb =
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/' + data0.type + '.glb'
      data0.glb = glb
      this.loadGlb(data0)
    } else {
      const obj =
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/' + data0.type + '.obj'
      const mtl =
        'https://eslink-iot.oss-cn-beijing.aliyuncs.com/' + data0.type + '.mtl'
      data0.obj = obj
      data0.mtl = mtl
      this.loadObj(data0)
    }
  },
}
