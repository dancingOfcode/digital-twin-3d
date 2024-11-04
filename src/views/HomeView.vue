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
  // viewer.value.addStats()

  // gui工具调试参数
  const gui = new GUI()

  // 添加CSS3DLabel
  renderLabel('3DLabel', viewer.value, labelData)

  // 绘制方形区域
  drawSquareArea(viewer.value, squareData)

  // 绘制agv小车路径
  // drawTexture(viewer.value, textureData)

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
  viewer.value.scene.add(moveMesh)

  // 添加一个辅助网格地面
  const gridHelper = new THREE.GridHelper(5000, 150, 0x004444, 0x004444)
  gridHelper.rotateY(Math.PI / 4) // 网格平行于z轴
  viewer.value.scene.add(gridHelper)

  // 模型加载
  const modelLoader = new ModelLoader(viewer.value)

  // 添加操作工人
  modelLoader.loadModelToScene(
    '/model/glb/worker.glb',
    gltf => {
      console.log('gltf', gltf)
      gltf.setScale(50)
      worker.value = gltf
      gltf.scene.name = 'worker'
      // gltf.scene.position.set(215, 6, -310)
      gltf.scene.rotation.set(0, Math.PI / 4, 0)
      gltf.scene.traverse(obj => {
        if (obj.isMesh) {
          // "Beta_Joints" "Beta_Joints"
          console.log('obj', obj)
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
    },
    process => {
      console.log('加载进度', Math.floor(process * 100) + '%')
    },
  )

  // 添加叉车
  // modelLoader.loadModelToScene(
  //   '/model/fbx/forklift/forklift.obj',
  //   gltf => {
  //     gltf.setScale(0.06)
  //     gltf.model.name = '叉车'
  //     gltf.scene.position.set(142, 22, -238)
  //     gltf.scene.rotation.set(0, Math.PI / 4, 0)
  //     // 处理模型颜色
  //     gltf.scene.traverse(function (obj) {
  //       if (obj.isMesh) {
  //         if (agvColorMap[obj.name]) {
  //           // 重新设置材质
  //           obj.material = new THREE.MeshBasicMaterial({
  //             color: agvColorMap[obj.name],
  //           })
  //         } else {
  //           obj.material = new THREE.MeshBasicMaterial({
  //             color: '#000000',
  //           })
  //         }
  //         return
  //       }
  //     })
  //   },
  //   process => {
  //     console.log('加载进度', Math.floor(process * 100) + '%')
  //   },
  // )

  // 添加agv物流小车
  // modelLoader.loadModelToScene(
  //   '/model/fbx/agv/agv.fbx',
  //   gltf => {
  //     gltf.setScale(0.5)
  //     gltf.model.name = 'agv小车'
  //     gltf.scene.position.set(215, 6, -310)
  //     gltf.scene.rotation.set(0, -Math.PI / 4, 0)
  //   },
  //   process => {
  //     console.log('加载进度', Math.floor(process * 100) + '%')
  //   },
  // )

  // 添加托盘
  // modelLoader.loadModelToScene(
  //   '/model/glb/tray.glb',
  //   gltf => {
  //     gltf.setScale(16)
  //     gltf.scene.position.set(12, 0, -106)
  //     gltf.scene.rotation.set(0, -Math.PI / 4, 0)
  //     // 将物料置于托盘上
  //     const tray_les = gltf.cloneModel()
  //     const tray_les_geo = new THREE.BoxGeometry(1, 1, 1)
  //     const tray_les_mat = new THREE.MeshBasicMaterial({ color: '#e3cf57' })
  //     const tray_mesh = new THREE.Mesh(tray_les_geo, tray_les_mat)
  //     tray_mesh.position.setY(0.7)
  //     tray_les.scene.position.set(60, 0, 12)
  //     tray_les.scene.add(tray_mesh)
  //     // LES-备料区
  //     for (let i = 0; i <= 6; i++) {
  //       const model = tray_les.cloneModel()
  //       model.scene.position.set(86 + 26 * i, 0, -12 - 26 * i)
  //     }
  //     // WMS发料区
  //     for (let i = 0; i <= 4; i++) {
  //       const model = tray_les.cloneModel()
  //       model.scene.position.set(-86 + 26 * i, 0, 158 + 26 * i)
  //       model.scene.children[1].material = new THREE.MeshBasicMaterial({
  //         color: '#04a1ed',
  //       })
  //     }
  //     // 作业区
  //     for (let i = 0; i <= 4; i++) {
  //       const model = tray_les.cloneModel()
  //       model.scene.position.set(306 + 24 * i, 0, -660 + 24 * i)
  //       model.scene.children[1].material = new THREE.MeshBasicMaterial({
  //         color: '#04a1ed',
  //       })
  //     }
  //     // 电机二线-线体预留区
  //     for (let i = 0; i <= 4; i++) {
  //       const model = gltf.cloneModel()
  //       model.scene.position.set(389 + 35 * i, 0, -742 - 35 * i)
  //     }
  //     gui.add(gltf.scene.position, 'x', -1000, 1000).step(1)
  //     gui.add(gltf.scene.position, 'y', -1000, 1000).step(1)
  //     gui.add(gltf.scene.position, 'z', -1000, 1000).step(1)
  //   },
  //   process => {
  //     console.log('加载进度', Math.floor(process * 100) + '%')
  //   },
  // )

  // 加载货架
  // modelLoader.loadModelToScene(
  //   '/model/glb/goodsShelves.glb',
  //   gltf => {
  //     gltf.setScale(10, 12, 10)
  //     gltf.scene.rotation.set(0, Math.PI / 4, 0)
  //     // 上、下架区货架
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
  //             color: '#e3cf57',
  //           })
  //         }
  //       }
  //     })
  //     for (let i = 0; i < 9; i++) {
  //       let cloneModel = gltf.cloneModel()
  //       cloneModel.scene.position.set(-332 + i * 40, 0, -340 - i * 40)
  //     }
  //     // 仓储存贮区货架
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
  //     for (let i = 0; i < 9; i++) {
  //       let cloneModel = gltf2.cloneModel()
  //       cloneModel.scene.position.set(-152 - i * 36.5, 0, 275 + i * 36.5)
  //     }
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
  //   },
  //   process => {
  //     console.log('加载进度', Math.floor(process * 100) + '%')
  //   },
  // )

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
    worker.value.startAnimate(6)
    setTimeout(() => {
      worker.value.stopAnimate()
    }, 2000)
  }, 5000)
}

