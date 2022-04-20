import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
let flyTween = null,
	opTween = null
/**
 * @module
 * @description 该模块内容将通过 Object.assign 方法合并入 ThreeContainer和MapContainer
 * @see ThreeContainer
 */

export default {
	/**
	 * 初始化root
	 */
	initRoot() {
		this.box = null
		this.mouseDown = null
		this.defaultRotate = false
		this.root = new THREE.Group()
		this.scene.add(this.root)
		this.concentration = [this.scene]
	},
	removeRoot() {
		this.disposeObject(this.scene)
		for (let i = this.scene.children.length - 1; i >= 0; i--) {
			if (this.scene.children[i] instanceof THREE.Group) {
				this.scene.remove(this.scene.children[i])
			}
		}
	},
	/**
	 * 设置concentration
	 * @param {Array Object3D} meshes 所要设置聚焦的物体
	 */
	setConcentration(meshes = [this.root]) {
		this.concentration = meshes
	},

	/**
	 * 从场景中清理物体
	 * @param {object} object 待清理物体
	 * @param {Object3D} parent 父物体，未定义则是指 scene
	 */
	remove(object, parent = this.scene) {
		parent.remove(object)
		this.dispose(object)
	},
	/**
	 * @description 清理模型
	 * @param {THREE.Group} group 待清理
	 */
	disposeObject(group = this.scene) {
		for (let i = group.children.length - 1; i > 0; i--) {
			const groupi = group.children[i]
			groupi.traverse(child => {
				if (child.geometry) child.geometry.dispose()
				if (child.material) {
					if (child.material instanceof Array) {
						child.material.forEach(m => {
							m.dispose()
						})
					} else {
						child.material.dispose()
					}
				}
			})
			group.remove(groupi)
		}
	},

	/**
	 * 删除某个类型的物体
	 * @param {string} type 物体类型，在 userData.type 中定义
	 * @param {Object3D} parent 父物体，未定义则是指 scene
	 * @private
	 */
	removeType(type, parent = this.scene) {
		for (let i = parent.children.length - 1; i >= 0; i--) {
			if (parent.children[i].userData.type === type) {
				parent.remove(parent.children[i])
			}
		}
	},
	/**
	 * 清理制定图层
	 * @param {String} type 图层名
	 * @param {Object3D} parent 父物体，未定义则是指 scene
	 */
	clearLayer(type, parent = this.scene) {
		const layer = this.getLayer(type, parent)
		for (let i = layer.children.length - 1; i >= 0; i--) {
			if (layer.children[i].userData.type === type) {
				layer.remove(layer.children[i])
			}
		}
	},
	/**
	 * 查找添加某个类型的物体
	 * @param {string} type 图层名 userData.type 中定义
	 * @param {Object3D} parent 父物体，未定义则是指 scene
	 * @private
	 */
	getLayer(type, parent = this.scene) {
		let layer = null
		parent.children.forEach(child => {
			if (child.userData.type === type) {
				layer = child
			}
		})
		if (!layer) {
			layer = new THREE.Group()
			layer.userData.type = type
			parent.add(layer)
		}
		return layer
	},
	/**
	 * 设置物体与其子元素的visible
	 * @param {Object3D} object 所要设置visible的物体
	 * @param {boolean} visible visible
	 * @private
	 */
	setVisible(object, visible) {
		object.visible = visible
		object.traverse(child => {
			child.visible = visible
		})
		if (visible) {
			object.traverseAncestors(o => {
				o.visible = true
			})
		}
	},
	/**
	 * 查找父元素中是被外部加载进来的节点物体
	 * @param {Object} obj 子物体
	 * @private
	 */
	getLoadObj(obj) {
		let parent = obj
		while (parent && parent.type !== 'Scene' && !parent.userData.load) {
			parent = parent.parent
		}
		if (parent.type === 'Scene') {
			return obj
		}
		return parent
	},
	/**
	 * 根据id查找物体
	 * @param {String} 物体id
	 * @param {Group} parent 父物体，未定义则是指 root
	 * @private
	 */
	getObjById(id, parent = [this.root]) {
		let obj = null
		const strId = String(id)
		parent.forEach(group => {
			group.traverse(child => {
				const cid = String(child.userData.id)
				if (cid === strId) {
					obj = child
				}
			})
		})
		return obj
	},
	/**
	 * 查找某个name的物体,返回一个数组
	 * @param {string} name mesh的userData名称 userData.name 中定义
	 * @param {Group} parent 父物体，未定义则是指 scene
	 * @private
	 */
	getObjsByName(names, parent = [this.root], isEqual = false) {
		const objects = []
		if (!names || !names.length) {
			return objects
		} else {
			parent.forEach(group => {
				group.traverse(child => {
					if (child.name) {
						names.forEach(name => {
							if (isEqual ? child.name === name : child.name.includes(name)) {
								objects.push(child)
							}
						})
					}
				})
			})
			return objects
		}
	},

	/**
	 * 改变指定物体不透明度
	 * @param {Object3D} objects 指定物体的name
	 * @param {Group} opacity 不透明度
	 * @private
	 */
	changeOpacity(objects, opacity) {
		objects.forEach(object => {
			object.traverse(obj => {
				const om = obj.material
				if (om) {
					if (om instanceof Array) {
						om.forEach(m => {
							if (!m.oldTransparent) m.oldTransparent = m.transparent
							if (!m.oldOpacity) m.oldOpacity = m.opacity
							m.transparent = true
							m.opacity = opacity
						})
					} else {
						if (!om.oldTransparent) om.oldTransparent = om.transparent
						if (!om.oldOpacity) om.oldOpacity = om.opacity
						om.transparent = true
						om.opacity = opacity
					}
				}
			})
		})
	},
	/**
	 * 改变所有物体不透明度
	 * @param {Group} opacity 不透明度
	 * @private
	 */
	changeOpacityAll(opacity) {
		this.scene.traverse(obj => {
			const om = obj.material
			if (om) {
				if (om instanceof Array) {
					om.forEach(m => {
						if (!m.oldTransparent) m.oldTransparent = m.transparent
						if (!m.oldOpacity) m.oldOpacity = m.opacity
						m.transparent = true
						m.opacity = opacity
						m.depthWrite = false
					})
				} else {
					if (!om.oldTransparent) om.oldTransparent = om.transparent
					if (!om.oldOpacity) om.oldOpacity = om.opacity
					om.transparent = true
					om.opacity = opacity
					om.depthWrite = false
				}
			}
		})
	},
	/**
	 * 改变所有物体不透明度
	 * @param {Group} opacity 不透明度
	 * @private
	 */
	recoveryOpacity(objects = [this.scene]) {
		objects.forEach(object => {
			object.traverse(obj => {
				const om = obj.material
				if (om) {
					if (om instanceof Array) {
						om.forEach(m => {
							if (m.oldTransparent) {
								m.transparent = m.oldTransparent
								m.oldTransparent = null
							}
							if (m.oldOpacity) {
								m.opacity = m.oldOpacity
								m.oldOpacity = null
							}
							m.depthWrite = true
						})
					} else {
						if (om.oldTransparent) {
							om.transparent = om.oldTransparent
							om.oldTransparent = null
						}
						if (om.oldOpacity) {
							om.opacity = om.oldOpacity
							om.oldOpacity = null
						}
						om.depthWrite = true
					}
				}
			})
		})
	},
	emissiveColor(objects, color) {
		objects.forEach(object => {
			object.traverse(obj => {
				let im = obj.material
				let newM
				if (im) {
					if (im.length) {
						newM = []
						im.forEach(m => {
							const cm = m.clone()
							cm.emissive = color ? color : m.color
							cm.emissiveIntensity = 0.4
							newM.push(cm)
						})
					} else {
						newM = im.clone()
						newM.emissive = color ? color : im.color
						newM.emissiveIntensity = 0.4
					}
				}
				obj.material = newM
			})
		})
	},
	recoveryEmissive(objects) {
		objects.forEach(object => {
			object.traverse(obj => {
				let im = obj.material
				if (im) {
					if (im.length) {
						im.forEach(m => {
							m.emissive = new THREE.Color(0, 0, 0)
						})
					} else {
						im.emissive = new THREE.Color(0, 0, 0)
					}
				}
			})
		})
	},

	changeColorSure(objects, color) {
		if (!color) return
		objects.forEach(object => {
			object.traverse(obj => {
				let im = obj.material
				let newM
				if (im) {
					if (im.length) {
						newM = []
						im.forEach(m => {
							const cm = m.clone()
							cm.color = color
							newM.push(cm)
						})
					} else {
						newM = im.clone()
						newM.color = color
					}
				}
				obj.material = newM
			})
		})
	},

	changeColor(objects, color) {
		if (!color) return
		objects.forEach(object => {
			object.traverse(obj => {
				let im = obj.material
				let newM
				if (im) {
					if (im.length) {
						newM = []
						im.forEach(m => {
							const cm = m.clone()
							cm.oldColor = m.oldColor
							if (!cm.oldColor) cm.oldColor = cm.color
							cm.color = color
							newM.push(cm)
						})
					} else {
						newM = im.clone()
						newM.oldColor = im.oldColor
						if (!newM.oldColor) newM.oldColor = newM.color
						newM.color = color
					}
				}
				obj.material = newM
			})
		})
	},

	/**
	 * 还原指定物体颜色
	 * @param {Object3D} objects 指定物体
	 * @param {THREE.Color} color 颜色
	 * @private
	 */
	recoveryColor(objects) {
		objects.forEach(object => {
			object.traverse(obj => {
				const om = obj.material
				if (om) {
					if (om instanceof Array) {
						om.forEach(m => {
							if (m.oldColor) m.color = m.oldColor
							m.oldColor = null
						})
					} else {
						if (om.oldColor) om.color = om.oldColor
						om.oldColor = null
					}
				}
			})
		})
	},

	switchColor(objects, color) {
		if (!color) return
		objects.forEach(object => {
			object.traverse(obj => {
				let im = obj.material
				let newM
				if (im) {
					if (im.length) {
						newM = []
						im.forEach(m => {
							if (m.oldColor) {
								m.color = m.oldColor
								m.oldColor = null
								newM.push(m)
							} else {
								const cm = m.clone()
								cm.oldColor = cm.color
								cm.color = color
								newM.push(cm)
							}
						})
					} else {
						if (im.oldColor) {
							im.color = im.oldColor
							im.oldColor = null
							newM = im.clone()
						} else {
							newM = im.clone()
							newM.oldColor = newM.color
							newM.color = color
						}
					}
				}
				obj.material = newM
			})
		})
	},

	toEdges(info) {
		const { object } = info
		object.userData.renderType = 'edges'
		object.traverse(mesh => {
			const geo = mesh.geometry
			const mtl = mesh.material
			let opacity = 0.96
			let lineColor = new THREE.Color(0.00189165608026, 0.72037833929062, 0.89999997615814)
			let faceColor = new THREE.Color(0, 0.50166666507721, 0.69999998807907)
			if (mtl && mtl.opacity && mtl.opacity !== 1.0 && mtl.specular) {
				opacity = mtl.opacity
				lineColor = mtl.specular.clone()
				faceColor = mtl.color.clone()
			}
			if (geo) {
				const edges = new THREE.EdgesGeometry(geo)
				const line = new THREE.LineSegments(
					edges,
					new THREE.LineBasicMaterial({
						color: lineColor,
						transparent: true,
						opacity: 0.5,
					}),
				)
				object.add(line)
			}
			if (mtl) {
				let oldMtl = null
				if (mtl.length > 1) {
					oldMtl = []
					mtl.forEach(m => {
						oldMtl.push(m.clone())
					})
				} else {
					oldMtl = mtl.clone()
				}
				mesh.material = new THREE.MeshBasicMaterial({
					color: faceColor,
					transparent: true,
					opacity,
					side: THREE.DoubleSide,
				})
				mesh.material.userData.oldMtl = oldMtl
			}
		})
	},

	recoveryEdges(info) {
		const { object } = info
		object.userData.renderType = ''
		object.traverse(mesh => {
			let mtl = mesh.material
			if (mtl && mtl.userData && mtl.userData.oldMtl) {
				let newM = null
				if (mtl.userData.oldMtl.length > 1) {
					newM = []
					mtl.userData.oldMtl.forEach(m => {
						newM.push(m.clone())
					})
				} else {
					newM = mtl.userData.oldMtl.clone()
				}
				mesh.material = newM
			}
			if (mesh instanceof THREE.LineSegments) {
				mesh.parent.remove(mesh)
			}
		})
	},

	/**
	 * 获取物体集合的中心点和半径
	 * @param {Object3D} objects 为数组，每个元素为object or group
	 */
	CalculationCenter(objects, factor = 3.0) {
		let p
		let distance
		const box = new THREE.Box3()
		let max = 0
		objects.forEach(object => {
			object.traverse(child => {
				if (child.geometry) {
					const scale = this.getWorldScale(child)
					const maxScale = Math.max(scale.x, Math.max(scale.y, scale.z))
					child.geometry.computeBoundingBox()
					if (child.geometry.boundingSphere) {
						p = child.geometry.boundingSphere.center.clone()
						p.applyMatrix4(child.matrixWorld)
						box.expandByPoint(new THREE.Vector3(p.x, p.y, p.z))
						distance = child.geometry.boundingSphere.radius * factor * maxScale
						if (distance > max) max = distance
					} else if (child.geometry.boundingBox) {
						const maxV = child.geometry.boundingBox.max
						const minV = child.geometry.boundingBox.min
						p = new THREE.Vector3((maxV.x + minV.x) / 2.0, (maxV.y + minV.y) / 2.0, (maxV.z + minV.z) / 2.0)
						p.applyMatrix4(child.matrixWorld)
						box.expandByPoint(p)
						distance = maxV.distanceTo(minV) * 0.5 * factor * maxScale
						if (distance > max) max = distance
					}
				}
			})
		})
		const center = box.getCenter(new THREE.Vector3())
		const sphere = new THREE.Sphere()
		box.getBoundingSphere(sphere)
		max += sphere.radius
		return { center, max }
	},

	/**
	 * 聚焦当前物体
	 * @param {boolean} hide 是否隐藏其他物体，默认为true
	 * @param {boolean} keepDirection 是否保持(1,1,1)默认方向，默认为false
	 * @param {number} factor 相机聚焦距离缩放比例，默认为3.0
	 */
	concentration({ keepDirection = false, factor = 3.0 }) {
		if (!this.concentration || !this.concentration.length) {
			this.concentration.push(this.root)
		}
		const { center, max } = this.CalculationCenter(this.concentration, factor)
		let direction = new THREE.Vector3(1, 1, 1).normalize()
		if (!keepDirection) {
			direction = this.camera.position.sub(center).normalize()
		}
		this.camera.position.copy(
			new THREE.Vector3(center.x + direction.x * max, center.y + direction.y * max, center.z + direction.z * max),
		)
		this.focusControls(new THREE.Vector3(center.x, center.y, center.z))
		this.render()
	},

	/**
	 * 设置悬浮于指定物体正上方位置
	 * @param {object} object 悬浮物体
	 * @param {object} baseObject 指定物体
	 * @private
	 * */
	setTopPosition(params) {
		const { object, baseObject, point } = params
		const box = new THREE.BoxHelper(baseObject)
		// this.scene.add(box)
		box.update()
		box.geometry.computeBoundingBox()
		if (!box.geometry.boundingSphere || !box.geometry.boundingBox) return
		const { x, y, z } = box.geometry.boundingSphere.center
		const boundingBox = box.geometry.boundingBox
		let newx = x
		let newy = y
		let newz = z
		if (point) {
			newx = point.x
			newy = point.y
			newz = point.z
		}
		if (this.camera.up.y && !this.map) newy = boundingBox.max.y
		else newz = boundingBox.max.z
		object.position.set(newx, newy, newz)
		return box
	},

	getWorldScale(object) {
		let scale = object.scale.clone()
		object.traverseAncestors(o => {
			scale.multiply(o.scale)
		})
		return scale
	},

	setTopPositionLocal(params) {
		const { object, baseObject } = params
		const scale = this.getWorldScale(baseObject)
		const box = new THREE.BoxHelper(baseObject)
		box.update()
		box.geometry.computeBoundingBox()
		if (!box.geometry.boundingSphere || !box.geometry.boundingBox) return
		const boundingBox = box.geometry.boundingBox
		if (this.camera.up.z) object.position.set(0, 0, (boundingBox.max.z - boundingBox.min.z) / scale.z)
		if (this.camera.up.y) object.position.set(0, (boundingBox.max.y - boundingBox.min.y) / scale.y, 0)
		return box
	},

	setTopPositionWorld(params) {
		const { object, baseObject } = params
		const box = new THREE.BoxHelper(baseObject)
		box.update()
		box.geometry.computeBoundingBox()
		if (!box.geometry.boundingBox) return
		const boundingBox = box.geometry.boundingBox
		object.position.set(0, 0, boundingBox.max.x - boundingBox.min.x).applyMatrix4(baseObject.matrixWorld)
		return box
	},

	/**
	 * 相机定位动画
	 * @param {object} params 相机参数
	 * @private
	 * */
	flyToTween({ start, end, time, onComplete }) {
		// console.log(end);
		const self = this
		if (flyTween) flyTween.stop()
		this.defaultRender = true
		flyTween = new TWEEN.Tween(start)
			.to(end, time)
			.easing(TWEEN.Easing.Sinusoidal.InOut)
			.onUpdate(() => {
				const location = {
					position: new THREE.Vector3(start.posx, start.posy, start.posz),
					target: new THREE.Vector3(start.tx, start.ty, start.tz),
					up: this.camera.up,
				}
				this.setViewAngle(location)
			})
			.onComplete(() => {
				if (onComplete) onComplete()
				self.defaultRender = false
			})
		flyTween.start()
	},

	/**
	 * 相机定位动画飞向指定物体
	 * @param {object} params 相机参数
	 * @private
	 * */
	flyTo(params) {
		let { startPosition, startTarget, endPosition, endTarget, time, onComplete } = params
		if (!startPosition || !startTarget) {
			startPosition = this.getViewAngle().position
			startTarget = this.getViewAngle().target
		}
		const start = {
			posx: startPosition.x - 0,
			posy: startPosition.y - 0,
			posz: startPosition.z - 0,
			tx: startTarget.x - 0,
			ty: startTarget.y - 0,
			tz: startTarget.z - 0,
		}

		if (!endPosition || !endTarget) {
			const factor = params.factor || 1
			const { center, max } = this.CalculationCenter(this.concentration, factor)
			let direction = new THREE.Vector3(1, 1, 1).normalize()
			if (!params.keepDirection) {
				direction = this.camera.position.sub(center).normalize()
			}
			endPosition = new THREE.Vector3(
				center.x + max * direction.x,
				center.y + max * direction.y,
				center.z + max * direction.z,
			)
			endTarget = center.clone()
		}
		const end = {
			posx: endPosition.x - 0,
			posy: endPosition.y - 0,
			posz: endPosition.z - 0,
			tx: endTarget.x - 0,
			ty: endTarget.y - 0,
			tz: endTarget.z - 0,
		}

		if (!time) {
			const startPos = new THREE.Vector3(startPosition.x, startPosition.y, startPosition.z)
			const endPos = new THREE.Vector3(endPosition.x, endPosition.y, endPosition.z)
			const d = endPos.distanceTo(startPos) * 4.0
			time = d > 2000 ? 2000 : d
		}
		this.flyToTween({ start, end, time, onComplete })
	},

	/**
	 * 物体透明度动画
	 * @param {object} params 物体参数
	 * @private
	 * */
	opacityTween({
		objects = this.concentration,
		start = { opacity: 0.0 },
		end = { opacity: 1.0 },
		time = 2000,
		onComplete,
	}) {
		if (opTween) opTween.stop()
		this.defaultRotate = false
		opTween = new TWEEN.Tween(start)
			.to(end, time)
			.easing(TWEEN.Easing.Linear.None)
			.onUpdate(() => {
				this.changeOpacity(objects, start.opacity)
			})
			.onComplete(() => {
				if (onComplete) onComplete()
			})
		opTween.start()
	},

	createLine({ points, color }) {
		const material = new THREE.LineBasicMaterial({
			color: color || 0xffffff,
		})
		const geometry = new THREE.BufferGeometry().setFromPoints(points)
		let line = new THREE.Line(geometry, material)
		return line
	},
	createBox({ x = 1, y = 1, z = 1, posx = 0, posy = 0, posz = 0, color }) {
		const geometry = new THREE.BoxBufferGeometry(x, y, z)
		const material = new THREE.MeshBasicMaterial({
			color: color || 0xffffff,
		})
		let cube = new THREE.Mesh(geometry, material)
		cube.position.set(posx, posy, posz)
		return cube
	},
	getStrLen(str) {
		var realLength = 0
		for (var i = 0; i < str.length; i++) {
			const charCode = str.charCodeAt(i)
			if (charCode >= 0 && charCode <= 128) realLength += 1
			else realLength += 2
		}
		return realLength
	},
}
