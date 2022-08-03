<!--
 * @Description: [Demo]水务模型-新
 * @Author: shenxh
 * @Date: 2022-08-03 13:59:36
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-03 17:10:44
-->

<template>
  <div class="water-model-new admin-content" id="three"></div>
</template>

<script>
import Three from '@/utils/three-new'

let three = null

export default {
  name: 'water-model-new',
  components: {},
  props: {},
  data() {
    return {
      container: null, // three 容器
      scene: null, // 场景
      renderer: null, // 渲染器
      clock: null, // 时间
      camera: null, // 相机
      axesHelper: null, // 坐标轴
      gridHelper: null, // 坐标格
      controls: null, // 轨道控制器
      pointLight: null, // 点光源
      ambientLight: null, // 环境光
      directionalLight: null, // 平行光
      Vector3: null, // 三维向量
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initThree()
  },
  beforeDestroy() {},
  methods: {
    // 初始化
    initThree() {
      three = new Three()

      // // 点击事件
      // three.on('clicked', evt => {
      //   console.log('点击事件', evt)
      // })

      // three.load('/modules/st_happens/scene.gltf')
      three.initThree('three')
    },
  },
}
</script>

<style lang="less" scoped>
.water-model-new {
  padding: 0;
}
</style>
