import * as THREE from 'three'
import events from '../enum/events'
const mouseDown = new THREE.Vector2()
/**
 * @module
 * @description 该模块内容将通过 Object.assign 方法合并入 ThreeContainer
 * @see ThreeContainer
 * @todo 对 this.controls 的引用待解决
 */

let keyDownHandler
let mouseDownHandler
let mouseUpHandler
let mouseMoveHandler
let mouseEndHandler
let oldClickObj = null
export default {
	initInteractive() {
		keyDownHandler = this.onKeyDown.bind(this)
		window.addEventListener('keydown', keyDownHandler)

		mouseDownHandler = this.onMouseDown.bind(this)
		this.container.addEventListener('mousedown', mouseDownHandler)
		mouseUpHandler = this.onMouseUp.bind(this)
		this.container.addEventListener('mouseup', mouseUpHandler)
		mouseMoveHandler = this.onMouseMove.bind(this)
		this.container.addEventListener('mousemove', mouseMoveHandler)

		mouseEndHandler = this.onMouseEnd.bind(this)
		this.controls.addEventListener('end', mouseEndHandler)
	},

	removeInteractive() {
		window.removeEventListener('keydown', keyDownHandler)
		this.container.removeEventListener('mousedown', mouseDownHandler)
		this.container.removeEventListener('mouseup', mouseUpHandler)
		this.container.removeEventListener('mousemove', mouseMoveHandler)
		this.controls.removeEventListener('end', mouseEndHandler)
	},
	onMouseEnd() {
		// 章山第二建筑
		const origin = new THREE.Vector3(0, 0, 0)
		// const origin1 = new THREE.Vector3(-1462.27, 3497.67, 1856.81);
		// const origin2 = new THREE.Vector3(-2092.25, -323.496, 1856.81);
		// const origin3 = new THREE.Vector3(-1796.53, -3655.59, 1819.35);
		const distance = origin.distanceTo(this.camera.position)

		this.judgeDistance(distance, 'architecture1ZS-processed')
		this.judgeDistance(distance, 'architecture2ZS-processed')
		this.judgeDistance(distance, 'column')
		// this.judgeDistance(origin3, 'architecture3ZS');
	},

	// 判断距离
	judgeDistance(distance, key) {
		// console.log(this.getViewAngle())
		// 获取模型group
		const loadLayer = this.getLayer('load', this.root)
		// 获取相应模型名称的group
		const architectureLayer = this.getLayer(key, loadLayer)
		const closeArr = this.getLayer('shuixiang2ZSGY', loadLayer)

		if (!architectureLayer || !architectureLayer.children[0]) {
			return
		}

		let om = architectureLayer.children[0].children[0].material

		if (distance < 8000) {
			this.setLabelScale(6)

			// 判断呼吸灯，如果存在且存在一个模型则添加内部模型
			if (this.outlinePass && this.outlinePass.selectedObjects.length === 1) {
				this.outlinePass.selectedObjects.push(closeArr.children[0].children[0])
			}

			om.transparent = true
			om.opacity = 0.0
			architectureLayer.children[0].children[0].visible = false
		} else if (distance < 10000 && distance > 8000) {
			om.transparent = true
			om.opacity = 0.1
			architectureLayer.children[0].children[0].visible = true
		} else {
			this.setLabelScale(10)
			om.transparent = true
			om.opacity = 1.0
			architectureLayer.children[0].children[0].visible = true
		}
	},

	setLabelScale(scale) {
		let labelObj = this.getLayer('label3d', this.scene)
		labelObj.children.forEach(label => {
			if (
				label.userData.key === 'shuixiang2ZSGY' ||
				label.userData.key === 'shuixiang1ZSGY' ||
				label.userData.key === 'guandao5ZSGY'
			) {
				label.scale.set(scale, scale, scale)
			}
		})
	},

	onKeyDown(event) {
		if (this.transformControls) {
			switch (event.keyCode) {
				case 87:
					this.transformControls.setMode('translate')
					break
				case 69:
					this.transformControls.setMode('rotate')
					break
				case 82:
					this.transformControls.setMode('scale')
					break
				case 88:
					this.transformControls.showX = !this.transformControls.showX
					break
				case 89:
					this.transformControls.showY = !this.transformControls.showY
					break
				case 90:
					this.transformControls.showZ = !this.transformControls.showZ
					break
				default:
					break
			}
		}
	},

	onMouseDown(event) {
		this.defaultRotate = false
		this.mouseDown = true
		if (event.button === 0) {
			// 左键
			// mouseDown.x =
			//     ((event.clientX - this.container.getBoundingClientRect().left) /
			//         this.container.offsetWidth) *
			//     2 -
			//     1;
			// mouseDown.y =
			//     -(
			//         (event.clientY -
			//             this.container.getBoundingClientRect().top) /
			//         this.container.offsetHeight
			//     ) *
			//     2 +
			//     1;
			this.container.getBoundingClientRect()
		}
		// if (this.transformControls && event.button === 2) {
		//     this.resetLabelBox();
		//     this.stopTransform();
		// }
	},

	onMouseUp(event) {
		this.mouseDown = false
		this.controls.enableRotate = true
		// 确保点击在模型上或模型窗口中
		// if (event.target.offsetHeight !== this.container.clientHeight) return;

		const mouse = new THREE.Vector2()
		mouse.x = ((event.clientX - this.container.getBoundingClientRect().left) / this.container.offsetWidth) * 2 - 1
		mouse.y = -((event.clientY - this.container.getBoundingClientRect().top) / this.container.offsetHeight) * 2 + 1

		if (Math.abs(mouse.x - mouseDown.x) >= 0.002 || Math.abs(mouse.y - mouseDown.y) >= 0.002) {
			this.emit(events.mouseup)
			return
		}
		this.click(mouse)
	},

	click(mouse) {
		const raycaster = new THREE.Raycaster()

		raycaster.setFromCamera(mouse, this.camera)
		const intersects = raycaster.intersectObjects(this.scene.children, true)
		if (intersects.length === 0) {
			//调试的时候用
			// if (this.debugModalInfo && this.debugModalInfo.debug) {
			//     const axes = new THREE.AxesHelper(1000);
			//     this.scene.add(axes);
			// }
			if (oldClickObj) {
				this.recoveryColor([oldClickObj])
				this.recoveryOpacity([oldClickObj])
			}
			oldClickObj = null
			this.setConcentration(this.root.children)
			this.flyTo({
				factor: 1.0,
				keepDirection: true,
			})
			return
		}
		const { object } = intersects[0]
		//调试的时候用
		// if (this.debugModalInfo && this.debugModalInfo.debug) {
		//     this.initTransformControls(object);
		//     const axes = new THREE.AxesHelper(1000);
		//     this.scene.add(axes);
		// }
		this.setConcentration([object])
		this.flyTo({
			factor: 6,
			keepDirection: false,
		})
		const loadObj = this.getLoadObj(object)
		if (!loadObj.userData.load) return
		if (loadObj.userData.showLabelType === 2) this.toggleObjectLabel(loadObj)
		if (oldClickObj === loadObj) return
		if (loadObj.userData.clickColor) {
			this.changeColor([loadObj], new THREE.Color(loadObj.userData.clickColor))
		}
		if (loadObj.userData.clickOpacity) {
			this.changeOpacity([loadObj], parseFloat(loadObj.userData.clickOpacity))
		}
		if (oldClickObj) {
			this.recoveryColor([oldClickObj])
			this.recoveryOpacity([oldClickObj])
		}
		oldClickObj = loadObj
	},

	onMouseMove(event) {
		const mouse = new THREE.Vector2()
		mouse.x = ((event.clientX - this.container.getBoundingClientRect().left) / this.container.offsetWidth) * 2 - 1
		mouse.y = -((event.clientY - this.container.getBoundingClientRect().top) / this.container.offsetHeight) * 2 + 1

		if (this.mouseDown && event.button === 0) {
			// 左键
			this.emit(events.mousemove, mouse)
			return
		}
		// this.clickEdges(mouse);
	},
	clickEdges(mouse) {
		const loadLayer = this.getLayer('load', this.root)
		if (loadLayer.userData.renderType !== 'edges') return
		const raycaster = new THREE.Raycaster()
		raycaster.setFromCamera(mouse, this.camera)
		const intersects = raycaster.intersectObjects(loadLayer.children, true)
		if (intersects.length === 0) {
			if (oldClickObj) this.recoveryColor([oldClickObj])
			oldClickObj = null
			return
		}
		const { object } = intersects[0]
		const loadObj = this.getLoadObj(object)
		if (!loadObj || oldClickObj === loadObj) return
		this.changeColor([loadObj], new THREE.Color(0.898039, 0.752941, 0.10588))
		this.changeColor(
			[loadObj.children[loadObj.children.length - 1]],
			new THREE.Color(0.99215686, 0.886274, 0.0862745),
		)
		if (oldClickObj) this.recoveryColor([oldClickObj])
		oldClickObj = loadObj
	},
}
