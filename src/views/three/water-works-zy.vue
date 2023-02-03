<!--
 * @Description: 状元水厂
 * @Author: shenxh
 * @Date: 2022-09-19 15:10:58
 * @LastEditors: shenxh
 * @LastEditTime: 2023-02-03 15:43:54
-->

<template>
  <div class="water-works-zy admin-content">
    <three width="100%" height="100%" @loader-modules="loaderModules"></three>
  </div>
</template>

<script>
import Three from '@/components/three'

let three = null

export default {
  name: 'water-works-zy',
  components: {
    Three,
  },
  props: {},
  data() {
    return {
      treeList: [
        {
          position: { x: 10900, y: 340, z: 1900 },
        },
        {
          position: { x: 10900, y: 340, z: 2200 },
        },
      ],
      treeList1: [
        {
          position: { x: 10700, y: 340, z: 800 },
        },
        {
          position: { x: 10900, y: 340, z: -800 },
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 加载模型
    loaderModules(threeObj) {
      three = threeObj
      const context = require.context(
        '/public/modules/water-model-zy',
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
              let label = ''
              let position = { x: 0, y: 0, z: 0 }

              gltf.name = fileName
              switch (fileName) {
                // 前池及取水泵房
                case 'build1YNSCYQ':
                  label = '前池及取水泵房'
                  position = { x: -4000, y: 310, z: 2500 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 污泥脱水机房
                case 'build2YNSCYQ':
                  label = '污泥脱水机房'
                  position = { x: -4000, y: 390, z: -1000 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 储泥池
                case 'build3YNSCYQ':
                  label = '储泥池'
                  position = { x: -9200, y: 390, z: -1800 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 污泥浓缩池及排泥泵房
                case 'build4YNSCYQ':
                  label = '污泥浓缩池及排泥泵房'
                  position = { x: -10400, y: 410, z: -2500 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 综合楼
                case 'build5YNSCYQ':
                  label = '综合楼'
                  position = { x: 10100, y: 1100, z: 4450 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 加药间
                case 'build6YNSCYQ':
                  label = '加药间'
                  position = { x: 9670, y: 250, z: -3060 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 次氯酸钠投加间
                case 'build7YNSCYQ':
                  label = '次氯酸钠投加间'
                  position = { x: 9700, y: 300, z: -4300 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 滤池
                case 'build8YNSCYQ':
                  label = '滤池'
                  position = { x: 3910, y: 420, z: -800 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 反应沉淀池
                case 'build9YNSCYQ':
                  label = '反应沉淀池'
                  position = { x: -1970, y: 220, z: -830 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 高压配电房
                case 'build10YNSCYQ':
                  label = '高压配电房'
                  position = { x: 6010, y: 320, z: -4700 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 吸水井及送水泵房
                case 'build11YNSCYQ':
                  label = '吸水井及送水泵房'
                  position = { x: 3570, y: 330, z: -4530 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 门卫室
                case 'build12YNSCYQ':
                  label = '门卫室'
                  position = { x: 12698, y: 230, z: 1720 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 地面
                case 'dimianYNSCYQ':
                  position = { x: 0, y: 0, z: 0 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 地形
                case 'dixingYNSCYQ':
                  position = { x: -3350, y: 1900, z: 9000 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 草地
                case 'grassYNSCYQ':
                  position = { x: 2930, y: 120, z: 220 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 公园
                case 'qitaYNSCYQ':
                  position = { x: 10200, y: 300, z: 1500 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
                // 树1
                case 'tree1COM':
                  this.treeList.forEach(item => {
                    const { x, y, z } = item.position
                    const treeObj = gltf.scene.clone()

                    treeObj.position.set(x, y, z)
                    three.scene && three.scene.attach(treeObj)
                  })
                  break
                // 树2
                case 'tree2COM':
                  this.treeList1.forEach(item => {
                    const { x, y, z } = item.position
                    const treeObj = gltf.scene.clone()

                    treeObj.position.set(x, y, z)
                    three.scene && three.scene.attach(treeObj)
                  })
                  break
                // 围栏
                case 'weilanYNSCYQ':
                  position = { x: 200, y: 120, z: 0 }
                  three.scene && three.scene.attach(gltf.scene)
                  break
              }
              // gltf.scene.scale.set(0.01, 0.01, 0.01)
              // three.scene && three.scene.attach(gltf.scene)
              const { x, y, z } = position

              gltf.scene.position.set(x, y, z)

              this.createLabel(label, gltf.scene)
            },
            undefined,
            error => {
              console.error(error)
            },
          )
        }
      })
    },

    // 创建标签
    createLabel(label, object) {
      if (!label) return

      const div = document.createElement('div')

      // div.className = 'three-label-container'
      // div.style.color = '#fff'
      // div.style.background = '#ff6700'
      // div.textContent = label
      div.innerHTML = `<div class="three-label">
        <div class="three-label-inner">
          <div class="three-label-inner-header">${label}</div>
          <div class="three-label-inner-body">
            内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域
          </div>
        </div>
        <div class="three-label-line"></div>
      </div>`

      three.Css2dRenderer.createObject(div)
      object.add(three.css2DObject)

      const threeLabelInnerDom = div.getElementsByClassName(
        'three-label-inner',
      )[0]
      threeLabelInnerDom.addEventListener(
        'mouseover',
        this.onMouseoverThreeLabelInnerDom,
      )
      threeLabelInnerDom.addEventListener(
        'mouseleave',
        this.onMouseleaveThreeLabelInnerDom,
      )
    },

    onMouseoverThreeLabelInnerDom(e) {
      for (let item of e.target.children) {
        if (item.className === 'three-label-inner-body') {
          item.style.display = 'block'
        }
      }
    },
    onMouseleaveThreeLabelInnerDom(e) {
      for (let item of e.target.children) {
        if (item.className === 'three-label-inner-body') {
          item.style.display = 'none'
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.water-works-zy {
  /deep/ .three-label {
    cursor: default;
    max-width: 200px;
    transform: translate(0, -50%);
    .three-label-inner {
      padding: 5px 10px;
      border-radius: 4px;
      color: #fff;
      background: #00000099;
      .three-label-inner-body {
        display: none;
        font-size: 12px;
        margin-top: 6px;
      }
    }
    .three-label-line {
      position: relative;
      top: -2px;
      left: 50%;
      height: 20px;
      margin-left: -3px;

      width: 1px;
      background: rgb(28, 135, 197);
      &::after {
        position: absolute;
        bottom: -2px;
        margin-left: -3.5px;
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        border: 1px solid rgb(28, 135, 197);
        background-color: #fff;
      }
    }
  }
}
</style>
