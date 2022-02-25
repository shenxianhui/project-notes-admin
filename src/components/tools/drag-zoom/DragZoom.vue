<!--
 * @Author: shenxh
 * @Date: 2020-07-10 16:40:30
 * @LastEditors: shenxh
 * @LastEditTime: 2022-02-25 17:29:44
 * @Description: 组件-拖动缩放
-->

<template>
	<div ref="xx-drag-zoom" class="xx-drag-zoom" :style="dragZoomNodeStyle">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'xx-drag-zoom',
	components: {},
	props: {
		/* 被操作的元素 start */
		// X 坐标
		left: {
			type: Number,
			default: 0,
		},
		// Y 坐标
		top: {
			type: Number,
			default: 0,
		},
		// 宽度
		width: Number,
		// 高度
		height: Number,
		// 缩放比例
		zoom: {
			type: Number,
			default: 1,
		},
		// 最大缩放比例
		maxZoom: {
			type: Number,
			default: 2,
		},
		// 最小缩放比例
		minZoom: {
			type: Number,
			default: 0.5,
		},
		// 缩放幅度
		range: {
			type: Number,
			default: 0.1,
		},
		zoomSpeed: {
			type: Number,
			default: 0.5,
		},
		/* 被操作的元素 end */

		/* 活动区域 start */
		// 节点 (注: 传入节点后可以自动获取数据, 不需要再传坐标与宽高了)
		areaNode: HTMLDivElement,
		// X 坐标 (未设置 areaNode 时生效)
		areaLeft: {
			type: Number,
			default: 0,
		},
		// Y 坐标 (未设置 areaNode 时生效)
		areaTop: {
			type: Number,
			default: 0,
		},
		// 宽度 (未设置 areaNode 时生效)
		areaWidth: {
			type: Number,
			default: 200,
		},
		// 高度 (未设置 areaNode 时生效)
		areaHeight: {
			type: Number,
			default: 100,
		},
		/* 活动区域 end */
	},
	data() {
		return {
			currentZoom: this.zoom,
		};
	},
	computed: {
		// 被操作的元素节点
		dragZoomNode() {
			return this.$refs['xx-drag-zoom'];
		},
		// 活动区域数据
		areaNodeData() {
			let obj = {};
			const node = this.areaNode;

			if (node) {
				obj = {
					left: node.clientLeft,
					top: node.clientTop,
					width: node.offsetWidth, // 忽略边框
					height: node.offsetHeight, // 忽略边框
				};
			} else {
				obj = {
					left: this.areaLeft,
					top: this.areaTop,
					width: this.areaWidth,
					height: this.areaHeight,
				};
			}

			return obj;
		},
		// 设置样式
		dragZoomNodeStyle() {
			return {
				transform: `scale(${this.currentZoom})`,
				left: `${-(20 / this.currentZoom)}%`,
				top: `${-(20 / this.currentZoom)}%`,
				width: this.width + 'px',
				height: this.height + 'px',
			};
		},
	},
	watch: {},
	created() {},
	mounted() {
		this.dragZoomNode.addEventListener('mousedown', this.mousedown);
		this.dragZoomNode.addEventListener('wheel', this.mousescroll);
	},
	beforeDestroy() {
		this.dragZoomNode.removeEventListener('mousedown');
		this.dragZoomNode.removeEventListener('wheel');
	},
	methods: {
		// 鼠标点击事件
		mousedown(evt) {
			const {
				// left: areaL,
				// top: areaT,
				width: areaW,
				height: areaH,
			} = this.areaNodeData;
			const {
				offsetLeft: dragL,
				offsetTop: dragT,
				offsetWidth: dragW,
				offsetHeight: dragH,
			} = this.dragZoomNode;
			const x = evt.clientX - dragL;
			const y = evt.clientY - dragT;

			// 鼠标拖动事件
			document.onmousemove = evt => {
				const zoom = this.currentZoom;
				let styleL = evt.clientX - x;
				let styleT = evt.clientY - y;

				// 当拖动元素宽度小于父元素时
				if (dragW * zoom < areaW) {
					// 注: 使用 scale 缩放后, 元素实际尺寸不会改变
					const boundaryL = (dragW * zoom - dragW) / 2;
					const boundaryR = areaW - (dragW + boundaryL);

					// 左边界
					if (styleL < boundaryL) {
						styleL = boundaryL;
					}
					// 右边界
					if (styleL > boundaryR) {
						styleL = boundaryR;
					}
				} else {
					// 注: 使用 scale 缩放后, 元素实际尺寸不会改变
					const boundaryL = (dragW * zoom - dragW) / 2;
					const boundaryR = -(dragW * zoom - areaW - boundaryL);

					// 左边界
					if (styleL > boundaryL) {
						styleL = boundaryL;
					}
					// 右边界
					if (styleL < boundaryR) {
						styleL = boundaryR;
					}
				}

				// 当拖动元素高度小于父元素时
				if (dragH * zoom < areaH) {
					// 注: 使用 scale 缩放后, 元素实际尺寸不会改变
					const boundaryT = (dragH * zoom - dragH) / 2;
					const boundaryB = areaH - (dragH + boundaryT);

					// 上边界
					if (styleT < boundaryT) {
						styleT = boundaryT;
					}
					// 下边界
					if (styleT > boundaryB) {
						styleT = boundaryB;
					}
				} else {
					// 注: 使用 scale 缩放后, 元素实际尺寸不会改变
					const boundaryT = (dragH * zoom - dragH) / 2;
					const boundaryB = -(dragH * zoom - areaH - boundaryT);

					// 上边界
					if (styleT > boundaryT) {
						styleT = boundaryT;
					}
					// 下边界
					if (styleT < boundaryB) {
						styleT = boundaryB;
					}
				}

				this.dragZoomNode.style.left = styleL + 'px';
				this.dragZoomNode.style.top = styleT + 'px';
			};
			document.onmouseup = () => {
				document.onmousemove = null;
			};
		},

		// 鼠标滚轮事件
		mousescroll(evt) {
			const { deltaY } = evt;
			let zoom = this.currentZoom;

			// 上滑
			if (deltaY < 0) {
				if (zoom >= this.maxZoom) {
					return;
				}

				zoom += this.range;
			} else {
				if (zoom <= this.minZoom) {
					return;
				}

				zoom -= this.range;
			}

			this.currentZoom = Number(zoom.toFixed(1));
		},
	},
};
</script>

<style scoped lang="less">
.xx-drag-zoom {
	position: absolute;
	user-select: none;
	cursor: move;
}
</style>
