<!--
 * @Description: 状元水厂-新
 * @Author: shenxh
 * @Date: 2022-11-03 15:53:11
 * @LastEditors: shenxh
 * @LastEditTime: 2023-05-31 16:02:11
-->

<template>
  <div class="water-works-zy-new admin-content">
    <div ref="three" class="three">
      <div ref="stats" class="stats"></div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

import coordinateList from '/public/modules/water-model-zy/zuobiao.json'
import basicConfig from './mixins/basic-config'

export default {
  name: 'water-works-zy-new',
  components: {},
  mixins: [basicConfig],
  props: {},
  data() {
    return {
      coordinateList: [...coordinateList], // 坐标数组

      threeContainer: null, // three 容器
      statsContainer: null, // 性能监测容器
      stats: null, // 性能监测
      scene: null, // 场景
      renderer: null, // 渲染器
      camera: null, // 相机
      controls: null, // 控制器
      directionalLight: null, // 平行光
      css2DRenderer: null, // CSS 2D渲染器
      gltfLoader: null, // GLTF加载器
      dracoLoader: null, // 解码库加载器
      animationFrame: null, // 动画帧

      /* 组 */
      group: {
        waterWorks: new THREE.Group(), // 水厂
      },

      /* 模型对象暂存数组 */
      css2DObjectList: [], // 已创建的2D渲染器

      /* 其他 */
      showWaterWorks: true, // 显示水厂相关模型
    }
  },
  computed: {},
  watch: {
    showWaterWorks(val) {
      this.group.waterWorks.visible = val
      this.set2DObjectVisible(this.css2DObjectList, val)
    },
  },
  created() {},
  mounted() {
    this.init()
    this.loaderModules()
    this.threeContainer &&
      this.threeContainer.addEventListener('click', this.onClick)
  },
  beforeDestroy() {
    this.dispose()
    this.threeContainer &&
      this.threeContainer.removeEventListener('click', this.onClick)
  },
  methods: {
    // 加载模型
    loaderModules() {
      const context = require.context(
        '/public/modules/water-model-zy',
        true,
        /\.glb$/,
      )

      context.keys().forEach(item => {
        const filePath = item.replace(/^./, '/modules/water-model-zy')

        this.dracoLoader.setDecoderPath('/utils/gltf/')
        this.gltfLoader.setDRACOLoader(this.dracoLoader)
        this.gltfLoader.load(filePath, gltf => {
          const meshObj = gltf?.scene?.children[0]
          const gltfName = meshObj?.name

          if (gltfName === 'tree1COM' || gltfName === 'tree2COM') {
            this.setModule(gltf)
          } else {
            const model = this.coordinateList.find((item, index) => {
              if (item.name === gltfName) {
                this.coordinateList.splice(index, 1)

                return true
              }
            })
            const { position = {} } = model || {}
            const { x, y, z } = position

            // 定义可点击的元素
            if (gltfName === 'build2YNSCYQ') {
              meshObj.userData.interactive = true
            }
            gltf.scene.position.set(x, y, z)
            this.group.waterWorks.add(gltf.scene)

            this.createLabel(gltf)
          }
        })
      })

      this.scene.add(this.group.waterWorks)
    },

    setModule(gltf) {
      const gltfName = gltf?.scene?.children[0]?.name

      this.coordinateList.forEach((item, index) => {
        const cloneGltf = gltf.scene.clone()
        const { position = {}, name } = item || {}
        const { x, y, z } = position

        if (name === gltfName) {
          // 取消关联
          cloneGltf.traverse(child => {
            if (child.isMesh) {
              child.material = child.material.clone() // 克隆材质
              child.material.needsUpdate = true // 更新材质
            }
          })
          cloneGltf.position.set(x, y, z)
          this.group.waterWorks.add(cloneGltf)
          this.coordinateList.splice(index, 1)
        }
      })
    },

    // 创建标签
    createLabel(gltf) {
      const div = document.createElement('div')
      const gltfName = gltf?.scene?.children[0]?.name

      div.innerHTML = `
        <div class="three-label">
          <div class="three-label-inner">
            <div class="three-label-inner-header">${gltfName}</div>
            <div class="three-label-inner-body">
              ${gltf.asset.generator}
            </div>
          </div>
          <div class="three-label-line"></div>
        </div>
      `

      const css2DObject = new CSS2DObject(div)
      const threeLabelInnerDom = div.querySelector('.three-label-inner')

      gltf.scene.add(css2DObject)
      this.css2DObjectList.push(css2DObject)

      threeLabelInnerDom.addEventListener('mouseover', e => {
        for (let item of e.target.children) {
          if (item.className === 'three-label-inner-body') {
            item.style.display = 'block'
          }
        }
      })
      threeLabelInnerDom.addEventListener('mouseleave', e => {
        for (let item of e.target.children) {
          if (item.className === 'three-label-inner-body') {
            item.style.display = 'none'
          }
        }
      })
    },

    // 批量设置对象属性
    set2DObjectVisible(list = [], show) {
      list.forEach(obj => {
        obj.visible = show
      })
    },

    // 点击事件
    onClick(e) {
      e.stopPropagation()

      this.selectModel(e)
    },

    // 射线选择模型
    selectModel(e) {
      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()

      mouse.x =
        ((e.clientX - this.threeContainer.getBoundingClientRect().left) /
          this.threeContainer.offsetWidth) *
          2 -
        1
      mouse.y =
        -(
          (e.clientY - this.threeContainer.getBoundingClientRect().top) /
          this.threeContainer.offsetHeight
        ) *
          2 +
        1

      raycaster.setFromCamera(mouse, this.camera)
      const intersects = raycaster.intersectObjects(
        this.getMesh(this.group.waterWorks),
      )

      if (intersects && intersects.length) {
        const selected = intersects[0]
        const object = selected.object

        this.clearHighlight(this.group.waterWorks)
        if (object.userData.interactive) {
          object.material.emissive.setHex(0xff0000)

          // tmp
          setTimeout(() => {
            this.showWaterWorks = false
          }, 1000)
        }

        console.log('拾取坐标: ', selected.point)
      }
    },

    // 提取指定类型的对象
    getMesh(group) {
      // 去重
      const meshes = new Set()

      // Group.traverse 方法可以实现递归遍历
      group.traverse(obj => {
        if (obj.isMesh) {
          meshes.add(obj)
        }
      })

      return Array.from(meshes)
    },

    // 取消所有物体高亮
    clearHighlight(group) {
      group.traverse(obj => {
        if (obj.isMesh) {
          obj.material.emissive.setHex(0x000000)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.water-works-zy-new {
  .three {
    position: relative;
    width: 100%;
    height: 100%;
  }
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
