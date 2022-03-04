<!--
 * @Author: shenxh
 * @Date: 2020-07-10 16:40:30
 * @LastEditors: shenxh
 * @LastEditTime: 2022-03-04 13:26:19
 * @Description: 鼠标拖动
-->

<template>
	<div class="drag-zoom" ref="drag-zoom">
		<vue-drag-zoom
			:area-node="node"
			allow-zoom
			:range="0.2"
			:max-zoom="10"
			:min-zoom="0.2"
		>
			<div class="drag-zoom-content">
				该区域可随意拖动/缩放
				<br />
				该区域可随意拖动/缩放
				<br />
				该区域可随意拖动/缩放
				<br />
				该区域可随意拖动/缩放
				<br />
				该区域可随意拖动/缩放
				<br />
				该区域可随意拖动/缩放
				<br />
				该区域可随意拖动/缩放
				<br />
				该区域可随意拖动/缩放
			</div>
		</vue-drag-zoom>
	</div>
</template>

<script>
// import VueDragZoom from '@/components/tools/drag-zoom';
import VueDragZoom from 'vue-drag-zoom';

export default {
	name: 'drag-zoom',
	components: {
		VueDragZoom,
	},
	props: {},
	data() {
		return {
			node: null,
		};
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {
		this.node = this.$refs['drag-zoom'];
	},
	beforeDestroy() {},
	methods: {},
};
</script>

<style scoped lang="less">
.drag-zoom {
	position: relative;
	width: 50%;
	height: 50%;
	margin: 100px auto;
	background-color: lightblue;
	overflow: hidden;
	.drag-zoom-content {
		width: 150px;
		height: 150px;
		background: #ff000099;
	}
}
</style>
