<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import SkyBox from '@/common/three/skyBox'
import Viewer from '@/common/three/viewer'
import ModelLoader from '@/common/three/modelLoader'
import LabelRender from '@/common/three/labelRender'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import TWEEN from '@tweenjs/tween.js';

onMounted(() => {
  initViewer()
})

// 初始化视图
const initViewer = () => {
  const viewer = new Viewer('three-container')

  // 添加辅助坐标系
  viewer.addAxesHelper()

  // 添加性能监测
  viewer.addStats()

  // gui工具调试参数
  const gui = new GUI()

  // 添加天空盒
  // let sky = new SkyBox(viewer)
  // sky.setSkybox('night')

  // 添加一个辅助网格地面
  const gridHelper = new THREE.GridHelper(5000, 150, 0x004444, 0x004444);
  gridHelper.rotateY(Math.PI / 4) // 网格平行于z轴
  viewer.scene.add(gridHelper)

  // 添加货箱子
  const geometry = new THREE.BoxGeometry(30, 30, 30)
  const material = new THREE.MeshBasicMaterial({ color: 'green' })
  const box = new THREE.Mesh(geometry, material)
  box.position.set(0, 32, 0)
  viewer.scene.add(box)

  // 添加agv小车
  const modelLoader = new ModelLoader(viewer)
  modelLoader.loadModelToScene(
    '/model/agv/AGV.obj',
    model => {
      model.setScale(0.05)
      model.model.position.set(0, 15, 0)
      viewer.addTweenAnimate(model.model.position, { x: 200, y: 15, z: 0 }, 5000)
      viewer.addTweenAnimate(box.position, { x: 200, y: 15, z: 0 }, 5000)
    },
    process => {
      console.log('加载进度', Math.floor(process * 100) + '%')
    },
  )
}
</script>

<template>
  <div class="screen-container">
    <div id="three-container"></div>
  </div>
</template>

<style>
#three-container {
  width: 100vw;
  height: 100vh;
}
</style>
