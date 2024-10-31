<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import Viewer from '@/common/three/viewer'
import Header from '@/components/header.vue'
import ModelLoader from '@/common/three/modelLoader'
import LabelRender from '@/common/three/labelRender'
import ListenerMouseClick from '@/common/three/listenerMouseClick'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js' // 引入dat.gui.js的一个类GUI
import { renderLabel, drawSquareArea, drawTexture } from '@/common/utils/utils'
import {
  agvColorMap,
  labelData,
  squareData,
  textureData,
} from '@/common/utils/constant'
import ActionMenu from '@/components/actionMenu.vue'
import ActionDetail from '@/components/actionDetail.vue'

const currentTab = ref(null)
const currentIndex = ref(0)

onMounted(() => {
  // 初始化threejs 视图场景
  initViewer()
})

// 初始化视图
const initViewer = () => {
  const viewer = new Viewer('three-container')
  viewer.lights.addAmbientLight()
  // 监听鼠标点击事件
  new ListenerMouseClick(viewer)

  // 添加性能监测
  // viewer.addStats()

  // gui工具调试参数
  // const gui = new GUI()

  // 添加CSS3DLabel
  const labelRender = new LabelRender(viewer)
  renderLabel('3DLabel', viewer, labelData)

  // 绘制方形区域
  drawSquareArea(viewer, squareData)

  // 绘制agv小车路径
  drawTexture(viewer, textureData)

  // 添加一个移动盒子
  const moveBox = new THREE.BoxGeometry(30, 30, 30)
  const moveMaterial = new THREE.MeshBasicMaterial({
    color: '#887776',
  })
  const moveMesh = new THREE.Mesh(moveBox, moveMaterial)
  moveMesh.rotation.set(0, -Math.PI / 4, 0)
  moveMesh.position.set(-179, 32, -226)
  viewer.scene.add(moveMesh)

  // 添加一个辅助网格地面
  const gridHelper = new THREE.GridHelper(5000, 150, 0x004444, 0x004444)
  gridHelper.rotateY(Math.PI / 4) // 网格平行于z轴
  viewer.scene.add(gridHelper)

  // 模型加载
  const modelLoader = new ModelLoader(viewer)

  // 添加agv小车
  modelLoader.loadModelToScene(
    '/model/agv/AGV.obj',
    gltf => {
      gltf.setScale(0.05)
      gltf.scene.position.set(-180, 15, -225)
      gltf.scene.rotation.set(0, Math.PI / 4, 0)
      // 处理模型颜色
      gltf.scene.traverse(function (obj) {
        if (obj.isMesh) {
          if (agvColorMap[obj.name]) {
            // 重新设置材质
            obj.material = new THREE.MeshBasicMaterial({
              color: agvColorMap[obj.name],
            })
          } else {
            obj.material = new THREE.MeshBasicMaterial({
              color: '#000000',
            })
          }
          return
        }
      })
    },
    process => {
      console.log('加载进度', Math.floor(process * 100) + '%')
    },
  )

  // 加载货架
  // modelLoader.loadModelToScene(
  //   '/model/glb/goodsShelves.glb',
  //   gltf => {
  //     gltf.setScale(10, 12, 10)
  //     gltf.scene.rotation.set(0, Math.PI / 4, 0)
  //     gltf.scene.position.set(-372, 0, -300)
  //     gltf.scene.traverse(function (obj) {
  //       if (obj.isMesh) {
  //         if (obj.name === 'Mesh_3ca768f6-0918-4d31-b980-7eb5f5f3c989012') {
  //           // 重新设置材质
  //           obj.material = new THREE.MeshBasicMaterial({
  //             color: '#62658f',
  //           })
  //         } else {
  //           //  重新设置材质
  //           obj.material = new THREE.MeshBasicMaterial({
  //             color: '#887776',
  //           })
  //         }
  //       }
  //     })

  //     //  for (let i = 0; i < 15; i++) {
  //     //    const cloneModel = gltf.cloneModel()
  //     //    cloneModel.scene.position.set(-350 + i * 24, 0, -325 - i * 24)
  //     //  }

  //     const gltf2 = gltf.cloneModel()
  //     gltf2.scene.rotation.set(0, (5 / 4) * Math.PI, 0)
  //     gltf2.scene.position.set(-115, 0, 238)

  //     gltf2.scene.traverse(function (obj) {
  //       if (obj.isMesh) {
  //         if (obj.name !== 'Mesh_3ca768f6-0918-4d31-b980-7eb5f5f3c989012') {
  //           // 重新设置材质
  //           obj.material = new THREE.MeshBasicMaterial({
  //             color: '#04a1ed',
  //           })
  //         }
  //       }
  //     })

  //     const gltf3 = gltf2.cloneModel()
  //     gltf3.scene.position.set(-138, 0, 260)

  //     const gltf4 = gltf2.cloneModel()
  //     gltf4.scene.position.set(-138, 0, 260)
  //   },
  //   process => {
  //     console.log('加载进度', Math.floor(process * 100) + '%')
  //   },
  // )

  // 添加堆垛叠盘
  // modelLoader.loadModelToScene(
  //   '/model/glb/stackingTray.glb',
  //   gltf => {
  //     gltf.setScale(35, 100, 35)
  //     gltf.scene.position.set(10, 0, 150)
  //     gltf.scene.rotation.set(0, -Math.PI / 4, 0)
  //     gltf.scene.traverse(function (obj) {
  //       if (obj.isMesh) {
  //         // 重新设置材质
  //         obj.material = new THREE.MeshBasicMaterial({
  //           color: '#04a1ed',
  //         })
  //       }
  //     })

  //     gui.add(gltf.scene.position, 'x', -500, 500).step(1)
  //     gui.add(gltf.scene.position, 'y', -500, 500).step(1)
  //     gui.add(gltf.scene.position, 'z', -500, 500).step(1)

  //     const gltf2 = gltf.cloneModel()
  //     gltf2.setScale(35, 100, 35)
  //     gltf2.setPosition(45, 0, 190)

  //     const gltf3 = gltf.cloneModel()
  //     gltf3.setScale(20, 30, 20)
  //     gltf3.scene.position.set(-140, 0, 50)

  //     const gltf4 = gltf.cloneModel()
  //     gltf4.setScale(20, 30, 20)
  //     gltf4.scene.position.set(-115, 0, 25)

  //     const gltf5 = gltf.cloneModel()
  //     gltf5.setScale(20, 30, 20)
  //     gltf5.scene.position.set(-92, 0, 2)

  //     const gltf6 = gltf.cloneModel()
  //     gltf6.setScale(20, 30, 20)
  //     gltf6.scene.position.set(-68, 0, -20)

  //     const gltf7 = gltf.cloneModel()
  //     gltf7.setScale(20, 30, 20)
  //     gltf7.scene.position.set(-42, 0, -42)

  //     const gltf8 = gltf.cloneModel()
  //     gltf8.setScale(20, 30, 20)
  //     gltf8.scene.position.set(-18, 0, -65)

  //     const gltf9 = gltf.cloneModel()
  //     gltf9.setScale(20, 30, 20)
  //     gltf9.scene.position.set(225, 0, -315)
  //     gltf9.scene.traverse(function (obj) {
  //       if (obj.isMesh) {
  //         // 重新设置材质
  //         obj.material = new THREE.MeshBasicMaterial({
  //           color: '#3e6d7a',
  //         })
  //       }
  //     })
  //   },
  //   process => {
  //     console.log('加载进度', Math.floor(process * 100) + '%')
  //   },
  // )

  // 批量创建多个长方体表示物料
  const group1 = new THREE.Group()
  group1.name = '物料1'
  for (let i = 0; i < 7; i++) {
    const geometry1 = new THREE.BoxGeometry(10, 10, 10)
    const material1 = new THREE.MeshBasicMaterial({
      color: '#e4d643',
    })
    const mesh1 = new THREE.Mesh(geometry1, material1)
    mesh1.position.x = i * 20 // 网格模型mesh沿着x轴方向阵列
    group1.add(mesh1) //添加到组对象group1
    mesh1.name = i + 1 + '号楼'
  }
  group1.position.set(-85, 0, 175)
  group1.rotation.set(-Math.PI / 2, 0, -Math.PI / 4)
  const group2 = group1.clone()
  group2.position.set(-60, 0, 155)
  viewer.scene.add(group1, group2)
}

