<!--
 * @Description: 状元水厂-新
 * @Author: shenxh
 * @Date: 2022-11-03 15:53:11
 * @LastEditors: shenxh
 * @LastEditTime: 2023-06-06 14:42:59
-->

<template>
  <div class="water-works-zy-new admin-content">
    <div ref="three" class="three">
      <div ref="stats" class="stats"></div>
    </div>

    <el-button
      v-show="pathList && pathList.length > 1"
      class="back"
      size="mini"
      @click="handleBack"
    >
      返回
    </el-button>
  </div>
</template>

<script>
import * as THREE from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import TWEEN from '@tweenjs/tween.js'

import coordinateList from '/public/modules/water-model-zy/zuobiao.json'
import basicConfig from './mixins/basic-config'

export default {
  name: 'water-works-zy-new',
  components: {},
  mixins: [basicConfig],
  props: {},
  data() {
    return {
      /* 默认值 */
      coordinateList: [...coordinateList], // 坐标数组
      initCameraPosition: { x: -50000, y: 50000, z: -50000 }, // 初始相机位置
      normalCameraPosition: { x: -13000, y: 6000, z: -12000 }, // 标准相机位置
      normalCameraLookAt: { x: -13000, y: 0, z: -3000 }, // 标准相机朝向

      /* 基础 */
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
        build2YNSCYQ: new THREE.Group(), // 污泥脱水机房
      },
      showGroup: [], // 显示的组(与 group 的 key 对应)

      /* 其他 */
      pathList: ['waterWorks'], // 下钻路径
      currentModel: null, // 当前模型
    }
  },
  computed: {},
  watch: {
    showGroup: {
      handler(val) {
        for (let key in this.group) {
          let show = false

          if (val.find(item => item === key)) {
            show = true
          } else {
            show = false
          }

          this.group[key].visible = show
          this.getObjectModel(this.group[key], CSS2DObject).forEach(obj => {
            obj.visible = show
          })
        }
      },
      deep: true,
    },

    pathList: {
      handler(val) {
        const name = val[val.length - 1]

        switch (name) {
          case 'waterWorks':
            this.showGroup = ['waterWorks']
            break
          case 'build2YNSCYQ':
            this.showGroup = ['build2YNSCYQ']
            break
        }
      },
      deep: true,
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
          const meshObj = gltf.scene.children[0]
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

            meshObj.userData = model
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
      this.pathList = ['waterWorks']
    },

    setModule(gltf) {
      const gltfName = gltf.scene.children[0]?.name

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
      const gltfName = gltf.scene.children[0]?.name

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

    // 返回
    handleBack() {
      const { x, y, z } = this.normalCameraLookAt
      const pos = this.currentModel.userData.position

      this.pathList.pop()
      this.camera.position = new THREE.Vector3(pos.x, pos.y, pos.z)
      new TWEEN.Tween(this.camera)
        .to(
          {
            position: this.normalCameraPosition,
          },
          1500,
        )
        .onUpdate(e => {
          this.camera.lookAt(x, y, z)
          this.controls.target.set(x, y, z)
        })
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .start()
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
        this.getObjectModel(this.group.waterWorks, THREE.Mesh),
      )

      if (intersects && intersects.length) {
        const selected = intersects[0]
        const object = selected.object

        this.clearHighlight(this.group.waterWorks)
        if (object.userData.interactive) {
          object.material.emissive.setHex(0xff0000)

          this.currentModel = object
          // 在动画开始之前预先创建场景模型
          this.createSphere()

          const startPosition = this.camera.position.clone() // 起始位置
          const startLookAt = this.camera
            .getWorldDirection(new THREE.Vector3())
            .clone() // 起始朝向

          new TWEEN.Tween({ t: 0 }) // 使用t参数作为时间插值因子
            .to({ t: 1 }, 2000) // 将t从0过渡到1，持续时间为2000毫秒
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .onUpdate(({ t }) => {
              // 更新位置
              this.camera.position.lerpVectors(
                startPosition,
                object.getWorldPosition(),
                t,
              )

              // 更新朝向
              this.camera.lookAt(
                new THREE.Vector3().addVectors(
                  this.camera.position,
                  startLookAt
                    .clone()
                    .lerp(object.getWorldDirection(new THREE.Vector3()), t),
                ),
              )
            })
            .onComplete(e => {
              this.clearHighlight(this.group.waterWorks)
              this.pathList.push(object.name)
            })
            .start()
        }

        console.log('拾取坐标: ', selected.point)
      }
    },

    // 提取指定类型的对象模型
    getObjectModel(group, type) {
      const arr = []

      // traverse 方法可以实现递归遍历
      group.traverse(obj => {
        if (obj instanceof type) {
          arr.push(obj)
        }
      })

      return arr
    },

    // 取消所有物体高亮
    clearHighlight(group) {
      group.traverse(obj => {
        if (obj.isMesh) {
          obj.material.emissive.setHex(0x000000)
        }
      })
    },

    // 创建一个球体
    createSphere() {
      const geometry = new THREE.BoxGeometry(5000, 5000, 5000)
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      const sphere = new THREE.Mesh(geometry, material)

      this.group.build2YNSCYQ.add(sphere)
      this.scene.add(this.group.build2YNSCYQ)
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
  .back {
    position: absolute;
    top: 30px;
    right: 30px;
  }
}
</style>
