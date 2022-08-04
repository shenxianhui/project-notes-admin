<!--
 * @Description: [Demo]水务模型-新
 * @Author: shenxh
 * @Date: 2022-08-03 13:59:36
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-04 16:04:04
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
      dracoLoader: null, // 已压缩模型加载器
      loader: null, // 加载器
      animationFrame: null, // 动画
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

      three.initThree('three')
      this.getLoader()
      three.getRendererDom()
    },

    getLoader() {
      const context = require.context(
        '../../../public/modules/water-model',
        true,
        /\.glb$/,
      )
      const files = context.keys().map(item => {
        return item.replace(/^./, '/modules/water-model')
      })

      three.initLoader(files)
    },
  },
}
</script>

<style lang="less" scoped>
.water-model-new {
  padding: 0;
}
</style>
