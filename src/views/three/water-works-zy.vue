<!--
 * @Description: 状元水厂
 * @Author: shenxh
 * @Date: 2022-09-19 15:10:58
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-17 15:32:00
-->

<template>
  <div class="water-works-zy admin-content">
    <three width="100%" height="100%" @loader-modules="loaderModules"></three>
  </div>
</template>

<script>
import Three from '@/components/three'

export default {
  name: 'water-works-zy',
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
      const context = require.context(
        '../../../public/modules/water-model-zy',
        true,
        /\.glb$/,
      )
      const urlList = context.keys().map(item => {
        return item.replace(/^./, '/modules/water-model-zy')
      })

      urlList.forEach(item => {
        const arr = item.split('.')
        const type = arr[arr.length - 1].toLocaleLowerCase()

        if (type === 'glb' || type === 'gltf') {
          three.DracoLoader.setDecoderPath()
          three.gltfLoader.setDRACOLoader(three.dracoLoader)

          three.GltfLoader.load(
            item,
            gltf => {
              const patch = arr[0].split('/')
              const fileName = patch[patch.length - 1]

              gltf.name = fileName
              switch (fileName) {
                // 前池及取水泵房
                case 'build1YNSCYQ':
                  gltf.scene.position.set(-4000, 310, 2500)
                  three.scene && three.scene.add(gltf.scene)
                  break
                // 污泥脱水机房
                case 'build2YNSCYQ':
                  gltf.scene.position.set(-7400, 390, -1000)
                  three.scene && three.scene.add(gltf.scene)
                  break
                // 储泥池
                case 'build3YNSCYQ':
                  gltf.scene.position.set(-9200, 390, -1800)
                  three.scene && three.scene.add(gltf.scene)
                  break
                // 污泥浓缩池及排泥泵房
                case 'build4YNSCYQ':
                  gltf.scene.position.set(-10400, 410, -2500)
                  three.scene && three.scene.add(gltf.scene)
                  break
                // 综合楼
                case 'build5YNSCYQ':
                  gltf.scene.position.set(10100, 1100, 4450)
                  three.scene && three.scene.add(gltf.scene)
                  break
                // 加药间
                case 'build6YNSCYQ':
                  gltf.scene.position.set(9670, 250, -3060)
                  three.scene && three.scene.add(gltf.scene)
                  break
                // 次氯酸钠投加间
                case 'build7YNSCYQ':
                  gltf.scene.position.set(9700, 300, -4300)
                  three.scene && three.scene.add(gltf.scene)
                  break
                // 滤池
                case 'build8YNSCYQ':
                  gltf.scene.position.set(3910, 420, -800)
                  three.scene && three.scene.add(gltf.scene)
                  break
                // 反应沉淀池
                case 'build9YNSCYQ':
                  gltf.scene.position.set(-1970, 220, -830)
                  three.scene && three.scene.add(gltf.scene)
                  break
                // 高压配电房
                case 'build10YNSCYQ':
                  gltf.scene.position.set(6010, 320, -4700)
                  three.scene && three.scene.add(gltf.scene)
                  break
                // 吸水井及送水泵房
                case 'build11YNSCYQ':
                  gltf.scene.position.set(3570, 330, -4530)
                  three.scene && three.scene.add(gltf.scene)
                  break
                // 门卫室
                case 'build12YNSCYQ':
                  gltf.scene.position.set(12698, 230, 1720)
                  three.scene && three.scene.add(gltf.scene)
                  break
                case 'BXGYNSCYQ':
                  break
                // 地面
                case 'dimianYNSCYQ':
                  gltf.scene.position.set(0, 0, 0)
                  three.scene && three.scene.add(gltf.scene)
                  break
                case 'dixingYNSCYQ':
                  // gltf.scene.position.set(0, 50, 0)
                  break
                // 草地
                case 'grassYNSCYQ':
                  gltf.scene.position.set(2930, 120, 220)
                  three.scene && three.scene.add(gltf.scene)
                  break
                case 'logoBXGYNSCYQ':
                  break
                // 公园
                case 'qitaYNSCYQ':
                  gltf.scene.position.set(10200, 300, 1500)
                  three.scene && three.scene.add(gltf.scene)
                  break
                // 树1
                case 'tree1COM':
                  // gltf.scene.position.set(300, 2000, 0)
                  // three.scene && three.scene.add(gltf.scene)
                  break
                // 树2
                case 'tree2COM':
                  // gltf.scene.position.set(0, 2000, 0)
                  // three.scene && three.scene.add(gltf.scene)
                  break
                // 围栏
                case 'weilanYNSCYQ':
                  gltf.scene.position.set(200, 120, 0)
                  three.scene && three.scene.add(gltf.scene)
                  break
              }
              // gltf.scene.scale.set(0.01, 0.01, 0.01)
              // three.scene && three.scene.add(gltf.scene)
            },
            undefined,
            error => {
              console.error(error)
            },
          )
        }
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
