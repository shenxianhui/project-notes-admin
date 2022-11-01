import * as THREE from 'three'
/**
 * @module
 * @description 该模块内容将通过 Object.assign 方法合并入 ThreeContainer<br>
 * @see ThreeContainer
 */
let oldInfo
export default {
  /**
   * @summary 设置编辑状态
   * @param {boolean} enable 是否开启编辑状态
   * @private
   */
  enableEdit({ enable = true }) {
    this.edit = enable
  },
  getInfo(object, type) {
    const info = {
      id: object.userData.id,
      position: object.position.clone(),
      rotation: object.rotation.clone(),
      scale: new THREE.Vector3(
        object.scale.x * 0.01,
        object.scale.y * 0.01,
        object.scale.z * 0.01,
      ),
      type,
    }
    return info
  },
  setInfo(object, info) {
    const { position, rotation, scale } = info
    if (position) object.position.set(position.x, position.y, position.z)
    if (rotation) object.rotation.set(rotation.x, rotation.y, rotation.z)
    if (scale) object.scale.set(scale.x * 100, scale.y * 100, scale.z * 100)
    object.updateMatrix()
    object.updateMatrixWorld()
  },
  resetInfo() {
    if (oldInfo) {
      if (oldInfo.type === 'label') {
        this.setLabelInfo(oldInfo)
      } else {
        this.setObjInfo(oldInfo)
      }
    }
  },
  /**
   * 根据id设置物体位置
   * @public
   */
  setObjInfo(param) {
    let object
    if (param.id) object = this.getObjById(param.id)
    else {
      const obj = this.concentration[0]
      object = this.getLoadObj(obj)
    }
    if (object.userData.load) {
      this.setInfo(object, param)
    }
  },
  /**
   * 根据id设置物体编辑状态
   * @param {String} id 物体id
   * @public
   */
  editObj({ id }) {
    let object
    if (id) object = this.getObjById(id)
    else {
      const obj = this.concentration[0]
      object = this.getLoadObj(obj)
    }
    if (!object) return
    oldInfo = this.getInfo(object, 'object')
    this.initTransformControls(object)
  },
  /**
   * 根据id设获得状态并且退出物体编辑状态
   * @param {String} id 物体id
   * @public
   */
  getObjInfo({ id }) {
    let object
    if (id) object = this.getObjById(id)
    else {
      const obj = this.concentration[0]
      object = this.getLoadObj(obj)
    }
    const info = this.getInfo(object, 'object')
    this.exitEdit()
    return info
  },
  /**
   * 根据id生成标签
   * @param {String} id 物体id
   * @param {Json} data 标签内容
   * @public
   */
  createLabel({ id }) {
    let object
    if (id) object = this.getObjById(id)
    else {
      const obj = this.concentration[0]
      object = this.getLoadObj(obj)
    }
    if (object.userData.load) {
      object.add(this.createShuiChuangLabel(object))
    }
  },
  /**
   * 根据id设置标签信息
   * @public
   */
  setLabelInfo(param) {
    const facilityLayer = this.getLayer('facility', this.root)
    const label = this.getObjById(param.id, [facilityLayer])
    if (!label) {
      console.log('未找到该标签，请检查标签id')
      return
    }
    this.setInfo(label, param)
    if (this.labelBox.visible) this.setInfo(this.labelBox, param)
  },
  /**
   * 根据id设置标签编辑状态
   * @param {String} id 标签id
   * @public
   */
  editLabel({ id }) {
    const facilityLayer = this.getLayer('facility', this.root)
    const label = this.getObjById(id, [facilityLayer])
    if (!label) {
      console.log('未找到该标签，请检查标签id')
      return
    }
    label.updateMatrix()
    label.updateMatrixWorld()
    label.parent.add(this.labelBox)
    this.labelBox.matrix.copy(label.matrix)
    this.labelBox.matrixWorld.copy(label.matrixWorld)
    this.labelBox.label = label
    this.labelBox.visible = true
    this.labelBox.position.copy(label.position)
    this.labelBox.rotation.copy(label.rotation)
    this.labelBox.scale.copy(label.scale)
    oldInfo = this.getInfo(label, 'label')
    this.initTransformControls(this.labelBox)
  },
  /**
   * 根据id设获得状态并且退出标签编辑状态
   * @param {String} id 标签id
   * @public
   */
  getLabelInfo({ id }) {
    const facilityLayer = this.getLayer('facility', this.root)
    const label = this.getObjById(id, [facilityLayer])
    if (!label) {
      console.log('未找到该标签，请检查标签id')
      return
    }
    const info = this.getInfo(label, 'label')
    this.exitEdit()
    return info
  },
  /**
   * 退出编辑状态
   * @public
   */
  exitEdit() {
    this.resetLabelBox()
    this.stopTransform()
  },
}
