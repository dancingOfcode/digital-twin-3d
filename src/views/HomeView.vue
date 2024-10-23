<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import Viewer from '@/common/three/viewer'
import ModelLoader from '@/common/three/modelLoader'
import LabelRender from '@/common/three/labelRender'
import SkyBox from '@/common/three/skyBox'

onMounted(() => {
  initViewer()
})

// 初始化视图
const initViewer = () => {
  const viewer = new Viewer('three-container')
  let sky = new SkyBox(viewer)
  sky.setSkybox('night')
  const geometry = new THREE.BoxGeometry(50, 50, 50)
  const material = new THREE.MeshBasicMaterial({
    color: '#ff2',
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = '正方体'
  viewer.scene.add(mesh)
  const ambient = new THREE.AmbientLight(0xffffff, 10000000)
  viewer.scene.add(ambient)
  viewer.addStats()
  viewer.startMouseEvent(
    'click',
    modle => {
      const condition = ['正方体', '长方体']
      if (condition.includes(modle.name)) {
        viewer.addComposer(modle, 'red', 2)
      }
    },
    () => {
      viewer.removeComposer()
    },
  )
  const modelLoader = new ModelLoader(viewer)
  const labelRender = new LabelRender(viewer)
  labelRender.addCss2DLabel('测试888')
  labelRender.addCss3DLabel('测试3333333333333333')
  labelRender.addCss3DSprite(123)
  modelLoader.loadModelToScene(
    '/model/agv/AGV.obj',
    model => {
      console.log('model', model)
      model.setScale(0.01)
      model.castAndReceiveShadow()
      model.scene.position.set(13, 0, 15)
      model.scene.name = '人'
      model.startAnimate(1)
      model.cloneModel([35, 0, 30]).startAnimate()
      model.cloneModel([50, 0, 30]).startAnimate()
      console.log('viewer', viewer)
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
