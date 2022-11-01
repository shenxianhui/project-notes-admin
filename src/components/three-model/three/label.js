import * as THREE from 'three'
import {
  CSS2DObject,
  CSS2DRenderer,
} from 'three/examples/jsm/renderers/CSS2DRenderer'
import {
  CSS3DObject,
  CSS3DRenderer,
} from 'three/examples/jsm/renderers/CSS3DRenderer'
import events from '../enum/events'
import '../css/style.css'

let frustum,
  labelLayer,
  label3DLayer,
  monintor3DLabelLayer,
  showLabel,
  showMonintorLabel
export default {
  initLabelRenderer(container) {
    this.labelBox = new THREE.Mesh(
      new THREE.BoxBufferGeometry(5, 5, 5),
      new THREE.MeshPhongMaterial({ color: new THREE.Color(1, 0, 0) }),
    )
    this.labelBox.visible = false
    this.labelBox.userData.type = 'labelBox'
    this.labelRenderer = new CSS2DRenderer()
    this.label3DRenderer = new CSS3DRenderer()
    frustum = new THREE.Frustum()
    showLabel = true
    showMonintorLabel = false
    labelLayer = new THREE.Group()
    labelLayer.userData.type = 'label2d'
    label3DLayer = new THREE.Group()
    label3DLayer.userData.type = 'label3d'

    monintor3DLabelLayer = new THREE.Group()
    monintor3DLabelLayer.userData.type = 'monintorLabel3d'

    this.labelRenderer.setSize(container.clientWidth, container.clientHeight)
    this.labelRenderer.domElement.id = 'label-container'
    this.labelRenderer.domElement.style.position = 'absolute'
    this.labelRenderer.domElement.style.top = 0
    this.labelRenderer.domElement.style['pointer-events'] = 'none'
    container.appendChild(this.labelRenderer.domElement)

    this.label3DRenderer.setSize(container.clientWidth, container.clientHeight)
    this.label3DRenderer.domElement.id = 'label3D-container'
    this.label3DRenderer.domElement.style.position = 'absolute'
    this.label3DRenderer.domElement.style.top = 0
    this.label3DRenderer.domElement.style['pointer-events'] = 'none'
    container.appendChild(this.label3DRenderer.domElement)

    this.on(events.resize, (width, height) => {
      if (this.labelRenderer) {
        this.labelRenderer.setSize(width, height)
        this.label3DRenderer.setSize(width, height)
      }
    })
    this.on(events.mousemove, this.adjustLabelDirection.bind(this))
    this.on(events.render, this.changeLabelContent.bind(this))
    this.changeLabelContentIndex = 0

    this.on(events.render, () => {
      if (showLabel || showMonintorLabel) {
        frustum.setFromProjectionMatrix(
          new THREE.Matrix4().multiplyMatrices(
            this.camera.projectionMatrix,
            this.camera.matrixWorldInverse,
          ),
        )

        // 判断是否存在在可是范围内部，如果存在则展示页面，如果则不展示
        showLabel &&
          label3DLayer.children.forEach(label => {
            label.element.style.display =
              label.userData.type === 'label3d' &&
              frustum.containsPoint(label.position)
                ? 'block'
                : 'none'
          })

        if (this.labelBox.visible && this.labelBox.label) {
          this.labelBox.label.position.copy(this.labelBox.position)
          this.labelBox.label.scale.copy(this.labelBox.scale)
          this.labelBox.label.rotation.copy(this.labelBox.rotation)
        }
        this.labelRenderer && this.labelRenderer.render(this.scene, this.camera)
        this.labelRenderer &&
          this.labelRenderer.setSize(
            container.clientWidth,
            container.clientHeight,
          )
        if (!showMonintorLabel) {
          // if (!this.label3DRenderer.domElement.firstChild) return
          // // if (!this.label3DRenderer.domElement.firstChild.children) return
          if (this.label3DRenderer.domElement.firstChild.children.length) {
            // this.label3DRenderer.domElement.firstChild.children.forEach(item => {
            // 	item.style.display = item.className === 'monintor-label' ? 'none' : 'block'
            // })
            for (
              let index = 0;
              index <
              this.label3DRenderer.domElement.firstChild.children.length;
              index++
            ) {
              const item = this.label3DRenderer.domElement.firstChild.children[
                index
              ]
              item.style.display =
                item.className === 'monintor-label' ? 'none' : 'block'
            }
          }
          // console.trace()
          this.scene.add(label3DLayer)
          this.scene.remove(monintor3DLabelLayer)
        } else {
          this.label3DRenderer.domElement.firstChild.children.forEach(item => {
            item.style.display = item.className === 'label' ? 'none' : 'block'
          })
          this.scene.remove(label3DLayer)
          this.scene.add(monintor3DLabelLayer)
        }
        this.label3DRenderer.render(this.scene, this.camera)
        this.label3DRenderer.setSize(
          container.clientWidth,
          container.clientHeight,
        )
      } else {
        this.labelRenderer.setSize(0, 0)
        this.label3DRenderer.setSize(0, 0)
      }
    })

    this.scene.add(labelLayer)
    this.scene.add(label3DLayer)
    this.scene.add(monintor3DLabelLayer)
  },
  removeLabelRenderer() {
    while (this.labelRenderer.domElement.firstChild) {
      this.labelRenderer.domElement.removeChild(
        this.labelRenderer.domElement.firstChild,
      )
    }
    while (this.label3DRenderer.domElement.firstChild) {
      this.label3DRenderer.domElement.removeChild(
        this.label3DRenderer.domElement.firstChild,
      )
    }
    this.scene.remove(labelLayer)
    this.scene.remove(label3DLayer)
    this.scene.remove(monintor3DLabelLayer)
  },
  showLabels(show) {
    showLabel = show
  },
  showMonintorLabels(show) {
    showMonintorLabel = show
  },

  createLabel(object, labelDiv) {
    const label = new CSS2DObject(labelDiv)
    this.setTopPositionWorld({ object: label, baseObject: object })

    object.addEventListener('removed', () => {
      labelLayer.remove(label)
      this.dispose(object)
    })
    label.userData.type = 'label2d'
    labelLayer.add(label)
    object.label = label

    return label
  },

  createMonitorLabel(object, labelScale) {
    let name = object.name || object.userData.name
    if (!name) {
      const child = object.children[0]
      if (child) {
        name = child.name || child.userData.name
      }
    }
    if (!name) return
    const labelDiv = document.createElement('div')
    labelDiv.className = 'monintor-label'
    const str = `<div class="three-monitor-label-icon">
			<i class="icon iconfont icon-jiankongdianwei"></i>
		</div>
		<div class="three_shuichuang_line"></div>`
    labelDiv.innerHTML = str
    const label = this.create3DLabel(object, labelDiv, labelScale, 4)

    const self = this
    label.element.firstChild.children[0].onclick = () => {
      self.emit(events.clicked, {
        type: 'VIDEO-LABEL',
        labelName: object.userData.name,
        objectClass: object.userData.type,
        diagramId: object.userData.nextDiagramId,
        stationId: object.id,
        // stationId: object.userData.stationId
      })
    }
    label.scale.set(
      label.scale.x * 0.5,
      label.scale.y * 0.5,
      label.scale.y * 0.5,
    )
    this.render()
    return label
  },

  createShuiChuangLabel(object, labelContent, labelScale) {
    let name = object.name || object.userData.name
    if (!name) {
      const child = object.children[0]
      if (child) {
        name = child.name || child.userData.name
      }
    }
    if (!name) return
    let marginBottom = 15
    let divWidth = 116
    const realLength = this.getStrLen(name)
    if (realLength * 11 > divWidth) divWidth = realLength * 11
    const labelDiv = document.createElement('div')
    labelDiv.className = 'label'
    let html1 = `<div class="three_shuichuang_div">`
    if (object.userData.nextDiagramId) {
      html1 += `<div class="three_button"></div>`
    }
    html1 += `<div class="three_title">${name}</div>`
    marginBottom += 32
    if (labelContent) {
      for (let i = 0; i < labelContent.length; i++) {
        let alarmClass = ''
        if (labelContent[i].alarm) {
          alarmClass = 'three_alarm_content'
        }
        if (labelContent[i].url) {
          html1 += `<div class="three_content ${alarmClass}">${labelContent[i].text}<img src=${labelContent[i].url} width="10" height="10"></div>`
        } else {
          html1 += `<div class="three_content ${alarmClass}">${labelContent[i].text}</div>`
        }
        marginBottom += 24
        const realLengthct = this.getStrLen(labelContent[i].text)
        if (realLengthct * 10 > divWidth) divWidth = realLengthct * 10
      }
    }
    html1 += `</div>
   <div class="three_shuichuang_line"></div>
   `
    labelDiv.innerHTML = html1
    const label = this.create3DLabel(object, labelDiv, labelScale, 1)
    const self = this
    const lineDiv = label.element.children[1]
    lineDiv.style['marginTop'] = -marginBottom + 'px'
    lineDiv.style['marginBottom'] = marginBottom + 'px'
    lineDiv.style['marginLeft'] = divWidth / 2 - 6 + 'px'
    const div = label.element.firstChild
    div.style['marginBottom'] = marginBottom + 'px'
    div.style['height'] = marginBottom - 15 + 'px'
    div.style['width'] = divWidth + 'px'
    if (object.userData.nextDiagramId) {
      div.children[0].style['marginLeft'] = divWidth - 16 + 'px'
      div.children[0].onclick = () => {
        self.emit(events.clicked, {
          type: 'label',
          labelName: object.userData.name,
          objectClass: object.userData.type,
          diagramId: object.userData.nextDiagramId,
          stationId: object.userData.stationId,
        })
      }
    }
    // label.scale.set(
    //     label.scale.x * 1.5,
    //     label.scale.y * 1.5,
    //     label.scale.y * 1.5
    // );
    this.render()
    return label
  },

  create3DLabel(object, labelDiv, labelScale, layerType) {
    const label = new CSS3DObject(labelDiv)
    const box = this.setTopPosition({
      object: label,
      baseObject: object,
    })
    if (this.camera.up.z) label.rotateX(Math.PI / 2)
    let scale = 80
    // debugger;
    // if (object.userData.type==='shuixiang2ZSGY') {
    // 	debugger;
    // }
    if (layerType === 1) {
      if (labelScale === 1) {
        scale = box.geometry.boundingSphere.radius * 0.02
        // scale *= labelScale ? labelScale : 1.0;
      } else {
        scale = labelScale
      }
    }
    if (layerType === 4) {
      scale = box.geometry.boundingSphere.radius * 0.02
      scale *= labelScale ? labelScale : 1.0
      // if (labelScale === 1){
      // } if (labelScale > 1) {
      // 	scale = labelScale
      // }
    }
    label.scale.set(scale, scale, scale)
    label.userData.type = layerType === 4 ? 'monintorLabel3d' : 'label3d'
    label.userData.key = object.userData.type
    label.userData.face = new THREE.Vector3(0, -1, 0)
      .applyMatrix4(object.matrixWorld)
      .sub(object.position)

    label.element.style['pointerEvents'] = 'none'
    if (layerType === 4) {
      monintor3DLabelLayer.add(label)
    } else {
      label3DLayer.add(label)
    }

    object.label = label
    this.adjustLabelDirection()
    return label
  },

  createxyLabel(object, labelDiv, labelScale) {
    const label = new CSS3DObject(labelDiv)
    const box = this.setTopPositionWorld({
      object: label,
      baseObject: object,
    })
    if (this.camera.up.z) label.rotateZ(Math.PI / 2)
    let scale = box.geometry.boundingSphere.radius * 0.02
    scale *= labelScale ? labelScale : 1.0
    label.scale.set(scale, scale, scale)
    label.userData.type = 'xy'
    label.element.style['pointerEvents'] = 'none'
    label3DLayer.add(label)
    object.label = label
    this.adjustLabelDirection()
    return label
  },

  toggleObjectLabel(object) {
    if (object.label) {
      object.label.parent.remove(object.label)
      object.label = null
      return
    }
    const labelContent = object.userData.labelContent
    const labelScale = object.userData.labelScale || 1
    this.createShuiChuangLabel(object, labelContent, parseFloat(labelScale))
  },
  resetLabelBox() {
    this.labelBox.label = null
    this.labelBox.visible = false
    if (this.labelBox.parent) this.labelBox.parent.remove(this.labelBox)
  },
  adjustLabelDirection() {
    monintor3DLabelLayer.children.forEach(label => {
      if (label.userData.type === 'monintorLabel3d') {
        label.rotation.set(0, 0, 0)
        label.rotateX(Math.PI / 2)
        const face = new THREE.Vector3(0, -1, 0)
        const pos = label.position.clone()
        const dir = this.camera.position.clone().sub(pos)
        dir.z = 0
        dir.normalize()
        let angle = face.clone().angleTo(dir)
        const cross = face.clone().cross(dir)
        angle *= cross.z > 0 ? 1 : -1
        label.rotateY(angle)
      }
    })

    label3DLayer.children.forEach(label => {
      if (label.userData.type === 'label3d') {
        label.rotation.set(0, 0, 0)
        label.rotateX(Math.PI / 2)
        const face = new THREE.Vector3(0, -1, 0)
        const pos = label.position.clone()
        const dir = this.camera.position.clone().sub(pos)
        dir.z = 0
        dir.normalize()
        let angle = face.clone().angleTo(dir)
        const cross = face.clone().cross(dir)
        angle *= cross.z > 0 ? 1 : -1
        label.rotateY(angle)
      }
    })
  },
  changeLabelContent() {
    this.changeLabelContentIndex++
    if (this.changeLabelContentIndex < 60) return
    this.root.traverse(mesh => {
      if (mesh.userData.name === '压力表') {
        const label = mesh.children[mesh.children.length - 1]
        if (!label || !label.element) return
        const texts = label.element.children[0].children
        if (texts.length !== 4) return
        texts[1].innerText =
          '压力: ' + (Math.random() * 6.0).toFixed(2) + ' MPa'
        texts[2].innerText = '温度: ' + (Math.random() * 35.0).toFixed(2) + ' ℃'
        texts[3].innerText =
          '流量: ' + (Math.random() * 15.0).toFixed(2) + ' m/s'
      }
    })
    this.changeLabelContentIndex = 0
  },
}
