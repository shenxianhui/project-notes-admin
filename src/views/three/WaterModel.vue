<!--
 * @Description: 水务模型-演示
 * @Author: shenxh
 * @Date: 2022-04-20 14:37:25
 * @LastEditors: shenxh
 * @LastEditTime: 2022-04-20 15:06:44
-->

<template>
	<div class="water-model-demo admin-content">
		<three-model @response="handleCallback" ref="three"></three-model>
	</div>
</template>

<script>
import ThreeModel from '@/components/three-model';

export default {
	name: 'water-model-demo',
	components: {
		ThreeModel,
	},
	props: {},
	data() {
		return {
			type: 'ETZSCSP',
		};
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {
		this.debugObj();
	},
	beforeDestroy() {},
	methods: {
		debugObj() {
			// const type = this.$route.params.type
			// const type = 'ETZSCSP'
			this.$nextTick(() => {
				console.log(this.$refs.three);
				let diagramData = this.$refs.three.getDiagram(this.type);
				diagramData.pointGroups = diagramData.points;
				diagramData.debug = true;
				this.$refs.three.setDiagram({ info: diagramData });
			});
		},
		handleCallback(info) {
			console.log(info);
		},
	},
};
</script>

<style lang="less" scoped>
.water-model-demo {
	background: #091042;
}
</style>
