/**
 * @description 聚光源
 * @author xu.zhengyou
 * @param {Object} viewer 视图
 * @param {Array} position 位置
 * @param {Object} option 灯光参数
 */
import * as THREE from 'three'
export default class SpotLight {
  constructor(
    viewer,
    position = [0, 40, 0],
    option = { color: 'rgb(255,255,255)' },
  ) {
    const color = new THREE.Color(option.color)
    this.light = new THREE.SpotLight(color)
    this.light.castShadow = true
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 10, 10),
      new THREE.MeshBasicMaterial({ color: color }),
    )
    this.light.add(this.mesh)
    this.setOption(option)
    this.setPosition(position)
    viewer.scene.add(this.light)
  }

  /**
   * 设置灯光参数
   * @param {Object} option
   */
  setOption(option = {}) {
    this.light.intensity = option.intensity || 20 // 光线强度
    this.light.angle = option.angle || 1 // 光锥角度
    this.light.distance = option.distance || 200 // 光线距离
    this.light.decay = option.decay || 1 // 光的衰减指数
    this.light.castShadow = true // 阴影投射
    this.light.shadow.mapSize.set(
      option.mapSize || 1024,
      option.mapSize || 1024,
    ) // 阴影贴图尺寸
    // 阴影相机属性
    this.light.shadow.camera.near = 0.1
    this.light.shadow.camera.far = 4000
    this.light.shadow.camera.fov = 30
  }

  /**
   * 设置灯光位置
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   */
  setPosition([x, y, z]) {
    if (this.light) this.light.position.set(x || 0, y || 0, z || 0)
  }
}
