/**
 * @description 模型工厂：模型预处理及功能增强
 * @author xu.zhengyou
 * @param {Object} model  模型
 * @param {Object} viewer 视图
 */
import * as THREE from 'three'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'

export default class ModelFactory {
  constructor(model, viewer) {
    this.model = model
    this.viewer = viewer
    this.scene = model.scene || model
    this.mixer = undefined // 动画播放器
    this.animateObject = {} // 动画对象
    this.animateIndex = -1 // 当前动画下标
    this.clock = new THREE.Clock() // 时间对象
  }

  /**
   * 获取模型的包围盒
   * @returns {Object} 模型的包围盒信息
   */
  getBox() {
    this.scene.updateMatrixWorld() // 更新模型的世界矩阵
    const box = new THREE.Box3().setFromObject(this.scene)
    return box
  }

  /**
   * 设置模型到原点位置
   */
  setCenter() {
    const box = this.getBox()
    const center = box.getCenter(new THREE.Vector3())
    this.scene.position.x += this.scene.position.x - center.x
    this.scene.position.y += this.scene.position.y - center.y
    this.scene.position.z += this.scene.position.z - center.z
  }

  /**
   * 设置模型缩放比例 可以只填写一个参数
   * @param {Number} x x轴缩放
   * @param {Number} y y轴缩放
   * @param {Number} z Z轴缩放
   */
  setScale(x, y, z) {
    this.scene.scale.set(x, y || x, z || x)
  }

  /**
   * 模型的长宽高（包围盒尺寸）
   * @returns {Object} 模型的长宽高信息
   */
  getLenth() {
    const box = this.getBox()
    return box.getSize(new THREE.Vector3())
  }

  /**
   * 设置模型缩放
   * @param {Number} x x横轴旋转
   * @param {Number} y 纵轴旋转
   * @param {Number} z z横轴旋转
   */
  setRotation(x, y, z) {
    if (x) this.scene.rotation.x = x
    if (y) this.scene.rotation.y = y
    if (z) this.scene.rotation.z = z
  }

  /**
   * 设置模型位置
   * @param x x坐标
   * @param y y坐标
   * @param z z坐标
   */
  setPosition(x, y, z) {
    this.scene.position.set(x, y, z)
  }

  /**
   * 克隆模型
   * @param {Array} [x,y,z] 克隆后显示位置 默认坐标原点
   * @returns {Object} 模型
   */
  cloneModel([x, y, z] = [0, 0, 0]) {
    const newModel = { ...this.model }
    const newScene = clone(this.scene)
    newScene.position.set(x, y, z)
    this.viewer.scene.add(newScene)
    newModel.scene = newScene
    return new ModelFactory(newModel, this.viewer)
  }

  /**
   * 设置模型动画
   * @param {Number} i 当前播放动画模型
   */
  startAnimate(i = 0) {
    this.animateIndex = i
    if (!this.mixer) {
      this.mixer = new THREE.AnimationMixer(this.scene) // 创建动画播放器mixer
    }
    if (!this.model.animations.length) {
      return
    }
    this.mixer.clipAction(this.model.animations[i]).play() // 播放动画
    this.animateObject = {
      fun: this.$updateAnimation,
      content: this,
    }
    this.viewer.addAnimate(this.animateObject) // 添加动画监听
  }

  /**
   * 停止动画
   */
  stopAnimate() {
    if (!this.model.animations.length) return
    if (!this.mixer || !this.mixer.clipAction) return
    this.mixer.clipAction(this.model.animations[this.animateIndex]).stop()
    if (this.animateObject) this.viewer.removeAnimate(this.animateObject)
  }

  /**
   * 更新动画混合器
   * @param {Object} e
   */
  $updateAnimation(e) {
    e.mixer.update(e.clock.getDelta())
  }

  /**
   * 产生和接收阴影：实际生活中所有物体都可以产生阴影，同时所有物体都可以接收其它物体的阴影
   * @param {Array} names  支持部分控制
   */
  castAndReceiveShadow(names = []) {
    this.scene.traverse(mesh => {
      if (mesh.isMesh && (!names.length || names.includes(mesh.name))) {
        mesh.castShadow = true // 产生阴影
        mesh.receiveShadow = true // 接收阴影
      }
    })
  }

  /**
   * 批量修改模型材质
   * @param {String} color 颜色
   * @param {Number} opciaty 透明度
   */
  updateMeshMaterial(color = 'rgb(255,255,255)', opacity = 0.05) {
    this.scene.traverse(obj => {
      if (obj.isMesh) {
        // 重新设置材质
        obj.material = new THREE.MeshLambertMaterial({
          opacity,
          transparent: true,
          color: new THREE.Color(color),
          side: THREE.DoubleSide, // 双面显示
          depthTest: false, //  是否在渲染此材质时启用深度测试
          depthWrite: true, // 渲染此材质是否对深度缓冲区有任何影响
        })
      }
    })
  }
}
