import * as THREE from 'three'
/**
 * @module
 * @description 该模块内容将通过 Object.assign 方法合并入 ThreeContainer和MapContainer
 * @see ThreeContainer
 */

export default {
  /**
   * 计算物体BoundingBox
   * @param {Object3D} object 物体，未定义则是指 scene
   * @return {THREE.Box3} 中心点
   * @private
   */
  calcObjectsBox(objects = [this.scene]) {
    const box = new THREE.Box3()
    box.makeEmpty()
    objects.forEach(object => {
      object.traverse(child => {
        if (child.geometry) {
          box.expandByObject(child)
        }
      })
    })
    return box
  },

  /**
   * 获取 BoundingBox 中心点
   * @param {THREE.Box3} box boundingBox
   * @return {THREE.Vector3} 中心点
   * @private
   */
  getBoxCenter(box) {
    const center = new THREE.Vector3()
    box.getCenter(center)
    return center
  },

  /**
   * 获取 BoundingBox 尺寸
   * @param {THREE.Box3} box boundingBox
   * @return {THREE.Vector3} 尺寸
   * @private
   */
  getBoxSize(box) {
    const size = new THREE.Vector3()
    box.getSize(size)
    return size
  },

  /**
   * 获取 BoundingSphere 的半径
   * @param {THREE.Box3} box boundingBox
   * @return {Number} 半径
   * @private
   */
  getBoxRadius(box) {
    const sphere = new THREE.Sphere()
    box.getBoundingSphere(sphere)
    return sphere.radius
  },

  /**
   * 获取 box 的最长轴
   * @param {THREE.Box3} box boundingBox
   * @return {THREE.Vector3} 最长轴
   * @private
   */
  getBoxMaxAxes(box) {
    const max = box.max
    const min = box.min
    const x = max.x - min.x
    const y = max.y - min.y
    const z = max.z - min.z
    if (x > y && x > z) return new THREE.Vector3(1, 0, 0)
    if (y > x && y > z) return new THREE.Vector3(0, 1, 0)
    if (z > x && z > y) return new THREE.Vector3(0, 0, 1)
  },
}
