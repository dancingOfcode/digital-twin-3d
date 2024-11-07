<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import Viewer from '@/common/three/viewer'
import Header from '@/components/header.vue'
import ModelLoader from '@/common/three/modelLoader'
import ListenerMouseClick from '@/common/three/listenerMouseClick'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js' // 引入dat.gui.js的一个类GUI
import {
  renderLabel,
  drawSquareArea,
  drawTexture,
  drawPlane,
  drawStair,
} from '@/common/utils/utils'
import {
  agvColorMap,
  labelData,
  squareData,
  textureData,
  planeData,
  stairData,
  textureData_3,
  textureData_9,
} from '@/common/utils/constant'
import ActionMenu from '@/components/actionMenu.vue'
import ActionDetail from '@/components/actionDetail.vue'

const currentTab = ref(null)
const currentIndex = ref(0)
const viewer = ref(null)
const worker = ref(null)

onMounted(() => {
  // 初始化threejs 视图场景
  initViewer()
})

// 初始化视图
const initViewer = () => {
  viewer.value = new Viewer('three-container')
  viewer.value.lights.addAmbientLight()
  // 监听鼠标点击事件
  new ListenerMouseClick(viewer.value)

  // 添加性能监测
  viewer.value.addStats()

  // gui工具调试参数
  const gui = new GUI()

  // 添加CSS3DLabel
  renderLabel('3DLabel', viewer.value, labelData)

  // 绘制方形区域
  drawSquareArea(viewer.value, squareData)

  // 绘制agv小车路径
  drawTexture(viewer.value, textureData)

  // 绘制平面
  drawPlane(viewer.value, planeData)

  // 绘制电梯
  drawStair(viewer.value, stairData)

  // 添加一个移动盒子
  const moveBox = new THREE.BoxGeometry(20, 26, 20)
  const moveMaterial = new THREE.MeshBasicMaterial({
    color: '#e3cf57',
  })
  const moveMesh = new THREE.Mesh(moveBox, moveMaterial)
  moveMesh.name = 'moveBox'
  moveMesh.rotation.set(0, -Math.PI / 4, 0)
  moveMesh.position.set(12, 16, -106)
  const moveMesh2 = moveMesh.clone()
  moveMesh2.name = 'moveBox2'
  viewer.value.scene.add(moveMesh, moveMesh2)

  // 添加一个辅助网格地面
  const gridHelper = new THREE.GridHelper(5000, 150, 0x004444, 0x004444)
  gridHelper.rotateY(Math.PI / 4) // 网格平行于z轴
  viewer.value.scene.add(gridHelper)

  // 模型加载
  const modelLoader = new ModelLoader(viewer.value)

  // 添加堆叠货物
  modelLoader.loadModelToScene(
    '/model/glb/goods.glb',
    gltf => {
      gltf.setScale(50)
      gltf.scene.position.set(-370, 0, 540)
      gltf.scene.rotation.set(0, -Math.PI / 4, 0)
      gltf.scene.traverse(obj => {
        if (obj.isMesh) {
          obj.material = new THREE.MeshBasicMaterial({
            color: '#E9C2A6',
          })
        }
      })
    },
    process => {
      console.log('加载进度', Math.floor(process * 100) + '%')
    },
  )

  // 添加操作工人
  modelLoader.loadModelToScene(
    '/model/glb/worker.glb',
    gltf => {
      gltf.setScale(30)
      worker.value = gltf
      // 开启工人动画
      worker.value.startAnimate(6)
      gltf.scene.position.set(-160, 0, -235)
      gltf.scene.rotation.set(0, -Math.PI / 4, 0)
      gltf.scene.traverse(obj => {
        if (obj.isMesh) {
          // "Beta_Joints" "Beta_Joints"
          if (obj.name === 'Beta_Joints') {
            obj.material = new THREE.MeshBasicMaterial({
              color: '#04a1ed',
            })
          } else {
            obj.material = new THREE.MeshBasicMaterial({
              color: '#fff',
            })
          }
        }
      })
      gltf.cloneModel([-150, 0, 220]).startAnimate(5)
    },
    process => {
      console.log('加载进度', Math.floor(process * 100) + '%')
    },
  )

  // 添加叉车
  modelLoader.loadModelToScene(
    '/model/fbx/forklift/forklift.obj',
    gltf => {
      gltf.setScale(0.06)
      gltf.model.name = 'forklift'
      gltf.scene.position.set(-225, 22, -178)
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

  // 添加agv物流小车
  modelLoader.loadModelToScene(
    '/model/fbx/agv/agv.fbx',
    gltf => {
      gltf.setScale(0.5)
      gltf.model.name = 'agv小车'
      gltf.scene.position.set(215, 6, -310)
      gltf.scene.rotation.set(0, -Math.PI / 4, 0)
    },
    process => {
      console.log('加载进度', Math.floor(process * 100) + '%')
    },
  )

  // 添加托盘
  modelLoader.loadModelToScene(
    '/model/glb/tray.glb',
    gltf => {
      gltf.setScale(16)
      gltf.scene.position.set(12, 0, -106)
      gltf.scene.rotation.set(0, -Math.PI / 4, 0)
      // 将物料置于托盘上
      const tray_les = gltf.cloneModel()
      const tray_les_geo = new THREE.BoxGeometry(1, 1, 1)
      const tray_les_mat = new THREE.MeshBasicMaterial({ color: '#e3cf57' })
      const tray_mesh = new THREE.Mesh(tray_les_geo, tray_les_mat)
      tray_mesh.position.setY(0.7)
      tray_les.scene.position.set(60, 0, 12)
      tray_les.scene.add(tray_mesh)
      // 存储区
      for (let i = 0; i <= 4; i++) {
        const model = tray_les.cloneModel()
        model.setScale(30)
        model.scene.position.set(-295 + 45 * i, 0, 460 - 45 * i)
      }
      // 存储区
      for (let i = 0; i <= 4; i++) {
        const model = tray_les.cloneModel()
        model.setScale(35)
        model.scene.position.set(480 + 42 * i, 0, -315 - 42 * i)
        model.scene.children[1].material = new THREE.MeshBasicMaterial({
          color: '#d2b88c',
        })
      }
      // LES-备料区
      for (let i = 0; i <= 6; i++) {
        const model = tray_les.cloneModel()
        model.scene.position.set(86 + 26 * i, 0, -12 - 26 * i)
      }
      // WMS发料区
      for (let i = 0; i <= 4; i++) {
        const model = tray_les.cloneModel()
        model.scene.position.set(-86 + 26 * i, 0, 158 + 26 * i)
        model.scene.children[1].material = new THREE.MeshBasicMaterial({
          color: '#04a1ed',
        })
      }
      // 作业区
      for (let i = 0; i <= 4; i++) {
        const model = tray_les.cloneModel()
        model.scene.position.set(306 + 24 * i, 0, -660 + 24 * i)
        model.scene.children[1].material = new THREE.MeshBasicMaterial({
          color: '#04a1ed',
        })
      }
      // 电机二线-线体预留区
      for (let i = 0; i <= 4; i++) {
        const model = gltf.cloneModel()
        model.scene.position.set(389 + 35 * i, 0, -742 - 35 * i)
      }
    },
    process => {
      console.log('加载进度', Math.floor(process * 100) + '%')
    },
  )

  // 加载货架
  modelLoader.loadModelToScene(
    '/model/glb/goodsShelves.glb',
    gltf => {
      gltf.setScale(10, 12, 10)
      gltf.scene.rotation.set(0, Math.PI / 4, 0)
      // 上、下架区货架
      gltf.scene.position.set(-372, 0, -300)
      gltf.scene.traverse(function (obj) {
        if (obj.isMesh) {
          if (obj.name === 'Mesh_3ca768f6-0918-4d31-b980-7eb5f5f3c989012') {
            // 重新设置材质
            obj.material = new THREE.MeshBasicMaterial({
              color: '#62658f',
            })
          } else {
            //  重新设置材质
            obj.material = new THREE.MeshBasicMaterial({
              color: '#e3cf57',
            })
          }
        }
      })
      // 自动化立库
      for (let i = 0; i < 5; i++) {
        let cloneModel = gltf.cloneModel()
        cloneModel.scene.position.set(-332 + i * 60, 0, -340 - i * 60)
      }
    },
    process => {
      console.log('加载进度', Math.floor(process * 100) + '%')
    },
  )

  // 添加堆垛叠盘
  modelLoader.loadModelToScene(
    '/model/glb/stackingTray.glb',
    gltf => {
      gltf.setScale(20, 30, 20)
      gltf.scene.position.set(-140, 0, 50)
      gltf.scene.rotation.set(0, -Math.PI / 4, 0)
      gltf.scene.traverse(function (obj) {
        if (obj.isMesh) {
          // 重新设置材质
          obj.material = new THREE.MeshBasicMaterial({
            color: '#04a1ed',
          })
        }
      })
      // AGV空载具区
      for (let i = 0; i < 3; i++) {
        const gltf3 = gltf.cloneModel()
        gltf3.setScale(20, 30, 20)
        gltf3.scene.position.set(-105 + 35 * i, 0, 15 - 35 * i)
      }
    },
    process => {
      console.log('加载进度', Math.floor(process * 100) + '%')
    },
  )

  // 绘制门
  const doorGeomery = new THREE.BoxGeometry(15, 42, 2)
  const doorGeomery2 = new THREE.BoxGeometry(6, 96.75, 2)
  const doorMaterial = new THREE.MeshBasicMaterial({ color: '#8c9fbf' })
  const doorMesh = new THREE.Mesh(doorGeomery, doorMaterial)
  const doorMesh3 = new THREE.Mesh(doorGeomery2, doorMaterial)
  doorMesh3.rotation.set(0, -Math.PI / 4, -Math.PI / 2)
  doorMesh.rotation.set(0, -Math.PI / 4, 0)
  doorMesh.position.set(348.8, 21, -406.6)
  doorMesh3.position.set(377.7, 45, -377.7)
  const doorMesh2 = doorMesh.clone()
  doorMesh2.position.set(406.6, 21, -348.8)
  viewer.value.scene.add(doorMesh, doorMesh2, doorMesh3)

  setTimeout(() => {
    action3()
    action9()
  }, 3000)
}

// 动作切换
const actionChange = index => {
  currentIndex.value = index
  if (index === 3) {
    action3()
  }
  if (index === 9) {
    action9()
  }
}

// 人工下架
const action3 = () => {
  // 绘制agv小车路径
  drawTexture(viewer.value, textureData_3)
  const forklift = viewer.value.scene.getObjectByName('forklift')
  const moveBox = viewer.value.scene.getObjectByName('moveBox2')
  forklift.add(moveBox)
  moveBox.scale.set(20, 20, 20)
  moveBox.position.set(50, 285, 0)
  moveBox.rotation.set(0, -Math.PI / 2, 0)
  forklift.position.set(-295, 22, 112)
  forklift.rotation.set(0, (-Math.PI * 3) / 4, 0)
  worker.value.scene.rotation.set(0, (Math.PI * 3) / 4, 0)
  worker.value.scene.position.set(-360, 0, 175)
  // 开启工人动画
  worker.value.startAnimate(6)
  // 调整相机视角
  // viewer.value.camera.position.set(-300, 350, -350)
  let action3_1_forklift = viewer.value
    .addTweenAnimate(
      'action3_1_forklift',
      forklift.position,
      { x: -200, y: 22, z: 52 },
      3000,
    )
    .onComplete(() => {
      forklift.rotation.set(0, (Math.PI * 3) / 4, 0)
    })
  let action3_2_forklift = viewer.value
    .addTweenAnimate(
      'action3_2_forklift',
      forklift.position,
      { x: -102, y: 22, z: 150 },
      5000,
    )
    .onComplete(() => {
      forklift.rotation.set(0, (-Math.PI * 3) / 4, 0)
    })
  let action3_1_worker = viewer.value
    .addTweenAnimate(
      'action3_1_worker',
      worker.value.scene.position,
      { x: -255, y: 0, z: 70 },
      3000,
    )
    .onComplete(() => {
      worker.value.scene.rotation.set(0, Math.PI / 2, 0)
    })
  let action3_2_worker = viewer.value.addTweenAnimate(
    'action3_2_worker',
    worker.value.scene.position,
    { x: -120, y: 0, z: 175 },
    5000,
  )
  action3_1_forklift.start()
  action3_1_worker.start()
  action3_1_forklift.chain(action3_2_forklift)
  action3_2_forklift.chain(action3_1_forklift)
  action3_1_worker.chain(action3_2_worker)
  action3_2_worker.chain(action3_1_worker)
}

// 跨楼层搬运
const action9 = () => {
  // 绘制agv小车路径
  const agv = viewer.value.scene.getObjectByName('agv小车')
  const moveBox = viewer.value.scene.getObjectByName('moveBox')
  moveBox.rotation.set(0, (Math.PI * 3) / 4, 0)
  moveBox.position.set(25, 16, 0)
  agv.add(moveBox)
  drawTexture(viewer.value, textureData_9)
  agv.rotation.set(0, (-Math.PI * 3) / 4, 0)
  agv.position.set(115, 6, -386)
  let action9_1_agv = viewer.value.addTweenAnimate(
    'action9_1_agv',
    agv.position,
    { x: -412, y: 6, z: 142 },
    10000,
  )
  let action9_2_agv = viewer.value.addTweenAnimate(
    'action9_2_agv',
    agv.rotation,
    { x: 0, y: -Math.PI / 4, z: 0 },
    1000,
  )
  let action9_3_agv = viewer.value.addTweenAnimate(
    'action9_3_agv',
    agv.position,
    { x: -445, y: 6, z: 109 },
    3000,
  )
  let action9_4_agv = viewer.value.addTweenAnimate(
    'action9_4_agv',
    agv.position,
    { x: -445, y: 142, z: 109 },
    3000,
  )
  let action9_5_agv = viewer.value.addTweenAnimate(
    'action9_5_agv',
    agv.position,
    { x: -412, y: 142, z: 142 },
    2000,
  )
  let action9_6_agv = viewer.value.addTweenAnimate(
    'action9_6_agv',
    agv.rotation,
    { x: 0, y: (-Math.PI * 3) / 4, z: 0 },
    1000,
  )
  let action9_7_agv = viewer.value.addTweenAnimate(
    'action9_7_agv',
    agv.position,
    { x: -595, y: 142, z: 319 },
    5000,
  )
  let action9_8_agv = viewer.value.addTweenAnimate(
    'action9_8_agv',
    agv.rotation,
    { x: 0, y: -Math.PI / 4, z: 0 },
    1000,
  )
  let action9_9_agv = viewer.value
    .addTweenAnimate(
      'action9_9_agv',
      agv.position,
      { x: -489, y: 142, z: 428 },
      5000,
    )
    .onComplete(() => {
      agv.rotation.set(0, (-Math.PI * 3) / 4, 0)
    })
  action9_1_agv.start()
  action9_1_agv.chain(action9_2_agv)
  action9_2_agv.chain(action9_3_agv)
  action9_3_agv.chain(action9_4_agv)
  action9_4_agv.chain(action9_5_agv)
  action9_5_agv.chain(action9_6_agv)
  action9_6_agv.chain(action9_7_agv)
  action9_7_agv.chain(action9_8_agv)
  action9_8_agv.chain(action9_9_agv)
  action9_9_agv.chain(action9_1_agv)
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

<style lang="scss" scoped>
#three-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.menu-wrap {
  position: absolute;
  top: 50%;
  color: #fff;
  left: vw(12);
  font-size: vw(28);
  cursor: pointer;
  transform: translate(0, -50%);

  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: vw(12);
    width: vw(42);
    height: vh(188);
    letter-spacing: vw(3);
    margin-bottom: vh(16);
    writing-mode: vertical-rl;
    background: url('@/assets/images/tab_bg.png') no-repeat;
    background-size: 100% 100%;
    &:hover {
      color: #00b2df;
    }
  }

  .active {
    color: #00b2df;
  }
}
</style>