// 动作切换
const actionChange = index => {
  currentIndex.value = index
}
</script>

<template>
  <div class="screen-container">
    <div id="three-container"></div>
    <div class="menu-wrap">
      <div
        @click="currentTab = 'detailActions'"
        :class="['menu-item', { active: currentTab === 'detailActions' }]"
      >
        细节动作模拟
      </div>
      <div
        @click="currentTab = 'standardActions'"
        :class="['menu-item', { active: currentTab === 'standardActions' }]"
      >
        标准动作模拟
      </div>
    </div>
    <Header title="物流调度平台场景分析"></Header>
    <ActionMenu
      v-if="currentTab"
      :tabName="currentTab"
      @change="actionChange"
      @close-pop="
        () => {
          currentTab = null
          currentIndex = 0
        }
      "
    >
    </ActionMenu>
    <ActionDetail
      v-if="currentIndex"
      :currentIndex="currentIndex"
      @close-pop="currentIndex = 0"
    ></ActionDetail>
  </div>
</template>

<style>
#three-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.menu-wrap {
  position: absolute;
  color: #fff;
  font-size: 28px;
  left: 12px;
  top: 50%;
  cursor: pointer;
  transform: translate(0, -50%);
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  width: 42px;
  height: 188px;
  letter-spacing: 3px;
  margin-bottom: 16px;
  writing-mode: vertical-rl;
  background: url('@/assets/images/tab_bg.png') no-repeat;
  background-size: 100% 100%;
}

.menu-item:hover {
  color: #00b2df;
}

.active {
  color: #00b2df;
}
</style>
