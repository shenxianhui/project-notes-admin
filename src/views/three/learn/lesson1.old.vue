<!--
 * @Description: 创建一个场景
 * @Author: shenxh
 * @Date: 2022-07-21 14:06:32
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-22 09:34:52
-->
<template>
  <div class="admin-content">
    <div class="three">
      <!-- 放性能监测的容器 -->
      <div id="stats"></div>
      <!-- 3D模型容器 -->
      <div id="container"></div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export default {
  name: 'lesson1',
  components: {},
  props: {},
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      clearAnim: null,
      stats: null, // 性能监测
      textureLoader: null, // 纹理加载器
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initThree();
  },
  beforeDestroy() {
    cancelAnimationFrame(this.clearAnim); // 清除requestAnimationFrame
    this.renderer.domElement.removeEventListener(
      'click',
      this.modelMouseClick,
      false,
    );
    (this.scene = null), // 场景
      (this.camera = null), // 照相机
      (this.renderer = null), // 渲染器
      (this.mesh = null), // 网格
      (this.textureLoader = null), // 纹理加载器
      (this.mixer = null),
      (this.groupBox = null),
      (this.stats = null), // 性能监测
      (this.control = null), // 相机控件
      (this.clock = null);
  },
  methods: {
    initThree() {
      const threeDom = document.getElementById('container');
      const statsDom = document.getElementById('stats');

      // 场景
      this.scene = new THREE.Scene();
      // 1.2 相机
      this.camera = new THREE.PerspectiveCamera(
        75,
        threeDom.offsetWidth / threeDom.offsetHeight,
        0.1,
        1000,
      );
      // 设置摄像机位置,相机方向逆X轴方向，倾斜向下看
      // this.camera.position.set(360, 360, 360);
      this.camera.position.set(10, 20, 40);
      // 指向场景中心
      this.camera.lookAt(this.scene.position);
      // 1.3 渲染器
      this.renderer = new THREE.WebGLRenderer({
        antialias: true, // 抗锯齿
      });
      // 创建纹理加载器
      this.textureLoader = new THREE.TextureLoader();
      // 创建一个组合对象
      // this.groupBox = new THREE.Group();
      // 添加坐标轴，辅助判断位置
      let axesHelper = new THREE.AxesHelper(20);
      this.scene.add(axesHelper);

      // 添加网格
      const gridHelper = new THREE.GridHelper(200, 40, 0xf0f, 0xff000020);
      this.scene.add(gridHelper);

      // 设置环境
      // this.renderer.setClearColor(new THREE.Color('#f1f9fb'));

      // 设置场景大小
      this.renderer.setSize(threeDom.offsetWidth, threeDom.offsetHeight);

      // 点光源
      let point = new THREE.PointLight(0xffffff);
      point.position.set(500, 300, 400); // 点光源位置
      this.scene.add(point); // 点光源添加到场景中

      // 环境光
      let light = new THREE.AmbientLight(0x404040); // soft white light
      this.scene.add(light);

      // 阳光
      let directionalLight = new THREE.DirectionalLight('#ffffff', 0.5); // 太阳
      directionalLight.position.set(40, 60, 10);
      directionalLight.shadow.camera.near = 1; //产生阴影的最近距离
      directionalLight.shadow.camera.far = 400; //产生阴影的最远距离
      directionalLight.shadow.camera.left = -50; //产生阴影距离位置的最左边位置
      directionalLight.shadow.camera.right = -50; //最右边
      directionalLight.shadow.camera.top = 20; //最上边
      directionalLight.shadow.camera.bottom = -50; //最下面
      //这两个值决定生成阴影密度 默认512
      directionalLight.shadow.mapSize.height = 1024;
      directionalLight.shadow.mapSize.width = 1024;
      //告诉平行光需要开启阴影投射
      directionalLight.castShadow = true;
      this.scene.add(directionalLight);

      // 渲染div到canvas
      threeDom.appendChild(this.renderer.domElement);

      //创建性能监测
      this.stats = new Stats();
      this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      this.stats.domElement.style.position = 'absolute'; //绝对坐标
      this.stats.domElement.style.left = '0px'; // (0,0)px,左上角
      this.stats.domElement.style.top = '0px';
      statsDom.appendChild(this.stats.domElement);

      // 加载 glb、gltf模型
      const loader = new GLTFLoader();

      const dracoLoader = new DRACOLoader();
      // dracoLoader.setDecoderPath('/utils/draco/')
      dracoLoader.setDecoderPath('/utils/draco/');
      loader.setDRACOLoader(dracoLoader);

      loader.load(
        // '/modules/st_happens/scene.gltf',
        '/modules/water-model/build1YNSCYQ.glb',
        gltf => {
          // gltf.scene.traverse(function(child) {
          //   if (child.isMesh) {
          //     child.material.emissive = child.material.color;
          //     child.material.emissiveMap = child.material.map;
          //   }
          // });
          console.log(gltf);
          gltf.scene.position.set(-30, -13, -3);
          this.scene.add(gltf.scene);
        },
        undefined,
        error => {
          console.error(error);
        },
      );

      // 加载 FBX 模型
      // const loader = new FBXLoader()

      // loader.load('/modules/st-happens/source/egg.fbx', object => {
      //   // 加载路径fbx文件
      //   console.log(object, 'object----->>>')
      //   object.traverse(child => {
      //     if (child.isMesh) {
      //       child.castShadow = true
      //       child.receiveShadow = true
      //     }
      //   })
      //   this.scene.add(object) //模型
      // })

      // 纹理
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      // 渲染
      this.renderer.render(this.scene, this.camera);

      this.initControls();
      this.animate();
    },

    initControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);

      // 如果使用animate方法时，将此函数删除

      //this.controls.addEventListener( 'change', this.renderer );

      // 使动画循环使用时阻尼或自转 意思是否有惯性

      this.controls.enableDamping = true;

      //动态阻尼系数 就是鼠标拖拽旋转灵敏度

      //controls.dampingFactor = 0.25;

      //是否可以缩放

      this.controls.enableZoom = true;

      //是否自动旋转

      // this.controls.autoRotate = true;

      //设置相机距离原点的最近距离

      this.controls.minDistance = 0;

      //设置相机距离原点的最远距离

      this.controls.maxDistance = 600;

      //是否开启右键拖拽

      this.controls.enablePan = true;
    },

    animate() {
      // 循环调用函数
      this.clearAnim = requestAnimationFrame(this.animate);
      //更新相机控件
      this.controls.update();
      // 更新性能插件
      this.stats.update();
      //渲染界面
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style lang="less" scoped>
.three {
  width: 100%;
  height: 100%;
  #stats {
    position: absolute;
  }
  #container {
    width: 100%;
    height: 100%;
  }
}
</style>
