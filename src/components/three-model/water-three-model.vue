<template>
	<div style="height: 100%">
		<div class="threebg" id="three"></div>
	</div>
</template>

<script>
import events from './enum/events'
import ThreeContainer from './three/threeContainer.js'
let threeContainer
export default {
	name: 'three',
	props: {
		upAxis: {
			type: String,
			default: 'Z',
		},
		request: {
			type: [Object, Array],
			default() {
				return {
					type: '',
					params: null,
				}
			},
		},
	},
	created() {},
	data() {
		return {
			threeType: 1,
		}
	},
	beforeDestroy() {
		if (threeContainer) threeContainer.deInit()
	},
	methods: {
		/**
		 * 获取模型数据
		 * @param {String} type 工艺流程分类
		 * */
		getDiagram(type, configType) {
			// this.changeDiv('three')
			let data = {
				guandaoData: threeContainer.exportGuandaoData({
					type: type || this.threeType,
				}),
				objData: threeContainer.exportObjData({
					type: type || this.threeType,
					configType: configType,
				}),
			}
			return threeContainer.getDiagram(data)
		},
		/**
		 * 上传工艺流程图数据
		 * @param {Object} info 工艺流程图数据对象
		 * */
		uploadObj(data) {
			threeContainer.emit(events.getDiagram, data)
		},
		/**
		 * 根据数据展示工艺流程图信息
		 * @param {Object} info 工艺流程图数据对象
		 * @private
		 * */
		setDiagram({ info, amplification }) {
			if (!info) return
			// this.changeDiv('three')
			threeContainer.setDiagram({ info })

			if (amplification) {
				// setTimeout(() => {
				// 	threeContainer.flyTo({
				// 		factor: 0.5,
				// 		keepDirection: false,
				// 	})
				// }, 2000)
			}
		},
		/**
		 * @event response 组件状态响应事件
		 * @description 组件的状态变化时，通过事件通知外部组件<br>
		 * 外部组件可以事件的 type 参数为 methods 名称，在事件响应函数中如下处理<br>
		 * @type {Object}
		 * @param {string} type - 状态类型
		 * @param {object} params - 类型参数
		 */
		e(type, params) {
			this.$emit('response', { type, params }, 'equipment')
		},

		/**
		 * @function request addPointLight
		 * @description 添加点光源
		 */
		addPointLight(params) {
			threeContainer.addPointLight(params)
		},

		/**
		 * @function request getViewAngle
		 * @description 获取视角
		 */
		getViewAngle() {
			console.log(threeContainer.getViewAngle())
		},

		changeVisibleLabel(value) {
			threeContainer.showLabels(value)
		},
		changeMointorVisibleLabel(value) {
			threeContainer.showMonintorLabels(value)
		},

		/**
		 * @function request flyTo
		 * @param {THREE.Vector3} params.startPosition 动画开始相机动画开始位置,没有则为当前位置
		 * @param {THREE.Vector3} params.startTarget 动画开始相机目标位置,没有则为当前目标位置
		 * @param {THREE.Vector3} params.endPosition 动画结束相机目标位置,没有则飞行至当前聚焦物体
		 * @param {THREE.Vector3} params.endTarget 动画结束相机视线目标位置
		 * @param {Number} params.time 相机视线目标位置,没有则根据飞行距离计算时间
		 * @param {Function} params.onComplete 动画结束后回调函数
		 * @description 飞行动画
		 */
		flyTo(params) {
			threeContainer.flyTo(params)
		},
		opacityTween(params) {
			threeContainer.opacityTween(params)
		},
		/**
		 * @description 初始化管道
		 * @param {Number} params.type 管道种类
		 */
		initGuandao(params) {
			threeContainer.initGuandao(params)
		},
		/**
		 * @description 初始化加载物体种类
		 * @param {Number} params.type 物体种类
		 */
		initLoad(params) {
			threeContainer.initLoad(params)
		},
		deInit() {
			threeContainer.deInit()
		},
		changeDiv() {
			const threeDiv = document.getElementById('three')
			if (threeContainer) threeContainer.deInit()
			threeDiv.style.display = 'block'
			this.initThree()
		},

		initThree() {
			threeContainer = new ThreeContainer({
				upAxis: 'Z',
			})
			threeContainer.on(events.clicked, data => {
				this.e('clicked', data)
				if (data.diagramId) this.$emit('setDiagramThree', data)
			})
			threeContainer.on(events.getDiagram, data => {
				this.e('getDiagram', data)
				// this.ajax(
				// 	this,
				// 	true,
				// 	'/api/iwater/show/process/flow/diagram/add?ownership=0217',
				// 	{ json: JSON.stringify(data) },
				// 	(self, result) => {
				// 		console.log('-----1111-1-1-11-1--11-', result)
				// 	},
				// 	null,
				// 	() => {},
				// 	() => {},
				// )
			})
			threeContainer.init('three')
		},
	},
	mounted() {
		threeContainer = null
		this.changeDiv('three')
	},
}
</script>
<style scoped lang="less">
#three {
	width: 100%;
	height: 100%;
	float: left;
}
</style>
