<!--
 * @Description: 石鼓山水厂
 * @Author: shenxh
 * @Date: 2022-09-19 15:10:58
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-18 09:19:21
-->

<template>
  <div class="water-works-yq admin-content">
    <three width="100%" height="100%" @loader-modules="loaderModules"></three>
  </div>
</template>

<script>
import Three from '@/components/three'

export default {
  name: 'water-works-yq',
  components: {
    Three,
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 加载模型
    loaderModules(three) {
      // const context = require.context(
      //   '../../../public/modules/water-model-sgs',
      //   true,
      // )
      // const urlList = context.keys().map(item => {
      //   return item.replace(/^./, '/modules/water-model-sgs')
      // })
      // urlList.forEach(item => {
      //   const arr = item.split('.')
      //   const type = arr[arr.length - 1].toLocaleLowerCase()
      //   if (type === 'dae') {
      //     three.ColladaLoader.load(item, mesh => {
      //       three.scene.attach(mesh.scene)
      //     })
      //   }
      //   if (type === 'glb' || type === 'gltf') {
      //     three.GltfLoader.load(item, gltf => {
      //       three.scene && three.scene.attach(gltf.scene)
      //     })
      //   }
      // })
    },
  },
}
</script>

<style lang="less" scoped></style>
