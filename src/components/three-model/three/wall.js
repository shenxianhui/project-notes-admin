import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'

export default {
	//   name: "Index",
	//   data() {
	//     return {
	//       scene: "",
	//       light: "",
	//       camera: "",
	//       controls: "",
	//       renderer: "",
	//       composer: null,
	//     outlinePass: null,
	//     renderPass: null,
	//       clickObjects:[],
	//       OrbitControlState: false,
	//       OrbitControlChangeState: false,
	//       // 存储已选中模型、挂牌、指示箭头和颜色
	//       select: {
	//         object: null, // 选中的模型
	//         selectedColor: 'red', // 选中的模型的颜色
	//         arrowColor: 'rgba(70, 160, 255, 1)', // 选中的模型指示箭头颜色
	//         originColor: null, // 选中的模型原本的的颜色
	//         arrow: null, // 选中的模型指示箭头
	//         sprite: null // 选中的模型挂牌
	//       }
	//     };
	//   },
	//   methods: {
	// 初始化three.js相关内容
	init() {
		this.scene = new THREE.Scene()
		this.scene.add(new THREE.AmbientLight(0x999999)) // 环境光
		this.light = new THREE.DirectionalLight(0xdfebff, 0.45) // 从正上方（不是位置）照射过来的平行光，0.45的强度
		this.light.position.set(50, 200, 100)
		this.light.position.multiplyScalar(0.3)
		// 光源开启阴影
		this.light.castShadow = true
		this.light.shadow.mapSize = new THREE.Vector2(1024, 1024)
		this.scene.add(this.light)
		// 初始化相机
		this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 10000000)
		this.camera.position.set(731, 416, 16)
		this.camera.lookAt(this.scene.position)
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
		this.renderer.setPixelRatio(window.devicePixelRatio) // 为了兼容高清屏幕
		this.renderer.setSize(window.innerWidth, window.innerHeight) // 改成这样就可以居中
		this.renderer.shadowMap.enabled = true
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
		const container = document.querySelector('.container') // threeJS挂载位置
		container.appendChild(this.renderer.domElement)
		window.addEventListener('resize', this.onWindowResize, false) // 添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
		// 初始化控制器
		this.controls = new OrbitControls(this.camera, this.renderer.domElement)
		this.controls.target.set(0, 0, 0) // ------------------
		this.controls.maxPolarAngle = Math.PI / 2
		this.controls.update()

		this.controls.addEventListener('start', this.startOrbitContorlHandler)
		this.controls.addEventListener('end', this.endOrbitContorlHandler)
		this.controls.addEventListener('change', this.changeOrbitContorlHandler)
	},
	// 窗口监听函数
	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(window.innerWidth, window.innerHeight)
	},
	render() {
		//用效果合成器渲染
		requestAnimationFrame(this.render)
		this.renderer.render(this.scene, this.camera)
		if (this.composer) {
			this.composer.render()
		}
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
		this.outlinePass.edgeThickness = 1.0 // 边框宽度
		this.outlinePass.downSampleRatio = 1 // 边框弯曲度
		this.outlinePass.pulsePeriod = 5 // 呼吸闪烁的速度
		this.outlinePass.visibleEdgeColor.set(parseInt(0x00ff00)) // 呼吸显示的颜色
		this.outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0) // 呼吸消失的颜色
		this.outlinePass.clear = true
		this.composer.addPass(this.outlinePass)
		// 自定义的着色器通道 作为参数
		var effectFXAA = new ShaderPass(FXAAShader)
		effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight)
		effectFXAA.renderToScreen = true
		this.composer.addPass(effectFXAA)
	},
	// 外部模型加载函数
	loadGltf() {
		const that = this
		// 加载模型
		var loader = new GLTFLoader()
		//    loader.setPath('GLTF/')
		loader.load('/model-file/detail/bengfang.glb', function (gltf) {
			// 就是两个模型 这个是动态的,下面是静态的,这些从sketchfab上面下载即可
			gltf.scene.traverse(object => {
				if (object.isMesh) {
					// 修改模型的材质
					object.castShadow = true
					object.receiveShadow = true
				}
			})
			gltf.scene.receiveShadow = true
			//旋转--调整模型角度，以达到最好观看效果
			gltf.scene.rotateY(Math.PI)
			that.scene.add(gltf.scene)
		})
	},
	addGeometry() {
		const size = 10000
		// const divisions = 100

		// const gridHelper = new THREE.GridHelper(size, divisions, '#000', '#999')
		//this.scene.add( gridHelper )

		const floorGeometry = new THREE.PlaneGeometry(size, size, 50, 50)
		const floorMaterial = new THREE.MeshPhongMaterial({
			color: 0x77028f,
			shininess: 0,
			// wireframe: true
		})
		const floor = new THREE.Mesh(floorGeometry, floorMaterial)
		floor.rotation.x = -0.5 * Math.PI
		// 地板接受阴影开启
		floor.receiveShadow = true
		//this.scene.add(floor);
	},

	//给模型添加点击事件
	onMouseClick(event) {
		let raycaster = new THREE.Raycaster()
		let mouse = new THREE.Vector2()
		//将鼠标点击位置的屏幕坐标转换成threejs中的标准坐标
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

		// 通过鼠标点的位置和当前相机的矩阵计算出raycaster
		raycaster.setFromCamera(mouse, this.camera)

		// 获取raycaster直线和所有模型相交的数组集合
		//  var intersects = raycaster.intersectObjects(this.clickObjects);
		var intersects = raycaster.intersectObjects(this.scene.children)
		//console.log(intersects);

		//将所有的相交的模型的颜色设置为红色
		// for (var i = 0; i < intersects.length; i++) {
		//   intersects[i].object.material.color.set(0xff0000);
		// }
		//if(intersects.length>0){
		console.log('点击了对象：', intersects)
		//}
	},
	onPointerUp(event) {
		// 阻止此回调重复执行已有事件处理
		let evt = event,
			that = this
		event.preventDefault()
		that.pointerUpHandler(evt)
	},
	pointerUpHandler: function (event) {
		if (!this.OrbitControlState || (this.OrbitControlState && !this.OrbitControlChangeState)) {
			// 将控制器与模型点击事件区分
			let raycaster = new THREE.Raycaster()
			let intersections = []
			// 获取鼠标屏幕坐标
			var rect = this.renderer.domElement.getBoundingClientRect()
			let mouse = new THREE.Vector2()
			mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
			mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

			// 通过相机角度和鼠标位置计算射线
			raycaster.setFromCamera(mouse, this.camera)
			// 获取射线相交模型，存储在数组intersections中
			raycaster.intersectObjects(this.scene.children, true, intersections)

			let selectedObject = null, // 被选中的模型
				origin = null // 被选中的模型与射线的交点，用于确定挂牌位置

			if (intersections.length > 0) {
				// 存在与射线相交模型
				this.outlineObj([intersections[0].object])
				for (var i = 0; i < intersections.length; i++) {
					// 遍历线相交模型
					if (intersections[i].object instanceof THREE.Mesh) {
						// 取第一个（距离最近）的相交Mesh类型模型
						// 如果要排除地面等参照模型，也可在此处添加判断条件
						selectedObject = intersections[i].object
						origin = intersections[i].point
						break
					}
				}
			}
			// 处理选中模型样式并触发生成挂牌
			// 如果selectedObject为null则清除之前选中的模型样式和挂牌
			console.log(this.camera.position, 123)
			this.setSingleSelect(selectedObject, origin)
		}
	},
	setSingleSelect: function (object, origin) {
		let popupPosition = origin ? origin.clone().add(new THREE.Vector3(0, 20, 0)) : null
		let arrowPosition = origin ? origin.clone().add(new THREE.Vector3(0, 3, 0)) : null

		// 根据模型uuid判断此模型是否已经被选中
		if (this.select.object && object && this.select.object.uuid === object.uuid) {
			// 如果模型已选中，则不执行下面操作
			// 更新挂牌位置
			this.select.sprite.position = popupPosition
			this.select.arrow.position = arrowPosition

			return
		}
		if (this.select.object && this.select.originColor) {
			// 如果存在选中模型，先清除之前选中模型的样式
			this.select.object.material.color.set(this.select.originColor)
		}
		if (this.select.arrow) {
			// 如果存在挂牌箭头，先清除
			this.scene.remove(this.select.arrow)
			this.select.arrow = null
		}
		if (this.select.sprite) {
			// 如果存在挂牌，先清除
			this.scene.remove(this.select.sprite)
			this.select.sprite = null
		}

		// 清空已选中模型和模型原本颜色
		this.select.object = null
		this.select.originColor = null

		if (object) {
			// 如果传入选中的模型
			// 保存模型
			this.outlinePass.selectedObjects = [object]
			this.select.object = object
			// 保存模型原色
			this.select.originColor = '#' + object.material.color.getHexString()
			// 设置选中模型颜色
			object.material.color.set(this.select.selectedColor)
			// 添加选中指示箭头
			this.select.arrow = new THREE.ArrowHelper(
				new THREE.Vector3(0, 1, 0),
				arrowPosition,
				15,
				this.select.arrowColor,
			)
			this.scene.add(this.select.arrow)
			// 加载挂牌，传入挂牌文字和位置
			this.loadTextPopup('温度： 97.5℃', popupPosition)
		}
	},
	loadTextPopup: function (text, position) {
		// 生成挂牌贴图
		let canvas = this.drawCanvas1(text)

		// 设置纹理
		let texture = new THREE.Texture(canvas)
		// 设置纹理属性，便于展示
		texture.needsUpdate = true
		// 设置材质
		const material = new THREE.SpriteMaterial({ map: texture, color: 0xffffff })
		// 设置材质透明度
		material.opacity = 0.8
		// 设置挂牌
		this.select.sprite = new THREE.Sprite(material)
		// 设置挂牌位置
		this.select.sprite.position = position
		// 根据挂牌贴图尺寸比例初始化挂牌尺寸
		this.select.sprite.scale.set((10 / canvas.height) * canvas.width, 10, 1)
		// 添加挂牌
		this.scene.add(this.select.sprite)
	},
	// 绘制异形挂牌
	drawCanvas1: function (text) {
		let canvas = document.createElement('canvas'), // 画布
			ctx = canvas.getContext('2d'), // 画笔
			fontSize = 40, // 字体大小
			paddingv = 20, // 挂牌上下与文字距离
			paddingh = 30, // 挂牌左右与文字距离
			backgroundColor = 'rgba(70, 160, 255, 1)', // 挂牌背景色
			fontColor = 'white', // 挂牌文字颜色
			borderWidth = 5 // 挂牌背景描边宽度

		ctx.font = fontSize + 'px Arial'
		// 测量文字在画布中的长度，用于计算画布尺寸
		let textWidth = Math.ceil(ctx.measureText(text).width),
			canvasWidth = textWidth + 2 * paddingh,
			canvasHeight = fontSize + 2 * paddingv

		// 设置画布尺寸
		canvas.width = canvasWidth
		canvas.height = canvasHeight

		// 绘制一个形状
		let radius = 5 || Math.min(paddingv, paddingh)
		ctx.beginPath()
		ctx.lineWidth = borderWidth
		ctx.strokeStyle = 'blue'
		ctx.moveTo(paddingh + borderWidth, borderWidth)
		ctx.lineTo(canvasWidth - borderWidth - radius, borderWidth)
		// 右上拐角圆弧
		ctx.arcTo(canvasWidth - borderWidth, borderWidth, canvasWidth - borderWidth, borderWidth + radius, radius)
		ctx.lineTo(canvasWidth - borderWidth, canvasHeight - borderWidth - radius)
		// 右下拐角圆弧
		ctx.arcTo(
			canvasWidth - borderWidth,
			canvasHeight - borderWidth,
			canvasWidth - borderWidth - radius,
			canvasHeight - borderWidth,
			radius,
		)
		ctx.lineTo(borderWidth + radius, canvasHeight - borderWidth)
		// 左下拐角圆弧
		ctx.arcTo(borderWidth, canvasHeight - borderWidth, borderWidth, canvasHeight - borderWidth - radius, radius)
		ctx.lineTo(borderWidth, paddingv + borderWidth)
		ctx.closePath()
		ctx.stroke()
		ctx.clip()

		ctx.fillStyle = backgroundColor
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		ctx.fillStyle = fontColor
		ctx.font = fontSize + 'px Arial'
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillText(text, canvas.width / 2, canvas.height / 2)

		return canvas
	},
	startOrbitContorlHandler: function () {
		this.OrbitControlState = true
	},
	endOrbitContorlHandler: function () {
		this.OrbitControlState = false
		this.OrbitControlChangeState = false
	},
	changeOrbitContorlHandler: function () {
		this.OrbitControlChangeState = true
	},
}

//   },
//   mounted() {
//     this.init();
//     this.loadGltf();
//     this.render();
//     this.addGeometry();
//     this.renderer.domElement.addEventListener( 'pointerup', this.onPointerUp )
//     // window.addEventListener("click", this.onMouseClick, false);
//   },
//   components: {},
// };