// 动作切换
const actionChange = index => {
  currentIndex.value = index
  if (index === 9) {
    action9()
  }
}

// 跨楼层搬运
const action9 = () => {
  // 绘制agv小车路径
  const agv = viewer.value.scene.getObjectByName('agv小车')
  const moveBox1 = viewer.value.scene.getObjectByName('moveBox')
  drawTexture(viewer.value, textureData_9)
  agv.rotation.set(0, (-Math.PI * 3) / 4, 0)
  agv.position.set(115, 6, -386)
  moveBox1.position.set(108, 12, -378)
  // animation
  let action9_1_agv = viewer.value.addTweenAnimate(
    'action9_1_agv',
    agv.position,
    { x: -412, y: 6, z: 142 },
    8000,
    5000,
    () => {
      const pos = new THREE.Vector3()
      agv.getWorldPosition(pos) //获取三维场景中某个对象世界坐标
      // 动态改变相机位置
      viewer.value.camera.position.set(pos.x * 1.5, pos.y * 3, pos.z * 1.5)
      // 动态计算相机视线
      viewer.value.camera.lookAt(-412, 6, 142)
      setTimeout(() => {
        viewer.value.camera.position.set(-850, 585, 620)
      }, 10000)
    },
  )
  let action9_1_moveBox = viewer.value.addTweenAnimate(
    'action9_1_moveBox',
    moveBox1.position,
    { x: -420, y: 12, z: 150 },
    8000,
    5000,
  )
  action9_1_agv.onComplete(() => {
    agv.rotation.set(0, (Math.PI * 3) / 4, 0)
    let action9_2_agv = viewer.value.addTweenAnimate(
      'action9_2_agv',
      agv.position,
      { x: -445, y: 6, z: 109 },
      3000,
    )
    action9_2_agv.onComplete(() => {
      let action9_3_agv = viewer.value.addTweenAnimate(
        'action9_3_agv',
        agv.position,
        { x: -445, y: 142, z: 109 },
        3000,
      )
      action9_3_agv.onComplete(() => {
        let action9_4_agv = viewer.value.addTweenAnimate(
          'action9_4_agv',
          agv.position,
          { x: -412, y: 142, z: 142 },
          3000,
        )
        action9_4_agv.onComplete(() => {
          agv.rotation.set(0, (-Math.PI * 3) / 4, 0)
          let action9_5_agv = viewer.value.addTweenAnimate(
            'action9_5_agv',
            agv.position,
            { x: -595, y: 142, z: 319 },
            5000,
          )
          action9_5_agv.onComplete(() => {
            agv.rotation.set(0, -Math.PI / 4, 0)
            viewer.value.addTweenAnimate(
              'action9_6_agv',
              agv.position,
              { x: -489, y: 142, z: 428 },
              5000,
            )
          })
        })
      })
    })
  })
  action9_1_moveBox.onComplete(() => {
    moveBox1.position.set(-422, 12, 132)
    let action9_2_moveBox = viewer.value.addTweenAnimate(
      'action9_2_moveBox',
      moveBox1.position,
      { x: -445, y: 12, z: 109 },
      3000,
    )
    action9_2_moveBox.onComplete(() => {
      let action9_3_moveBox = viewer.value.addTweenAnimate(
        'action9_3_moveBox',
        moveBox1.position,
        { x: -445, y: 154, z: 109 },
        3000,
      )
      action9_3_moveBox.onComplete(() => {
        let action9_4_moveBox = viewer.value.addTweenAnimate(
          'action9_4_moveBox',
          moveBox1.position,
          { x: -422, y: 154, z: 132 },
          3000,
        )
        action9_4_moveBox.onComplete(() => {
          moveBox1.position.set(-420, 154, 150)
          let action9_5_moveBox = viewer.value.addTweenAnimate(
            'action9_5_moveBox',
            moveBox1.position,
            { x: -602, y: 154, z: 326 },
            5000,
          )
          action9_5_moveBox.onComplete(() => {
            moveBox1.position.set(-587, 154, 326)
            viewer.value
              .addTweenAnimate(
                'action9_6_moveBox',
                moveBox1.position,
                { x: -480, y: 154, z: 437 },
                5000,
              )
              .onComplete(() => {
                setTimeout(() => {
                  // 清除 action9 相关动画
                  let tweenKeys = [
                    'action9_1_agv',
                    'action9_2_agv',
                    'action9_3_agv',
                    'action9_4_agv',
                    'action9_5_agv',
                    'action9_6_agv',
                    'action9_1_moveBox',
                    'action9_2_moveBox',
                    'action9_3_moveBox',
                    'action9_4_moveBox',
                    'action9_5_moveBox',
                    'action9_6_moveBox',
                  ]
                  viewer.value.removeTweenAnimate(tweenKeys)
                  // 清楚 action9 动画路线
                  viewer.value.removeModel(
                    textureData_9.map(item => item.textureKey),
                  )
                  // agv、物体恢复原位
                  agv.position.set(215, 6, -310)
                  agv.rotation.set(0, -Math.PI / 4, 0)
                  moveBox1.rotation.set(0, -Math.PI / 4, 0)
                  moveBox1.position.set(12, 15, -106)
                  // 相机位置
                  viewer.value.camera.position.set(550, 400, 550)
                  // 相机观看方向 坐标原点
                  viewer.value.camera.lookAt(0, 0, 0)
                }, 3000)
              })
          })
        })
      })
    })
  })
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
