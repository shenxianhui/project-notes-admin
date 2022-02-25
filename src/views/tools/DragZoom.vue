<!--
 * @Author: shenxh
 * @Date: 2020-07-10 16:40:30
 * @LastEditors: shenxh
 * @LastEditTime: 2022-02-25 17:29:18
 * @Description: 鼠标拖动
-->

<template>
	<div class="drag-zoom" ref="drag-zoom">
		<xx-drag-zoom :area-node="node">
			<div class="drag-zoom-content">
				鼠标拖动
			</div>
		</xx-drag-zoom>
	</div>
</template>

<script>
import XxDragZoom from '@/components/tools/drag-zoom';

export default {
	name: 'drag-zoom',
	components: {
		XxDragZoom,
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
	.drag-zoom-content {
		width: 100px;
		height: 100px;
		background: #ff000099;
	}
}
</style>
