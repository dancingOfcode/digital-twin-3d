<script setup>
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { onMounted } from 'vue'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js' // 引入dat.gui.js的一个类GUI
import SkyBox from '@/common/three/skyBox'
import Viewer from '@/common/three/viewer'
import ModelLoader from '@/common/three/modelLoader'
import LabelRender from '@/common/three/labelRender'
import ListenerMouseClick from '@/common/three/listenerMouseClick'
import Header from '@/components/header/header.vue'
import uvUrl from '../assets/images/rightArrow.png'

onMounted(() => {
  initViewer()
})

// 初始化视图
const initViewer = () => {
  const viewer = new Viewer('three-container')
  viewer.lights.addAmbientLight()
  // 监听鼠标点击事件
  new ListenerMouseClick(viewer)

  // 添加辅助坐标系
  // viewer.addAxesHelper()

  // 添加性能监测
  // viewer.addStats()

  // gui工具调试参数
  const gui = new GUI()

  // 添加天空盒
  // let sky = new SkyBox(viewer)
  // sky.setSkybox('night')

  // 添加一个辅助网格地面
  const gridHelper = new THREE.GridHelper(5000, 150, 0x004444, 0x004444)
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
      viewer.addTweenAnimate(
        model.model.position,
        { x: -800, y: 15, z: 0 },
        10000,
      )
      viewer.addTweenAnimate(box.position, { x: -800, y: 15, z: 0 }, 10000)
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
      gltf.scene.position.set(-372, 0, -300)
      gltf.scene.traverse(function (obj) {
        if (obj.isMesh) {
          if (obj.name === 'Mesh_3ca768f6-0918-4d31-b980-7eb5f5f3c989012') {
            // 重新设置材质
            obj.material = new THREE.MeshBasicMaterial({
              color: '#62658f',
            });
          } else {
            // 重新设置材质
            obj.material = new THREE.MeshBasicMaterial({
              color: '#887776',
            });
          }
        }
      });

      for (let i = 0; i < 15; i++) {
        const cloneModel = gltf.cloneModel()
        cloneModel.scene.position.set(-350 + (i * 24), 0, -325 - (i * 24))
      }

      const gltf2 = gltf.cloneModel()
      gltf2.scene.rotation.set(0, 5 / 4 * Math.PI, 0)
      gltf2.scene.position.set(-115, 0, 238)

      gltf2.scene.traverse(function (obj) {
        if (obj.isMesh) {
          if (obj.name !== 'Mesh_3ca768f6-0918-4d31-b980-7eb5f5f3c989012') {
            // 重新设置材质
            obj.material = new THREE.MeshBasicMaterial({
              color: '#c8c628',
            });
          }
        }
      });

      const gltf3 = gltf2.cloneModel()
      gltf3.scene.position.set(-138, 0, 260)

      const gltf4 = gltf2.cloneModel()
      gltf4.scene.position.set(-138, 0, 260)

      gui.add(gltf4.scene.position, 'x', -5000, 5000).step(1)
      gui.add(gltf4.scene.position, 'y', -5000, 5000).step(1)
      gui.add(gltf4.scene.position, 'z', -5000, 5000).step(1)
    },
    process => {
      console.log('加载进度', Math.floor(process * 100) + '%')
    },
  )

  // 添加堆垛叠盘
  modelLoader.loadModelToScene(
    '/model/glb/stackingTray.glb',
    gltf => {
      gltf.setScale(35, 100, 35)
      gltf.scene.position.set(30, 0, 170)
      gltf.scene.rotation.set(0, -Math.PI / 4, 0)
      gltf.scene.traverse(function (obj) {
        if (obj.isMesh) {
          // 重新设置材质
          obj.material = new THREE.MeshBasicMaterial({
            color: '#80aba6',
          });
        }
      });

      const gltf2 = gltf.cloneModel()
      gltf2.setScale(35, 100, 35)
      gltf2.setPosition(65, 0, 210)

      const gltf3 = gltf.cloneModel()
      gltf3.setScale(20, 30, 20)
      gltf3.scene.position.set(-140, 0, 50)

      const gltf4 = gltf.cloneModel()
      gltf4.setScale(20, 30, 20)
      gltf4.scene.position.set(-115, 0, 25)

      const gltf5 = gltf.cloneModel()
      gltf5.setScale(20, 30, 20)
      gltf5.scene.position.set(-92, 0, 2)

      const gltf6 = gltf.cloneModel()
      gltf6.setScale(20, 30, 20)
      gltf6.scene.position.set(-68, 0, -20)

      const gltf7 = gltf.cloneModel()
      gltf7.setScale(20, 30, 20)
      gltf7.scene.position.set(-42, 0, -42)

      const gltf8 = gltf.cloneModel()
      gltf8.setScale(20, 30, 20)
      gltf8.scene.position.set(-18, 0, -65)

      const gltf9 = gltf.cloneModel()
      gltf9.setScale(20, 30, 20)
      gltf9.scene.position.set(225, 0, -315)
      gltf9.scene.traverse(function (obj) {
        if (obj.isMesh) {
          // 重新设置材质
          obj.material = new THREE.MeshBasicMaterial({
            color: '#3e6d7a',
          });
        }
      });
    },
    process => {
      console.log('加载进度', Math.floor(process * 100) + '%')
    },
  )

  // 添加CSS3DLabel
  const labelRender = new LabelRender(viewer)
  const css3DLabel1 = labelRender.addCss3DLabel(
    '<div style="border:1px solid #fff; padding:8px;letter-spacing: 2px;">发料区</div>',
    { x: 200, y: 0, z: 200 }
  )
  const css3DLabel2 = labelRender.addCss3DLabel(
    '<div style="letter-spacing: 5px;">WMS发料区</div>',
    { x: 55, y: 0, z: 125 }
  )
  const css3DLabel3 = labelRender.addCss3DLabel(
    '<div style="letter-spacing: 5px;">LES备料超市</div>',
    { x: 300, y: 0, z: -35 }
  )
  const css3DLabel4 = labelRender.addCss3DLabel(
    `<div style="border:1px solid #fff; padding:8px;letter-spacing: 2px;text-align:center">
      <div style="margin-bottom:5px">仓储存储区</div>
      <div>WMS</div>
    </div>`,
    { x: -135, y: 0, z: 548 }
  )
  const css3DLabel5 = labelRender.addCss3DLabel(
    `<div style="border:1px solid #fff; padding:8px;letter-spacing: 5px;text-align:center">
      <div style="margin-bottom:5px">AGV空载具区</div>
      <div>LES</div>
    </div>`,
    { x: -98, y: 0, z: -145 },
    '22px'
  )
  const css3DLabel6 = labelRender.addCss3DLabel(
    '<div style="border:1px solid #fff; padding:8px;letter-spacing: 2px;">AGV库区</div>',
    { x: 118, y: 0, z: -355 },
    '22px'
  )
  const css3DLabel7 = labelRender.addCss3DLabel(
    '<div style="letter-spacing: 5px;">下架区</div>',
    { x: -105, y: 0, z: -320 },
    '24px'
  )
  const css3DLabel8 = labelRender.addCss3DLabel(
    '<div style="letter-spacing: 5px;">上架区</div>',
    { x: 95, y: 0, z: -520 },
    '24px'
  )
  const css3DLabel9 = labelRender.addCss3DLabel(
    `<div style="border:1px solid #fff; padding:8px;letter-spacing: 5px;text-align:center">
      自动化立库
    </div>`,
    { x: -450, y: 0, z: -186 },
    '26px'
  )
  css3DLabel1.rotation.set(-Math.PI / 2, 0, Math.PI / 4)
  css3DLabel2.rotation.set(-Math.PI / 2, 0, -Math.PI / 4)
  css3DLabel3.rotation.set(-Math.PI / 2, 0, Math.PI / 4)
  css3DLabel4.rotation.set(-Math.PI / 2, 0, Math.PI / 4)
  css3DLabel5.rotation.set(-Math.PI / 2, 0, Math.PI / 4)
  css3DLabel6.rotation.set(-Math.PI / 2, 0, Math.PI / 4)
  css3DLabel7.rotation.set(-Math.PI / 2, 0, Math.PI / 4)
  css3DLabel8.rotation.set(-Math.PI / 2, 0, Math.PI / 4)
  css3DLabel9.rotation.set(-Math.PI / 2, 0, Math.PI / 4)

  // 创建几何体点集
  const points1 = []
  const points2 = []
  const points3 = []
  const points4 = []
  const points5 = []
  const points6 = []
  const points7 = []
  // 1
  points1.push(new THREE.Vector3(-23.570229, 0, 23.570229))
  points1.push(new THREE.Vector3(141.421135, 0, 188.561842))
  points1.push(new THREE.Vector3(23.569455, 0, 306.413702))
  points1.push(new THREE.Vector3(-141.421437, 0, 141.421438))
  points1.push(new THREE.Vector3(-23.570229, 0, 23.570229))
  // 2
  points2.push(new THREE.Vector3(235.702085, 0, -235.702085))
  points2.push(new THREE.Vector3(400.693795, 0, -70.710638))
  points2.push(new THREE.Vector3(164.991509, 0, 164.991509))
  points2.push(new THREE.Vector3(-0.006058, 0, -0.009290))
  points2.push(new THREE.Vector3(235.702085, 0, -235.702085))

  // 3
  points3.push(new THREE.Vector3(-188.562756, 0, 141.422305))
  points3.push(new THREE.Vector3(-0.000365, 0, 329.983522))
  points3.push(new THREE.Vector3(-353.553362, 0, 683.583320))
  points3.push(new THREE.Vector3(-542.115175, 0, 494.974425))
  points3.push(new THREE.Vector3(-188.562756, 0, 141.422305))

  // 4
  points4.push(new THREE.Vector3(94.280792, 0, -235.702149))
  points4.push(new THREE.Vector3(141.420313, 0, -188.560763))
  points4.push(new THREE.Vector3(-141.421421, 0, 94.280426))
  points4.push(new THREE.Vector3(-188.561838, 0, 47.140482))
  points4.push(new THREE.Vector3(94.280792, 0, -235.702149))

  // 5
  points5.push(new THREE.Vector3(212.131899, 0, -353.552535))
  points5.push(new THREE.Vector3(259.267222, 0, -306.418201))
  points5.push(new THREE.Vector3(164.991489, 0, -212.131989))
  points5.push(new THREE.Vector3(117.852037, 0, -259.273393))
  points5.push(new THREE.Vector3(212.131899, 0, -353.552535))
  // 6
  points6.push(new THREE.Vector3(-23.571092, 0, -494.975628))
  points6.push(new THREE.Vector3(47.143278, 0, -424.259428))
  points6.push(new THREE.Vector3(-235.690330, 0, -141.413438))
  points6.push(new THREE.Vector3(-306.415125, 0, -212.129832))
  points6.push(new THREE.Vector3(-23.571092, 0, -494.975628))

  // 7
  points7.push(new THREE.Vector3(94.280821, 0, -612.825959))
  points7.push(new THREE.Vector3(164.991521, 0, -542.115259))
  points7.push(new THREE.Vector3(70.711035, 0, -447.834636))
  points7.push(new THREE.Vector3(-0.000286, 0, -518.545245))
  points7.push(new THREE.Vector3(94.280821, 0, -612.825959))
  // 创建材质
  const geometry1 = new THREE.BufferGeometry().setFromPoints(points1)
  const geometry2 = new THREE.BufferGeometry().setFromPoints(points2)
  const geometry3 = new THREE.BufferGeometry().setFromPoints(points3)
  const geometry4 = new THREE.BufferGeometry().setFromPoints(points4)
  const geometry5 = new THREE.BufferGeometry().setFromPoints(points5)
  const geometry6 = new THREE.BufferGeometry().setFromPoints(points6)
  const geometry7 = new THREE.BufferGeometry().setFromPoints(points7)
  const meterial1 = new THREE.LineBasicMaterial({ color: '#0b79ac' })
  const meterial2 = new THREE.LineBasicMaterial({ color: '#0b79ac' })
  const meterial3 = new THREE.LineBasicMaterial({ color: '#0b79ac' })
  const meterial4 = new THREE.LineBasicMaterial({ color: '#0b79ac' })
  const meterial5 = new THREE.LineBasicMaterial({ color: '#0b79ac' })
  const meterial6 = new THREE.LineBasicMaterial({ color: '#fff' })
  const meterial7 = new THREE.LineBasicMaterial({ color: '#fff' })
  // 把几何体和材质组合在一起
  const line1 = new THREE.Line(geometry1, meterial1)
  const line2 = new THREE.Line(geometry2, meterial2)
  const line3 = new THREE.Line(geometry3, meterial3)
  const line4 = new THREE.Line(geometry4, meterial4)
  const line5 = new THREE.Line(geometry5, meterial5)
  const line6 = new THREE.Line(geometry6, meterial6)
  const line7 = new THREE.Line(geometry7, meterial7)
  line1.position.setY(1)
  line2.position.setY(1)
  line3.position.setY(1)
  line4.position.setY(1)
  line5.position.setY(1)
  line6.position.setY(1)
  line7.position.set(-12, 1, 12)
  //7.把线添加到场景中
  viewer.scene.add(line1, line2, line3, line4, line5, line6, line7)

  // 批量创建多个长方体表示物料
  const group1 = new THREE.Group();
  group1.name = "物料1";
  for (let i = 0; i < 8; i++) {
    const geometry1 = new THREE.BoxGeometry(10, 10, 10);
    const material1 = new THREE.MeshBasicMaterial({
      color: '#e4d643'
    });
    const mesh1 = new THREE.Mesh(geometry1, material1);
    mesh1.position.x = i * 20; // 网格模型mesh沿着x轴方向阵列
    group1.add(mesh1); //添加到组对象group1
    mesh1.name = i + 1 + '号楼';
  }
  group1.position.set(-85, 0, 175)
  group1.rotation.set(-Math.PI / 2, 0, -Math.PI / 4)
  const group2 = group1.clone()
  group2.position.set(-60, 0, 155)
  viewer.scene.add(group1, group2)
  // gui.add(css3DLabel9.position, 'x', -5000, 5000).step(1)
  // gui.add(css3DLabel9.position, 'y', -5000, 5000).step(1)
  // gui.add(css3DLabel9.position, 'z', -5000, 5000).step(1)

  // 增加uv动画
  let textTure = viewer.addTextureLoader(uvUrl, -0.05)
  textTure.colorSpace = THREE.SRGBColorSpace;//设置为SRGB颜色空间
  textTure.offset.x += 0.5;//纹理U方向偏移
  // 设置.wrapS也就是U方向，纹理映射模式(包裹模式)
  textTure.wrapS = THREE.RepeatWrapping;//对应offste.x偏移
  textTure.repeat.set(12, 1);//注意选择合适的阵列数量
  const material2 = new THREE.LineBasicMaterial({
    // color: '#fff',
    // 设置纹理贴图：Texture对象作为材质map属性的属性值
    map: textTure,//map表示材质的颜色贴图属性
  });

  const geometry22 = new THREE.PlaneGeometry(200, 20);
  const mesh = new THREE.Mesh(geometry22, material2);
  mesh.rotateX(-Math.PI / 2);
  mesh.position.set(0, 10, 0)
  viewer.scene.add(mesh)

}

// 动作模拟切换
const actionClick = type => {
  console.log(type)
}
</script>

<template>
  <div class="screen-container">
    <div id="three-container"></div>
    <Header title="物流调度平台场景分析"></Header>
    <div class="menu-wrap">
      <div class="menu-item" @click="actionClick('one')">细节动作模拟</div>
      <div class="menu-item" @click="actionClick('one')">标准动作模拟</div>
    </div>
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
  font-size: 26px;
  left: 12px;
  top: 50%;
  cursor: pointer;
  transform: translate(0, -50%);
}

.menu-item {
  padding: 12px;
  letter-spacing: 3px;
  margin-bottom: 16px;
  writing-mode: vertical-rl;
  background: url('@/assets/images/tab_bg2.png') no-repeat;
  background-size: 100% 100%;
}
</style>
