import * as THREE from 'three'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import events from '../enum/events'
let waterLayer, guandaoLayer
/**
 * @module
 * @description 该模块内容将通过 Object.assign 方法合并入 ThreeContainer
 * @see ThreeContainer
 */

export default {
  /**
   * @summary 初始化 controls
   * @private
   */
  initEffects() {
    this.needFloor = false
    waterLayer = this.getLayer('water')
    guandaoLayer = this.getLayer('guandao', this.root)
    let waterImage = new THREE.TextureLoader().load(
      'https://eslink-iot.oss-cn-beijing.aliyuncs.com/widget-water.jpg',
    )
    waterImage.wrapS = waterImage.wrapT = THREE.RepeatWrapping
    waterImage.repeat.set(0.5, 0.5)
    this.waterMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color(0.0666666701436, 0.82745099067688, 1.0),
      emissive: new THREE.Color(0.00666666701436, 0.082745099067688, 0.1),
      emissiveIntensity: 3,
      emissiveMap: waterImage,
      alphaMap: waterImage,
      map: waterImage,
      refractionRatio: 0.98,
      side: THREE.DoubleSide,
      shininess: 30,
      specular: new THREE.Color(
        0.09666666666666667,
        0.09666666666666667,
        0.09666666666666667,
      ),
      transparent: true,
      opacity: 0.8,
    })
    this.on(events.render, this.disturbance.bind(this))
    this.on(events.render, this.guandaoMove.bind(this))
    this.on(events.loaded, this.loadFloor.bind(this))
    this.on(events.loaded, this.changeShanyeColor.bind(this))
    this.on(events.loaded, this.changeStateColor.bind(this))
  },
  shanyeRotate() {
    const loadLayer = this.getLayer('load', this.root)
    const shanyeLayer = this.getLayer('shanye', loadLayer)
    shanyeLayer.children.forEach(shanye => {
      if (shanye.userData.needRotate) {
        shanye.traverse(shanyeMesh => {
          if (shanyeMesh.geometry) {
            shanyeMesh.rotateY(Math.PI / 60)
          }
        })
      }
    })
  },
  changeStateColor() {
    this.root.traverse(mesh => {
      if (mesh.userData.stateColor) {
        this.changeColorSure([mesh], new THREE.Color(mesh.userData.stateColor))
      }
    })
  },
  changeShanyeColor() {
    const loadLayer = this.getLayer('load', this.root)
    const shanyeLayer = this.getLayer('shanye', loadLayer)
    shanyeLayer.children.forEach(shanye => {
      if (!shanye.userData.needRotate) {
        this.changeColorSure([shanye], new THREE.Color(0.5, 0.5, 0.5))
      }
    })
  },
  loadFloor() {
    if (this.needFloor) {
      this.needFloor = false
      const box = this.calcObjectsBox()
      const center = this.getBoxCenter(box)
      const modelDatas = []
      const data = {
        position: new THREE.Vector3(center.x, center.y, box.min.z - 2.0),
        scale: new THREE.Vector3(
          (box.max.x - box.min.x) / 80,
          (box.max.y - box.min.y) / 80,
          (box.max.z - box.min.z) / 20,
        ),
        type: 'dimianAlpha',
      }
      modelDatas.push(data)
      this.loadData({ data: modelDatas })
    }
  },
  /**
   * 扰动物体geometry的y轴信息，实现水波效果
   * @private
   */
  disturbance() {
    if (!waterLayer || !waterLayer.children.length) return
    var time = this.clock.getElapsedTime() * 2
    waterLayer.children.forEach(object => {
      if (!object.geometry) return
      var position = object.geometry.attributes.position
      for (var i = 0; i < position.count; i++) {
        let x = position.getX(i)
        let z = position.getZ(i)
        let y = (Math.cos(x * 0.1 + time) + Math.sin(z * 0.1 + time)) * 2.0
        position.setY(i, y)
      }
      position.needsUpdate = true
    })
  },
  /**
   * 生成水流平面
   * @param {THREE.Vector3} params.position 水流位置
   * @param {THREE.Vector2} params.size 水流大小
   * @private
   */
  createWaterPlane(params) {
    let geometry = new THREE.PlaneBufferGeometry(
      params.size.x,
      params.size.y,
      params.size.x,
      params.size.y,
    )
    geometry.rotateX(-Math.PI / 2)
    const water = new THREE.Mesh(geometry, this.waterMaterial)
    water.position.copy(params.position)
    waterLayer = this.getLayer('water')
    waterLayer.add(water)
  },
  getDiagram(data) {
    const { guandaoData, objData } = data
    const {
      redPoints,
      yellowPoints,
      normalPoints,
      whitePoints,
      brownPoints,
      blackPoints,
      greenPoints,
      points,
      endPosition,
      endTarget,
      startPosition,
      startTarget,
      processFlowDiagramName,
      guanDaoRadius,
    } = guandaoData
    const info = {}
    const {
      pointsRadius,
      greenPointsRadius,
      blackPointsRadius,
      brownPointsRadius,
      whitePointsRadius,
      redPointsRadius,
      yellowPointsRadius,
      normalPointsRadius,
    } = guanDaoRadius || {}
    //1是全局  2是站点
    info.processFlowDiagramType = 2
    info.needFloor = 0
    info.processFlowDiagramName = processFlowDiagramName || 'CBD泵站挂在站点'
    info.startPositionX = startPosition.x
    info.startPositionY = startPosition.y
    info.startPositionZ = startPosition.z
    info.startTargetX = startTarget.x
    info.startTargetY = startTarget.y
    info.startTargetZ = startTarget.z
    info.endPositionX = endPosition.x
    info.endPositionY = endPosition.y
    info.endPositionZ = endPosition.z
    info.endTargetX = endTarget.x
    info.endTargetY = endTarget.y
    info.endTargetZ = endTarget.z
    info.points = []
    if (points) {
      points.forEach(point => {
        const data = {}
        data.color = 'blue'
        data.size = pointsRadius || 4
        const vectors = []
        point.forEach(p => {
          const vector = {}
          vector.x = p.x
          vector.y = p.y
          vector.z = p.z
          vectors.push(vector)
        })
        data.point = vectors
        info.points.push(data)
      })
    }
    if (greenPoints) {
      greenPoints.forEach(point => {
        const data = {}
        data.color = 'green'
        data.size = greenPointsRadius || 20
        const vectors = []
        point.forEach(p => {
          const vector = {}
          vector.x = p.x
          vector.y = p.y
          vector.z = p.z
          vectors.push(vector)
        })
        data.point = vectors
        info.points.push(data)
      })
    }
    if (blackPoints) {
      blackPoints.forEach(point => {
        const data = {}
        data.color = 'black'
        data.size = blackPointsRadius || 6
        const vectors = []
        point.forEach(p => {
          const vector = {}
          vector.x = p.x
          vector.y = p.y
          vector.z = p.z
          vectors.push(vector)
        })
        data.point = vectors
        info.points.push(data)
      })
    }
    if (brownPoints) {
      brownPoints.forEach(point => {
        const data = {}
        data.color = 'brown'
        data.size = brownPointsRadius || 6
        const vectors = []
        point.forEach(p => {
          const vector = {}
          vector.x = p.x
          vector.y = p.y
          vector.z = p.z
          vectors.push(vector)
        })
        data.point = vectors
        info.points.push(data)
      })
    }
    if (whitePoints) {
      whitePoints.forEach(point => {
        const data = {}
        data.color = 'white'
        data.size = whitePointsRadius || 6
        const vectors = []
        point.forEach(p => {
          const vector = {}
          vector.x = p.x
          vector.y = p.y
          vector.z = p.z
          vectors.push(vector)
        })
        data.point = vectors
        info.points.push(data)
      })
    }
    if (redPoints) {
      redPoints.forEach(point => {
        const data = {}
        data.color = 'red'
        data.size = redPointsRadius || 5
        const vectors = []
        point.forEach(p => {
          const vector = {}
          vector.x = p.x
          vector.y = p.y
          vector.z = p.z
          vectors.push(vector)
        })
        data.point = vectors
        info.points.push(data)
      })
    }
    if (yellowPoints) {
      yellowPoints.forEach(point => {
        const data = {}
        data.color = 'yellow'
        data.size = yellowPointsRadius || 5
        const vectors = []
        point.forEach(p => {
          const vector = {}
          vector.x = p.x
          vector.y = p.y
          vector.z = p.z
          vectors.push(vector)
        })
        data.point = vectors
        info.points.push(data)
      })
    }
    if (normalPoints) {
      normalPoints.forEach(point => {
        const data = {}
        data.color = ''
        data.size = normalPointsRadius || 4
        const vectors = []
        point.forEach(p => {
          const vector = {}
          vector.x = p.x
          vector.y = p.y
          vector.z = p.z
          vectors.push(vector)
        })
        data.point = vectors
        info.points.push(data)
      })
    }
    info.processFlowDiagramModels = []
    let index = 0
    objData.forEach(data => {
      const data1 = {}
      data1.renderType = null
      data1.showLabelType = data.showLabelType || 0
      data1.labelScale = data.labelScale
      data1.labelContent = data.labelContent || []
      data1.showMonitorType = data.showMonitorType || 0
      data1.alarmPrompt = data.alarmPrompt
      data1.disappear = data.disappear
      data1.extraAttribute = data.extraAttribute
      // data1.nextDiagramId = null
      data1.nextDiagramId = data.nextDiagramId
      data1.clickColor = null
      data1.clickOpacity = null
      data1.modelType = data.modelType
      data1.needTransparent = data.needTransparent
      data1.needBeam = data.needBeam
      data1.modelUrl = data.type
      data1.positionX = data.position.x
      data1.positionY = data.position.y
      data1.positionZ = data.position.z
      data1.scaleX = data.scale ? data.scale.x : 1.0
      data1.scaleY = data.scale ? data.scale.y : 1.0
      data1.scaleZ = data.scale ? data.scale.z : 1.0
      data1.rotationX = data.rotation ? data.rotation.x : 0.0
      data1.rotationY = data.rotation ? data.rotation.y : 0.0
      data1.rotationZ = data.rotation ? data.rotation.z : 0.0
      data1.modelName = data.name ? data.name : data.type + index
      data1.hasGlbRotateSet = data.hasGlbRotateSet || ''
      info.processFlowDiagramModels.push(data1)
      index++
    })
    return info
    //this.emit(events.getDiagram, info);
  },
  yUpReset(info) {
    console.log(info)
    // let { endPositionX, endPositionY, endPositionZ } = info;
    // this.removeLight(this.lights);

    // debugger;
    // let lights = []
    this.updateEnvironment()
    this.renderer.toneMapping = THREE.ReinhardToneMapping
    this.renderer.toneMappingExposure = 1.8
    // const axes = new THREE.AxesHelper(100000);
    // this.scene.add(axes);
    // // const amLight = new THREE.AmbientLight(0xaaaaaa);
    // const amLight = new THREE.AmbientLight(0xffffff);
    // this.scene.add(amLight);
    // this.scene.background = new THREE.Color( 0xa0a0a0 );
    // this.scene.fog = new THREE.Fog( 0xa0a0a0, 100000, 220000 );

    // var hemiLight = new THREE.HemisphereLight( 0x555555, 0x444444 );
    // hemiLight.position.set( -51, 0, 472 );
    // this.scene.add( hemiLight );
  },
  loadZSLight() {
    this.removeLight()
    const dirLight = new THREE.DirectionalLight(0x555555, 8)

    const dirPos = new THREE.Vector3(-51, 0, 472).normalize()
    dirLight.position.set(dirPos.x, dirPos.y, dirPos.z)
    this.scene.add(dirLight)
    this.lights = [dirLight]
  },
  setDiagram({ info }) {
    if (info.debug) this.debugModalInfo = info
    // debugger;
    if (info.processFlowDiagramName === '章山') {
      this.loadZSLight()
    }
    if (
      info.processFlowDiagramName == '苍南天信' ||
      info.processFlowDiagramName === '章山'
    ) {
      // debugger;
      this.yUpReset(info)
    }

    if (info.needFloor) this.needFloor = true
    const startPosition = new THREE.Vector3(
      info.startPositionX,
      info.startPositionY,
      info.startPositionZ,
    )
    const startTarget = new THREE.Vector3(
      info.startTargetX,
      info.startTargetY,
      info.startTargetZ,
    )
    const endPosition = new THREE.Vector3(
      info.endPositionX,
      info.endPositionY,
      info.endPositionZ,
    )
    const endTarget = new THREE.Vector3(
      info.endTargetX,
      info.endTargetY,
      info.endTargetZ,
    )
    this.flyTo({
      endPosition,
      startPosition,
      endTarget,
      startTarget,
      time: 2000,
    })

    let index = 0

    info.pointGroups.forEach(point => {
      const vs = []
      let inColor = null
      const size = point.size || 2
      if (point.color) {
        switch (point.color) {
          case 'red':
            inColor = new THREE.Color(1, 0, 0)
            break
          case 'yellow':
            inColor = new THREE.Color(1, 1, 0)
            break
          case 'black':
            inColor = new THREE.Color(0, 0, 0)
            break
          case 'brown':
            inColor = new THREE.Color(0.6, 0.2, 0)
            break
          case 'white':
            inColor = new THREE.Color(1, 1, 1)
            break
          case 'green':
            inColor = new THREE.Color(0, 1, 0)
            break
          default:
            inColor = new THREE.Color(0.0666666701436, 0.82745099067688, 1.0)
            break
        }
      }
      point.point.forEach(v => {
        vs.push(new THREE.Vector3(v.x, v.y, v.z))
      })
      if (inColor) {
        this.createGuandao({
          points: vs,
          id: 'guandao' + index,
          radius: size,
          inColor,
        })
      } else {
        this.createNormalGuandao({
          points: vs,
          radius: size,
          inColor: new THREE.Color(0.8, 0.8, 0),
        })
      }
      index++
    })
    const modelDatas = []
    info.processFlowDiagramModels.forEach(model => {
      const data = {}

      data.type = model.modelUrl
      data.name = model.modelName
      data.id = model.id
      data.clickColor = model.clickColor
      data.modelType = model.modelType
      data.clickOpacity = model.clickOpacity
      data.needTransparent = model.needTransparent
      data.needBeam = model.needBeam
      data.renderType = model.renderType
      data.nextDiagramId = model.nextDiagramId
      data.alarmPrompt = model.alarmPrompt
      data.disappear = model.disappear
      data.stationId = model.stationId
      data.labelScale = model.labelScale || 1
      data.hasGlbRotateSet = model.hasGlbRotateSet || ''
      data.position = new THREE.Vector3(
        parseFloat(model.positionX),
        parseFloat(model.positionY),
        parseFloat(model.positionZ),
      )
      data.scale = new THREE.Vector3(
        parseFloat(model.scaleX),
        parseFloat(model.scaleY),
        parseFloat(model.scaleZ),
      )
      data.rotation = new THREE.Vector3(
        parseFloat(model.rotationX),
        parseFloat(model.rotationY),
        parseFloat(model.rotationZ),
      )
      data.showLabelType = parseFloat(model.showLabelType)
      data.showMonitorType = parseFloat(model.showMonitorType)

      if (model.extraAttribute) {
        let extraObj = JSON.parse(model.extraAttribute)
        for (const key in extraObj) {
          if (Object.hasOwnProperty.call(extraObj, key)) {
            data[key] = extraObj[key] === 'true' ? true : extraObj[key]
          }
        }
      }

      if (model.needLabel) model.showLabelType = 1
      if (model.labelContent && model.labelContent.length) {
        data.labelContent = []
        model.labelContent.forEach(content => {
          if (content.showDataType) {
            if (content.showDataType == 2 && content.monitorData) {
              const text = {
                text: content.monitorTypeName,
                url: content.monitorData,
              }
              data.labelContent.push(text)
            } else if (content.showDataType == 1 && content.monitorData) {
              data.stateColor = content.monitorData
              data.showLabelType = null
            }
          } else {
            const text = {
              text:
                content.monitorTypeName +
                content.monitorData +
                content.monitorTypeUnit,
              alarm: content.alarm,
            }
            // const text =content.monitorTypeName +
            // content.monitorData +
            // content.monitorTypeUnit;
            data.labelContent.push(text)
          }
        })
        if (model.modelUrl === 'shanye') {
          data.labelContent = []
          model.labelContent.forEach(content => {
            if (parseInt(content.monitorData)) data.needRotate = true
          })
        }
      }
      modelDatas.push(data)
    })
    this.loadData({ data: modelDatas })
    this.on(events.render, this.shanyeRotate.bind(this))
    this.scaleSceneX(info.processFlowDiagramName)
  },
  scaleSceneX(name) {
    if (
      name == '葫芦岛新区工艺' ||
      name == '葫芦岛五厂工艺' ||
      name == '葫芦岛北港工艺' ||
      name == '葫芦岛打渔山工艺' ||
      name == '葫芦岛西山工艺'
    ) {
      this.scene.scale.set(-1, 1, 1)
    }
  },
  lerpPoints(points) {
    if (points.length < 2) return points
    const newPoints = []
    points.forEach(point => {
      if (newPoints.length) {
        const oldPoint = newPoints[newPoints.length - 1]
        const newPoint = point.clone()
        const p1 = oldPoint.clone().lerp(newPoint, 0.001)
        const p2 = oldPoint.clone().lerp(newPoint, 0.01)
        const p3 = oldPoint.clone().lerp(newPoint, 0.99)
        const p4 = oldPoint.clone().lerp(newPoint, 0.999)
        newPoints.push(p1)
        newPoints.push(p2)
        newPoints.push(p3)
        newPoints.push(p4)
        newPoints.push(newPoint)
      } else newPoints.push(point.clone())
    })
    return newPoints
  },
  createNormalGuandao({ points, radius, inColor }) {
    const newPoints = this.lerpPoints(points)
    const watermaterial = new THREE.MeshPhongMaterial({
      color: inColor,
    })
    const curveRadius = radius ? radius : 2
    const curve = new THREE.CatmullRomCurve3(newPoints)
    const TubeGeometry = new THREE.TubeBufferGeometry(
      curve,
      Math.max(newPoints.length * 10, Math.ceil(length / 10)),
      curveRadius,
      8,
      false,
    )
    const guandao = new THREE.Mesh(TubeGeometry, watermaterial)
    guandaoLayer.add(guandao)
  },
  createGuandao({ points, id, radius, inColor, adduvx, segment }) {
    let length = 0
    for (let i = 0; i < points.length - 1; i++) {
      length += points[i].clone().distanceTo(points[i + 1].clone())
    }
    const newPoints = this.lerpPoints(points)
    let texture = new THREE.TextureLoader().load(
      'https://eslink-iot.oss-cn-beijing.aliyuncs.com/widget-water.jpg',
    )
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.matrixAutoUpdate = false
    const watermaterial = new THREE.MeshPhongMaterial({
      color: inColor || new THREE.Color(0.0666666701436, 0.82745099067688, 1.0),
      emissive:
        inColor || new THREE.Color(0.00666666701436, 0.082745099067688, 0.1),
      emissiveMap: texture,
      alphaMap: texture,
      // emissiveIntensity: 1,
      map: texture,
      refractionRatio: 0.98,
      shininess: 30,
      specular: new THREE.Color(
        0.09666666666666667,
        0.09666666666666667,
        0.09666666666666667,
      ),
      transparent: true,
      opacity: 0.8,
    })
    const watermaterial1 = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0.0666666701436, 0.82745099067688, 1.0),
      transparent: true,
      opacity: 0.2,
    })
    const curveRadius = radius ? radius : 2
    const curve = new THREE.CatmullRomCurve3(newPoints)
    const TubeGeometry = new THREE.TubeBufferGeometry(
      curve,
      Math.max(newPoints.length * 10, Math.ceil(length / 10)),
      curveRadius,
      segment || 8,
      false,
    )
    const TubeGeometry1 = new THREE.TubeBufferGeometry(
      curve,
      Math.max(newPoints.length * 10, Math.ceil(length / 10)),
      curveRadius + 1,
      segment || 8,
      false,
    )
    const guandao = new THREE.Mesh(TubeGeometry, watermaterial)
    const guandao1 = new THREE.Mesh(TubeGeometry1, watermaterial1)
    guandao.userData.uvx = 0
    guandao.userData.uvy = 0
    guandao.userData.adduvx = adduvx || -0.01
    guandao.userData.adduvy = 0
    guandao.userData.length =
      radius && radius > 9 ? (length / radius) * 5 : length
    guandao.userData.water = true
    guandao.userData.switchNum = 0
    if (id) guandao.userData.id = id
    guandao.userData.zPoints = []
    guandaoLayer.add(guandao)
    guandaoLayer.add(guandao1)
  },
  controlGuandao(controls, object) {
    this.switchColor([object], new THREE.Color(1, 0, 0))
    controls.forEach(control => {
      guandaoLayer.children.forEach(guandao => {
        const userData = guandao.userData
        if (userData.id === control.id) {
          control.switch *= -1
          userData.switchNum += control.switch
          if (userData.switchNum <= -1) userData.adduvx = 0.0
          else userData.adduvx = -0.01
        }
      })
    })
  },
  guandaoMove() {
    if (!this.clock) return
    var time = this.clock.getElapsedTime() * 2
    guandaoLayer.children.forEach(guandao => {
      const userData = guandao.userData
      if (userData.water) {
        if (!guandao.geometry) return

        userData.uvx += userData.adduvx
        userData.uvy += userData.adduvy
        guandao.material.map.matrix
          .identity()
          .scale(userData.length / 100, 1.0)
          .translate(userData.uvx, userData.uvy)

        let zPoints = userData.zPoints
        if (!zPoints) zPoints = []
        var position = guandao.geometry.attributes.position
        for (var i = 0; i < position.count; i++) {
          let x = position.getX(i)
          let y = position.getY(i)
          if (zPoints.length === i) zPoints.push(position.getZ(i))
          let z =
            zPoints[i] +
            (Math.cos(x * 0.1 + time) + Math.sin(y * 0.1 + time)) * 0.5
          position.setZ(i, z)
        }
        position.needsUpdate = true
      }
    })
  },

  //高亮显示模型（呼吸灯）
  outlineObj(selectedObjects) {
    // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
    this.composer = new EffectComposer(this.renderer)
    // 新建一个场景通道  为了覆盖到原理来的场景上
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(this.renderPass)
    // 物体边缘发光通道
    this.outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.scene,
      this.camera,
      selectedObjects,
    )
    this.outlinePass.selectedObjects = selectedObjects
    this.outlinePass.edgeStrength = 10.0 // 边框的亮度
    this.outlinePass.edgeGlow = 1 // 光晕[0,1]
    this.outlinePass.usePatternTexture = false // 是否使用父级的材质
    this.outlinePass.edgeThickness = 5.0 // 边框宽度
    this.outlinePass.downSampleRatio = 1 // 边框弯曲度
    this.outlinePass.pulsePeriod = 2 // 呼吸闪烁的速度
    this.outlinePass.visibleEdgeColor.set(parseInt(0xff0000)) // 呼吸显示的颜色
    this.outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0) // 呼吸消失的颜色
    this.outlinePass.clear = true
    this.composer.addPass(this.outlinePass)
    // 自定义的着色器通道 作为参数
    var effectFXAA = new ShaderPass(FXAAShader)
    effectFXAA.uniforms.resolution.value.set(
      1 / window.innerWidth,
      1 / window.innerHeight,
    )
    effectFXAA.renderToScreen = true
    this.composer.addPass(effectFXAA)
  },
}
